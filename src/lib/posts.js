import {
  collection, getDocs, setDoc, deleteDoc, doc,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'

const STORAGE_KEY = 'anyhealth_blog_posts'

// ── localStorage helpers (fallback) ────────────────────────
function getLocal() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}
function setLocal(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

// ── Public API ──────────────────────────────────────────────
export async function loadPosts() {
  if (!isFirebaseConfigured) return getLocal()
  const snap = await getDocs(collection(db, 'posts'))
  return snap.docs.map(d => d.data())
}

export async function savePost(post) {
  if (!isFirebaseConfigured) {
    const posts = getLocal()
    const idx = posts.findIndex(p => p.id === post.id)
    if (idx >= 0) posts[idx] = post
    else posts.unshift(post)
    setLocal(posts)
    return
  }
  await setDoc(doc(db, 'posts', post.id), post)
}

export async function removePost(id) {
  if (!isFirebaseConfigured) {
    setLocal(getLocal().filter(p => p.id !== id))
    return
  }
  await deleteDoc(doc(db, 'posts', id))
}
