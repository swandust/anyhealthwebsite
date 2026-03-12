import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import logo from '/brand assets/3.png'

const STORAGE_KEY = 'anyhealth_blog_posts'

function getAdminPosts() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return stored.filter(p => p.published)
  } catch { return [] }
}


function BlogCard({ post, index }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Link
      to={`/blog/${post.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
          : `translateY(40px)`,
        transition: visible
          ? `opacity 0.6s ease ${index * 0.08}s, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)`
          : `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#111',
        border: '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${post.accentColor}33`
          : '0 8px 32px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Card image/gradient header */}
      <div style={{ height: '160px', background: post.gradient, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.5) 100%)' }} />
        <div style={{ position:'absolute',top:'1.25rem',left:'1.25rem' }}>
          <span style={{
            background: `${post.accentColor}22`,
            color: post.accentColor,
            fontFamily: "'Poppins',sans-serif",
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            border: `1px solid ${post.accentColor}44`,
          }}>
            {post.tag}
          </span>
        </div>
        {/* Decorative orb */}
        <div style={{ position:'absolute',bottom:'-30px',right:'-30px',width:'100px',height:'100px',borderRadius:'50%',background:`radial-gradient(circle,${post.accentColor}33 0%,transparent 70%)` }} />
      </div>

      {/* Card body */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display:'flex',gap:'0.75rem',alignItems:'center',marginBottom:'0.875rem' }}>
          <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.75rem',color:'rgba(255,255,255,0.35)' }}>{post.date}</span>
          <span style={{ width:'3px',height:'3px',borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'inline-block' }} />
          <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.75rem',color:'rgba(255,255,255,0.35)' }}>{post.readTime}</span>
        </div>
        <h3 style={{
          fontFamily: "'Poppins',sans-serif",
          fontWeight: 800,
          color: '#fff',
          fontSize: '1.05rem',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          marginBottom: '0.75rem',
          flex: 1,
          transition: 'color 0.2s',
          ...(hovered ? { color: post.accentColor } : {}),
        }}>
          {post.title}
        </h3>
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.65,
          marginBottom: '1.25rem',
        }}>
          {post.excerpt}
        </p>
        <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',color:post.accentColor,fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:'0.8rem' }}>
          Read article
          <svg width="14" height="14" fill="none" viewBox="0 0 16 16" style={{ transition:'transform 0.25s', transform: hovered ? 'translateX(4px)' : 'none' }}>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default function BlogPage() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef(null)
  const [allPosts, setAllPosts] = useState(getAdminPosts)

  useEffect(() => {
    window.scrollTo(0, 0)
    setAllPosts(getAdminPosts())
    requestAnimationFrame(() => setTimeout(() => setHeaderVisible(true), 100))
  }, [])

  return (
    <>
    <Helmet>
      <title>Blog — Healthcare Automation & Emergency Tech | AnyHealth</title>
      <meta name="description" content="Insights on clinic automation, WhatsApp-native healthcare, ambulance dispatch tech, and building a health-tech startup from NTU to Southeast Asia." />
      <link rel="canonical" href="https://anyhealth.asia/blog" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://anyhealth.asia/blog" />
      <meta property="og:title" content="Blog — Healthcare Automation & Emergency Tech | AnyHealth" />
      <meta property="og:description" content="Insights on clinic automation, WhatsApp-native healthcare, and building health-tech in Southeast Asia." />
      <meta property="og:image" content="https://anyhealth.asia/brand%20assets/Anyhealth%20logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Blog — Healthcare Automation & Emergency Tech | AnyHealth" />
      <meta name="twitter:description" content="Insights on clinic automation, WhatsApp-native healthcare, and building health-tech in Southeast Asia." />
    </Helmet>
    <div style={{ background:'#0a0a0a', minHeight:'100vh', fontFamily:"'Inter',sans-serif" }}>
      {/* Nav */}
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:50,background:'rgba(10,10,10,0.95)',backdropFilter:'blur(14px)',padding:'1rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Link to="/" style={{ display:'flex',alignItems:'center',gap:'10px',textDecoration:'none' }}>
          <img src={logo} alt="AnyHealth" style={{ height:'36px' }} />
          <span style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,color:'#fff',fontSize:'1rem' }}>AnyHealth</span>
        </Link>
        <div style={{ display:'flex',alignItems:'center',gap:'1.5rem' }}>
          <span style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.85rem',color:'#5BAE8C',fontWeight:600 }}>Blog</span>
          <Link to="/" style={{ display:'inline-flex',alignItems:'center',gap:'6px',color:'rgba(255,255,255,0.55)',fontFamily:"'Inter',sans-serif",fontSize:'0.85rem',textDecoration:'none',transition:'color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='#5BAE8C'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop:'120px',paddingBottom:'80px',position:'relative',overflow:'hidden' }}>
        {/* Background orbs */}
        <div style={{ position:'absolute',top:'10%',left:'5%',width:'40vw',height:'40vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(91,174,140,0.07) 0%,transparent 70%)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:'0',right:'5%',width:'30vw',height:'30vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(13,27,75,0.3) 0%,transparent 70%)',pointerEvents:'none' }} />

        <div ref={headerRef} style={{ maxWidth:'900px',margin:'0 auto',padding:'0 2rem',textAlign:'center' }}>
          <div style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
            <span style={{ background:'rgba(91,174,140,0.12)',color:'#5BAE8C',fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'0.35rem 0.9rem',borderRadius:'9999px',display:'inline-block',marginBottom:'2rem',border:'1px solid rgba(91,174,140,0.2)' }}>
              Insights & Updates
            </span>
          </div>
          <h1 style={{ fontFamily:"'Poppins',sans-serif",fontSize:'clamp(2.5rem,7vw,5.5rem)',fontWeight:900,color:'#fff',letterSpacing:'-0.035em',lineHeight:1,marginBottom:'1.5rem',opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(32px)', transition:'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s' }}>
            The AnyHealth<br /><span style={{ color:'#5BAE8C' }}>Blog</span>
          </h1>
          <p style={{ fontSize:'1.05rem',lineHeight:1.75,color:'rgba(255,255,255,0.45)',maxWidth:'480px',margin:'0 auto',opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(24px)', transition:'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s' }}>
            Healthcare automation, emergency tech, and building a startup from NTU to Southeast Asia.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 2rem' }}>
        <div style={{ height:'1px',background:'linear-gradient(to right,transparent,rgba(91,174,140,0.3),transparent)' }} />
      </div>

      {allPosts.length === 0 ? (
        /* Empty state */
        <section style={{ padding:'5rem 2rem 8rem', textAlign:'center' }}>
          <div style={{ maxWidth:'420px', margin:'0 auto' }}>
            <div style={{ fontSize:'3.5rem', marginBottom:'1.5rem' }}>✍️</div>
            <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, color:'rgba(255,255,255,0.5)', fontSize:'1.3rem', marginBottom:'0.75rem' }}>No posts yet</h2>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'0.88rem', lineHeight:1.7, marginBottom:'2rem' }}>
              Posts published from the admin panel will appear here.
            </p>
            <Link to="/admin" style={{ display:'inline-flex', alignItems:'center', gap:'6px', color:'#5BAE8C', fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:'0.85rem', textDecoration:'none' }}>
              Go to Admin →
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* Featured post */}
          <section style={{ padding:'5rem 2rem 3rem' }}>
            <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
              <div style={{ marginBottom:'1.5rem' }}>
                <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)' }}>Featured</span>
              </div>
              <FeaturedCard post={allPosts[0]} />
            </div>
          </section>

          {/* Grid of posts */}
          {allPosts.length > 1 && (
            <section style={{ padding:'2rem 2rem 6rem' }}>
              <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
                <div style={{ marginBottom:'2rem' }}>
                  <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)' }}>All Posts</span>
                </div>
                <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'1.5rem' }}>
                  {allPosts.slice(1).map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Newsletter CTA */}
      <section style={{ padding:'5rem 2rem',borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <NewsletterSection />
      </section>
    </div>
    </>
  )
}

function FeaturedCard({ post }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', display: 'block' }}>
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '28px',
        overflow: 'hidden',
        background: '#111',
        border: `1px solid ${hovered ? post.accentColor + '55' : 'rgba(255,255,255,0.07)'}`,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
        minHeight: '300px',
        cursor: 'pointer',
        boxShadow: hovered ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${post.accentColor}22` : '0 8px 40px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.4s ease, border-color 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        opacity: visible ? 1 : 0,
        ...(visible ? {} : { transform: 'translateY(30px)' }),
      }}
      className={visible ? '' : ''}
    >
      <div style={{ background: post.gradient, position: 'relative', minHeight: '200px', overflow: 'hidden' }}>
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,transparent 40%,rgba(0,0,0,0.3) 100%)' }} />
        <div style={{ position:'absolute',bottom:'-40px',right:'-40px',width:'200px',height:'200px',borderRadius:'50%',background:`radial-gradient(circle,${post.accentColor}33 0%,transparent 70%)` }} />
        <div style={{ position:'absolute',top:'1.5rem',left:'1.5rem' }}>
          <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'0.3rem 0.75rem',borderRadius:'9999px',background:`${post.accentColor}22`,color:post.accentColor,border:`1px solid ${post.accentColor}44` }}>
            Featured · {post.tag}
          </span>
        </div>
      </div>
      <div style={{ padding:'2rem 2.5rem',display:'flex',flexDirection:'column',justifyContent:'center' }}>
        <div style={{ display:'flex',gap:'0.75rem',alignItems:'center',marginBottom:'1rem' }}>
          <span style={{ fontSize:'0.78rem',color:'rgba(255,255,255,0.35)',fontFamily:"'Inter',sans-serif" }}>{post.date}</span>
          <span style={{ width:'3px',height:'3px',borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'inline-block' }} />
          <span style={{ fontSize:'0.78rem',color:'rgba(255,255,255,0.35)',fontFamily:"'Inter',sans-serif" }}>{post.readTime}</span>
        </div>
        <h2 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:'clamp(1.3rem,3vw,1.8rem)',color: hovered ? post.accentColor : '#fff',lineHeight:1.2,letterSpacing:'-0.02em',marginBottom:'1rem',transition:'color 0.2s' }}>
          {post.title}
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'0.88rem',color:'rgba(255,255,255,0.45)',lineHeight:1.7,marginBottom:'1.5rem' }}>
          {post.excerpt}
        </p>
        <div style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',color:post.accentColor,fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:'0.85rem' }}>
          Read article
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" style={{ transition:'transform 0.25s',transform: hovered ? 'translateX(5px)' : 'none' }}>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
    </Link>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ maxWidth:'600px',margin:'0 auto',textAlign:'center',opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(28px)',transition:'opacity 0.7s ease, transform 0.7s ease' }}>
      <div style={{ width:'56px',height:'56px',borderRadius:'16px',background:'rgba(91,174,140,0.12)',border:'1px solid rgba(91,174,140,0.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1.5rem' }}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#5BAE8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:800,color:'#fff',fontSize:'1.6rem',letterSpacing:'-0.02em',marginBottom:'0.75rem' }}>
        Stay in the loop
      </h3>
      <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'0.9rem',lineHeight:1.7,marginBottom:'2rem' }}>
        Get updates on healthcare automation, new features, and expansion news from AnyHealth.
      </p>
      {submitted ? (
        <div style={{ padding:'1rem 2rem',borderRadius:'14px',background:'rgba(91,174,140,0.12)',border:'1px solid rgba(91,174,140,0.3)',color:'#5BAE8C',fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:'0.9rem' }}>
          You're subscribed. Welcome aboard!
        </div>
      ) : (
        <form onSubmit={e=>{e.preventDefault();if(email)setSubmitted(true)}} style={{ display:'flex',gap:'0.75rem',maxWidth:'440px',margin:'0 auto',flexWrap:'wrap',justifyContent:'center' }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
            style={{ flex:'1',minWidth:'200px',padding:'0.8rem 1.2rem',borderRadius:'9999px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',fontFamily:"'Inter',sans-serif",fontSize:'0.9rem',outline:'none' }}
          />
          <button type="submit" className="btn-primary" style={{ whiteSpace:'nowrap',padding:'0.8rem 1.6rem',fontSize:'0.85rem' }}>
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}
