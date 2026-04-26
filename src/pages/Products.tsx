import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { Product, Category, Collection } from '../types';
import { getProducts, getCategories, getCollections } from '../services/api';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  const activeCategory = searchParams.get('category') || '';
  const activeCollection = searchParams.get('collection') || '';
  const search = searchParams.get('search') || '';

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (activeCategory) params.category = activeCategory;
    if (activeCollection) params.collection = activeCollection;
    if (search) params.search = search;

    getProducts(params)
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [activeCategory, activeCollection, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
    getCollections().then(res => setCollections(res.data));
  }, []);

  const setFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Clear the other filter
    if (key === 'category') newParams.delete('collection');
    if (key === 'collection') newParams.delete('category');
    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams({});

  const filterBtnStyle = (active: boolean) => ({
    padding: '8px 18px',
    fontFamily: 'var(--font-heading)',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    border: active ? '2px solid #000' : '2px solid #e0e0e0',
    background: active ? '#000' : 'transparent',
    color: active ? '#fff' : '#000',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: 8 }}>
          {activeCollection
            ? collections.find(c => c.slug === activeCollection)?.name || 'Collection'
            : activeCategory
            ? categories.find(c => c.slug === activeCategory)?.name || 'Category'
            : 'All Products'}
        </h1>
        <p style={{ color: '#666', fontSize: 14 }}>
          {loading ? '...' : `${products.length} item${products.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginRight: 12 }}>
            Collections:
          </span>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8 }}>
            {collections.map(col => (
              <button
                key={col.id}
                onClick={() => setFilter('collection', activeCollection === col.slug ? '' : col.slug)}
                style={filterBtnStyle(activeCollection === col.slug)}
              >
                {col.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginRight: 12 }}>
            Category:
          </span>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter('category', activeCategory === cat.slug ? '' : cat.slug)}
                style={filterBtnStyle(activeCategory === cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {(activeCategory || activeCollection) && (
          <button onClick={clearFilters} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--red)',
            textDecoration: 'underline',
          }}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ aspectRatio: '3/4', background: '#f0f0f0' }} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 12 }}>No products found</p>
          <button onClick={clearFilters} className="btn-newtral" style={{ marginTop: 16 }}>
            View All Products
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
