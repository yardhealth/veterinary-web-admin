import { BASE_URL } from 'configs'
import { User } from 'types'

import create from 'zustand'

type AuthState = {
  isUserLoading: boolean
  user?: Partial<User>
  setUser: (user: Partial<User>) => Promise<void>
  logOut: () => Promise<void>
  getUser: (token?: string) => Promise<void>
}
const useAuth = create<AuthState>((set) => ({
  isUserLoading: true,
  user: {},
  setUser: async (user: Partial<User>) => {
    set({ user: { ...user } })
  },
  logOut: async () => {
    await fetch(BASE_URL + 'auth/logout', {
      method: 'PUT',
    })
    window?.localStorage?.removeItem('ACCESS_TOKEN')
    set({ user: {} })
    window.location.replace('/login')
  },
  getUser: async (token?: string) => {
    const accessToken = window?.localStorage?.getItem('ACCESS_TOKEN')
    try {
      const res = await fetch(`${BASE_URL}/auth/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (res?.status === 401) {
        window?.localStorage?.removeItem('ACCESS_TOKEN')
        set({ user: {}, isUserLoading: false })
      }
      if (res?.status === 200) {
        const data = await res.json()
        set({ user: { ...data?.success?.data }, isUserLoading: false })
        return
      } else {
        window?.localStorage?.removeItem('ACCESS_TOKEN')
        window?.localStorage?.removeItem('ACCESS_TOKEN')
        set({ isUserLoading: false })
      }
    } catch (error) {
      console.log('mmm', error)
      set({ user: {} })
    }
  },
}))

export default useAuth
