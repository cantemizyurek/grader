import JSONData from '../data/data.json'

const Data: User[] = JSONData as unknown as User[]

export interface Score {
  activities: number
  questions: number
  presentation: number
  discordShare: boolean
  socialShare: boolean
}

interface User {
  name: string
  email: string
  timestamp: string
  notebook: string
  loom: string
  learned: string
  notLearned: string
  questions: string
  share: string
  score: Score
}

export function getUserPreviews() {
  return Data.map((user) => {
    return {
      name: user.name,
      email: user.email,
      timestamp: user.timestamp,
      markStatus: markStatus(user),
      score: calculateScore(user),
    }
  })
}

function markStatus(user: User): 'done' | 'in-progress' | 'not-started' {
  if (user.score.activities && user.score.questions && user.score.presentation)
    return 'done'
  if (user.score.activities || user.score.questions || user.score.presentation)
    return 'in-progress'
  return 'not-started'
}

function calculateScore(user: User) {
  let score = 0

  if (user.score.activities) score += user.score.activities
  if (user.score.questions) score += user.score.questions
  if (user.score.presentation) score += user.score.presentation
  if (user.score.discordShare) score += 1
  if (user.score.socialShare) score += 2

  return score
}
