<template>
  <div>
    <general-list-page
      delete-confirm-text="Тест"
      :headers="headers"
      :repository="$testsRepository"
      show-create
      show-edit
      @success-edited="onSuccessEditedTest"
    >
      <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="Тест"
          :repository="customRepository"
          :get-default-item="defaultTest"
          @success-create="onSuccesDataUpdate"
          @success-edit="onSuccesDataUpdate"
          @edited-item-loaded="setQaFromItem"
        >
          <template #default="{ item }">
            <form-wrapper>
              <form-item label="title">
                <flag-text-field
                  v-model="item.title"
                  :height="40"
                  placeholder="title"
                />
              </form-item>

              <form-item label="description">
                <flag-text-field
                  v-model="item.description"
                  :height="40"
                  placeholder="description"
                />
              </form-item>
            </form-wrapper>
            <div class="mt-3 mb-3 d-flex justify-space-between align-center">
              <h3>Вопросы</h3>

              <flag-btn class="mt-3" @click="onOpenQuestionsModal">
                Настроить вопросы
              </flag-btn>
            </div>

            <v-data-table
              disable-pagination
              :headers="headersQa"
              hide-default-footer
              :items="selectedQuestions"
              class="elevation-1"
            >
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template #item.points="{ item: qaQuestion }">
                <flag-text-field
                  v-model.number="qeustionToPoints[qaQuestion.id]"
                  :height="40"
                  placeholder="Баллы"
                />
              </template>
            </v-data-table>
          </template>
        </create-edit-sheet>
      </template>
    </general-list-page>
    <flag-dialog v-model="isAddQuestionDialogOpen" :width="500">
      <h3 class="pl-3 mb-3">Вопросы</h3>
      Тут будет фильтр по типу, сложности
      <v-data-table
        v-model="selectedQuestions"
        disable-pagination
        show-select
        :headers="headersQa"
        :items="questions"
        hide-default-footer
        class="elevation-1"
      />

      <flag-btn color="primary" class="mx-3 mt-5" @click="onAddQuestions">
        Готово
      </flag-btn>
      <!-- <pre>
          {{ resultsTesting }}
        </pre> -->
    </flag-dialog>
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import FormWrapper from '@/modules/CRUD/components/FormWrapper.vue'

export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
    FormWrapper,
  },
  async asyncData({ $questionsRepository }) {
    const questions = await $questionsRepository.index()
    return {
      questions,
    }
  },
  data() {
    return {
      qeustionToPoints: {},
      selectedQuestions: [],
      isAddQuestionDialogOpen: false,
      headersQa: [
        {
          text: 'title',
          value: 'title',
        },
        {
          text: 'description',
          value: 'description',
        },
        {
          text: 'level',
          value: 'level',
        },
        {
          text: 'type',
          value: 'type',
        },
        {
          text: 'Баллы',
          value: 'points',
        },
      ],
      questionTypes: [
        { text: 'Код', value: 'code' },
        { text: 'Тест', value: 'text' },
      ],
      headers: [
        {
          text: 'title',
          value: 'title',
        },
        {
          text: 'description',
          value: 'description',
        },
        // {
        //   text: 'level',
        //   value: 'level',
        // },
        // {
        //   text: 'type',
        //   value: 'type',
        // },
        // {
        //   text: 'content',
        //   value: 'content.content',
        // },
        // {
        //   text: 'Адресс',
        //   value: 'content.test_cases',
        // },
      ],
      customRepository: {
        ...this.$testsRepository,
        create: async (item) => {
          return await this.$testsRepository.create({
            ...item,
            questions: this.selectedQuestions.map((el) => ({
              question: el,
              point: this.qeustionToPoints[el.id],
            })),
          })
        },
        update: async (itemId, item) => {
          return await this.$testsRepository.update(itemId, {
            ...item,
            questions: this.selectedQuestions.map((el) => ({
              question: el,
              point: this.qeustionToPoints[el.id],
            })),
          })
        },
      },
    }
  },
  computed: {
    qaToAdd() {
      return []
    },
  },
  methods: {
    setQaFromItem(item) {
      this.selectedQuestions = item.questions.map((el) => el.question)
      item.questions.forEach((el) => {
        this.qeustionToPoints[el.question.id] = el.point
      })
    },
    onSuccessEditedTest() {
      this.selectedQuestions = []
    },
    onAddQuestions() {
      this.isAddQuestionDialogOpen = false
    },
    onOpenQuestionsModal() {
      this.isAddQuestionDialogOpen = true
    },
    defaultTest() {
      return {
        title: '',
        description: '',
        questions: [
          {
            point: 0,
            question: {
              title: 'string',
              description: 'string',
              level: 0,
              type: 'text',
              content: {
                content: 'string',
                test_cases: [
                  {
                    input: 'string',
                    output: 'string',
                    error: 'string',
                  },
                ],
              },
              id: 0,
            },
          },
        ],
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: white;

  border-radius: 10px;
  padding: 10px 20px;
}
</style>
