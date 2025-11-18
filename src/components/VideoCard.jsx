import { Eye, ThumbsUp } from 'lucide-react'

export default function VideoCard({ video }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-800 border border-slate-800">
        <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="mt-3 flex gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-xs">
          {video.channel_name?.[0] || 'C'}
        </div>
        <div className="min-w-0">
          <h3 className="text-slate-100 font-medium truncate">{video.title}</h3>
          <p className="text-slate-400 text-sm truncate">{video.channel_name}</p>
          <div className="text-slate-500 text-xs flex items-center gap-3 mt-1">
            <span className="inline-flex items-center gap-1"><Eye className="w-4 h-4" />{video.view_count || 0}</span>
            <span className="inline-flex items-center gap-1"><ThumbsUp className="w-4 h-4" />{video.like_count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
