import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../services/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await subscribeNewsletter(email);
      setMessage(res.data.message);
      setStatus('success');
      setEmail('');
    } catch {
      setMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <footer style={{ background: '#000', color: '#fff', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '0.15em', marginBottom: 16 }}>
              NEWTRAL
            </h3>
            <p style={{ color: '#999', fontSize: 13, lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
              Premium automotive streetwear. Crafted for those who live the culture.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.12em', marginBottom: 16, color: '#fff' }}>SHOP</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/products', label: 'All Products' },
                { to: '/products?collection=winter', label: 'Winter Collection' },
                { to: '/products?collection=summer-25', label: 'Summer \'25' },
                { to: '/products?category=hoodies', label: 'Hoodies' },
                { to: '/products?category=jackets', label: 'Jackets' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} style={{ color: '#999', fontSize: 13, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#999')}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.12em', marginBottom: 16, color: '#fff' }}>COMPANY</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} style={{ color: '#999', fontSize: 13, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#999')}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 13, letterSpacing: '0.12em', marginBottom: 16, color: '#fff' }}>STAY IN THE LOOP</h4>
            <p style={{ color: '#999', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
              New drops, exclusive offers, and culture delivered to your inbox.
            </p>
            {status === 'success' ? (
              <p style={{ color: '#4ade80', fontSize: 13, lineHeight: 1.6 }}>{message}</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex' }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      background: '#111',
                      border: '1px solid #333',
                      borderRight: 'none',
                      color: '#fff',
                      fontSize: 13,
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      padding: '10px 18px',
                      background: 'var(--red)',
                      color: '#fff',
                      border: 'none',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      opacity: status === 'loading' ? 0.7 : 1,
                    }}
                  >
                    {status === 'loading' ? '...' : 'Join'}
                  </button>
                </div>
                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: 12 }}>{message}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #222',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ color: '#555', fontSize: 12 }}>© 2025 Newtral. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(label => (
              <span key={label} style={{ color: '#555', fontSize: 12, cursor: 'pointer' }}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
