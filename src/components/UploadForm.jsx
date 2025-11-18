import { useState } from 'react'

export default function UploadForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnail_url: '',
    video_url: '',
    channel_name: '',
    tags: ''
  })
  const [status, setStatus] = useState(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('Uploading...')
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    }
    const res = await fetch(`${base}/api/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      setStatus('Uploaded!')
      setForm({ title:'', description:'', thumbnail_url:'', video_url:'', channel_name:'', tags:'' })
    } else {
      const t = await res.text()
      setStatus('Failed: ' + t)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input className="w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-400" placeholder="Title" name="title" value={form.title} onChange={onChange} required />
      <textarea className="w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-400" placeholder="Description" name="description" value={form.description} onChange={onChange} />
      <input className="w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-400" placeholder="Thumbnail URL" name="thumbnail_url" value={form.thumbnail_url} onChange={onChange} required />
      <input className="w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-400" placeholder="Video URL (mp4 or embed)" name="video_url" value={form.video_url} onChange={onChange} required />
      <input className="w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-400" placeholder="Channel name" name="channel_name" value={form.channel_name} onChange={onChange} />
      <input className="w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-400" placeholder="Tags (comma separated)" name="tags" value={form.tags} onChange={onChange} />
      <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded">Save</button>
      {status && <p className="text-slate-400 text-sm">{status}</p>}
    </form>
  )
}
