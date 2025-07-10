import { db } from '@/lib/database'
import PageClient from './page.client'

export default async function Home() {
  const users = await db.getUserPreviews()

  return <PageClient users={users} />
}
