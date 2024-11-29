<script lang="ts" setup>
import { onMounted, ref, VueElement, watch } from 'vue'
import { watchImmediate, useElementHover } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import NavTab from '@Components/NavTab/NavTab.vue'
import Button from '@Components/Button/Button.vue'
import LeftSideBarTabType from '@Components/LeftSideBar/LeftSideBar.types'
import LeftSideBarTabs from '@Components/LeftSideBar/LeftsSideBarTabs'
import RoleModal from '@Components/Modals/RoleModal/RoleModal.vue'
import LeftSideBarPlaceholder from '@Components/LeftSideBar/LeftSideBarPlaceholder.vue'
import NotificationModalWindow from '@Components/Modals/NotificationModalWindow/NotificationModalWindow.vue'

import RolesTypes from '@Domain/Roles'
import { Market } from '@Domain/Market'

import useUserStore from '@Store/user/userStore'
import useNotificationsStore from '@Store/notifications/notificationsStore'
import useMarketsStore from '@Store/markets/marketsStore'
import useProjectStore from '@Store/projects/projectsStore'

import { getUserRolesInfo } from '@Utils/userRolesInfo'
import { Project } from '@Domain/Project'
import { ACCESS_TOKEN_KEY } from '@Services/LoginService'

const notificationsStore = useNotificationsStore()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const marketsStore = useMarketsStore()
const { markets } = storeToRefs(marketsStore)

const projectStore = useProjectStore()
const { myActiveProjects } = storeToRefs(projectStore)

const router = useRouter()

const tabs = ref(structuredClone(LeftSideBarTabs))

const isOpenedRoleModal = ref(false)
const isOpenedNotificationsModal = ref(false)

const userRoles = getUserRolesInfo()

const leftSideBarRef = ref<VueElement | null>(null)
const LeftSideBarClassName = ref<string[]>()

const activeProjects = ref<Project[]>([])

const isHovered = useElementHover(leftSideBarRef, {
  delayEnter: 400,
})

// Роутер биржи
onMounted(getActiveMarkets)

watch(
  () => markets.value,
  (newMarkets) => {
    if (newMarkets.length > 0) {
      const marketIndex = tabs.value.findIndex(({ name }) => name === 'markets')
      if (marketIndex !== -1) updateActiveMarketRoute(newMarkets, marketIndex)
    }
  },
  { immediate: true, deep: true },
)

function updateActiveMarketRoute(activeMarkets: Market[], index: number) {
  const initialMarketRoutes: LeftSideBarTabType[] =
    LeftSideBarTabs[index].routes ?? []
  const marketRoutes: LeftSideBarTabType[] = activeMarkets.map(({ id, name }) => ({
    name: `market-${id}`,
    text: name,
    roles: [
      'INITIATOR',
      'MEMBER',
      'TEAM_OWNER',
      'TEAM_LEADER',
      'PROJECT_OFFICE',
      'ADMIN',
      'TEACHER',
    ],
    iconName: 'bi bi-basket3',
    to: `/market/${id}`,
  }))

  tabs.value[index].routes = [...initialMarketRoutes, ...marketRoutes]
}

async function getActiveMarkets() {
  const currentUser = user.value

  if (currentUser?.token && currentUser.role !== 'EXPERT') {
    const { token } = currentUser
    const index = tabs.value.findIndex(({ name }) => name === 'markets')

    const spliceMarketsTab = () => {
      if (index !== -1) tabs.value.splice(index, 1)
    }

    const response = await marketsStore.getAllActiveMarkets(token)

    if (response instanceof Error) {
      spliceMarketsTab()
      return notificationsStore.createSystemNotification('Система', response.message)
    }

    if (
      response.length === 0 &&
      user.value?.role !== 'ADMIN' &&
      user.value?.role !== 'PROJECT_OFFICE' &&
      user.value?.role !== 'TEACHER'
    ) {
      spliceMarketsTab()
    } else if (index !== -1) {
      updateActiveMarketRoute(response, index)
    }
  }
}

// Роутер проектов
onMounted(async () => {
  await getActiveProjects()
})

function updateRolesByTabProject() {
  const currentRole = user.value?.role
  if (
    currentRole !== 'ADMIN' &&
    currentRole !== 'PROJECT_OFFICE' &&
    currentRole !== 'TEACHER'
  ) {
    tabs.value.forEach(
      (tab) =>
        tab.name === 'projects' &&
        (tab.roles = tab.roles.filter(
          (role) =>
            role === 'ADMIN' || role === 'PROJECT_OFFICE' || role === 'TEACHER',
        )),
    )
  } else if (myActiveProjects.value.length === 0) {
    tabs.value.forEach(
      (tab) =>
        tab.name === 'projects' &&
        tab.roles.push('INITIATOR', 'MEMBER', 'TEAM_LEADER', 'TEAM_OWNER'),
    )
  }
}

watch(
  myActiveProjects,
  (projects) => {
    const projectIndex = tabs.value.findIndex(({ name }) => name === 'projects')
    if (projectIndex !== -1) updateActiveProjectRoute(projects, projectIndex)
  },
  { deep: true },
)

watch(
  () => user.value?.role,
  () => {
    if (activeProjects.value.length === 0) updateRolesByTabProject()
  },
  { deep: true },
)

function updateActiveProjectRoute(activeProjects: Project[], index: number) {
  const initialProjectRoutes: LeftSideBarTabType[] =
    LeftSideBarTabs[index].routes ?? []
  const projectRoutes: LeftSideBarTabType[] = activeProjects.map(({ id, name }) => ({
    name: `project-${id}`,
    text: name,
    roles: ['INITIATOR', 'MEMBER', 'TEAM_OWNER', 'TEAM_LEADER'],
    iconName: 'bi bi-kanban',
    to: `/projects/${id}`,
  }))
  tabs.value[index].routes = [...initialProjectRoutes, ...projectRoutes]
}

async function getActiveProjects() {
  const currentUser = user.value
  if (currentUser?.token && currentUser.role !== 'EXPERT') {
    const { token, id } = currentUser
    const projectsIndex = tabs.value.findIndex(({ name }) => name === 'projects')
    const spliceMarketsTab = () => {
      if (projectsIndex !== -1) tabs.value.splice(projectsIndex, 1)
    }
    const response = await projectStore.getMyProjects(id, token)
    if (response instanceof Error) {
      spliceMarketsTab()
      return notificationsStore.createSystemNotification('Система', response.message)
    }
    activeProjects.value = response
    if (activeProjects.value.length === 0) {
      updateRolesByTabProject()
    } else if (projectsIndex !== -1) {
      updateActiveProjectRoute(activeProjects.value, projectsIndex)
    }
  }
}

watchImmediate(isHovered, (value, prevValue) => {
  const opendAnimationClass = value ? 'left-side-bar--opened' : ''
  const closeAnimationClass = prevValue ? 'left-side-bar--closed' : ''

  LeftSideBarClassName.value = [
    'left-side-bar p-3 h-100',
    opendAnimationClass,
    closeAnimationClass,
  ]
})

function checkUserRole(tab: LeftSideBarTabType) {
  const currentRole = user.value?.role
  return currentRole && tab.roles.includes(currentRole)
}

function handleLogout() {
  userStore.logoutUser()
}

function getTranslatedRole(currentRole: RolesTypes) {
  return userRoles.translatedRoles[currentRole]
}

function handleOpenRoleModal() {
  isOpenedRoleModal.value = true
}

function handleCloseRoleModal() {
  isOpenedRoleModal.value = false
}

function handleCloseNotificationModal() {
  isOpenedNotificationsModal.value = false
}
</script>

<template>
  <div
    v-if="user?.role"
    ref="leftSideBarRef"
    :class="LeftSideBarClassName"
  >
    <ul class="left-side-bar__content nav nav-pills w-100 gap-2">
      <template
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <NavTab
          v-if="checkUserRole(tab)"
          :wrapper-class-name="isHovered ? 'left-side-bar__link w-100' : ''"
          :class-name="isHovered ? 'text-white' : ''"
          :icon-name="tab.iconName"
          :label="isHovered ? tab.text : ''"
          :to="tab.to"
          :routes="tab.routes"
        />
      </template>
    </ul>

    <div class="d-flex flex-column gap-2">
      <Button
        class-name="left-side-bar__button btn-light w-100 text-success"
        prepend-icon-name="bi bi-circle-fill fs-6"
        @click="handleOpenRoleModal"
        :disabled="user?.roles.length === 1"
      >
        {{ isHovered ? getTranslatedRole(user.role) : '' }}
      </Button>

      <Button
        class-name="left-side-bar__button btn-light w-100"
        @click="handleLogout"
        prepend-icon-name="bi bi-box-arrow-left"
      >
        {{ isHovered ? 'Выйти' : '' }}
      </Button>
    </div>

    <RoleModal
      :is-opened="isOpenedRoleModal"
      @close-modal="handleCloseRoleModal"
    />

    <NotificationModalWindow
      :is-opened="isOpenedNotificationsModal"
      @close-modal="handleCloseNotificationModal"
    />
  </div>

  <LeftSideBarPlaceholder v-else />
</template>

<style lang="scss" scoped>
.left-side-bar {
  @include position(relative, $z-index: 8);

  overflow-x: hidden;

  @include flexible(stretch, space-between, column, $gap: 8px);

  &__content {
    @include fixedWidth(280px);

    @include flexible(flex-start, flex-start, column, $gap: 8px);
  }

  &__link {
    border-radius: 6px;

    transition: background-color $default-transition-settings;

    &:hover {
      background-color: #0000006c;
    }
  }

  &__button {
    @include fixedHeight(40px);
  }

  &--opened {
    color: $white-color;

    animation: openLeftSideBar 0.15s ease-out forwards;
  }

  &--closed {
    animation: closeLeftSideBar 0.15s ease-out forwards;
  }
}

@keyframes openLeftSideBar {
  from {
    width: 80px;
    background-color: transparent;
  }
  to {
    width: 312px;
    background-color: #000000ba;
  }
}

@keyframes closeLeftSideBar {
  from {
    width: 312px;
    background-color: #00000080;
  }
  to {
    width: 80px;
    background-color: transparent;
  }
}
</style>
