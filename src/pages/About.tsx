import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative',
        height: '60vh',
        minHeight: 400,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'var(--red)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>
            The Brand
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            About<br />Newtral
          </h1>
        </div>
      </section>

      {/* Story */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 16 }}>
              Our Story
            </p>
            <h2 className="section-title" style={{ marginBottom: 24, fontSize: '2rem' }}>
              Born at the<br />Intersection
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#555', lineHeight: 1.9, marginBottom: 16 }}>
              Newtral was born from a simple obsession — the perfect merge of automotive culture and street fashion. Founded by a group of enthusiasts who couldn't find clothing that truly represented their passion, we decided to create it ourselves.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#555', lineHeight: 1.9 }}>
              Every piece we make is a tribute to the machines that inspire us — the raw power of a Hellcat, the precision of a Porsche, the legacy of a Ferrari. We take that energy and translate it into clothing that moves with you.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=700&q=80"
              alt="About Newtral"
              style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#000', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>
              What Drives Us
            </p>
            <h2 className="section-title" style={{ color: '#fff' }}>Our Values</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 40,
          }}>
            {[
              {
                num: '01',
                title: 'Quality',
                desc: 'Every garment is crafted from premium materials with obsessive attention to detail. No shortcuts.',
              },
              {
                num: '02',
                title: 'Authenticity',
                desc: 'We create for the culture, not the algorithm. Real pieces for real enthusiasts.',
              },
              {
                num: '03',
                title: 'Exclusivity',
                desc: 'Limited runs mean limited ownership. When it\'s gone, it\'s gone — just like a rare car.',
              },
              {
                num: '04',
                title: 'Community',
                desc: 'We\'re building more than a brand. We\'re building a movement for people who live the lifestyle.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} style={{ borderTop: '1px solid #333', paddingTop: 28 }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--red)', marginBottom: 12, opacity: 0.6 }}>{num}</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#888', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', textTransform: 'uppercase', marginBottom: 16 }}>
          Ready to Join the Movement?
        </h2>
        <p style={{ color: '#666', fontFamily: 'var(--font-body)', fontSize: 15, maxWidth: 450, margin: '0 auto 36px' }}>
          Shop the latest collection and wear what you drive.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn-newtral btn-newtral-red">Shop Now</Link>
          <Link to="/contact" className="btn-newtral btn-newtral-outline">Get in Touch</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
