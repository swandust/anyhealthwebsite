import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '/brand assets/3.png'

const ADMIN_PASSWORD = 'anyhealth2026'
const STORAGE_KEY = 'anyhealth_blog_posts'

const GRADIENTS = [
  { label: 'Teal Forest', value: 'linear-gradient(135deg,#0D1B4B,#2D5A3D)' },
  { label: 'Deep Navy', value: 'linear-gradient(135deg,#1a2a4a,#0D3B2E)' },
  { label: 'Red Dark', value: 'linear-gradient(135deg,#2d0a0a,#5a1010)' },
  { label: 'Deep Purple', value: 'linear-gradient(135deg,#1a0d2e,#2d1060)' },
  { label: 'Gold Dark', value: 'linear-gradient(135deg,#1a1200,#3d2b00)' },
  { label: 'Ocean', value: 'linear-gradient(135deg,#001a2e,#003d5e)' },
]

const ACCENT_COLORS = [
  { label: 'Teal', value: '#5BAE8C' },
  { label: 'Green', value: '#4A9960' },
  { label: 'Red', value: '#FF6B6B' },
  { label: 'Purple', value: '#A78BFA' },
  { label: 'Gold', value: '#FCD34D' },
  { label: 'Cyan', value: '#22D3EE' },
]

function getStoredPosts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function estimateReadTime(content) {
  const words = content.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

// ── Login screen ───────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('ah_admin', '1')
      onLogin()
    } else {
      setError(true)
      setPw('')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '380px', padding: '2.5rem', borderRadius: '24px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src={logo} alt="AnyHealth" style={{ height: '48px', marginBottom: '1rem' }} />
          <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 900, color: '#fff', fontSize: '1.4rem', marginBottom: '0.4rem' }}>Blog Admin</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Enter your password to continue</p>
        </div>
        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            autoFocus
            style={{ width: '100%', padding: '0.85rem 1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${error ? '#FF6B6B' : 'rgba(255,255,255,0.1)'}`, color: '#fff', fontFamily: "'Inter',sans-serif", fontSize: '0.95rem', outline: 'none', marginBottom: '0.5rem', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#FF6B6B', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Incorrect password.</p>}
          <button type="submit" style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: '#5BAE8C', color: '#fff', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textDecoration: 'none' }}>← Back to site</Link>
        </div>
      </div>
    </div>
  )
}

// ── Post editor ────────────────────────────────────────────
function PostEditor({ post, onSave, onCancel }) {
  const [form, setForm] = useState(post || {
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tag: '',
    tagColor: '#5BAE8C',
    gradient: GRADIENTS[0].value,
    accentColor: '#5BAE8C',
    published: false,
  })
  const [tab, setTab] = useState('write') // 'write' | 'preview'

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    if (!form.title.trim()) return alert('Title is required.')
    const now = new Date().toISOString()
    const saved = {
      ...form,
      id: form.id || generateId(),
      date: form.date || formatDate(now),
      readTime: estimateReadTime(form.content || form.excerpt || ''),
      updatedAt: now,
      createdAt: form.createdAt || now,
    }
    onSave(saved)
  }

  const isNew = !post?.id

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter',sans-serif" }}>
      {/* Editor header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(10,10,10,0.97)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0.875rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back
          </button>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
            {isNew ? 'New Post' : 'Edit Post'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <div
              onClick={() => set('published', !form.published)}
              style={{ width: '40px', height: '22px', borderRadius: '9999px', background: form.published ? '#5BAE8C' : 'rgba(255,255,255,0.15)', position: 'relative', transition: 'background 0.2s', cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', top: '3px', left: form.published ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
            </div>
            <span style={{ color: form.published ? '#5BAE8C' : 'rgba(255,255,255,0.4)', fontSize: '0.82rem', fontWeight: 600 }}>
              {form.published ? 'Published' : 'Draft'}
            </span>
          </label>
          <button onClick={handleSave} style={{ background: '#5BAE8C', color: '#fff', border: 'none', borderRadius: '9999px', padding: '0.55rem 1.4rem', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(91,174,140,0.35)' }}>
            Save
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem' }}>
        {/* Main editor */}
        <div>
          {/* Title */}
          <input
            type="text"
            placeholder="Post title..."
            value={form.title}
            onChange={e => set('title', e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: "'Poppins',sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem', boxSizing: 'border-box' }}
          />
          {/* Excerpt */}
          <textarea
            placeholder="Short excerpt (shown on blog cards)..."
            value={form.excerpt}
            onChange={e => set('excerpt', e.target.value)}
            rows={2}
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', outline: 'none', fontFamily: "'Inter',sans-serif", fontSize: '0.92rem', color: 'rgba(255,255,255,0.65)', padding: '0.85rem 1rem', resize: 'vertical', marginBottom: '1.5rem', boxSizing: 'border-box', lineHeight: 1.6 }}
          />
          {/* Write / Preview tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {['write', 'preview'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '0.4rem 1.1rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: '0.78rem', textTransform: 'capitalize', background: tab === t ? '#5BAE8C' : 'rgba(255,255,255,0.08)', color: tab === t ? '#fff' : 'rgba(255,255,255,0.45)' }}>
                {t}
              </button>
            ))}
          </div>
          {tab === 'write' ? (
            <textarea
              placeholder="Write your post content here... (supports plain text or markdown)"
              value={form.content}
              onChange={e => set('content', e.target.value)}
              rows={20}
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', outline: 'none', fontFamily: "'Inter',sans-serif", fontSize: '0.92rem', color: 'rgba(255,255,255,0.75)', padding: '1.25rem', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.8 }}
            />
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.5rem', minHeight: '400px' }}>
              {form.content ? (
                <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{form.content}</div>
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <SidebarSection title="Card Appearance">
            <label style={labelStyle}>Tag Label</label>
            <input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="e.g. Product" style={inputStyle} />
            <label style={{ ...labelStyle, marginTop: '0.75rem' }}>Category</label>
            <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Healthcare Ops" style={inputStyle} />
            <label style={{ ...labelStyle, marginTop: '0.75rem' }}>Card Gradient</label>
            <select value={form.gradient} onChange={e => set('gradient', e.target.value)} style={selectStyle}>
              {GRADIENTS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
            <div style={{ height: '48px', borderRadius: '10px', background: form.gradient, marginTop: '0.5rem' }} />
            <label style={{ ...labelStyle, marginTop: '0.75rem' }}>Accent Color</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              {ACCENT_COLORS.map(c => (
                <button key={c.value} onClick={() => { set('accentColor', c.value); set('tagColor', c.value) }}
                  title={c.label}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: c.value, border: form.accentColor === c.value ? '2px solid #fff' : '2px solid transparent', cursor: 'pointer', transition: 'border 0.15s' }} />
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Metadata">
            <label style={labelStyle}>Date Override</label>
            <input value={form.date || ''} onChange={e => set('date', e.target.value)} placeholder="e.g. Mar 2026" style={inputStyle} />
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', marginTop: '0.3rem' }}>Leave blank to auto-set from save date.</p>
          </SidebarSection>

          {/* Card preview */}
          <SidebarSection title="Card Preview">
            <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ height: '80px', background: form.gradient, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <span style={{ background: `${form.accentColor}22`, color: form.accentColor, fontSize: '0.6rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', border: `1px solid ${form.accentColor}44`, fontFamily: "'Poppins',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {form.tag || 'Tag'}
                  </span>
                </div>
              </div>
              <div style={{ padding: '0.875rem' }}>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, color: '#fff', fontSize: '0.82rem', lineHeight: 1.3, marginBottom: '0.4rem' }}>
                  {form.title || 'Post title will appear here'}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', lineHeight: 1.5 }}>
                  {form.excerpt ? form.excerpt.slice(0, 80) + (form.excerpt.length > 80 ? '…' : '') : 'Excerpt preview...'}
                </div>
              </div>
            </div>
          </SidebarSection>
        </div>
      </div>
    </div>
  )
}

function SidebarSection({ title, children }) {
  return (
    <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.25rem' }}>
      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>{title}</div>
      {children}
    </div>
  )
}

const labelStyle = { display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginBottom: '0.3rem' }
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.55rem 0.75rem', color: '#fff', fontFamily: "'Inter',sans-serif", fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }
const selectStyle = { ...inputStyle, cursor: 'pointer' }

// ── Posts list ─────────────────────────────────────────────
function PostsList({ posts, onNew, onEdit, onDelete, onTogglePublish, onLogout }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Inter',sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.98)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logo} alt="" style={{ height: '32px' }} />
          <div>
            <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Blog Admin</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>{posts.length} post{posts.length !== 1 ? 's' : ''} total</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link to="/blog" target="_blank" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>View Blog →</Link>
          <button onClick={onNew} style={{ background: '#5BAE8C', color: '#fff', border: 'none', borderRadius: '9999px', padding: '0.6rem 1.4rem', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(91,174,140,0.35)' }}>
            + New Post
          </button>
          <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '9999px', padding: '0.6rem 1rem', fontSize: '0.78rem', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.4)' }}>No posts yet</div>
            <div style={{ fontSize: '0.85rem' }}>Click "New Post" to write your first blog post.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            {[...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, i) => (
              <PostRow key={post.id} post={post} onEdit={() => onEdit(post)} onDelete={() => onDelete(post.id)} onTogglePublish={() => onTogglePublish(post.id)} isLast={i === posts.length - 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PostRow({ post, onEdit, onDelete, onTogglePublish, isLast }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div style={{ background: '#111', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: post.gradient, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.2rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{post.date}</span>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{post.readTime}</span>
          {post.tag && <span style={{ fontSize: '0.65rem', color: post.accentColor, background: `${post.accentColor}18`, padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>{post.tag}</span>}
        </div>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={onTogglePublish}
          title={post.published ? 'Click to unpublish' : 'Click to publish'}
          style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', transition: 'background 0.2s, color 0.2s', background: post.published ? 'rgba(91,174,140,0.2)' : 'rgba(255,255,255,0.07)', color: post.published ? '#5BAE8C' : 'rgba(255,255,255,0.35)' }}
        >
          {post.published ? '● Published' : '○ Draft'}
        </button>
        <button onClick={onEdit} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '8px', padding: '0.4rem 0.8rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', cursor: 'pointer' }}>Edit</button>
        {confirmDelete ? (
          <>
            <button onClick={onDelete} style={{ background: 'rgba(229,62,62,0.2)', border: '1px solid rgba(229,62,62,0.4)', borderRadius: '8px', padding: '0.4rem 0.8rem', color: '#FF6B6B', fontSize: '0.78rem', cursor: 'pointer' }}>Confirm</button>
            <button onClick={() => setConfirmDelete(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', cursor: 'pointer' }}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setConfirmDelete(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem', cursor: 'pointer' }}>Delete</button>
        )}
      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('ah_admin') === '1')
  const [posts, setPosts] = useState(getStoredPosts)
  const [editing, setEditing] = useState(null) // null = list, 'new' = new post, post object = edit

  useEffect(() => { savePosts(posts) }, [posts])

  const logout = () => { sessionStorage.removeItem('ah_admin'); setAuthed(false) }

  const savePost = (post) => {
    setPosts(prev => {
      const exists = prev.find(p => p.id === post.id)
      return exists ? prev.map(p => p.id === post.id ? post : p) : [post, ...prev]
    })
    setEditing(null)
  }

  const deletePost = (id) => setPosts(prev => prev.filter(p => p.id !== id))
  const togglePublish = (id) => setPosts(prev => prev.map(p => p.id === id ? { ...p, published: !p.published } : p))

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  if (editing === 'new') return <PostEditor post={null} onSave={savePost} onCancel={() => setEditing(null)} />
  if (editing) return <PostEditor post={editing} onSave={savePost} onCancel={() => setEditing(null)} />

  return <PostsList posts={posts} onNew={() => setEditing('new')} onEdit={setEditing} onDelete={deletePost} onTogglePublish={togglePublish} onLogout={logout} />
}
