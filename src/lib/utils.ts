// import type { Updater } from '@tanstack/vue-table' // Removed - dependency not installed
import type { Ref } from 'vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T>(updaterOrValue: T | ((value: any) => T), ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? (updaterOrValue as (value: any) => T)(ref.value)
      : updaterOrValue
}
