import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'done':
      return 'bg-green-50 text-green-700 border-green-200 shadow-green-100'
    case 'in-progress':
      return 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100'
    case 'not-started':
      return 'bg-slate-50 text-slate-600 border-slate-200 shadow-slate-100'
    default:
      return 'bg-slate-50 text-slate-600 border-slate-200 shadow-slate-100'
  }
}
