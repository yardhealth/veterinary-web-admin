interface CustomerType {
  sl?: string | number
  id?: string
  uid?: string
  primaryContact?: string
  companyName?: string
  country?: string
  customer?: string
  streetName?: string
  city?: string
  state?: string
  pinCode?: number
  displayName?: string
  phoneNumber?: string
  email?: string
  password?: string
  photoURL?: string
  createdAt?: string
  updatedAt?: string
  isBlocked?: boolean
  photoRef?: string
  role?: UserRole
  isOnline?: boolean
}
export default CustomerType
