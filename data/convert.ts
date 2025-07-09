import Papa from 'papaparse'
import fs from 'fs'
import path from 'path'

export async function readCSVFromFile(filePath: string) {
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

export function readCSVFromUpload(file: File): Promise<any[]> {
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

export async function convertCSVToJSON() {
  try {
    const data = await readCSVFromFile('data/data.csv')
    return data
  } catch (error) {
    console.error('Failed to convert CSV:', error)
  }
}

async function main() {
  const data =
    (await convertCSVToJSON())?.map((item: any) => ({
      name: item.name,
      email: item.email,
      timestamp: item.timestamp,
      notebook: item.notebook,
      loom: item.loom,
      learned: item.learned,
      notLearned: item['not-learned'],
      questions: item.questions,
      share: item.share,
      score: {
        activities: null,
        questions: null,
        presentation: null,
        discordShare: null,
        socialShare: null,
      },
    })) || []

  const users: Record<string, any> = {}

  for (const user of data) {
    if (users[user.email]) {
      if (users[user.email].timestamp < user.timestamp) {
        users[user.email] = user
      }
    } else {
      users[user.email] = user
    }
  }

  fs.writeFileSync(
    'data/data.json',
    JSON.stringify(Object.values(users), null, 2)
  )
  console.log('Data converted and saved to data.json')
}

main()
