import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);

  const primaryImg = product.primary_image?.image_url ?? 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80';
  const hoverImg = product.hover_image?.image_url ?? primaryImg;

  return (
    <Link
      to={`/products/${product.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#f5f5f5' }}>
          <img
            src={hovered && hoverImg !== primaryImg ? hoverImg : primaryImg}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
            loading="lazy"
          />
          {/* Badges */}
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {!product.in_stock && (
              <span style={{
                background: '#333',
                color: '#fff',
                fontFamily: 'var(--font-heading)',
                fontSize: 11,
                fontWeight: 600,
                padding: '2px 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>Sold Out</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '12px 0 0' }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '0 0 6px',
            color: '#000',
          }}>
            {product.name}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#000' }}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
            {product.compare_price && (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#999', textDecoration: 'line-through' }}>
                ${parseFloat(product.compare_price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
