import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, cartOpen, closeCart, updateItem, removeItem, loading } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${cartOpen ? ' open' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: 420,
        background: '#fff',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
            YOUR BAG {cart?.item_count ? `(${cart.item_count})` : ''}
          </h2>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {!cart || cart.items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p style={{ color: '#999', fontFamily: 'var(--font-body)', marginBottom: 24 }}>Your bag is empty</p>
              <Link to="/products" onClick={closeCart} className="btn-newtral" style={{ display: 'inline-block' }}>
                Shop Now
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.items.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: 14,
                  paddingBottom: 16,
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  {/* Image */}
                  <div style={{ width: 80, height: 96, flexShrink: 0, background: '#f5f5f5', overflow: 'hidden' }}>
                    <img
                      src={item.product.primary_image?.image_url ?? 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=80'}
                      alt={item.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 4px',
                    }}>
                      {item.product.name}
                    </p>
                    <p style={{ color: '#666', fontSize: 12, margin: '0 0 10px' }}>Size: {item.size}</p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Quantity */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee' }}>
                        <button
                          onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}
                          disabled={loading}
                          style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}
                        >−</button>
                        <span style={{ width: 28, textAlign: 'center', fontSize: 13 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          disabled={loading}
                          style={{ width: 28, height: 28, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}
                        >+</button>
                      </div>

                      {/* Price */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>
                          ${parseFloat(item.subtotal).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={loading}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 2 }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div style={{ padding: '16px 24px 24px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 14, letterSpacing: '0.05em' }}>SUBTOTAL</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 600 }}>
                ${parseFloat(cart.total).toFixed(2)}
              </span>
            </div>
            <Link
              to="/cart"
              onClick={closeCart}
              className="btn-newtral btn-newtral-red"
              style={{ display: 'block', textAlign: 'center', marginBottom: 10 }}
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="btn-newtral btn-newtral-outline"
              style={{ width: '100%' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
