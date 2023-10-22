<template>
  <div>
    <h2 class="mb-3">Мои Тесты</h2>
    <!-- <v-row>
      <v-col v-for="(spec, idx) in tests" :key="idx" cols="4">
        <v-card elevation="2" tile>
          <v-card-title>{{ spec.title }}</v-card-title>
          <v-card-text>{{ spec.description }}</v-card-text>
          <v-card-actions>
            <v-btn
              :to="{
                name: 'user-tests-id',
                params: { id: spec.id },
                query: { requestId: spec.requestId },
              }"
              >Пройти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->

    <div v-for="(req, idx) in requestsWIthTests" :key="idx" class="mb-6">
      <v-row>
        <v-col class="pb-0">
          <div>Заявка #{{ req.id }}</div>
          <h3>
            {{ req.specialization.name }}
          </h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(spec, idx) in req.tests" :key="idx" cols="4">
          <v-card elevation="2" tile>
            <v-card-title>{{ spec.title }}</v-card-title>
            <v-card-text>{{ spec.description }}</v-card-text>
            <v-card-actions>
              <v-btn
                :to="{
                  name: 'user-tests-id',
                  params: { id: spec.id },
                  query: { requestId: req.id },
                }"
                >Пройти
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $gradeRequestsRepository }) {
    const requests = await $gradeRequestsRepository.index()
    return {
      requests,
    }
  },
  data() {
    return {
      // tests: [
      //   {
      //     id: 1,
      //     title: 'Самый простой',
      //     description: 'Это самый прсотое тест',
      //     requestId: 2,
      //   },
      // ],
    }
  },
  computed: {
    requestsWIthTests() {
      return this.requests.filter((el) => el.tests.length)
    },
    tests() {
      const tests = []
      this.requests
        .filter((el) => el.tests.length)
        .forEach((el) => {
          tests.push(
            ...el.tests.map((smth) => ({
              ...smth,
              requestId: el.id,
            }))
          )
        })

      // {
      //             test: test.tests,
      //             requestId: el.id,
      //           }

      // .forEach((el) => {
      //   res.push(
      //     ...el.tests.map((test) => ({
      //       test: test.tests,
      //       requestId: el.id,
      //     }))
      //   )
      // })

      return tests
    },
  },
}
</script>

<style></style>
