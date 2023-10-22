<template>
  <v-container>
    <loading :active.sync="isLoading" :is-full-page="true" />

    <v-row justify="center">
      <v-col cols="6">
        <h1>{{ test.title }}</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <div class="text-subtitle-1">{{ test.description }}</div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="6">
        <form-wrapper>
          <div v-for="(response, idx) in responses" :key="idx">
            <div class="text-h6 mb-1">
              {{ response.innerQa.title }}
            </div>
            <div class="text-caption mb-1">
              {{ response.innerQa.description }}
            </div>

            <template v-if="response.innerQa.type === 'text'">
              <flag-text-field v-model="response.content" />
            </template>

            <div v-if="response.innerQa.type === 'code'">
              <div class="text-area">
                <v-btn-toggle
                  v-model="response.language"
                  mandatory
                  class="text-area-lang"
                >
                  <v-btn value="cpp"> C++ </v-btn>
                  <v-btn value="golang"> Go </v-btn>
                  <v-btn value="python"> Python </v-btn>
                  <!-- <v-btn value="java"> java </v-btn> -->
                </v-btn-toggle>

                <flag-textarea v-model="response.content" />
              </div>
              <flag-btn
                class="mt-2"
                color="secondary"
                @click="checkCode(response)"
              >
                Проверить
              </flag-btn>
              <div v-if="resOfCheckCode">
                <div>Вывод</div>
                <pre
                  >{{ resOfCheckCode }}
                </pre>
              </div>
            </div>
          </div>
        </form-wrapper>

        <flag-btn
          class="mt-3"
          x-large
          color="primary"
          block
          @click="onSendResp"
        >
          Отправить
        </flag-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loading from 'vue-loading-overlay'
import FormWrapper from '@/modules/CRUD/components/FormWrapper.vue'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    FormWrapper,
    Loading,
  },
  async asyncData({ $testsRepository, params, query }) {
    const res = await $testsRepository.show(params.id)

    return {
      test: res,
      resOfCheckCode: null,
      responses: res.questions.map(({ question }) => ({
        innerQa: question,
        grade_request_id: query.requestId,
        test_id: params.id,
        question_id: question.id,
        type: question.type,
        content: '',
        language: '',
      })),
    }
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    async onSendResp() {
      this.isLoading = true
      try {
        await this.$answerRepository.create(this.responses)
        this.$notify.success({
          text: 'Тест пройден, ожидайте ответа от HR',
        })

        await this.$gradeRequestsRepository.update(
          this.$router.query.requestId,
          {
            status: 'completed',
          }
        )

        this.$router.push({ name: 'user-tests' })
      } catch (error) {
        this.$notify.error({
          text: 'Произошла ошибка: ' + error.message,
        })
      } finally {
        this.isLoading = false
      }
    },
    async checkCode(response) {
      this.isLoading = true

      try {
        this.resOfCheckCode = null
        const codeId = response.innerQa.content.id
        this.resOfCheckCode = await this.$codeRepository.test(codeId, {
          language: response.language,
          code: response.content,
        })
      } catch (error) {
        this.$notify.error({
          text: 'Произошла ошибка: ' + error.message,
        })
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.text-area {
  position: relative;
}

.text-area-lang {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 3;
}
</style>
