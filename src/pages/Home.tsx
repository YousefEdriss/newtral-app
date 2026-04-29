import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import type { Product, Collection } from '../types';
import { getProducts, getCollections } from '../services/api';

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProducts({ featured: true }),
      getCollections(),
      getProducts(),
    ]).then(([featRes, colRes, allRes]) => {
      setFeatured(featRes.data.slice(0, 4));
      setCollections(colRes.data);
      setAllProducts(allRes.data);
    }).finally(() => setLoading(false));
  }, []);

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

      {/* Collections */}
      <section style={{ padding: '80px 24px', maxWidth: 1280, margin: '0 auto' }}>
        {loading ? (
          <div style={{ aspectRatio: '3/4', background: '#f0f0f0', animation: 'pulse 1.5s infinite', maxWidth: 400 }} />
        ) : (
          collections.map(col => {
            const products = allProducts.filter(p => p.collection?.id === col.id);
            if (products.length === 0) return null;
            return (
              <div key={col.id} style={{ marginBottom: 72 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 8 }}>
                      Collection
                    </p>
                    <h2 className="section-title">{col.name}</h2>
                  </div>
                  <Link
                    to={`/products?collection=${col.slug}`}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 12,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#000',
                      textDecoration: 'underline',
                      textUnderlineOffset: 4,
                    }}
                  >
                    View All →
                  </Link>
                </div>
                <div className="product-grid">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })
        )}
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
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}
