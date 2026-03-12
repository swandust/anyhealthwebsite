import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import logo from '/brand assets/3.png'
import { loadPosts } from '../lib/posts'

export default function BlogPostPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadPosts().then(posts => {
      const p = posts.find(p => String(p.id) === String(id) && p.published) || null
      setPost(p)
      setLoaded(true)
    })
  }, [id])

  if (!loaded) return null

  if (!post) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <h2 style={{ fontFamily: "'Poppins',sans-serif", color: '#fff', fontWeight: 800, fontSize: '1.5rem', marginBottom: '1rem' }}>Post not found</h2>
        <Link to="/blog" style={{ color: '#5BAE8C', fontFamily: "'Inter',sans-serif", fontSize: '0.9rem', textDecoration: 'none' }}>← Back to Blog</Link>
      </div>
    )
  }

  const postUrl = `https://anyhealth.asia/blog/${post.id}`
  const blogSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "AnyHealth",
      "url": "https://anyhealth.asia"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AnyHealth",
      "logo": {
        "@type": "ImageObject",
        "url": "https://anyhealth.asia/brand%20assets/Anyhealth%20logo.png"
      }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl }
  })

  return (
    <>
    <Helmet>
      <title>{post.title} | AnyHealth Blog</title>
      <meta name="description" content={post.excerpt} />
      <link rel="canonical" href={postUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      <meta property="og:title" content={`${post.title} | AnyHealth Blog`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content="https://anyhealth.asia/brand%20assets/Anyhealth%20logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${post.title} | AnyHealth Blog`} />
      <meta name="twitter:description" content={post.excerpt} />
      <script type="application/ld+json">{blogSchema}</script>
    </Helmet>
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(14px)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src={logo} alt="AnyHealth" style={{ height: '36px' }} />
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#fff', fontSize: '1rem' }}>AnyHealth</span>
        </Link>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter',sans-serif", fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#5BAE8C'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Blog
        </Link>
      </nav>

      {/* Hero banner */}
      <div style={{ height: '320px', background: post.gradient, position: 'relative', overflow: 'hidden', marginTop: 0, paddingTop: '68px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.85) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle,${post.accentColor}44 0%,transparent 70%)` }} />
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '780px', padding: '0 2rem' }}>
          <span style={{ background: `${post.accentColor}22`, color: post.accentColor, fontFamily: "'Poppins',sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '9999px', border: `1px solid ${post.accentColor}44` }}>
            {post.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        {/* Meta */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>{post.date}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 900, color: '#fff', fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1.5rem' }}>
          {post.title}
        </h1>

        {/* Excerpt */}
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '2rem' }}>
          {post.excerpt}
        </p>

        {/* Body content */}
        {post.content ? (
          <div
            style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, fontSize: '1rem' }}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />
        ) : (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>No additional content.</p>
        )}

        {/* Back link */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: post.accentColor, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
