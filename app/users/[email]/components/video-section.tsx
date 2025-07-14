import { PlayIcon } from 'lucide-react'
import { ScoreSelector } from '@/components/ui/score-selector'
import { Textarea } from '@/components/ui/textarea'
import { TextAreaAI } from '@/components/ui/textarea-ai'

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
            scores={[0, 1, 2, 3, 4, 5]}
            selectedScore={score}
            onScoreChange={onScoreChange}
            layoutId="activeVideoScoreTab"
          />
        </div>

        <div className="text-center mx-auto">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Feedback</h4>
          <div className="w-full max-w-md mx-auto">
            <TextAreaAI
              prompt={`
Please refine this feedback to make it more specific and actionable while preserving its tone and message. Guidelines:
- Keep all existing positive observations intact
- Add specific examples or details to support the praise given
- Make suggestions only if the original feedback already contains areas for improvement
- Do NOT add criticism or "areas to improve" if none exist in the original
- Maintain first-person perspective ("I" statements)
- Keep it concise (under 50 words)
- If the feedback is entirely positive, enhance it by making the praise more specific and meaningful
The goal is to make good feedback better, not to find problems where none exist.`.trim()}
              value={feedback}
              onChange={(e) => onFeedbackChange(e.target.value)}
              placeholder="Add feedback for the presentation..."
              className="w-full max-w-md resize-none max-h-40 h-24"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
