import { Indicator } from '@Domain/Quest'

import useUserStore from '@Store/user/userStore'

import defineAxios from '@Utils/defineAxios'
import getAbortedSignal from '@Utils/getAbortedSignal'
import { indicatorsMocks } from '@Utils/getMocks'
import handleAxiosError from '@Utils/handleAxiosError'

const indicatorAxios = defineAxios(indicatorsMocks)

function formatIndicators(indicators: Indicator[]): Indicator[] {
  return indicators.slice()
}

// --- GET --- //
const getIndicators = async (token: string): Promise<Indicator[] | Error> => {
  return indicatorAxios
    .get<Indicator[] | Error>(
      '/indicators/all',
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
      },
      { formatter: formatIndicators },
    )
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка загрузки вопросов.'))
}

// --- POST --- //
const postIndicator = async (
  indicator: Indicator,
  token: string,
): Promise<Indicator | Error> => {
  return indicatorAxios
    .post('/indicator', indicator, {
      headers: { Authorization: `Bearer ${token}` },
      signal: getAbortedSignal(useUserStore().checkIsExpiredToken),
    })
    .then((response) => response.data)
    .catch((error) => handleAxiosError(error, 'Ошибка создания вопроса.'))
}

const IndicatorService = {
  getIndicators,
  postIndicator,
}

export default IndicatorService
