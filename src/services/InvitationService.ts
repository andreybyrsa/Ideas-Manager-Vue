import axios from 'axios'

import {
  InviteUserForm,
  InviteUsersForm,
  InvitationInfo,
  RecoveryData,
  NewEmailForm,
} from '@Domain/Invitation'
import ResponseMessage from '@Domain/ResponseMessage'
import { ChangeUserEmail } from '@Domain/ManageUsers'

const INVITATION_URL =
  process.env.VUE_APP_INVITATION_API_URL || 'http://localhost:3000'

const inviteUserByEmail = async (
  userData: InviteUserForm,
  token: string,
): Promise<ResponseMessage> => {
  return await axios
    .post(`${INVITATION_URL}/send/email`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response
        ? response.data.error
        : 'Ошибка приглашения пользователя'
      return { error }
    })
}

const inviteUsers = async (
  usersData: InviteUsersForm,
  token: string,
): Promise<ResponseMessage> => {
  return await axios
    .post(`${INVITATION_URL}/send/emails`, usersData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response
        ? response.data.error
        : 'Ошибка приглашения пользователей'
      return { error }
    })
}

const sendRecoveryEmail = async (
  recoveryData: RecoveryData,
): Promise<{ key: string } & ResponseMessage> => {
  return await axios
    .post(`${INVITATION_URL}/send/request-to-change-password`, recoveryData)
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response ? response.data.error : 'Ошибка отпрваки почты'
      return { error }
    })
}

const getInvitationInfo = async (
  slug: string | string[],
): Promise<InvitationInfo & ResponseMessage> => {
  return await axios
    .get(`${INVITATION_URL}/get/invitation/${slug}`)
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response ? response.data.error : 'Ошибка приглашения'
      return { error }
    })
}

const deleteInvitationInfo = async (slug: string | string[]) => {
  return await axios
    .delete(`${INVITATION_URL}/delete/invitation/${slug}`)
    .catch<ResponseMessage>(({ response }) => {
      const error = response
        ? response.data.error
        : 'Ошибка удаления приглашения'
      return { error }
    })
}

const sendUrlToChangeEmail = async (
  userData: NewEmailForm,
  token: string,
): Promise<ResponseMessage> => {
  return await axios
    .post(`${INVITATION_URL}/send/request-to-change-email`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response
        ? response.data.error
        : 'Ошибка отправки ссылки для смены почты'
      return { error }
    })
}

const InvitationService = {
  inviteUserByEmail,
  inviteUsers,
  sendRecoveryEmail,
  getInvitationInfo,
  deleteInvitationInfo,
  sendUrlToChangeEmail,
}

export default InvitationService
