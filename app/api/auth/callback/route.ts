import { NextRequest, NextResponse } from 'next/server'
import { GoogleSheetsService } from '@/lib/google-sheets'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  
  if (error) {
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
  }
  
  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url))
  }
  
  try {
    const sheetsService = new GoogleSheetsService()
    const tokens = await sheetsService.setCredentials(code)
    
    const cookieStore = await cookies()
    cookieStore.set('google_tokens', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    })
    
    return NextResponse.redirect(new URL('/?auth=success', request.url))
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url))
  }
}