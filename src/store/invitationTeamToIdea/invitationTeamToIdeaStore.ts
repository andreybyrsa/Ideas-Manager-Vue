import { defineStore } from 'pinia'

import invitationTeamToIdeaService from '@Services/invitationTeamToIdeaService'

import InitialState from '@Store/invitationTeamToIdea/initialState'
import useNotificationsStore from '@Store/notifications/notificationsStore'
import {
  InvitationTeamToIdea,
  InvitationTeamToIdeaStatus,
} from '@Domain/InvitationTeamToIdea'
import findOneAndUpdate from '@Utils/findOneAndUpdate'

const useInvitationsTeamToIdeaStore = defineStore('invitationsTeamToIdeaStore', {
  state: (): InitialState => ({
    ideaInvitations: [],
  }),

  getters: {
    getIdeaInvitations() {
      return async (ideaId: string, token: string) => {
        const response = await invitationTeamToIdeaService.getInvitationsByIdea(
          token,
          ideaId,
        )

        if (response instanceof Error) {
          return response
        }

        if (response instanceof Error) {
          useNotificationsStore().createSystemNotification(
            'Система',
            response.message,
          )
        } else {
          this.ideaInvitations = response

          return this.ideaInvitations
        }
      }
    },

    getIdeaInvitationsByInitiator() {
      return async (userId: string, token: string) => {
        const response =
          await invitationTeamToIdeaService.getAllInvitationsByInitiator(
            userId,
            token,
          )

        if (response instanceof Error) {
          return response
        }

        if (response instanceof Error) {
          useNotificationsStore().createSystemNotification(
            'Система',
            response.message,
          )
        } else {
          return response.forEach((item) =>
            findOneAndUpdate(this.ideaInvitations, item, {
              key: 'id',
              value: item.id,
            }),
          )
        }
      }
    },

    getTeamInvitations() {
      return async (teamId: string, token: string) => {
        const response = await invitationTeamToIdeaService.getTeamInvitations(
          teamId,
          token,
        )

        if (response instanceof Error) {
          return response
        }

        if (response instanceof Error) {
          useNotificationsStore().createSystemNotification(
            'Система',
            response.message,
          )
        } else {
          this.ideaInvitations = response
          return this.ideaInvitations
        }
      }
    },
  },

  actions: {
    async postInvitationsToIdea(invitation: InvitationTeamToIdea, token: string) {
      const response = await invitationTeamToIdeaService.inviteTeamToIdea(
        invitation,
        token,
      )

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        this.ideaInvitations.push(response)
      }
    },

    async putInvitationForTeamToIdea(
      status: InvitationTeamToIdeaStatus,
      invitationId: string,
      token: string,
    ) {
      const response = await invitationTeamToIdeaService.changeInvitationStatus(
        invitationId,
        status,
        token,
      )

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        const currentInvitation = this.ideaInvitations.find(
          ({ id }) => id === invitationId,
        )

        if (currentInvitation) {
          currentInvitation.status = status
        }

        if (status === 'ACCEPTED') {
          this.ideaInvitations.forEach((invite) => {
            if (invite.status === 'NEW') {
              console.log(invite.teamName, invite.id)
              invite.status = 'ANNULLED'
            }
          })
        }
      }
    },
  },
})

export default useInvitationsTeamToIdeaStore