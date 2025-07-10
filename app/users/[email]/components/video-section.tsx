import { motion } from 'motion/react'
import { PlayIcon } from 'lucide-react'
import { ScoreSelector } from '@/components/ui/score-selector'

export function VideoSection({
  loomUrl,
  score,
  feedback,
  onScoreChange,
  onFeedbackChange,
}: {
  loomUrl: string
  score: number
  feedback: string
  onScoreChange: (score: number) => void
  onFeedbackChange: (feedback: string) => void
}) {
  function getLoomEmbedUrl(url: string) {
    if (!url) return null
    const loomShareRegex = /https:\/\/www\.loom\.com\/share\/([a-zA-Z0-9]+)/
    const match = url.match(loomShareRegex)
    if (match) {
      return `https://www.loom.com/embed/${match[1]}`
    }
    return null
  }

  const loomEmbedUrl = getLoomEmbedUrl(loomUrl)

  return (
    <div>
      <h3 className="text-lg text-gray-500 font-medium tracking-wider uppercase mb-8 text-center">
        Video Presentation
      </h3>

      {loomEmbedUrl ? (
        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
          <iframe
            src={loomEmbedUrl}
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className="aspect-video rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center mb-8">
          <div className="text-center">
            <PlayIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Video Link</p>
            <p className="text-sm text-gray-400 mt-1">MP4, MOV, AVI</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Score</h4>
          <ScoreSelector
            scores={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            selectedScore={score}
            onScoreChange={onScoreChange}
            layoutId="activeVideoScoreTab"
          />
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Feedback</h4>
          <textarea
            value={feedback}
            onChange={(e) => onFeedbackChange(e.target.value)}
            placeholder="Add feedback for the presentation..."
            className="w-full max-w-md px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 transition-all duration-200"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
