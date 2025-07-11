'use client'

import { User } from '@/lib/types'
import { SubmissionStatusSection } from './components/submission-status-section'
import { VideoSection } from './components/video-section'
import { NotebookSection } from './components/notebook-section'
import { QuestionsSection } from './components/questions-section'
import { LearnedSection } from './components/learned-section'
import { NotLearnedSection } from './components/not-learned-section'
import { SharedContentSection } from './components/shared-content-section'
import { SharingSection } from './components/sharing-section'
import { OverallFeedbackSection } from './components/overall-feedback-section'
import { Button } from '@/components/ui/button'
import {
  ArrowLeftIcon,
  Loader2,
  SaveIcon,
  FileSpreadsheetIcon,
} from 'lucide-react'
import { saveUser, saveToGoogleSheets } from './action'
import Link from 'next/link'
import { useTransition } from 'react'
import { useGradingForm } from '@/lib/hooks/use-grading-form'

export default function PageClient({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition()
  const [isSavingToSheets, startSavingToSheetsTransition] = useTransition()
  const { formState, updateField, updateSharing, getUpdatedUser } =
    useGradingForm(user)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16 relative">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{user.name}</h1>
        <p className="text-gray-500 text-lg">{user.email}</p>
      </div>

      <VideoSection
        loomUrl={user.loom}
        score={formState.presentationScore}
        feedback={formState.presentationFeedback}
        onScoreChange={(value) => updateField('presentationScore', value)}
        onFeedbackChange={(value) => updateField('presentationFeedback', value)}
      />

      <NotebookSection
        notebookUrl={user.notebook}
        activitiesScore={formState.activitiesScore}
        activitiesFeedback={formState.activitiesFeedback}
        questionsScore={formState.questionsScore}
        questionsFeedback={formState.questionsFeedback}
        onActivitiesScoreChange={(value) =>
          updateField('activitiesScore', value)
        }
        onActivitiesFeedbackChange={(value) =>
          updateField('activitiesFeedback', value)
        }
        onQuestionsScoreChange={(value) => updateField('questionsScore', value)}
        onQuestionsFeedbackChange={(value) =>
          updateField('questionsFeedback', value)
        }
      />

      <QuestionsSection questions={user.questions} />

      <LearnedSection learned={user.learned} />

      <NotLearnedSection notLearned={user.notLearned} />

      <SharedContentSection sharedContent={user.share} />

      <SubmissionStatusSection
        daysLate={formState.daysLate}
        onDaysLateChange={(value) => updateField('daysLate', value)}
        itemVariants={{}}
      />

      <SharingSection
        sharing={formState.sharing}
        onSharingChange={updateSharing}
        itemVariants={{}}
      />

      <OverallFeedbackSection
        feedback={formState.overallFeedback}
        onFeedbackChange={(value) => updateField('overallFeedback', value)}
      />

      <div className="flex justify-end">
        <div className="fixed bottom-8 z-50 flex justify-end translate-x-1/2">
          <div className="backdrop-blur-sm flex gap-2 bg-background/10 rounded-full p-2 shadow-lg border border-border/50">
            <Button
              variant="ghost"
              className="rounded-full px-4"
              size="sm"
              asChild
            >
              <Link href="/">
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back
              </Link>
            </Button>
            <Button
              className="rounded-full px-4"
              size="sm"
              onClick={() =>
                startTransition(async () => {
                  await saveUser(getUpdatedUser())
                })
              }
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <SaveIcon className="w-4 h-4 mr-1" />
              )}
              Save
            </Button>
            <Button
              className="rounded-full px-4"
              size="sm"
              variant="outline"
              onClick={async () => {
                startSavingToSheetsTransition(async () => {
                  try {
                    const updatedUser = getUpdatedUser()
                    await saveUser(updatedUser)
                    const result = await saveToGoogleSheets(updatedUser)
                    if (result.authUrl) {
                      window.open(result.authUrl, '_blank')
                    }
                  } catch (error) {
                    console.error('Failed to save to Google Sheets:', error)
                  }
                })
              }}
            >
              {isSavingToSheets ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <FileSpreadsheetIcon className="w-4 h-4 mr-1" />
              )}
              Save to Sheets
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
