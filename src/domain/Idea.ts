import StatusTypes from '@Domain/Status'

interface Idea {
  id?: number
  initiator?: string
  name: string
  dateCreated: Date
  dateModified: Date
  projectType?: 'INSIDE' | 'OUTSIDE'
  experts?: string[]
  problem?: string
  solution?: string
  result?: string
  customer?: string
  description?: string
  realizability?: string
  suitability?: string
  budget?: string
  status: StatusTypes
  rating: number
  risk: number
}

interface Risk {
  status: StatusTypes
  risk: number
  price: string
  originality: string
  techniclFeasibility: string
  understanding: string
}

export { Idea, Risk }
