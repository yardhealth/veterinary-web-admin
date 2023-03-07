interface AdminType {
  sl?: string | number
  id?: string
  uid?: string
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
export default AdminType
