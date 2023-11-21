import { User } from '@Domain/User'
import { Skill } from '@Domain/Skill'
import { Idea } from '@Domain/Idea'
import Project from '@Domain/Project'

interface Profile extends User {
  skills: Skill[]
  ideas: Idea[]
  projects: Project[]
}

export default Profile
