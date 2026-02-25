'use client'

import * as React from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // THEME LOCKED TO DARK MODE - NEVER CHANGE!
  // Removes next-themes dependency to prevent any theme switching
  return <>{children}</>
}
