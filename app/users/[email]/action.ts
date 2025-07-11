'use server'

import { User } from '@/lib/types'
import { db } from '@/lib/database'
import { revalidatePath } from 'next/cache'
import { GoogleSheetsService } from '@/lib/google-sheets'
import { cookies } from 'next/headers'
import { config } from '@/lib/config'

export async function saveUser(user: User) {
  await db.saveUser(user)
  revalidatePath('/')
  return { success: true }
}

export async function saveToGoogleSheets(user: User) {
  const cookieStore = await cookies()
  const sheetsService = new GoogleSheetsService()

  const tokens = cookieStore.get('google_tokens')

  if (!tokens) {
    const authUrl = sheetsService.getAuthUrl()
    return { authUrl }
  }

  try {
    sheetsService.setTokens(JSON.parse(tokens.value))

    let spreadsheetId = config.googleSheets.spreadsheetId

    if (!spreadsheetId) {
      spreadsheetId = cookieStore.get('spreadsheet_id')?.value || ''

      if (!spreadsheetId) {
        const spreadsheet = await sheetsService.createSpreadsheet(
          config.googleSheets.spreadsheetName
        )
        spreadsheetId = spreadsheet.spreadsheetId

        cookieStore.set('spreadsheet_id', spreadsheetId || '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 365,
        })
      }
    }

    await sheetsService.saveStudentData(spreadsheetId as string, user)

    return {
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    }
  } catch (error: any) {
    if (
      error.message?.includes('invalid_grant') ||
      error.message?.includes('Token has been expired')
    ) {
      cookieStore.delete('google_tokens')
      const authUrl = sheetsService.getAuthUrl()
      return { authUrl }
    }

    throw error
  }
}
