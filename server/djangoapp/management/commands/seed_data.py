from django.core.management.base import BaseCommand
from djangoapp.models import Category, Collection, Product, ProductImage


CATEGORIES = [
    {'name': 'Hoodies', 'slug': 'hoodies', 'description': 'Premium automotive-inspired hoodies'},
    {'name': 'Jackets', 'slug': 'jackets', 'description': 'Luxury streetwear jackets'},
    {'name': 'Crewnecks', 'slug': 'crewnecks', 'description': 'Comfortable crewneck sweatshirts'},
    {'name': 'T-Shirts', 'slug': 't-shirts', 'description': 'Automotive passion tees'},
]

COLLECTIONS = [
    {'name': 'Winter Collection', 'slug': 'winter', 'description': 'Winter 2024/2025 collection'},
    {'name': 'Summer 25 Collection', 'slug': 'summer-25', 'description': 'Summer 2025 collection'},
    {'name': 'All Products', 'slug': 'all-products', 'description': 'All Newtral products'},
]

PRODUCTS = [
    # Jackets - Winter
    {
        'name': 'BMW Trackline Jacket',
        'slug': 'bmw-trackline-jacket',
        'description': 'Premium BMW-inspired trackline jacket. Engineered for style and comfort with precision-crafted details that echo the iconic BMW M series design philosophy.',
        'price': 1105.00,
        'compare_price': 1500.00,
        'category': 'jackets',
        'collection': 'winter',
        'in_stock': True,
        'inventory_count': 15,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 'alt_text': 'BMW Trackline Jacket Front', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', 'alt_text': 'BMW Trackline Jacket Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Porsche FlatSix Jacket',
        'slug': 'porsche-flatsix-jacket',
        'description': 'Inspired by the legendary Porsche flat-six engine. A masterpiece of automotive passion translated into luxury streetwear.',
        'price': 1105.00,
        'compare_price': 1500.00,
        'category': 'jackets',
        'collection': 'winter',
        'in_stock': True,
        'inventory_count': 12,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', 'alt_text': 'Porsche FlatSix Jacket', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 'alt_text': 'Porsche FlatSix Jacket Back', 'is_primary': False},
        ]
    },
    # Hoodies - Winter
    {
        'name': 'BMW M-Shift Hoodie',
        'slug': 'bmw-m-shift-hoodie',
        'description': 'The BMW M-Shift Hoodie channels the power and precision of the M series. Premium heavyweight fleece with embroidered M-Sport detailing.',
        'price': 1200.00,
        'compare_price': 1400.00,
        'category': 'hoodies',
        'collection': 'winter',
        'in_stock': False,
        'inventory_count': 0,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80', 'alt_text': 'BMW M-Shift Hoodie', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', 'alt_text': 'BMW M-Shift Hoodie Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Porsche 911 Legacy Hoodie',
        'slug': 'porsche-911-legacy-hoodie',
        'description': 'A tribute to the timeless Porsche 911. This hoodie captures the essence of 60 years of automotive excellence in premium streetwear form.',
        'price': 1020.00,
        'compare_price': 1400.00,
        'category': 'hoodies',
        'collection': 'winter',
        'in_stock': True,
        'inventory_count': 8,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', 'alt_text': 'Porsche 911 Legacy Hoodie', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80', 'alt_text': 'Porsche 911 Legacy Hoodie Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Mercedes Black Series Hoodie',
        'slug': 'mercedes-black-series-hoodie',
        'description': 'The ultimate expression of Mercedes-AMG Black Series power, rendered in premium hoodie form. Dark, aggressive, and undeniably luxurious.',
        'price': 1020.00,
        'compare_price': 1400.00,
        'category': 'hoodies',
        'collection': 'winter',
        'in_stock': True,
        'inventory_count': 10,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80', 'alt_text': 'Mercedes Black Series Hoodie', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80', 'alt_text': 'Mercedes Black Series Hoodie Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Lunar Porsche Hoodie',
        'slug': 'lunar-porsche-hoodie',
        'description': 'Inspired by Porsche\'s moonlit racing heritage. A hoodie that glows with understated automotive passion.',
        'price': 1200.00,
        'compare_price': 1300.00,
        'category': 'hoodies',
        'collection': 'winter',
        'in_stock': False,
        'inventory_count': 0,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', 'alt_text': 'Lunar Porsche Hoodie', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80', 'alt_text': 'Lunar Porsche Hoodie Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Mocha McLaren Hoodie',
        'slug': 'mocha-mclaren-hoodie',
        'description': 'McLaren\'s racing DNA infused into a rich mocha-toned premium hoodie. Speed meets sophistication.',
        'price': 1020.00,
        'compare_price': 1300.00,
        'category': 'hoodies',
        'collection': 'winter',
        'in_stock': True,
        'inventory_count': 6,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80', 'alt_text': 'Mocha McLaren Hoodie', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80', 'alt_text': 'Mocha McLaren Hoodie Back', 'is_primary': False},
        ]
    },
    # Crewneck - Winter
    {
        'name': 'Jet-black Lamborghini Crewneck',
        'slug': 'jet-black-lamborghini-crewneck',
        'description': 'Raging bull energy in crewneck form. The Lamborghini Crewneck brings Italian supercar heritage to your wardrobe.',
        'price': 1000.00,
        'compare_price': 1300.00,
        'category': 'crewnecks',
        'collection': 'winter',
        'in_stock': True,
        'inventory_count': 9,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', 'alt_text': 'Lamborghini Crewneck', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80', 'alt_text': 'Lamborghini Crewneck Back', 'is_primary': False},
        ]
    },
    # T-Shirts - Summer
    {
        'name': 'BMW M Power Edition',
        'slug': 'bmw-m-power-edition-tshirt',
        'description': 'M Power in its purest form. This premium tee channels the heart of BMW\'s performance division.',
        'price': 695.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': False,
        'inventory_count': 0,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'BMW M Power T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'BMW M Power T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Porsche 911 White Edition',
        'slug': 'porsche-911-white-edition-tshirt',
        'description': 'Pure. Iconic. The Porsche 911 White Edition tee is a clean canvas for your passion.',
        'price': 720.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': True,
        'inventory_count': 14,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'Porsche 911 White Edition T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'Porsche 911 White Edition T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Hellcat SRT Predator Edition',
        'slug': 'hellcat-srt-predator-edition-tshirt',
        'description': '707 horsepower of raw American muscle, distilled into premium streetwear. The predator has arrived.',
        'price': 720.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': True,
        'inventory_count': 20,
        'featured': True,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'Hellcat SRT T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'Hellcat SRT T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'BMW Black Edition',
        'slug': 'bmw-black-edition-tshirt',
        'description': 'The darkest expression of BMW\'s ultimate driving machine philosophy. Blacked out, blacked in.',
        'price': 695.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': True,
        'inventory_count': 11,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'BMW Black Edition T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'BMW Black Edition T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Ferrari Scuderia Black Edition',
        'slug': 'ferrari-scuderia-black-edition-tshirt',
        'description': 'Prancing horse in the night. Ferrari\'s racing heritage meets dark luxury streetwear.',
        'price': 720.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': False,
        'inventory_count': 0,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'Ferrari Scuderia T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'Ferrari Scuderia T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Porsche 911 Black Edition',
        'slug': 'porsche-911-black-edition-tshirt',
        'description': 'Night mode activated. The Porsche 911 Black Edition channels the power of darkness.',
        'price': 720.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': True,
        'inventory_count': 7,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'Porsche 911 Black Edition T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'Porsche 911 Black Edition T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Lamborghini Corsa White Edition',
        'slug': 'lamborghini-corsa-white-edition-tshirt',
        'description': 'Pure white, pure speed. The Lamborghini Corsa White Edition is built for those who run at the front.',
        'price': 695.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': True,
        'inventory_count': 13,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'Lamborghini Corsa White T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'Lamborghini Corsa White T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Lamborghini Corsa Black Edition',
        'slug': 'lamborghini-corsa-black-edition-tshirt',
        'description': 'When the Raging Bull goes dark. Maximum aggression in premium black streetwear.',
        'price': 695.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': True,
        'inventory_count': 5,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'Lamborghini Corsa Black T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'Lamborghini Corsa Black T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Mercedes AMG Black Series',
        'slug': 'mercedes-amg-black-series-tshirt',
        'description': 'One of the most ferocious Mercedes-AMG models ever, immortalized in premium tee form.',
        'price': 695.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': False,
        'inventory_count': 0,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'Mercedes AMG T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'Mercedes AMG T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'Porsche GT3 RS Black Edition',
        'slug': 'porsche-gt3-rs-black-edition-tshirt',
        'description': 'Track-ready intensity meets streetwear culture. The GT3 RS Black Edition is as uncompromising as the car itself.',
        'price': 720.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': False,
        'inventory_count': 0,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'Porsche GT3 RS T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'Porsche GT3 RS T-Shirt Back', 'is_primary': False},
        ]
    },
    {
        'name': 'BMW White Edition',
        'slug': 'bmw-white-edition-tshirt',
        'description': 'The ultimate driving machine in its purest, cleanest form. BMW\'s iconic heritage in white.',
        'price': 695.00,
        'compare_price': 1000.00,
        'category': 't-shirts',
        'collection': 'summer-25',
        'in_stock': False,
        'inventory_count': 0,
        'featured': False,
        'images': [
            {'image_url': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'alt_text': 'BMW White Edition T-Shirt', 'is_primary': True},
            {'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'alt_text': 'BMW White Edition T-Shirt Back', 'is_primary': False},
        ]
    },
]


class Command(BaseCommand):
    help = 'Seed the database with Newtral products'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # Create categories
        category_map = {}
        for cat_data in CATEGORIES:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name'], 'description': cat_data['description']}
            )
            category_map[cat_data['slug']] = cat
            if created:
                self.stdout.write(f'  Created category: {cat.name}')

        # Create collections
        collection_map = {}
        for col_data in COLLECTIONS:
            col, created = Collection.objects.get_or_create(
                slug=col_data['slug'],
                defaults={'name': col_data['name'], 'description': col_data['description']}
            )
            collection_map[col_data['slug']] = col
            if created:
                self.stdout.write(f'  Created collection: {col.name}')

        # Create products
        for prod_data in PRODUCTS:
            images = prod_data.pop('images', [])
            cat_slug = prod_data.pop('category')
            col_slug = prod_data.pop('collection')

            prod_data['category'] = category_map.get(cat_slug)
            prod_data['collection'] = collection_map.get(col_slug)

            product, created = Product.objects.get_or_create(
                slug=prod_data['slug'],
                defaults=prod_data
            )

            if created:
                for img_data in images:
                    ProductImage.objects.create(product=product, **img_data)
                self.stdout.write(f'  Created product: {product.name}')
            else:
                self.stdout.write(f'  Skipped (exists): {product.name}')

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
