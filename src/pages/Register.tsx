import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', first_name: '', last_name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: Record<string, string[]> } };
      const data = axiosErr?.response?.data;
      if (data) {
        const msg = Object.values(data).flat().join(' ');
        setError(msg || 'Registration failed');
      } else {
        setError('Registration failed. Please try again.');
      }
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
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginTop: 24, marginBottom: 8 }}>Create Account</h1>
        <p style={{ color: '#666', fontSize: 14 }}>Join the movement.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', fontSize: 14 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>First Name</label>
            <input name="first_name" value={form.first_name} onChange={handleChange} className="form-control-newtral" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Last Name</label>
            <input name="last_name" value={form.last_name} onChange={handleChange} className="form-control-newtral" />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Username *</label>
          <input name="username" value={form.username} onChange={handleChange} required className="form-control-newtral" />
        </div>

        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-control-newtral" />
        </div>

        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Password *</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={8} autoComplete="new-password" className="form-control-newtral" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-newtral btn-newtral-red"
          style={{ marginTop: 8, padding: '14px' }}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#666' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#000', textDecoration: 'underline', fontWeight: 600 }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
