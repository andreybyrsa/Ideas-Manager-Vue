import { defineStore } from 'pinia'

import findOneAndUpdate from '@Utils/findOneAndUpdate'

import InitialState from '@Store/teams/initialState'
import TeamService from '@Services/TeamService'
import useNotificationsStore from '@Store/notifications/notificationsStore'
import TeamMember from '@Domain/TeamMember'

const useTeamStore = defineStore('teams', {
  state: (): InitialState => ({
    teams: [],
  }),
  getters: {
    getTeams() {
      return async (token: string) => {
        const response = await TeamService.getTeams(token)

        if (response instanceof Error) {
          useNotificationsStore().createSystemNotification(
            'Система',
            response.message,
          )
          return response
        }

        this.teams = response
        return this.teams
      }
    },

    getTeam() {
      return async (id: number, token: string) => {
        const team = await TeamService.getTeam(id, token)

        if (team instanceof Error) {
          useNotificationsStore().createSystemNotification('Система', team.message)
          return team
        }

        if (this.teams.length) {
          return findOneAndUpdate(this.teams, team, { key: 'id', value: id })
        }

        const teams = await this.getTeams(token)

        if (teams instanceof Error) {
          useNotificationsStore().createSystemNotification('Система', teams.message)
          return teams
        }

        return findOneAndUpdate(this.teams, team, { key: 'id', value: id })
      }
    },
  },
  actions: {
    async kickMember(teamMember: TeamMember, id: number, token: string) {
      const response = await TeamService.kickMember(teamMember, id, token)

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        const currentTeam = this.teams.find((team) => team.id === id)

        if (currentTeam) {
          const kickingTeamMemberIndex = currentTeam.members.findIndex(
            (member) => member.userId === teamMember.userId,
          )

          if (kickingTeamMemberIndex != -1) {
            currentTeam.members.splice(kickingTeamMemberIndex, 1)
          }
        }
      }
    },

    async deleteTeam(id: number, token: string) {
      const response = await TeamService.deleteTeam(id, token)

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        const deletingIdeaIndex = this.teams.findIndex((idea) => idea.id === id)

        if (deletingIdeaIndex !== -1) {
          this.teams.splice(deletingIdeaIndex, 1)
        }
      }
    },
  },
})

export default useTeamStore
