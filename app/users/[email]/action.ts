'use server'

import { User } from '@/lib/types'
import { saveUser as saveUserDB } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function saveUser(user: User) {
  saveUserDB(user)
  revalidatePath('/')
  return { success: true }
}
