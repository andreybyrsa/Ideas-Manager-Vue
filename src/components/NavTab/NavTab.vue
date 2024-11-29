<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { NavTabProps } from '@Components/NavTab/NavTab.types'
import Collapse from '@Components/Collapse/Collapse.vue'
import Icon from '@Components/Icon/Icon.vue'
import Typography from '@Components/Typography/Typography.vue'

import RolesTypes from '@Domain/Roles'

import useUserStore from '@Store/user/userStore'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const props = defineProps<NavTabProps>()
const WrapperClassName = computed(() => ['nav-item', props.wrapperClassName])
const route = useRoute()

const NavTabClassName = computed(() => [
  'nav-link d-flex w-100',
  { active: props.isActive },
  props.className,
])

function checkUserRole(roles: RolesTypes[]) {
  const currentUser = user.value
  return currentUser?.role && roles.includes(currentUser.role)
}

function checkIsActiveRoute(to: string) {
  return route.fullPath.includes(to) && 'bg-primary text-white'
}
</script>

<template>
  <div :class="WrapperClassName">
    <router-link
      v-if="!routes"
      :class="NavTabClassName"
      :to="to"
      active-class="active"
    >
      <Icon
        v-if="iconName"
        :class-name="`${iconName} fs-5`"
      />

      <Typography
        v-if="label"
        class-name="ms-2"
      >
        {{ label }}
      </Typography>
    </router-link>

    <button
      v-else
      :class="[...NavTabClassName, checkIsActiveRoute(to)]"
      v-collapse="to"
    >
      <Icon
        v-if="iconName"
        :class-name="`${iconName} fs-5`"
      />

      <Typography
        v-if="label"
        class-name="ms-2"
      >
        {{ label }}</Typography
      >
    </button>

    <Collapse
      v-if="routes"
      :id="to"
    >
      <div class="pt-2 rounded">
        <template
          v-for="route in routes"
          :key="route.to"
        >
          <router-link
            v-if="checkUserRole(route.roles)"
            class="nav-route list-group-item list-group-item-light"
            active-class="active"
            :to="route.to"
          >
            <Icon
              v-if="route.iconName"
              :class-name="route.iconName"
            />

            <span
              class="nav-route__span"
              v-if="label"
              >{{ route.text }}</span
            >
          </router-link>
        </template>
      </div>
    </Collapse>
  </div>
</template>

<style lang="scss" scoped>
.nav-link {
  @include fixedHeight(40px);

  color: $black-color;

  @include flexible(center, flex-start, $gap: 4px);
}

.nav-route {
  @include fixedHeight(40px);

  @include flexible(center, flex-start, $gap: 4px);

  &__span {
    @include textEllipsis(1);
  }
}
</style>
