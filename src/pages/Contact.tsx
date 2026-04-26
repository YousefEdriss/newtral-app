import { useState } from 'react';
import { submitContact } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        background: '#000',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>
          Get In Touch
        </p>
        <h1 className="section-title" style={{ color: '#fff', fontSize: '3rem', marginBottom: 16 }}>Contact Us</h1>
        <p style={{ color: '#999', fontFamily: 'var(--font-body)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
          Questions about sizing, orders, or collabs? We're here.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }} className="contact-grid">
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '0.08em', marginBottom: 32 }}>
              Let's Talk
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: 'Email',
                  value: 'hello@newtral.store',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2z"/>
                    </svg>
                  ),
                  label: 'Phone',
                  value: '+1 (555) 000-0000',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  label: 'Response Time',
                  value: 'Within 24 hours',
                },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 2 }}>{icon}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{label}</p>
                    <p style={{ fontSize: 15, fontFamily: 'var(--font-body)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 14, letterSpacing: '0.1em', marginBottom: 16 }}>Follow Us</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                {['Instagram', 'TikTok', 'Twitter'].map(social => (
                  <span key={social} style={{
                    padding: '8px 16px',
                    border: '1px solid #eee',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000'; }}>
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {success ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: 56, height: 56, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: '#666', fontSize: 14 }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} className="btn-newtral" style={{ marginTop: 24 }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', fontSize: 14 }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="form-control-newtral" placeholder="Your name" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-control-newtral" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Subject *</label>
                  <input name="subject" value={form.subject} onChange={handleChange} required className="form-control-newtral" placeholder="What's this about?" />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={6} className="form-control-newtral" placeholder="Tell us more..." style={{ resize: 'vertical' }} />
                </div>

                <button type="submit" disabled={submitting} className="btn-newtral btn-newtral-red" style={{ padding: '14px' }}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
