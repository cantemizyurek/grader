import { motion } from 'motion/react'
import { BookOpenIcon, ExternalLinkIcon } from 'lucide-react'
import { ScoreSelector } from '@/components/ui/score-selector'
import { TextAreaAI } from '@/components/ui/textarea-ai'

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

          <div className="text-center mx-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Activities Feedback
            </h4>
            <div className="w-full max-w-md mx-auto">
              <TextAreaAI
                prompt={`
                Please enhance this feedback for notebook activities to be more constructive and specific. Guidelines:
                - Focus on the student's completion and understanding of activities
                - Provide specific examples of what they did well or areas for improvement
                - Keep feedback encouraging and actionable
                - Maintain first-person perspective ("I" statements)
                - Keep it concise (under 60 words)
                - If positive, make the praise more specific and meaningful
                The goal is to help the student understand their performance on the activities.`.trim()}
                value={activitiesFeedback}
                onChange={(e) => onActivitiesFeedbackChange(e.target.value)}
                placeholder="Add feedback for activities..."
                className="w-full max-w-md mx-auto resize-none max-h-40 h-24"
                rows={3}
              />
            </div>
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

          <div className="text-center mx-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Questions Feedback
            </h4>
            <div className="w-full max-w-md mx-auto">
              <TextAreaAI
                prompt={`
                  Please enhance this feedback for student questions to be more helpful and encouraging. Guidelines:
                  - Address the quality and thoughtfulness of their questions
                  - Provide guidance on how their questions demonstrate understanding or curiosity
                  - If no questions were asked, encourage future questioning
                  - Keep feedback supportive and constructive
                  - Maintain first-person perspective ("I" statements)
                  - Keep it concise (under 50 words)
                  - Focus on the learning value of asking good questions
                  The goal is to encourage thoughtful questioning and engagement.`.trim()}
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
    </div>
  )
}
