import { ThemeProvider } from '@mui/material'
import { Loader } from 'components/core'
// import { auth, database } from 'configs'
import { useFetch, useGET, useIsMounted } from 'hooks'
import useAuth from 'hooks/useAuth'
import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useCustomTheme } from 'themes'
import { AppContextType, AppContextProviderType, User } from 'types'

const AppContext = createContext<AppContextType>({})

const AppContextProvider = (props: AppContextProviderType) => {
  const { user, getUser } = useAuth()

  const router = useRouter()
  const isMounted = useIsMounted()

  useEffect(() => {
    getUser?.()
  }, [isMounted, router])

  const { theme } = useCustomTheme()
  return (
    <AppContext.Provider value={{}}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppContextProvider
