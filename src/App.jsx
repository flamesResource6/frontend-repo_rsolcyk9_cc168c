import { useMemo } from 'react'
import Navbar from './components/Navbar'
import VideoGrid from './components/VideoGrid'
import UploadForm from './components/UploadForm'

function App() {
  const params = useMemo(() => new URLSearchParams(window.location.search), [])
  const q = params.get('q') || ''
  const isUpload = window.location.pathname === '/upload'

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isUpload ? (
          <div>
            <h1 className="text-2xl font-semibold text-slate-100 mb-6">Upload a video</h1>
            <UploadForm />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-slate-100 mb-6">
              {q ? `Search results for "${q}"` : 'Recommended'}
            </h1>
            <VideoGrid query={q} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
