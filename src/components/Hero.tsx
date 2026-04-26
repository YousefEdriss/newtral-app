import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      height: '92vh',
      minHeight: 600,
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.45,
      }} />

      {/* Red accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 4,
        height: '100%',
        background: 'var(--red)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
      }}>
        <div style={{ maxWidth: 640 }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 13,
            letterSpacing: '0.3em',
            color: 'var(--red)',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            New Drop — Spring 2025
          </p>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            marginBottom: 24,
          }}>
            Drive the<br />
            <span style={{ color: 'var(--red)' }}>Culture</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 480,
          }}>
            Premium automotive streetwear for those who live the lifestyle. Crafted in limited runs — each piece tells a story of speed, style, and identity.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/products" className="btn-newtral btn-newtral-red" style={{ fontSize: 14 }}>
              Shop Collection
            </Link>
            <Link to="/about" className="btn-newtral" style={{
              background: 'transparent',
              borderColor: 'rgba(255,255,255,0.4)',
              color: '#fff',
              fontSize: 14,
            }}>
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        color: 'rgba(255,255,255,0.4)',
      }}>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <polyline points="19 12 12 19 5 12"/>
        </svg>
      </div>
    </section>
  );
}
