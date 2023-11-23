const hints = {
  name: 'Здесь Вы должны написать название для вашей идеи',
  wandtedTeamSize:
    'Необходимо указать желаемую численность команды, при наличии физических ограничений, т.е. если предполагается предоставление рабочих мест инициатором. В остальных случаях нужно оставить значение по умолчанию.',
  problem:
    'Необходимо указать проблему или потребность, которую решает предлагаемая идея. Из описания понятно, в чем нуждается потребитель идеи или от чего страдает.<br/>' +
    '<br/>Пример 1 (хороший): Пользователи соцсетей нуждаются в интересном или полезном контенте, которым могут предоставить HTML5 приложения<br/>' +
    '<br/>Пример 2: (плохой): В сети есть множество приложений, которые реализуют различные помощники и игры для досуга',
  solution:
    'Обязательно описать вид приложения: библиотека, модуль, Web приложение, Мобильное приложение, Desktop приложение, Web API, База данных и т.п. с указанием платформ (Windows, iOs, MacOS, Android, Linux).<br/>' +
    '<br/>Важно описать решение или указать для команд кандидатов, что решение нужно будет придумать в рамках реализации идеи',
  result:
    'Обязательно указать степень законченности решения.<br/>' +
    'Например:<br/>' +
    '✓ Решение подключено к существующей системе <br/>' +
    '✓ Решение реализовано на тестовой системе <br/>' +
    '✓ Решение спроектировано и проверено на прототипе ',
  description:
    'При наличии специальных требований инициатора к оборудованию, программам, участникам, которые необходимо использовать для выполнения работ по проекту или для развертывания решения, которые он не сможет предоставить и которые требуются от команды.<br/>' +
    '<br/>Например: Наличие MacBook, наличие специальных аккаунтов (gmail, apple и т.п.)',
  customer:
    'Выберите заказчика (компанию), к которой Вы принадлежите или от лица которой создаётся идея',
  stackCategories:
    'В стеке технологий необходимо указать минимальный набор технологий, которые должны быть использованы командой для реализации. Избегайте в одной идее конкурирующих между собой технологий. Например нельзя указать одновременно MYSQL и PostgreSQL или нельзя указать одновременно VueJS и ReactJS.<br/>' +
    '<br/>Желательно выбирать технологии, которыми Вы лучше всего владеете на практике и легко сможете дать оценку и консультацию команде студентов.',
}

const textareas = [
  {
    name: 'problem',
    label: 'Проблема*',
    placeholder: 'Опишите проблему, которую решает ваша идея',
    hint: hints.problem,
  },
  {
    name: 'solution',
    label: 'Предлагаемое решение*',
    placeholder: 'Опишите, что вы предлагаете для решения проблемы',
    hint: hints.solution,
  },
  {
    name: 'result',
    label: 'Ожидаемый результат*',
    placeholder: 'Опишите ожидаемый результат',
    hint: hints.result,
  },
  {
    name: 'description',
    label: 'Описание необходимых ресурсов для реализации*',
    placeholder: 'Укажите список требуемых для выполнения проекта ресурсов',
    hint: hints.description,
  },
]

export { textareas, hints }
