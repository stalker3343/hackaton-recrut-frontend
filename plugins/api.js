import createRepository from '@/api/repository'

export default function ({ $axios }, inject) {
  const repositoryWithAxios = createRepository($axios)

  inject('gradeRequestsRepository', {
    ...repositoryWithAxios('http://194.87.144.227:8000/grade-requests'),
    load(payload) {
      return $axios.$post(
        `http://194.87.144.227:8000/grade-requests/load`,
        payload
      )
    },
    tests(id, arr) {
      return $axios.$post(
        `http://194.87.144.227:8000/grade-requests/${id}/tests`,
        {
          tests: arr,
        }
      )
    },

    addHr(requestId, userId) {
      return $axios.$put(
        `http://194.87.144.227:8000/grade-requests/${requestId}/hr/${userId}`
      )
    },
    addTechLead(requestId, userId) {
      return $axios.$put(
        `http://194.87.144.227:8000/grade-requests/${requestId}/tech_lead/${userId}`
      )
    },

    results(requestId, userId) {
      return $axios.$get(`http://194.87.144.227:8000/grade-requests/result`)
    },
  })

  inject('questionsRepository', {
    ...repositoryWithAxios('http://194.87.144.227:8000/questions'),
  })

  inject('testsRepository', {
    ...repositoryWithAxios('http://194.87.144.227:8000/tests'),
  })

  inject('specializationsRepository', {
    ...repositoryWithAxios('http://194.87.144.227:8000/specializations'),
  })

  inject('answerRepository', {
    ...repositoryWithAxios('http://194.87.144.227:8000/answers'),
  })

  inject('codeRepository', {
    ...repositoryWithAxios('/api/codes/{code_id}'),
    test(codeId, param) {
      return $axios.$post(`http://194.87.144.227:8000/codes/${codeId}`, param)
    },
  })

  inject('chatRepository', {
    createMsg(msg) {
      return $axios.$post(`http://185.195.24.47:9001/chat/new_message`, msg)
    },
    index(payload) {
      return $axios.$get(`http://185.195.24.47:9001/chat/all`, {
        params: payload,
      })
    },
  })

  inject('usersRepository', {
    index() {
      return $axios.$get(`http://194.87.144.227:8000/auth/users`)
    },
    // index() {
    //   return $axios.$get(`http://185.195.24.47:9001/chat/new_message`)
    // },
  })
}
