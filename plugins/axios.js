import qs from 'qs'
export default function (ctx) {
  const { $axios } = ctx

  $axios.onRequest((config) => {
    config.paramsSerializer = (params) => {
      return qs.stringify(params, { arrayFormat: 'comma', skipNulls: true })
    }

    // qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false });
  })
}
