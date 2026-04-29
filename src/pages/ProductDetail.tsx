import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImg, setSelectedImg] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProduct(slug)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [slug]);

  const getSizeQty = (size: string) => {
    if (!product || product.size_inventory.length === 0) return null;
    return product.size_inventory.find(s => s.size === size)?.quantity ?? null;
  };

  const isSizeAvailable = (size: string) => {
    const qty = getSizeQty(size);
    return qty === null || qty > 0;
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    setAdding(true);
    try {
      await addToCart(product!.id, selectedSize);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div style={{ aspectRatio: '3/4', background: '#f0f0f0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 24 }}>
            <div style={{ height: 32, background: '#f0f0f0', width: '70%' }} />
            <div style={{ height: 24, background: '#f0f0f0', width: '30%' }} />
            <div style={{ height: 120, background: '#f0f0f0', marginTop: 16 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 16 }}>Product Not Found</h2>
        <Link to="/products" className="btn-newtral">Back to Shop</Link>
      </div>
    );
  }

  const images = product.images.length > 0
    ? product.images
    : [{ id: 0, image_url: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80', alt_text: product.name, is_primary: true }];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link to="/" style={{ color: '#999', fontSize: 13, fontFamily: 'var(--font-body)' }}>Home</Link>
        <span style={{ color: '#ccc' }}>/</span>
        <Link to="/products" style={{ color: '#999', fontSize: 13, fontFamily: 'var(--font-body)' }}>Shop</Link>
        <span style={{ color: '#ccc' }}>/</span>
        <span style={{ fontSize: 13, fontFamily: 'var(--font-body)' }}>{product.name}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'start',
      }} className="product-detail-grid">
        {/* Images */}
        <div>
          {/* Main image */}
          <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#f5f5f5', marginBottom: 12 }}>
            <img
              src={images[selectedImg]?.image_url}
              alt={images[selectedImg]?.alt_text || product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {images.map((img, i) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImg(i)}
                  style={{
                    width: 72,
                    height: 88,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImg === i ? '2px solid #000' : '2px solid transparent',
                    opacity: selectedImg === i ? 1 : 0.7,
                    transition: 'all 0.2s',
                  }}
                >
                  <img src={img.image_url} alt={img.alt_text} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div style={{ paddingTop: 8 }}>
          {/* Category */}
          {product.category && (
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--red)',
              marginBottom: 12,
            }}>
              {product.category.name}
            </p>
          )}

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 16,
          }}>
            {product.name}
          </h1>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-body)' }}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
            {product.compare_price && (
              <span style={{ fontSize: 18, color: '#999', textDecoration: 'line-through', fontFamily: 'var(--font-body)' }}>
                ${parseFloat(product.compare_price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div style={{ marginBottom: 24 }}>
            {product.in_stock ? (
              <span style={{ color: '#16a34a', fontSize: 13, fontFamily: 'var(--font-body)' }}>✓ In Stock</span>
            ) : (
              <span style={{ color: '#dc2626', fontSize: 13 }}>Sold Out</span>
            )}
          </div>

          {/* Size */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Size {selectedSize && `— ${selectedSize}`}
              </span>
              <span style={{ fontSize: 12, color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Size Guide</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SIZES.map(size => {
                const available = isSizeAvailable(size);
                const qty = getSizeQty(size);
                const lowStock = qty !== null && qty > 0 && qty <= 3;
                return (
                  <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <button
                      onClick={() => { if (available) { setSelectedSize(size); setSizeError(false); } }}
                      disabled={!available}
                      className={`size-btn${selectedSize === size ? ' active' : ''}`}
                      style={{
                        opacity: available ? 1 : 0.35,
                        cursor: available ? 'pointer' : 'not-allowed',
                        textDecoration: available ? 'none' : 'line-through',
                        position: 'relative',
                      }}
                    >
                      {size}
                    </button>
                    {!available && (
                      <span style={{ fontSize: 9, color: '#999', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Out
                      </span>
                    )}
                    {lowStock && (
                      <span style={{ fontSize: 9, color: 'var(--red)', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {qty} left
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {sizeError && (
              <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 8, fontFamily: 'var(--font-body)' }}>
                Please select a size
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={adding || !product.in_stock}
            className="btn-newtral btn-newtral-red"
            style={{
              width: '100%',
              fontSize: 14,
              padding: '16px',
              marginBottom: 12,
              opacity: (!product.in_stock) ? 0.5 : 1,
              cursor: (!product.in_stock) ? 'not-allowed' : 'pointer',
            }}
          >
            {!product.in_stock ? 'Sold Out' : adding ? 'Adding...' : added ? '✓ Added to Bag' : 'Add to Bag'}
          </button>

          {/* Description */}
          {product.description && (
            <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid #eee' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 14, letterSpacing: '0.1em', marginBottom: 12 }}>
                Description
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#555', lineHeight: 1.8 }}>
                {product.description}
              </p>
            </div>
          )}

          {/* Details */}
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #eee' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 14, letterSpacing: '0.1em', marginBottom: 12 }}>
              Product Details
            </h3>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 2, fontFamily: 'var(--font-body)' }}>
              <p>• Premium heavyweight fabric</p>
              <p>• Embroidered logo detailing</p>
              <p>• Limited edition run</p>
              <p>• Machine wash cold, tumble dry low</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
