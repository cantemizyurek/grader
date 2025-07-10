import { getUserPreviews } from '@/lib/db'
import PageClient from './page.client'

export default function Home() {
  const users = getUserPreviews()

  return <PageClient users={users} />
}
