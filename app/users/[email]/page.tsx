import { db } from '@/lib/database'
import { notFound } from 'next/navigation'
import PageClient from './page.client'

interface PageProps {
  params: Promise<{
    email: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { email } = await params
  const user = await db.getUser(decodeURIComponent(email))

  if (!user) {
    notFound()
  }

  return <PageClient user={user} />
}
