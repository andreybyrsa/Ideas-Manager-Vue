import { defineStore } from 'pinia'

import SprintService from '@Services/SprintService'

import InitialState from '@Store/sprints/initialState'
import { Sprint, SprintStatus, SprintMarks } from '@Domain/Project'
import useNotificationsStore from '@Store/notifications/notificationsStore'
import useTasksStore from '@Store/tasks/tasksStore'

const useSprintsStore = defineStore('sprints', {
  state: (): InitialState => ({
    sprints: [],
    activeSprint: undefined,
  }),

  getters: {
    getAllSprints() {
      return async (projectId: string, token: string) => {
        const response = await SprintService.getAllSprintsProject(projectId, token)

        if (response instanceof Error) {
          return response
        }

        this.sprints = response
        return this.sprints
      }
    },

    getActiveSprint() {
      return async (projectId: string, token: string) => {
        const response = await SprintService.getActiveSprintsProject(
          projectId,
          token,
        )

        if (response instanceof Error) {
          return response
        }

        this.activeSprint = response
        return this.activeSprint
      }
    },
  },

  actions: {
    async postSprint(sprint: Sprint, token: string) {
      const response = await SprintService.postSprint(sprint, token)

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        this.sprints.push(response)

        useTasksStore().tasks.forEach((task) => {
          if (task.status === 'InBackLog' && sprint.tasks.includes(task)) {
            task.sprintId = response.id
            task.status = 'inProgress'
          }
        })
      }
    },

    async changeSprintStatus(sprintId: string, status: SprintStatus, token: string) {
      const response = await SprintService.changeSprintStatus(
        sprintId,
        status,
        token,
      )

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        const currentSprint = this.sprints.find(({ id }) => id === sprintId)
        if (currentSprint) {
          currentSprint.status = status
        }
      }
    },

    async reportSprint(sprintId: string, report: string, token: string) {
      const response = await SprintService.reportSprint(sprintId, report, token)

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        const currentSprint = this.sprints.find(({ id }) => id === sprintId)

        if (currentSprint) {
          currentSprint.report = report
        }
      }
    },

    async finishSprint(sprintId: string, finishDate: string, token: string) {
      const response = await SprintService.finishSprintDate(
        sprintId,
        finishDate,
        token,
      )

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        const currentSprint = this.sprints.find(({ id }) => id === sprintId)

        if (currentSprint) {
          currentSprint.finishDate = finishDate
        }
      }
    },

    async updateSprint(sprint: Sprint, sprintId: string, token: string) {
      const response = await SprintService.updateSprint(sprint, sprintId, token)
      console.log(response)
      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        this.sprints.map((sprintInStore) => {
          if (sprintInStore.id != sprintId) return
          sprintInStore = { ...sprint, id: sprintId }
        })

        useTasksStore().tasks.forEach((task) => {
          if (task.status === 'InBackLog' && sprint.tasks.includes(task)) {
            task.sprintId = sprintId
            task.status = 'inProgress'
          }
        })
      }
    },

    async saveMarkSprint(sprintId: string, marks: SprintMarks[], token: string) {
      const response = await SprintService.saveMarkSprint(sprintId, marks, token)

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        const currentSprint = this.sprints.find(({ id }) => id === sprintId)

        if (currentSprint && currentSprint.marks) {
          currentSprint.marks = marks
        }
      }
    },
  },
})

export default useSprintsStore
