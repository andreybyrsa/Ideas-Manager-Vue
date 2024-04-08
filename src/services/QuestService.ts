import { Quest, QuestShort } from '@Domain/Quest'
import { QUEST_SERVICE_URL } from '@Main'

import useUserStore from '@Store/user/userStore'

import defineAxios from '@Utils/defineAxios'
import getAbortedSignal from '@Utils/getAbortedSignal'
import { questsMocks, questsShortMocks } from '@Utils/getMocks'
import handleAxiosError from '@Utils/handleAxiosError'

const questsShortAxios = defineAxios(questsShortMocks)
const questAxios = defineAxios(questsMocks)

// --- GET --- //
const getQuests = async (token: string): Promise<QuestShort[] | Error> => {
  return questsShortAxios
    .get(`${QUEST_SERVICE_URL}/template/all`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
    })
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка загрузки опросов.'))
}

const getQuest = async (idQuest: string, token: string): Promise<Quest | Error> => {
  return questAxios
    .get(
      `${QUEST_SERVICE_URL}/template/`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
      },
      { params: { idQuest } },
    )
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка получения опроса.'))
}

const postQuest = async (quest: Quest, token: string): Promise<Quest | Error> => {
  return questAxios
    .post(`${QUEST_SERVICE_URL}/template/create`, quest, {
      headers: { Authorization: `Bearer ${token}` },
      signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
    })
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка отправки опроса.'))
}

const QuestService = {
  getQuests,
  getQuest,
  postQuest,
}

export default QuestService
