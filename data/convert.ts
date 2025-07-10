import Papa from 'papaparse'
import fs from 'fs'
import path from 'path'

export async function readCSVFromFile(filePath: string): Promise<unknown[]> {
  try {
    const csvFile = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8')

    const result = Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    })

    return result.data
  } catch (error) {
    console.error('Error reading CSV:', error)
    throw error
  }
}

export function readCSVFromUpload(file: File): Promise<Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

export async function convertCSVToJSON(): Promise<unknown[] | undefined> {
  try {
    const data = await readCSVFromFile('data/data.csv')
    return data
  } catch (error) {
    console.error('Failed to convert CSV:', error)
    return undefined
  }
}

interface CSVRow {
  name: string
  email: string
  timestamp: string
  notebook: string
  loom: string
  learned: string
  'not-learned': string
  questions: string
  share: string
}

function calculateLateDays(timestamp: Date, deadline: Date): number {
  if (timestamp <= deadline) return 0
  
  const diffInMs = timestamp.getTime() - deadline.getTime()
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
}

function createInitialScore() {
  return {
    activities: { score: null, feedback: null },
    questions: { score: null, feedback: null },
    presentation: { score: null, feedback: null },
    discordShare: null,
    socialShare: null,
  }
}

async function main() {
  const MUST_BE_SUBMITTED_BEFORE = new Date('7/2/2025 23:59:59')

  const data = await convertCSVToJSON()
  if (!data) {
    console.error('Failed to read CSV data')
    return
  }

  const processedData = data.map((item) => {
    const row = item as unknown as CSVRow
    const timestampDate = new Date(row.timestamp)

    return {
      name: row.name,
      email: row.email,
      timestamp: timestampDate.toISOString(),
      notebook: row.notebook,
      loom: row.loom,
      learned: row.learned,
      notLearned: row['not-learned'],
      questions: row.questions,
      share: row.share,
      late: calculateLateDays(timestampDate, MUST_BE_SUBMITTED_BEFORE),
      score: createInitialScore(),
    }
  })

  // Group by email and keep the latest submission
  const userMap = new Map<string, typeof processedData[0]>()

  for (const user of processedData) {
    const existing = userMap.get(user.email)
    if (!existing || new Date(existing.timestamp) < new Date(user.timestamp)) {
      userMap.set(user.email, user)
    }
  }

  const users = Array.from(userMap.values())
  
  fs.writeFileSync(
    'data/data.json',
    JSON.stringify(users, null, 2)
  )
  console.log(`Data converted and saved to data.json - ${users.length} unique users`)
}

main()
