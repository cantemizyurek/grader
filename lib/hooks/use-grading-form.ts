import { useState, useCallback } from 'react'
import { User } from '../types'

export interface GradingFormState {
  presentationScore: number
  presentationFeedback: string
  activitiesScore: number
  activitiesFeedback: string
  questionsScore: number
  questionsFeedback: string
  daysLate: number
  sharing: {
    discord: boolean
    socialMedia: boolean
  }
  overallFeedback: string
}

export function useGradingForm(initialUser: User) {
  const [formState, setFormState] = useState<GradingFormState>({
    presentationScore: initialUser.score.presentation.score ?? 0,
    presentationFeedback: initialUser.score.presentation.feedback ?? '',
    activitiesScore: initialUser.score.activities.score ?? 0,
    activitiesFeedback: initialUser.score.activities.feedback ?? '',
    questionsScore: initialUser.score.questions.score ?? 0,
    questionsFeedback: initialUser.score.questions.feedback ?? '',
    daysLate: initialUser.late || 0,
    sharing: {
      discord: initialUser.score.discordShare ?? false,
      socialMedia: initialUser.score.socialShare ?? false,
    },
    overallFeedback: initialUser.score.overallFeedback ?? '',
  })

  const updateField = useCallback(<K extends keyof GradingFormState>(
    field: K,
    value: GradingFormState[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }, [])

  const updateSharing = useCallback((sharing: GradingFormState['sharing']) => {
    setFormState(prev => ({ ...prev, sharing }))
  }, [])

  const getUpdatedUser = useCallback((): User => {
    return {
      ...initialUser,
      late: formState.daysLate,
      score: {
        activities: {
          score: formState.activitiesScore,
          feedback: formState.activitiesFeedback,
        },
        questions: {
          score: formState.questionsScore,
          feedback: formState.questionsFeedback,
        },
        presentation: {
          score: formState.presentationScore,
          feedback: formState.presentationFeedback,
        },
        discordShare: formState.sharing.discord,
        socialShare: formState.sharing.socialMedia,
        overallFeedback: formState.overallFeedback,
      },
    }
  }, [initialUser, formState])

  return {
    formState,
    updateField,
    updateSharing,
    getUpdatedUser,
  }
}