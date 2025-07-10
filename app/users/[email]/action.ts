'use server'

import { User } from '@/lib/types'
import { db } from '@/lib/database'
import { revalidatePath } from 'next/cache'

export async function saveUser(user: User) {
  await db.saveUser(user)
  revalidatePath('/')
  return { success: true }
}
