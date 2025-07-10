import fs from 'fs'
import JSONData from '../data/data.json'
import { User } from './types'

const Data: User[] = JSONData as unknown as User[]

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

export function getUser(email: string): User | null {
  return Data.find((user) => user.email === email) || null
}

export function saveUser(user: User): void {
  const index = Data.findIndex((u) => u.email === user.email)
  if (index !== -1) {
    Data[index] = user
  } else {
    Data.push(user)
  }

  fs.writeFileSync('data/data.json', JSON.stringify(Data, null, 2), 'utf8')
}

function markStatus(user: User) {
  const activities = user.score.activities.score
  const questions = user.score.questions.score
  const presentation = user.score.presentation.score

  if (activities === null && questions === null && presentation === null) {
    return 'not-started'
  }

  if (activities !== null && questions !== null && presentation !== null) {
    return 'done'
  }

  return 'in-progress'
}

function calculateScore(user: User) {
  let score = 0

  if (user.score.activities.score) score += user.score.activities.score
  if (user.score.questions.score) score += user.score.questions.score
  if (user.score.presentation.score) score += user.score.presentation.score
  if (user.score.discordShare) score += 1
  if (user.score.socialShare) score += 2

  if (user.late) score -= user.late * 4

  return Math.max(score, 0)
}
