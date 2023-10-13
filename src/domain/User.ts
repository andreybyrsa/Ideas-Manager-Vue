import RolesTypes from '@Domain/Roles'
import { Skill } from '@Domain/Skill'

interface User {
  id: string
  token?: string

  email: string
  firstName: string
  lastName: string

  roles: RolesTypes[]
  role?: RolesTypes
  lastActivity?: Date
}

interface LoginUser {
  email: string
  password: string
}

interface RegisterUser {
  email: string
  firstName: string
  lastName: string
  password: string
  roles: RolesTypes[]
}

export { User, LoginUser, RegisterUser }
