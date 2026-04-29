from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Collection, Product, ProductImage, ProductSizeInventory, Cart, CartItem, Order, OrderItem, ContactMessage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'name', 'slug', 'description']


class ProductSizeInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSizeInventory
        fields = ['size', 'quantity']


class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt_text', 'is_primary']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return obj.image_url


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    collection = CollectionSerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    hover_image = serializers.SerializerMethodField()
    discount_percent = serializers.SerializerMethodField()
    size_inventory = ProductSizeInventorySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'price', 'compare_price', 'category',
                  'collection', 'in_stock', 'featured', 'primary_image', 'hover_image',
                  'discount_percent', 'size_inventory']

    def _resolve_url(self, img):
        request = self.context.get('request')
        if img.image:
            url = img.image.url
            return request.build_absolute_uri(url) if request else url
        return img.image_url

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        if img:
            return {'image_url': self._resolve_url(img), 'alt_text': img.alt_text}
        return None

    def get_hover_image(self, obj):
        imgs = list(obj.images.all())
        if len(imgs) >= 2:
            return {'image_url': self._resolve_url(imgs[1]), 'alt_text': imgs[1].alt_text}
        return None

    def get_discount_percent(self, obj):
        if obj.compare_price and obj.compare_price > obj.price:
            return round((1 - float(obj.price) / float(obj.compare_price)) * 100)
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    collection = CollectionSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    size_inventory = ProductSizeInventorySerializer(many=True, read_only=True)
    discount_percent = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'compare_price',
                  'category', 'collection', 'in_stock', 'featured',
                  'images', 'size_inventory', 'discount_percent']

    def get_discount_percent(self, obj):
        if obj.compare_price and obj.compare_price > obj.price:
            return round((1 - float(obj.price) / float(obj.compare_price)) * 100)
        return None


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'size', 'quantity', 'subtotal']

    def get_subtotal(self, obj):
        return float(obj.get_subtotal())


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()
    item_count = serializers.SerializerMethodField()
    cart_token = serializers.UUIDField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'cart_token', 'items', 'total', 'item_count']

    def get_total(self, obj):
        return float(obj.get_total())

    def get_item_count(self, obj):
        return obj.get_item_count()


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'size', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'first_name', 'last_name', 'email', 'phone',
                  'address', 'city', 'total', 'status', 'notes', 'items', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
