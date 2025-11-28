'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuthStore } from './store'

interface Theme {
  primary: string
  secondary: string
  tertiary: string
}

interface ThemeContextType {
  theme: Theme
  updateTheme: (newTheme: Theme) => void
}

const defaultTheme: Theme = {
  primary: '#6A5ACD',
  secondary: '#9B87FF',
  tertiary: '#C7BFFF'
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {}
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const { user } = useAuthStore()

  useEffect(() => {
    const fetchTheme = async () => {
      if (user?.organizationId) {
        try {
          const res = await fetch(`/api/organizations/${user.organizationId}`)
          if (res.ok) {
            const data = await res.json()
            if (data.organization?.theme) {
              setTheme(data.organization.theme)
              applyThemeToDocument(data.organization.theme)
            }
          }
        } catch (error) {
          console.error('Failed to fetch theme:', error)
        }
      }
    }

    fetchTheme()
  }, [user?.organizationId])

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    applyThemeToDocument(newTheme)
  }

  const applyThemeToDocument = (theme: Theme) => {
    document.documentElement.style.setProperty('--color-primary', theme.primary)
    document.documentElement.style.setProperty('--color-secondary', theme.secondary)
    document.documentElement.style.setProperty('--color-tertiary', theme.tertiary)
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
