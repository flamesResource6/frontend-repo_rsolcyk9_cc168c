import { useEffect, useState } from 'react'
import VideoCard from './VideoCard'

export default function VideoGrid({ query }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/videos`)
      const data = await res.json()
      let items = data.items || []
      if (query) {
        const q = query.toLowerCase()
        items = items.filter(v => v.title.toLowerCase().includes(q) || (v.tags||[]).some(t=>t.toLowerCase().includes(q)))
      }
      setVideos(items)
      setLoading(false)
    }
    fetchVideos()
  }, [query])

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video rounded-xl bg-slate-800" />
            <div className="h-4 mt-3 bg-slate-800 rounded w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map(v => (
        <VideoCard key={v.id} video={v} />
      ))}
      {videos.length === 0 && (
        <div className="col-span-full text-slate-400">No videos found.</div>
      )}
    </div>
  )
}
