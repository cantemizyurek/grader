import { motion } from 'motion/react'
import { BookOpenIcon, ExternalLinkIcon } from 'lucide-react'
import { ScoreSelector } from '@/components/ui/score-selector'
import { Textarea } from '@/components/ui/textarea'

export function NotebookSection({
  notebookUrl,
  activitiesScore,
  activitiesFeedback,
  questionsScore,
  questionsFeedback,
  onActivitiesScoreChange,
  onActivitiesFeedbackChange,
  onQuestionsScoreChange,
  onQuestionsFeedbackChange,
}: {
  notebookUrl: string
  activitiesScore: number
  activitiesFeedback: string
  questionsScore: number
  questionsFeedback: string
  onActivitiesScoreChange: (score: number) => void
  onActivitiesFeedbackChange: (feedback: string) => void
  onQuestionsScoreChange: (score: number) => void
  onQuestionsFeedbackChange: (feedback: string) => void
}) {
  return (
    <div>
      <h3 className="text-lg text-gray-500 font-medium tracking-wider uppercase mb-8 text-center">
        Notebook
      </h3>

      {notebookUrl ? (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <BookOpenIcon className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Jupyter Notebook
          </h4>

          <motion.a
            href={notebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium transition-colors"
          >
            <span>View Notebook</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </motion.a>

          <p className="text-sm text-gray-500 mt-4 break-all">{notebookUrl}</p>
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <BookOpenIcon className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <p className="text-gray-500 font-medium">No notebook submitted</p>
          <p className="text-sm text-gray-400 mt-1">
            Notebook URL not provided
          </p>
        </div>
      )}

      <div className="mt-12 space-y-12">
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Activities Score
            </h4>
            <ScoreSelector
              scores={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              selectedScore={activitiesScore}
              onScoreChange={onActivitiesScoreChange}
              layoutId="activeActivitiesScoreTab"
            />
          </div>

          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Activities Feedback
            </h4>
            <Textarea
              value={activitiesFeedback}
              onChange={(e) => onActivitiesFeedbackChange(e.target.value)}
              placeholder="Add feedback for activities..."
              className="w-full max-w-md mx-auto resize-none max-h-40 h-24"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Questions Score
            </h4>
            <ScoreSelector
              scores={[0, 1, 2, 3, 4, 5]}
              selectedScore={questionsScore}
              onScoreChange={onQuestionsScoreChange}
              layoutId="activeQuestionsScoreTab"
            />
          </div>

          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Questions Feedback
            </h4>
            <Textarea
              value={questionsFeedback}
              onChange={(e) => onQuestionsFeedbackChange(e.target.value)}
              placeholder="Add feedback for the student..."
              className="w-full max-w-md mx-auto resize-none max-h-40 h-24"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
