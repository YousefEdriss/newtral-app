import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

interface CheckoutForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export default function CartPage() {
  const { cart, updateItem, removeItem, clearCart, loading, refreshCart } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<CheckoutForm>({
    first_name: '', last_name: '', email: '', phone: '', address: '', city: '', notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await createOrder(form);
      await refreshCart();
      navigate(`/order-success/${res.data.id}`);
    } catch (err: unknown) {
      setError('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ margin: '0 auto 24px' }}>
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 16 }}>Your Bag is Empty</h1>
        <p style={{ color: '#666', marginBottom: 32 }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-newtral btn-newtral-red">Shop Now</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
      <h1 className="section-title" style={{ marginBottom: 40 }}>Your Bag ({cart.item_count})</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 360px',
        gap: 40,
        alignItems: 'start',
      }} className="cart-grid">
        {/* Items */}
        <div>
          {cart.items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              gap: 20,
              padding: '20px 0',
              borderBottom: '1px solid #eee',
            }}>
              <div style={{ width: 100, height: 120, flexShrink: 0, background: '#f5f5f5', overflow: 'hidden' }}>
                <img
                  src={item.product.primary_image || 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80'}
                  alt={item.product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>
                      {item.product.name}
                    </h3>
                    <p style={{ color: '#666', fontSize: 13, margin: 0 }}>Size: {item.size}</p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600 }}>
                    ${parseFloat(item.subtotal).toFixed(2)}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee' }}>
                    <button
                      onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}
                      disabled={loading}
                      style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                    >−</button>
                    <span style={{ width: 36, textAlign: 'center', fontSize: 14 }}>{item.quantity}</span>
                    <button
                      onClick={() => updateItem(item.id, item.quantity + 1)}
                      disabled={loading}
                      style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={loading}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16 }}>
            <button onClick={() => clearCart()} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#999', fontSize: 12, fontFamily: 'var(--font-heading)',
              letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'underline',
            }}>
              Clear Bag
            </button>
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: '#f9f9f9', padding: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, letterSpacing: '0.1em', marginBottom: 24 }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#666' }}>Subtotal ({cart.item_count} items)</span>
              <span>${parseFloat(cart.total).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#666' }}>Shipping</span>
              <span style={{ color: '#16a34a' }}>{parseFloat(cart.total) >= 100 ? 'Free' : '$9.99'}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 16, letterSpacing: '0.05em' }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                ${(parseFloat(cart.total) + (parseFloat(cart.total) >= 100 ? 0 : 9.99)).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowCheckout(!showCheckout)}
            className="btn-newtral btn-newtral-red"
            style={{ width: '100%', marginBottom: 10 }}
          >
            {showCheckout ? 'Hide Checkout' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>

      {/* Checkout form */}
      {showCheckout && (
        <div style={{ maxWidth: 600, marginTop: 48, padding: 40, border: '1px solid #eee' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', letterSpacing: '0.08em', marginBottom: 32 }}>
            Shipping Information
          </h2>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', marginBottom: 20, fontSize: 14 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>First Name *</label>
                <input name="first_name" value={form.first_name} onChange={handleChange} required className="form-control-newtral" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Last Name *</label>
                <input name="last_name" value={form.last_name} onChange={handleChange} required className="form-control-newtral" />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-control-newtral" />
            </div>

            <div>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Phone *</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className="form-control-newtral" />
            </div>

            <div>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Address *</label>
              <input name="address" value={form.address} onChange={handleChange} required className="form-control-newtral" />
            </div>

            <div>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>City *</label>
              <input name="city" value={form.city} onChange={handleChange} required className="form-control-newtral" />
            </div>

            <div>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Order Notes (Optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="form-control-newtral" style={{ resize: 'vertical' }} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-newtral btn-newtral-red"
              style={{ marginTop: 8, padding: '16px' }}
            >
              {submitting ? 'Placing Order...' : `Place Order — $${(parseFloat(cart.total) + (parseFloat(cart.total) >= 100 ? 0 : 9.99)).toFixed(2)}`}
            </button>
          </form>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
