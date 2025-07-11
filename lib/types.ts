export interface ScoreSection {
  score: number | null
  feedback: string | null
}

export interface Score {
  activities: ScoreSection
  questions: ScoreSection
  presentation: ScoreSection
  discordShare: boolean | null
  socialShare: boolean | null
  overallFeedback: string | null
}

export interface User {
  name: string
  email: string
  timestamp: string
  notebook: string
  loom: string
  learned: string
  notLearned: string
  questions: string
  share: string
  late: null | number
  score: Score
}
