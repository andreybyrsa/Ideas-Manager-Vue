import Team from '@Domain/Team'
import Success from '@Domain/ResponseMessage'

import defineAxios from '@Utils/defineAxios'
import getMocks from '@Utils/getMocks'
import TeamMember from '@Domain/TeamMember'
import { TeamRequest, TeamRequestsAndInvitations } from '@Domain/TeamRequest'
import { TeamInvitations } from '@Domain/TeamInvitation'

const teamsAxios = defineAxios(getMocks().teams)
const teamMemberAxios = defineAxios(getMocks().teamMember)
const teamRequestAxios = defineAxios(getMocks().teamRequests)
const teamRequestsAndInvitations = defineAxios(getMocks().teamRequestsAndInvitations)
const unregisteredInvitations = defineAxios(getMocks().unregisteredInvitations)
const registeredInvitations = defineAxios(getMocks().registeredInvitations)

const getTeamMembers = async (token: string): Promise<TeamMember[] | Error> => {
  return await teamMemberAxios
    .get('/users/all', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка получения компетенций'
      return new Error(error)
    })
}

const getTeams = async (token: string): Promise<Team[] | Error> => {
  return await teamsAxios
    .get(`/team/all `, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка получения команд'
      return new Error(error)
    })
}

const getTeam = async (
  id: string | string[],
  token: string,
): Promise<Team | Error> => {
  return await teamsAxios
    .get(
      `/team/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      { params: { id: `${id}` } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка получения команды'
      return new Error(error)
    })
}

const createTeam = async (team: Team, token: string): Promise<Team | Error> => {
  return await teamsAxios
    .post(`/team/add`, team, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка создания команды'
      return new Error(error)
    })
}

const updateTeam = async (
  team: Team,
  id: number,
  token: string,
): Promise<Success | Error> => {
  return await teamsAxios
    .put<Success>(
      `/team/update/${id}`,
      team,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      { params: { id } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка обновления команды'
      return new Error(error)
    })
}

const deleteTeam = async (id: number, token: string): Promise<Success | Error> => {
  return await teamsAxios
    .delete(
      `/team/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      { responseData: { success: 'Успешное приглашение новых пользователей' } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка удаления команды'
      return new Error(error)
    })
}

const kickMember = async (
  member: TeamMember,
  teamId: number,
  token: string,
): Promise<Success | Error> => {
  return await teamMemberAxios
    .put<Success>(
      `/team/kick/${teamId}`,
      member,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      { params: { id: `${teamId}` } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка кика пользователя'
      return new Error(error)
    })
}

const deleteInvitation = async (
  invitationId: number,
  token: string,
): Promise<Success | Error> => {
  return await registeredInvitations
    .delete(
      `/team/send-invite/${invitationId}`,
      { headers: { Authorization: `Bearer ${token}` } },
      { responseData: { success: 'Успешное приглашение новых пользователей' } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка приглашения пользователя'
      return new Error(error)
    })
}

const invitePortalUsers = async (
  users: TeamInvitations,
  teamId: number,
  token: string,
): Promise<Success | Error> => {
  return await registeredInvitations
    .post<Success>(
      `/team/send-invite/${teamId}`,
      users,
      { headers: { Authorization: `Bearer ${token}` } },
      { responseData: { success: 'Успешное приглашение новых пользователей' } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка приглашения пользователя'
      return new Error(error)
    })
}

const inviteOutsideUsers = async (
  teamId: number,
  emails: TeamInvitations,
  token: string,
): Promise<Success | Error> => {
  return await unregisteredInvitations
    .post<Success>(
      `/team/send-invite-unregistered/${teamId}`,
      emails,
      { headers: { Authorization: `Bearer ${token}` } },
      {
        responseData: { success: 'Успешное приглашение новых пользователей' },
      },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка приглашения пользователя'
      return new Error(error)
    })
}

const fetchInvitationsAndRequestions = async (
  teamId: number,
  token: string,
): Promise<TeamRequestsAndInvitations | Error> => {
  return await teamRequestsAndInvitations
    .get(
      `/team/invitations/${teamId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      { params: { teamId: `${teamId}` } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка загрузки приглашений и заявок'
      return new Error(error)
    })
}

const getTeamRequest = async (
  id: string | string[],
  token: string,
): Promise<TeamRequest | Error> => {
  return await teamRequestAxios
    .get(
      `/team/request/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      { params: { id: `${id}` } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка загрузки заявки'
      return new Error(error)
    })
}

const sendRequest = async (
  teamId: number,
  teamRequest: TeamRequest,
  token: string,
): Promise<Success | Error> => {
  return await teamRequestAxios
    .post<Success>(
      `/team/request/${teamId}`,
      teamRequest,
      { headers: { Authorization: `Bearer ${token}` } },
      { responseData: { success: 'Успешная отправка заявки' } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Ошибка отправки заявления'
      return new Error(error)
    })
}

const rejectRequest = async (
  requestId: number,
  token: string,
): Promise<Success | Error> => {
  return await teamRequestAxios
    .delete(
      `reject-request/${requestId}`,
      { headers: { Authorization: `Bearer ${token}` } },
      { params: { id: `${requestId}` } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Не удалось отклонить заявку'
      return Error(error)
    })
}

const acceptRequest = async (
  requestId: number,
  token: string,
): Promise<Success | Error> => {
  return await teamRequestAxios
    .delete(
      `accept-request/${requestId}`,
      { headers: { Authorization: `Bearer ${token}` } },
      { params: { id: `${requestId}` } },
    )
    .then((response) => response.data)
    .catch(({ response }) => {
      const error = response?.data?.error ?? 'Не удалось принять заявку'
      return Error(error)
    })
}
const TeamService = {
  getTeamMembers,
  getTeams,
  getTeam,
  createTeam,
  invitePortalUsers,
  inviteOutsideUsers,
  deleteInvitation,
  fetchInvitationsAndRequestions,
  kickMember,
  updateTeam,
  deleteTeam,
  sendRequest,
  getTeamRequest,
  rejectRequest,
  acceptRequest,
}

export default TeamService
