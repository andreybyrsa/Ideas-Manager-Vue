import StatusTypes from '@Domain/IdeaStatus'
import UsersGroup from '@Domain/UsersGroup'

interface Idea {
  id: string
  createdAt: Date
  modifiedAt: Date
  name: string
  problem: string
  description: string
  solution: string
  result: string
  projectType: 'INSIDE' | 'OUTSIDE'
  status: StatusTypes
  initiator: string
  projectOffice: UsersGroup[]
  experts: UsersGroup
  customer: string
  contactPerson: string

  technicalRealizability: number
  suitability: number
  budget: number
  preAssessment: number
  rating: number
}

interface Rating {
  id: string
  ideaId: string
  expert: string

  marketValue: number
  originality: number
  technicalRealizability: number
  suitability: number
  budget: number
  rating: number
  confirmed: boolean
}

export { Idea, Rating }
