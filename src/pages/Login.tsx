import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: '80px auto', padding: '0 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.15em', color: '#000' }}>
          NEWTRAL
        </Link>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginTop: 24, marginBottom: 8 }}>Sign In</h1>
        <p style={{ color: '#666', fontSize: 14 }}>Welcome back to the movement.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', fontSize: 14 }}>
            {error}
          </div>
        )}

        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="form-control-newtral"
          />
        </div>

        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="form-control-newtral"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-newtral btn-newtral-red"
          style={{ marginTop: 8, padding: '14px' }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#666' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#000', textDecoration: 'underline', fontWeight: 600 }}>
          Create one
        </Link>
      </p>
    </div>
  );
}
