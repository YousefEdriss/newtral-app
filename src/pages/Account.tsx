import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrders, deleteOrder } from '../services/api';
import type { Order } from '../types';

export default function Account() {
  const { user, isAuthenticated, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      getOrders().then(res => setOrders(res.data)).catch(() => {});
    }
  }, [isAuthenticated]);

  const handleDelete = async (orderId: number) => {
    if (!window.confirm(`Delete order #${orderId}? This cannot be undone.`)) return;
    setDeletingId(orderId);
    try {
      await deleteOrder(orderId);
      setOrders(prev => prev.filter(o => o.id !== orderId));
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div style={{ padding: 80, textAlign: 'center' }}>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
      <h1 className="section-title" style={{ marginBottom: 8 }}>My Account</h1>
      <p style={{ color: '#666', marginBottom: 48 }}>Welcome back, {user?.first_name || user?.username}</p>

      {/* Order History */}
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.08em', marginBottom: 24 }}>
        Order History
      </h2>

      {orders.length === 0 ? (
        <div style={{ padding: '40px 0', color: '#999', textAlign: 'center' }}>
          <p>No orders yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map(order => (
            <div key={order.id} style={{ border: '1px solid #eee', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: 14, marginBottom: 4 }}>Order #{order.id}</p>
                  <p style={{ color: '#999', fontSize: 13 }}>{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: order.status === 'delivered' ? '#f0fdf4' : order.status === 'cancelled' ? '#fef2f2' : '#fff7ed',
                    color: order.status === 'delivered' ? '#16a34a' : order.status === 'cancelled' ? '#dc2626' : '#ea580c',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    border: '1px solid currentColor',
                  }}>
                    {order.status}
                  </span>
                  <p style={{ fontWeight: 600 }}>${parseFloat(order.total).toFixed(2)}</p>
                  <button
                    onClick={() => handleDelete(order.id)}
                    disabled={deletingId === order.id}
                    style={{
                      background: 'none',
                      border: '1px solid #dc2626',
                      color: '#dc2626',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 11,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      cursor: 'pointer',
                      opacity: deletingId === order.id ? 0.5 : 1,
                    }}
                  >
                    {deletingId === order.id ? 'Deleting…' : 'Delete Order'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {order.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#555' }}>
                    <span>{item.product_name} — {item.size} × {item.quantity}</span>
                    <span>${parseFloat(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
