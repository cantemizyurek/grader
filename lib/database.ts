import fs from 'fs/promises'
import path from 'path'
import { User } from './types'
import { config } from './config'

export interface UserPreview {
  name: string
  email: string
  timestamp: string
  markStatus: 'not-started' | 'in-progress' | 'done'
  score: number
}

class Database {
  private dataPath: string
  private cache: User[] | null = null

  constructor(dataPath: string) {
    this.dataPath = dataPath
  }

  private async ensureDataFile(): Promise<void> {
    try {
      await fs.access(this.dataPath)
    } catch {
      await fs.writeFile(this.dataPath, '[]', 'utf8')
    }
  }

  private async loadData(): Promise<User[]> {
    if (this.cache) return this.cache

    await this.ensureDataFile()
    const content = await fs.readFile(this.dataPath, 'utf8')
    
    try {
      this.cache = JSON.parse(content) as User[]
      return this.cache
    } catch (error) {
      console.error('Failed to parse data file:', error)
      return []
    }
  }

  private async saveData(data: User[]): Promise<void> {
    const content = JSON.stringify(data, null, 2)
    await fs.writeFile(this.dataPath, content, 'utf8')
    this.cache = data
  }

  private calculateMarkStatus(user: User): UserPreview['markStatus'] {
    const { activities, questions, presentation } = user.score

    if (!activities.score && !questions.score && !presentation.score) {
      return 'not-started'
    }

    if (activities.score !== null && questions.score !== null && presentation.score !== null) {
      return 'done'
    }

    return 'in-progress'
  }

  private calculateTotalScore(user: User): number {
    let score = 0

    if (user.score.activities.score) score += user.score.activities.score
    if (user.score.questions.score) score += user.score.questions.score
    if (user.score.presentation.score) score += user.score.presentation.score
    if (user.score.discordShare) score += config.grading.bonuses.discordSharePoints
    if (user.score.socialShare) score += config.grading.bonuses.socialSharePoints

    if (user.late) score -= user.late * config.grading.penalties.lateDayPenalty

    return Math.max(score, 0)
  }

  async getUserPreviews(): Promise<UserPreview[]> {
    const users = await this.loadData()
    
    return users.map((user) => ({
      name: user.name,
      email: user.email,
      timestamp: user.timestamp,
      markStatus: this.calculateMarkStatus(user),
      score: this.calculateTotalScore(user),
    }))
  }

  async getUser(email: string): Promise<User | null> {
    const users = await this.loadData()
    return users.find((user) => user.email === email) || null
  }

  async saveUser(user: User): Promise<void> {
    const users = await this.loadData()
    const index = users.findIndex((u) => u.email === user.email)
    
    if (index !== -1) {
      users[index] = user
    } else {
      users.push(user)
    }

    await this.saveData(users)
  }

  invalidateCache(): void {
    this.cache = null
  }
}

// Create singleton instance
const dbPath = path.join(process.cwd(), 'data', 'data.json')
export const db = new Database(dbPath)