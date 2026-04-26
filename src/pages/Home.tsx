import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import type { Product, Collection } from '../types';
import { getProducts, getCollections } from '../services/api';

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProducts({ featured: true }),
      getCollections(),
    ]).then(([prodRes, colRes]) => {
      setFeatured(prodRes.data.slice(0, 4));
      setCollections(colRes.data.slice(0, 3));
    }).finally(() => setLoading(false));
  }, []);

  const collectionImages = [
    'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  ];

  return (
    <div>
      <Hero />

      {/* Featured Products */}
      <section style={{ padding: '80px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 8 }}>
              Handpicked
            </p>
            <h2 className="section-title">Featured Drops</h2>
          </div>
          <Link to="/products" style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 12,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#000',
            textDecoration: 'underline',
            textUnderlineOffset: 4,
          }}>
            View All →
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ aspectRatio: '3/4', background: '#f0f0f0', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Collections Banner */}
      <section style={{ background: '#000', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 8 }}>
              Explore
            </p>
            <h2 className="section-title" style={{ color: '#fff' }}>Shop by Collection</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {collections.map((col, i) => (
              <Link
                key={col.id}
                to={`/products?collection=${col.slug}`}
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  overflow: 'hidden',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                <img
                  src={collectionImages[i % collectionImages.length]}
                  alt={col.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'transform 0.5s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  right: 24,
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 12,
                  }}>
                    {col.name}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 12,
                    color: '#fff',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid rgba(255,255,255,0.5)',
                    paddingBottom: 2,
                  }}>
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section style={{ padding: '100px 24px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 16 }}>
          The Brand
        </p>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 1.1,
          marginBottom: 24,
        }}>
          Born from the Culture.<br />Built for the Streets.
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: '#555',
          lineHeight: 1.8,
          marginBottom: 36,
        }}>
          Newtral exists at the intersection of automotive passion and street culture. Every piece is designed for those who understand that the way you dress is an extension of the machines you love.
        </p>
        <Link to="/about" className="btn-newtral">
          Our Story
        </Link>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
