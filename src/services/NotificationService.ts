import axios from 'axios'

import { MODE, API_URL } from '@Main'

import Notification from '@Domain/Notification'

import useUserStore from '@Store/user/userStore'

import defineAxios from '@Utils/defineAxios'
import getMocks from '@Utils/getMocks'
import getAbortedSignal from '@Utils/getAbortedSignal'
import handleAxiosError from '@Utils/handleAxiosError'

const notificationsAxios = defineAxios(getMocks().notifications)

const getNotifications = async (token: string): Promise<Notification[] | Error> => {
  return notificationsAxios
    .get('/notification/all', {
      headers: { Authorization: `Bearer ${token}` },
      signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
    })
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка загрузки уведомлений'))
}

const getFavoriteNotifications = async (
  token: string,
): Promise<Notification[] | Error> => {
  return notificationsAxios
    .get('/notification/favourite', {
      headers: { Authorization: `Bearer ${token}` },
      signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
    })
    .then((response) => response.data)
    .catch((error) =>
      handleAxiosError(error, 'Ошибка загрузки избранных уведомлений'),
    )
}

const createNotification = async (
  notification: Notification,
  token: string,
): Promise<Notification | Error> => {
  return notificationsAxios
    .post('/notification/create', notification, {
      headers: { Authorization: `Bearer ${token}` },
      signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
    })
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка создания уведомления'))
}

const markAsFavoriteNotification = async (
  id: string,
  token: string,
): Promise<Notification | Error> => {
  return notificationsAxios
    .putNoRequestBody<Notification>(
      `/notification/favourite/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
      },
      { params: { id }, requestData: { isFavourite: true } },
    )
    .then((response) => response.data)
    .catch((error) =>
      handleAxiosError(error, 'Ошибка добавления уведомления в избранное'),
    )
}

const unMarkAsFavoriteNotification = async (
  id: string,
  token: string,
): Promise<Notification | Error> => {
  return notificationsAxios
    .putNoRequestBody<Notification>(
      `/notification/unfavourite/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
      },
      { params: { id }, requestData: { isFavourite: false } },
    )
    .then((response) => response.data)
    .catch((error) =>
      handleAxiosError(error, 'Ошибка удаления уведомления из избранного'),
    )
}

const readNotification = async (
  id: string,
  token: string,
): Promise<void | Error> => {
  return notificationsAxios
    .putNoRequestBody<void>(
      `/notification/read/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
      },
      { params: { id }, requestData: { isReaded: true } },
    )
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка чтения уведомления'))
}

const readAllNotifications = async (token: string): Promise<void | Error> => {
  if (MODE === 'DEVELOPMENT') {
    const notifications = notificationsAxios.getReactiveMocks()
    return notifications.value.forEach(
      (notification) =>
        notification.isReaded === false && (notification.isReaded = true),
    )
  }

  return axios
    .put(`${API_URL}/notification/read/all`, null, {
      headers: { Authorization: `Bearer ${token}` },
      signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
    })
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка чтения всех уведомлений'))
}

const closeNotification = async (
  id: string,
  token: string,
): Promise<void | Error> => {
  return notificationsAxios
    .putNoRequestBody<void>(
      `/notification/show/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
      },
      {
        params: { id },
        requestData: { isShowed: true },
      },
    )
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка закрытия уведомления'))
}

const NotificatonsService = {
  getNotifications,
  getFavoriteNotifications,

  createNotification,

  markAsFavoriteNotification,
  unMarkAsFavoriteNotification,
  readNotification,
  readAllNotifications,
  closeNotification,
}

export default NotificatonsService
