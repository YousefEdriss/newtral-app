import { Link, useParams } from 'react-router-dom';

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
      <div style={{
        width: 72,
        height: 72,
        background: '#f0fdf4',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        Order Confirmed!
      </h1>

      <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
        Thank you for your purchase. Your order #{orderId} has been placed successfully.
      </p>
      <p style={{ color: '#999', fontSize: 13, marginBottom: 40 }}>
        You'll receive a confirmation email shortly.
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/products" className="btn-newtral btn-newtral-red">
          Continue Shopping
        </Link>
        <Link to="/" className="btn-newtral btn-newtral-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
