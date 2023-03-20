import { ReactChild, ReactFragment, ReactPortal, SVGProps } from 'react'

export type IconType = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>

export type AppContextType = {
  user?: Partial<User> | null
  updateUser?: (updatedUserData: Partial<User>) => Promise<void>
}
export type AppContextProviderType = {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined
}

export type UserRole = 'ADMIN' | 'USER'

export type User = {
  _id: string
  password?: string
  name: string
  email: string
  avatar?: string
  avatarPath?: string
  country: string
  phoneNumber: string
  city: string
  signaturePath: string
  signature: string
  role: UserRole
}

export type Support = {
  id: string
  displayName: string
  email: string
  subject: string
  message: string
}

export type NotificationType = {
  id: string
  title: string
  message: string
  createdAt: string
  isRead: boolean
}
