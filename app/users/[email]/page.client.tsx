'use client'

import { User } from '@/lib/types'
import { SubmissionStatusSection } from './components/submission-status-section'
import { VideoSection } from './components/video-section'
import { NotebookSection } from './components/notebook-section'
import { QuestionsSection } from './components/questions-section'
import { LearnedSection } from './components/learned-section'
import { NotLearnedSection } from './components/not-learned-section'
import { SharedContentSection } from './components/shared-content-section'
import { useState } from 'react'
import { SharingSection } from './components/sharing-section'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, Loader2, SaveIcon } from 'lucide-react'
import { saveUser } from './action'
import Link from 'next/link'
import { useTransition } from 'react'

export default function PageClient({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition()
  const [presentationScore, setPresentationScore] = useState(
    user.score.presentation.score ?? 0
  )
  const [presentationFeedback, setPresentationFeedback] = useState(
    user.score.presentation.feedback ?? ''
  )
  const [activitiesScore, setActivitiesScore] = useState(
    user.score.activities.score ?? 0
  )
  const [activitiesFeedback, setActivitiesFeedback] = useState(
    user.score.activities.feedback ?? ''
  )
  const [questionsScore, setQuestionsScore] = useState(
    user.score.questions.score ?? 0
  )
  const [questionsFeedback, setQuestionsFeedback] = useState(
    user.score.questions.feedback ?? ''
  )
  const [daysLate, setDaysLate] = useState(user.late || 0)
  const [sharing, setSharing] = useState({
    discord: user.score.discordShare ?? false,
    socialMedia: user.score.socialShare ?? false,
  })

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16 relative">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{user.name}</h1>
        <p className="text-gray-500 text-lg">{user.email}</p>
      </div>

      <VideoSection
        loomUrl={user.loom}
        score={presentationScore}
        feedback={presentationFeedback}
        onScoreChange={setPresentationScore}
        onFeedbackChange={setPresentationFeedback}
      />

      <NotebookSection
        notebookUrl={user.notebook}
        activitiesScore={activitiesScore}
        activitiesFeedback={activitiesFeedback}
        questionsScore={questionsScore}
        questionsFeedback={questionsFeedback}
        onActivitiesScoreChange={setActivitiesScore}
        onActivitiesFeedbackChange={setActivitiesFeedback}
        onQuestionsScoreChange={setQuestionsScore}
        onQuestionsFeedbackChange={setQuestionsFeedback}
      />

      <QuestionsSection questions={user.questions} />

      <LearnedSection learned={user.learned} />

      <NotLearnedSection notLearned={user.notLearned} />

      <SharedContentSection sharedContent={user.share} />

      <SubmissionStatusSection
        daysLate={daysLate}
        onDaysLateChange={setDaysLate}
        itemVariants={{}}
      />

      <SharingSection
        sharing={sharing}
        onSharingChange={setSharing}
        itemVariants={{}}
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
                  await saveUser({
                    ...user,
                    late: daysLate,
                    score: {
                      activities: {
                        score: activitiesScore,
                        feedback: activitiesFeedback,
                      },
                      questions: {
                        score: questionsScore,
                        feedback: questionsFeedback,
                      },
                      presentation: {
                        score: presentationScore,
                        feedback: presentationFeedback,
                      },
                      discordShare: sharing.discord,
                      socialShare: sharing.socialMedia,
                    },
                  })
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
          </div>
        </div>
      </div>
    </div>
  )
}
