<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { watchImmediate } from '@vueuse/core'

import {
  FinishProjectOrSprintModalEmits,
  FinishProjectOrSprintModalProps,
} from '@Components/Modals/FinishProjectOrSprintModal/FinishProjectOrSprintModal.types'

import ModalLayout from '@Layouts/ModalLayout/ModalLayout.vue'
import Button from '@Components/Button/Button.vue'
import Textarea from '@Components/Inputs/Textarea/Textarea.vue'
import Input from '@Components/Inputs/Input/Input.vue'
import Icon from '@Components/Icon/Icon.vue'
import Typography from '@Components/Typography/Typography.vue'
import LoadingPlaceholder from '@Components/LoadingPlaceholder/LoadingPlaceholder.vue'

import ProjectService from '@Services/ProjectService'
import SprintService from '@Services/SprintService'

import useUserStore from '@Store/user/userStore'
import useProjectsStore from '@Store/projects/projectsStore'
import useSprintsStore from '@Store/sprints/sprintsStore'

import {
  getRoleProjectMember,
  getRoleProjectMemberStyle,
} from '@Utils/getRoleProjectMember'
import Validation from '@Utils/Validation'
import {
  RequestConfig,
  openErrorNotification,
  sendParallelRequests,
} from '@Utils/sendParallelRequests'

import { SprintMarks } from '@Domain/Project'
import { AverageMark } from '@Domain/ReportProjectMembers'
import useNotificationsStore from '@Store/notifications/notificationsStore'

const props = defineProps<FinishProjectOrSprintModalProps>()
const emit = defineEmits<FinishProjectOrSprintModalEmits>()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const projectStore = useProjectsStore()
const sprintStore = useSprintsStore()

const route = useRoute()

const projectId = route.params.projectId.toString()

const averageMark = ref<AverageMark[]>([])
const isLoading = ref(false)
const isLoadingRequest = ref(false)
const report = ref(props.project?.report.report ?? '')

onMounted(async () => {
  const currentUser = user.value

  if (currentUser?.token) {
    const { token } = currentUser
    const projectId = route.params.projectId.toString()

    if (!props.sprint) {
      isLoadingRequest.value = true
      const response = await ProjectService.getAverageMarkProject(projectId, token)

      if (response instanceof Error) {
        useNotificationsStore().createSystemNotification('Система', response.message)
      } else {
        isLoadingRequest.value = false
        averageMark.value = response
      }
    }
  }
})

watchImmediate(
  () => props.isOpened,
  (open) => {
    if (open && props.sprint) {
      const arrayUserId = props.project?.members
        ?.filter(({ projectRole }) => projectRole !== 'INITIATOR')
        .map(({ userId }) => userId)

      arrayUserId?.forEach((userId) => {
        validationSchemaModal.value[userId] = (value: string) =>
          Validation.validateFloatNumber(value) || 'Неправильно заполнена форма'
      })
    }
  },
)

interface ValidationSchema {
  [key: string]: (value: string) => string | boolean
}

const validationSchemaModal = ref<ValidationSchema>({
  report: (value: string) =>
    Validation.checkIsEmptyValue(value) || 'Это обязательное поле',
})

const { handleSubmit } = useForm({
  validationSchema: validationSchemaModal,
})

const FinishProject = handleSubmit(async () => {
  const currentUser = user.value

  if (currentUser?.token) {
    const { token } = currentUser

    const projectId = route.params.projectId.toString()
    const finishDate = new Date().toJSON().toString()

    isLoading.value = true

    const finishProjectParallelRequests: RequestConfig[] = [
      {
        request: () =>
          projectStore.finishProject(
            projectId,
            finishDate,
            'DONE',
            report.value,
            token,
          ),
        refValue: ref(),
        onErrorFunc: openErrorNotification,
      },
    ]

    await sendParallelRequests(finishProjectParallelRequests)

    isLoading.value = false
    emit('close-modal')
  }
})

const FinishSprint = handleSubmit(async (values) => {
  const currentUser = user.value

  if (currentUser?.token) {
    const { token, id } = currentUser
    const sprintId = props.sprint?.id
    const finishDate = new Date().toJSON().toString()
    const sprintTasks = props.sprint?.tasks

    const sprintMarks = props.project?.members.map(
      ({ projectRole, userId, firstName, lastName }) => {
        if (projectRole !== 'INITIATOR') {
          return {
            sprintId,
            userId,
            firstName,
            lastName,
            projectRole,
            mark: values[userId],
            tasks: props.sprint?.tasks.filter(
              ({ executor, status }) => executor?.id === id && status === 'Done',
            ),
          }
        }
      },
    ) as SprintMarks[]

    if (sprintId && sprintTasks) {
      isLoading.value = true
      const finishSprintParallelRequests: RequestConfig[] = [
        {
          request: () =>
            sprintStore.finishSprint(
              sprintId,
              finishDate,
              'DONE',
              report.value,
              sprintTasks,
              token,
            ),
          refValue: ref(),
          onErrorFunc: openErrorNotification,
        },
        {
          request: () =>
            SprintService.postSprintMarks(sprintId, projectId, sprintMarks, token),
          refValue: ref(),
          onErrorFunc: openErrorNotification,
        },
      ]

      await sendParallelRequests(finishSprintParallelRequests)

      isLoading.value = false
      emit('close-modal')
    }
  }
})
</script>

<template>
  <ModalLayout
    :is-opened="isOpened"
    @on-outside-close="emit('close-modal')"
  >
    <div class="finish-project bg-white rounded p-3 w-1">
      <div class="finish-project__header w-100">
        <Typography class-name="border-bottom text-primary fs-4 w-100">
          {{ sprint ? 'Завершение спринта' : 'Завершение проекта' }}
        </Typography>
        <Button
          @click="emit('close-modal')"
          variant="close"
        />
      </div>

      <div
        v-if="!isLoadingRequest"
        class="d-flex flex-column gap-2 w-100"
      >
        <div class="d-flex gap-3 text-primary">
          <div class="d-flex gap-1 w-25">
            Оценка
            <Icon
              v-if="props.sprint"
              class-name="bi bi-patch-question"
              v-tooltip="'Оценка - число вещественное от 0 до 10'"
            />
          </div>
          <div class="w-75">Участник</div>
        </div>

        <div
          v-if="sprint"
          class="finish-project__mark d-flex flex-column gap-2"
        >
          <div
            class="d-flex gap-3"
            v-for="(member, index) in props.project?.members.filter(
              ({ projectRole }) => projectRole !== 'INITIATOR',
            )"
            :key="index"
          >
            <div class="w-25">
              <Input
                :name="member.userId"
                placeholder="Оценка"
                class-name="rounded"
                validate-on-update
              />
            </div>

            <div class="finish-project__member border rounded px-2 w-75">
              <div class="finish-project__member-name">
                {{ member.firstName }} {{ member.lastName }}
              </div>
              <div :class="getRoleProjectMemberStyle(member.projectRole)">
                {{ getRoleProjectMember().translatedRoles[member.projectRole] }}
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="finish-project__mark d-flex flex-column gap-2"
        >
          <div
            class="d-flex gap-3"
            v-for="(member, index) in averageMark"
            :key="index"
          >
            <div class="w-25">
              <Input
                :name="member.userId"
                placeholder="Оценка"
                class-name="rounded"
                v-model="member.mark"
                disabled
                validate-on-update
              />
            </div>

            <div class="finish-project__member border rounded px-2 w-75">
              <div class="finish-project__member-name">
                {{ member.firstName }} {{ member.lastName }}
              </div>
              <div :class="getRoleProjectMemberStyle(member.projectRole)">
                {{ getRoleProjectMember().translatedRoles[member.projectRole] }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="d-flex flex-column gap-2 w-100"
      >
        <LoadingPlaceholder height="small" />
        <LoadingPlaceholder height="small" />
        <LoadingPlaceholder height="small" />
      </div>

      <div class="w-100">
        <div class="mb-2 text-primary">Отчет*</div>
        <Textarea
          name="report"
          class-name="finish-project__report rounded w-100"
          placeholder="Отчет"
          :disabled="props.project?.status === 'DONE'"
          v-model="report"
          validate-on-update
        >
          Отчет
        </Textarea>
      </div>

      <div
        v-if="props.sprint"
        class="d-flex gap-2 align-items-center"
      >
        <Button
          @click="FinishSprint"
          :is-loading="isLoading"
          :disabled="isLoading"
          variant="primary"
        >
          Завершить спринт
        </Button>
        <div
          v-if="props.unfinishedTasks?.length && !isLoading"
          class="text-danger"
        >
          Незавершенные задачи будут перенесены в бэклог*
        </div>
      </div>

      <Button
        v-else-if="props.project?.status !== 'DONE'"
        @click="FinishProject"
        :is-loading="isLoading"
        :disabled="isLoading"
        variant="primary"
      >
        Завершить проект
      </Button>
    </div>
  </ModalLayout>
</template>

<style lang="scss">
.finish-project {
  width: 100%;
  max-width: 600px;
  height: fit-content;
  max-height: 800px;
  @include flexible(
    flex-start,
    flex-start,
    column,
    $align-self: center,
    $justify-self: center,
    $gap: 16px
  );

  transition: all $default-transition-settings;

  &__header {
    @include flexible(center, space-between);
  }

  &__member {
    @include flexible(center, space-between);

    &-name {
      @include textEllipsis(1);
    }
  }

  &__mark {
    height: 100%;
    max-height: 220px;
    overflow-y: scroll;
  }

  &__report {
    resize: none;
    height: 200px;
  }

  &__tag {
    @include flexible(center, center);
  }
}

.collapse-controller {
  border-radius: 0;
  background-color: $white-color;

  @include flexible(center, flex-start);
}

.modal-layout-enter-from .finish-project,
.modal-layout-leave-to .finish-project {
  transform: scale(0.9);
}
</style>
