import LeftSideBarTabsType from './LeftSideBarTabs.types'

import getRoles from '@Utils/getRoles'

const leftSideBarTabs: LeftSideBarTabsType[] = [
  {
    id: 0,
    text: 'Список идей',
    to: '/ideas',
    iconName: 'bi bi-list',
    roles: getRoles(),
  },
  {
    id: 1,
    text: 'Добавить идею',
    to: '/add-idea',
    iconName: 'bi bi-plus-lg',
    roles: ['ADMIN', 'INITIATOR'],
  },
  {
    id: 2,
    text: 'Журнал изменений',
    to: '/history',
    iconName: 'bi bi-book',
    roles: getRoles(),
  },
  {
    id: 3,
    text: 'Админ панель',
    to: '/admin',
    routes: [
      { id: 0, to: '/admin/add-users', text: 'Добавить пользователей' },
      { id: 1, to: '/admin/edit-users', text: 'Редактировать пользователей' },
    ],
    iconName: 'bi bi-sliders',
    roles: ['ADMIN'],
  },
  {
    id: 4,
    text: 'Отчеты',
    to: '/notes',
    iconName: 'bi bi-file-earmark',
    roles: ['EXPERT', 'ADMIN'],
  },
]

export default leftSideBarTabs
