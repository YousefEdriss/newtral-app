import json
import uuid
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token

from .models import Category, Collection, Product, Cart, CartItem, Order, OrderItem, ContactMessage
from .serializers import (
    CategorySerializer, CollectionSerializer, ProductListSerializer,
    ProductDetailSerializer, CartSerializer, CartItemSerializer,
    OrderSerializer, ContactMessageSerializer, UserSerializer
)


def get_or_create_cart(cart_token_str):
    """Get or create a cart by token string."""
    try:
        cart_token = uuid.UUID(str(cart_token_str))
        cart, created = Cart.objects.get_or_create(cart_token=cart_token)
        return cart
    except (ValueError, AttributeError):
        cart = Cart.objects.create()
        return cart


# ---------- AUTH ----------

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()

    if not username or not email or not password:
        return Response({'error': 'Username, email, and password are required.'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken.'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered.'}, status=400)

    user = User.objects.create_user(
        username=username, email=email, password=password,
        first_name=first_name, last_name=last_name
    )
    token, _ = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'user': UserSerializer(user).data
    }, status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username', '')
    password = request.data.get('password', '')
    user = authenticate(request, username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })
    return Response({'error': 'Invalid credentials.'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        request.user.auth_token.delete()
    except Exception:
        pass
    return Response({'message': 'Logged out successfully.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    return Response(UserSerializer(request.user).data)


# ---------- PRODUCTS ----------

@api_view(['GET'])
@permission_classes([AllowAny])
def product_list(request):
    products = Product.objects.select_related('category', 'collection').prefetch_related('images')

    category_slug = request.GET.get('category')
    collection_slug = request.GET.get('collection')
    search = request.GET.get('search', '').strip()
    featured = request.GET.get('featured')
    in_stock = request.GET.get('in_stock')

    if category_slug:
        products = products.filter(category__slug=category_slug)
    if collection_slug:
        products = products.filter(collection__slug=collection_slug)
    if search:
        products = products.filter(name__icontains=search)
    if featured == 'true':
        products = products.filter(featured=True)
    if in_stock == 'true':
        products = products.filter(in_stock=True)

    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, slug):
    try:
        product = Product.objects.select_related('category', 'collection').prefetch_related('images').get(slug=slug)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=404)
    serializer = ProductDetailSerializer(product)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def collection_list(request):
    collections = Collection.objects.all()
    serializer = CollectionSerializer(collections, many=True)
    return Response(serializer.data)


# ---------- CART ----------

@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart(request):
    cart_token = request.headers.get('X-Cart-Token') or request.GET.get('cart_token')
    if not cart_token:
        cart = Cart.objects.create()
    else:
        cart = get_or_create_cart(cart_token)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    cart_token = request.headers.get('X-Cart-Token') or request.data.get('cart_token')
    product_id = request.data.get('product_id')
    size = request.data.get('size', 'M')
    quantity = int(request.data.get('quantity', 1))

    if not product_id:
        return Response({'error': 'product_id is required.'}, status=400)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=404)

    if not product.in_stock:
        return Response({'error': 'Product is out of stock.'}, status=400)

    cart = get_or_create_cart(cart_token) if cart_token else Cart.objects.create()

    existing_item = cart.items.filter(product=product, size=size).first()
    if existing_item:
        existing_item.quantity += quantity
        existing_item.save()
    else:
        CartItem.objects.create(cart=cart, product=product, size=size, quantity=quantity)

    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_cart_item(request, item_id):
    cart_token = request.headers.get('X-Cart-Token') or request.data.get('cart_token')
    quantity = int(request.data.get('quantity', 1))

    try:
        item = CartItem.objects.get(id=item_id)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found.'}, status=404)

    if quantity < 1:
        item.delete()
    else:
        item.quantity = quantity
        item.save()

    cart = item.cart if quantity >= 1 else Cart.objects.get(cart_token=cart_token) if cart_token else None
    if cart:
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    return Response({'message': 'Item removed.'})


@api_view(['DELETE'])
@permission_classes([AllowAny])
def remove_cart_item(request, item_id):
    try:
        item = CartItem.objects.get(id=item_id)
        cart = item.cart
        item.delete()
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found.'}, status=404)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def clear_cart(request):
    cart_token = request.headers.get('X-Cart-Token') or request.GET.get('cart_token')
    if cart_token:
        try:
            cart = Cart.objects.get(cart_token=cart_token)
            cart.items.all().delete()
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            pass
    return Response({'message': 'Cart cleared.'})


# ---------- ORDERS ----------

@api_view(['POST'])
@permission_classes([AllowAny])
def create_order(request):
    data = request.data
    cart_token = request.headers.get('X-Cart-Token') or data.get('cart_token')

    required = ['first_name', 'last_name', 'email', 'phone', 'address', 'city']
    for field in required:
        if not data.get(field):
            return Response({'error': f'{field} is required.'}, status=400)

    if not cart_token:
        return Response({'error': 'cart_token is required.'}, status=400)

    try:
        cart = Cart.objects.get(cart_token=cart_token)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart not found.'}, status=404)

    if not cart.items.exists():
        return Response({'error': 'Cart is empty.'}, status=400)

    order = Order.objects.create(
        user=request.user if request.user.is_authenticated else None,
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        phone=data['phone'],
        address=data['address'],
        city=data['city'],
        total=cart.get_total(),
        notes=data.get('notes', ''),
    )

    for item in cart.items.all():
        OrderItem.objects.create(
            order=order,
            product=item.product,
            product_name=item.product.name,
            size=item.size,
            quantity=item.quantity,
            price=item.product.price,
        )

    cart.items.all().delete()

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    orders = Order.objects.filter(user=request.user).prefetch_related('items').order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# ---------- CONTACT ----------

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Message sent successfully. We will get back to you soon!'}, status=201)
    return Response(serializer.errors, status=400)
