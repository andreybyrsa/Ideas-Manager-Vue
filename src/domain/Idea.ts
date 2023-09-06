import StatusTypes from '@Domain/IdeaStatus'
import Comment from '@Domain/Comment'

interface Idea {
  id: number
  initiator: string

  name: string
  problem: string
  description: string
  solution: string
  result: string
  projectType: 'INSIDE' | 'OUTSIDE'
  status: StatusTypes

  preAssessment: number
  technicalRealizability: number
  suitability: number
  budget: number
  rating: number

  dateCreated: Date
  dateModified: Date

  experts?: string[]
  customer: string
  contactPerson: string

  comments: Comment[]
}

interface Change {
  name: string
  date: Date
  who: string
  number: number
  doing: string
}

interface Risk {
  status: StatusTypes
  risk: number
  marketValue: string
  originality: string
  techniclFeasibility: string
  understanding: string
}

export { Idea, Risk, Change }
