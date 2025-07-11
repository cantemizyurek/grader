import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import type { User } from './types'
import { config } from './config'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

export class GoogleSheetsService {
  private oauth2Client: OAuth2Client
  private sheets: any

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL ||
        'http://localhost:3000/api/auth/callback'
    )

    this.sheets = google.sheets({ version: 'v4', auth: this.oauth2Client })
  }

  getAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })
  }

  async setCredentials(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code)
    this.oauth2Client.setCredentials(tokens)
    return tokens
  }

  setTokens(tokens: any) {
    this.oauth2Client.setCredentials(tokens)
  }

  async createSpreadsheet(title: string) {
    const response = await this.sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
      },
    })
    return response.data
  }

  async addSheet(spreadsheetId: string, sheetTitle: string) {
    const response = await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetTitle,
              },
            },
          },
        ],
      },
    })
    return response.data
  }

  async saveStudentData(spreadsheetId: string, student: User) {
    const sheetTitle = student.name.replace(/[^a-zA-Z0-9 ]/g, '')

    const spreadsheet = await this.sheets.spreadsheets.get({ spreadsheetId })
    const existingSheet = spreadsheet.data.sheets.find(
      (sheet: any) => sheet.properties.title === sheetTitle
    )

    if (!existingSheet) {
      const firstSheet = spreadsheet.data.sheets[0]
      const firstSheetId = firstSheet.properties.sheetId

      const duplicateResponse = await this.sheets.spreadsheets.sheets.copyTo({
        spreadsheetId,
        sheetId: firstSheetId,
        requestBody: {
          destinationSpreadsheetId: spreadsheetId,
        },
      })

      const newSheetId = duplicateResponse.data.sheetId

      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              updateSheetProperties: {
                properties: {
                  sheetId: newSheetId,
                  title: sheetTitle,
                },
                fields: 'title',
              },
            },
          ],
        },
      })
    }

    const response = await this.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: [
          {
            range: `${sheetTitle}!B1:D1`,
            values: [[student.name, '', '']],
          },
          {
            range: `${sheetTitle}!B2:D2`,
            values: [[config.googleSheets.graderName, '', '']],
          },
          {
            range: `${sheetTitle}!B3:D3`,
            values: [[config.assignmentId, '', '']],
          },
          {
            range: `${sheetTitle}!B4:D4`,
            values: [[config.assignmentName, '', '']],
          },
          {
            range: `${sheetTitle}!B5:D5`,
            values: [[student.late, '', '']],
          },
          {
            range: `${sheetTitle}!B8:B8`,
            values: [[student.score.activities.score]],
          },
          {
            range: `${sheetTitle}!D8:D8`,
            values: [[student.score.activities.feedback]],
          },
          {
            range: `${sheetTitle}!B9:B9`,
            values: [[student.score.questions.score]],
          },
          {
            range: `${sheetTitle}!D9:D9`,
            values: [[student.score.questions.feedback]],
          },
          {
            range: `${sheetTitle}!B10:B10`,
            values: [[student.score.presentation.score]],
          },
          {
            range: `${sheetTitle}!D10:D10`,
            values: [[student.score.presentation.feedback]],
          },
          {
            range: `${sheetTitle}!D11:D11`,
            values: [[student.score.overallFeedback]],
          },
          {
            range: `${sheetTitle}!B12:B13`,
            values: this.getShares(student).map((share) => [share]),
          },
        ],
      },
    })

    return response.data
  }

  private getShares(student: User) {
    const shares = []
    if (student.score.socialShare) {
      shares.push("'+2 Extra Credit")
    }
    if (student.score.discordShare) {
      shares.push("'+1 Extra Credit")
    } else {
      shares.push('')
    }

    if (!student.score.socialShare) {
      shares.push('')
    }
    return shares
  }
}
