import { User } from '@Domain/User'
import { Skill } from '@Domain/Skill'
import UsersGroup from '@Domain/UsersGroup'
import Comment from '@Domain/Comment'
import { Idea, IdeaSkills, Rating } from '@Domain/Idea'
import Team from '@Domain/Team'
import TeamMember from '@Domain/TeamMember'
import Market from '@Domain/Market'
import RequestTeams from '@Domain/RequestTeams'

interface Mocks {
  users: User[]
  usersEmails: string[]
  skills: Skill[]
  usersGroups: UsersGroup[]
  teamMember: TeamMember[]
  comments: Comment[]
  ideas: Idea[]
  ideasMarket: Market[]
  ratings: Rating[]
  ideasSkills: IdeaSkills[]
  teams: Team[]
  RequestTeams: RequestTeams[]
}

function getMocks(): Mocks {
  const users: User[] = [
    {
      id: 0,
      token: '10296538',
      email: 'andrey@mail.com',
      firstName: 'Андрей',
      lastName: 'Бырса',
      roles: ['INITIATOR', 'PROJECT_OFFICE', 'EXPERT', 'ADMIN'],
    },
    {
      id: 1,
      token: '613098',
      email: 'timyr@mail.com',
      firstName: 'Тимур',
      lastName: 'Минязев',
      roles: ['INITIATOR', 'PROJECT_OFFICE', 'EXPERT', 'ADMIN'],
    },
    {
      id: 2,
      token: '059182',
      email: 'kirill.vlasov.05@inbox.ru',
      firstName: 'Кирилл',
      lastName: 'Власов',
      roles: ['INITIATOR', 'PROJECT_OFFICE', 'EXPERT', 'ADMIN'],
    },
    {
      id: 3,
      token: '163097',
      email: 'maga@mail.com',
      firstName: 'Мамедага',
      lastName: 'Байрамов',
      roles: ['INITIATOR', 'PROJECT_OFFICE', 'EXPERT', 'ADMIN'],
    },
  ]

  const usersEmails: string[] = users.map((user) => user.email)

  const skills: Skill[] = [
    {
      id: 0,
      name: 'JavaScript',
      type: 'LANGUAGE',
      confirmed: true,
    },
    {
      id: 1,
      name: 'ReactJS',
      type: 'FRAMEWORK',
      confirmed: true,
    },
    {
      id: 2,
      name: 'C++',
      type: 'LANGUAGE',
      confirmed: false,
    },
    {
      id: 3,
      name: 'Docker',
      type: 'DEVOPS',
      confirmed: true,
    },
    {
      id: 4,
      name: 'MongoDB',
      type: 'DATABASE',
      confirmed: true,
    },
  ]

  const usersGroups: UsersGroup[] = [
    {
      id: 0,
      name: 'Группа разработчиков',
      users: [...users],
      roles: ['INITIATOR'],
    },
    {
      id: 1,
      name: 'Группа экспертов',
      users: [],
      roles: ['ADMIN', 'EXPERT'],
    },
  ]

  const teamMember: TeamMember[] = [
    {
      email: 'andrey@mail.com',
      firstName: 'Админ',
      lastName: 'Адмиг',

      skills: [...skills],
    },
    {
      email: 'timyr@mail.com',
      firstName: 'Тимур',
      lastName: 'Минязев',

      skills: [
        {
          id: 2,
          name: 'C++',
          type: 'LANGUAGE',
          confirmed: false,
        },
      ],
    },
    {
      email: 'kirill.vlasov.05@index.ru',
      firstName: 'Кирилл',
      lastName: 'Власов',

      skills: [
        {
          id: 0,
          name: 'JavaScript',
          type: 'LANGUAGE',
          confirmed: true,
        },
        {
          id: 1,
          name: 'React JS',
          type: 'FRAMEWORK',
          confirmed: true,
        },
      ],
    },
    {
      email: 'maga@mail.com',
      firstName: 'Мамедага',
      lastName: 'Байрамов',

      skills: [...skills],
    },
  ]

  const comments: Comment[] = [
    {
      id: 0,
      ideaId: 0,
      createdAt: '2023-10-20T11:02:17Z',

      senderEmail: 'andrey@mail.com',
      text: 'Комментарий 1',
      checkedBy: [],
    },
    {
      id: 1,
      ideaId: 0,
      createdAt: '2023-10-21T11:02:17Z',

      senderEmail: 'timyr@mail.com',
      text: 'Комментарий 2',
      checkedBy: [0, 1],
    },
    {
      id: 2,
      ideaId: 1,
      createdAt: '2023-10-21T11:02:17Z',

      senderEmail: 'kirill.vlasov.05@inbox.ru',
      text: 'Комментарий 3',
      checkedBy: [],
    },
  ]

  const ratings: Rating[] = [
    {
      id: 0,
      ideaId: 0,
      expertId: 0,
      budget: 1,
      technicalRealizability: 1,
      suitability: 2,
      rating: 8 / 5,
      originality: 3,
      marketValue: 1,
      confirmed: false,
    },
    {
      id: 1,
      ideaId: 0,
      expertId: 1,
      budget: 2,
      technicalRealizability: 4,
      suitability: 5,
      rating: 14 / 5,
      originality: 1,
      marketValue: 2,
      confirmed: false,
    },
    {
      id: 2,
      ideaId: 1,
      expertId: 2,
      budget: 1,
      technicalRealizability: 1,
      suitability: 5,
      rating: null,
      originality: null,
      marketValue: null,
      confirmed: false,
    },
  ]

  const ideas: Idea[] = [
    {
      id: 0,
      initiator: 'andrey@mail.com',
      name: 'Рефактор кода',
      projectType: 'INSIDE',
      problem:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      solution:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      result:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      createdAt: '2023-10-21T11:02:17Z',
      modifiedAt: '2023-10-26T11:02:17Z',
      status: 'ON_CONFIRMATION',
      customer: 'ВШЦТ',
      contactPerson: 'ВШЦТ',
      experts: null,
      projectOffice: null,
      budget: 1,
      suitability: 1,
      technicalRealizability: 1,
      preAssessment: 1,
      rating: 3,
    },
    {
      id: 1,
      initiator: 'kirill.vlasov.05@inbox.ru',
      name: 'Реактор железного человека',
      projectType: 'INSIDE',
      problem:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      solution:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      result:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      createdAt: '2023-10-24T11:02:17Z',
      modifiedAt: '2023-10-25T11:02:17Z',
      status: 'NEW',
      customer: 'ВШЦТ',
      contactPerson: 'ВШЦТ',
      experts: null,
      projectOffice: null,
      budget: 4,
      suitability: 3,
      technicalRealizability: 5,
      preAssessment: 4,
      rating: 2,
    },
    {
      id: 2,
      initiator: 'admin@mail.com',
      name: 'Идея 2',
      projectType: 'INSIDE',
      problem:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      solution:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      result:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      createdAt: '2023-10-25T11:02:17Z',
      modifiedAt: '2023-10-25T11:02:17Z',
      status: 'NEW',
      customer: 'ВШЦТ',
      contactPerson: 'ВШЦТ',
      experts: null,
      projectOffice: null,
      budget: 4,
      suitability: 3,
      technicalRealizability: 5,
      preAssessment: 4,
      rating: 4,
    },
  ]

  const ideasSkills: IdeaSkills[] = [
    { ideaId: 0, skills: [...skills] },
    {
      ideaId: 1,
      skills: [skills[0], skills[2]],
    },
  ]

  const ideasMarket: Market[] = [
    {
      id: 1,
      position: '1',
      name: 'BaccaratHelper',
      initiator: 'kirill.vlasov.05@inbox.ru',
      problem:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      solution:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      result:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      stack: 'ReactJS',
      creationDate: '2023-10-20T11:02:17Z',
      members: 8,
      customer: 'ВШЦТ',
      teamSize: 10,
      status: 'Открыта',
      numberofRequests: 2,
      isFavorite: false,
    },
    {
      id: 2,
      position: '2',
      name: 'Vaccarat',
      initiator: 'andrey@mail.com',
      problem:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      solution:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      result:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      stack: 'ReactJS',
      creationDate: '2023-10-20T11:02:17Z',
      members: 4,
      customer: 'ВШЦТ',
      teamSize: 10,
      status: 'Открыта',
      numberofRequests: 0,
      isFavorite: false,
    },
    {
      id: 3,
      position: '3',
      name: 'Insensible',
      initiator: 'timyr@mail.com',
      problem:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      solution:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      result:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      stack: 'Django',
      creationDate: '2023-10-20T11:02:17Z',
      members: 10,
      customer: 'ВШЦТ',
      teamSize: 10,
      status: 'Открыта',
      numberofRequests: 0,
      isFavorite: false,
    },
  ]

  const teams: Team[] = [
    {
      id: 10,
      name: 'Фронтендеры',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      membersCount: 4,
      owner: users[0],
      leader: users[1],
      members: [...users],
      skills: [...skills],
    },
    {
      id: 11,
      name: 'Бэккендеры',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      membersCount: 4,
      owner: users[2],
      leader: users[1],
      members: [...users],
      skills: [...skills],
    },
    {
      id: 12,
      name: 'Мушкетеры',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      membersCount: 4,
      owner: users[2],
      leader: users[1],
      members: [users[3]],
      skills: [skills[0]],
    },
  ]

  const RequestTeams: RequestTeams[] = [
    {
      id: 0,
      ideaId: 1,
      accepted: false,
      teamId: 0,

      name: 'Первые разрабы мира',
      closed: false,
      membersCount: 4,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      owner: users[1],
      leader: users[2],
      members: [...users],
      skills: [...skills],
      createdAt: '2023-10-20T11:02:17Z',
      letter:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorbeatae ipsum dicta omnis adipisci magni autem eos quisquam doloresmaxime. Dignissimos cum nulla consequatur accusantium distinctioaut. Velit, assumenda porro!',
    },
    {
      id: 1,
      ideaId: 1,
      accepted: false,
      teamId: 1,

      name: 'Программисты из apple',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      membersCount: 4,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      owner: users[1],
      leader: users[2],
      members: [...users],
      skills: [...skills],
      letter:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorbeatae ipsum dicta omnis adipisci magni autem eos quisquam doloresmaxime. Dignissimos cum nulla consequatur accusantium distinctioaut. Velit, assumenda porro!',
    },
    {
      id: 2,
      ideaId: 1,
      accepted: true,
      teamId: 2,

      name: 'Удальцы',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      membersCount: 4,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      owner: users[1],
      leader: users[2],
      members: [...users],
      skills: [...skills],
      letter:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorbeatae ipsum dicta omnis adipisci magni autem eos quisquam doloresmaxime. Dignissimos cum nulla consequatur accusantium distinctioaut. Velit, assumenda porro!',
    },
    {
      id: 3,
      ideaId: 1,
      accepted: true,
      teamId: 3,

      name: 'Молодцы',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      membersCount: 4,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      owner: users[1],
      leader: users[2],
      members: [...users],
      skills: [...skills],
      letter:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorbeatae ipsum dicta omnis adipisci magni autem eos quisquam doloresmaxime. Dignissimos cum nulla consequatur accusantium distinctioaut. Velit, assumenda porro!',
    },
    {
      id: 4,
      ideaId: 2,
      accepted: false,
      teamId: 4,

      name: 'Хорошая компания',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      owner: users[1],
      leader: users[2],
      membersCount: 4,
      members: [...users],
      skills: [...skills],
      letter:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorbeatae ipsum dicta omnis adipisci magni autem eos quisquam doloresmaxime. Dignissimos cum nulla consequatur accusantium distinctioaut. Velit, assumenda porro!',
    },
    {
      id: 5,
      ideaId: 2,
      accepted: false,
      teamId: 5,

      name: 'Негатив',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      owner: users[1],
      leader: users[2],
      membersCount: 4,
      members: [...users],
      skills: [...skills],
      letter:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorbeatae ipsum dicta omnis adipisci magni autem eos quisquam doloresmaxime. Dignissimos cum nulla consequatur accusantium distinctioaut. Velit, assumenda porro!',
    },
    {
      id: 6,
      ideaId: 2,
      accepted: true,
      teamId: 6,

      name: 'Позитив',
      closed: false,
      createdAt: '2023-10-20T11:02:17Z',
      membersCount: 4,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aperiam delectus possimus, voluptates quo accusamus? Consequatur, quasi rem temporibus blanditiis delectus aliquid officia aut, totam incidunt reiciendis eaque laborum fugiat!',
      owner: users[1],
      leader: users[2],
      members: [...users],
      skills: [...skills],
      letter:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorbeatae ipsum dicta omnis adipisci magni autem eos quisquam doloresmaxime. Dignissimos cum nulla consequatur accusantium distinctioaut. Velit, assumenda porro!',
    },
  ]

  return {
    users,
    usersEmails,
    teamMember,
    skills,
    usersGroups,
    comments,
    ratings,
    ideas,
    ideasMarket,
    ideasSkills,
    teams,
    RequestTeams,
  }
}

export default getMocks
