<template>
  <general-list-page
    delete-confirm-text="Вопрос"
    :headers="headers"
    :repository="$questionsRepository"
    show-create
    show-edit
  >
    <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
      <create-edit-sheet
        :item-id="editedItem"
        header-title="Вопрос"
        :repository="$questionsRepository"
        :get-default-item="defaultQuestion"
        @success-create="onSuccesDataUpdate"
        @success-edit="onSuccesDataUpdate"
      >
        <template #default="{ item }">
          <form-wrapper class="mb-2">
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

            <form-item label="level">
              <flag-text-field
                v-model="item.level"
                :height="40"
                placeholder="level"
              />
            </form-item>

            <form-item label="Тип вопроса">
              <flag-select
                v-model="item.type"
                item-text="text"
                placeholder="Тип вопроса"
                :height="40"
                :items="questionTypes"
              />
            </form-item>

            <template v-if="item.type === 'text'">
              <form-item label="Ответ">
                <flag-text-field
                  v-model="item.content.content"
                  :height="40"
                  placeholder="level"
                />
              </form-item>
            </template>
          </form-wrapper>

          <template v-if="item.type === 'code'">
            <form-item label="Идельное решение">
              <flag-text-field
                v-model="item.content.content"
                :height="40"
                placeholder="level"
              />
            </form-item>
            <test-case
              v-for="(caseObj, idx) in item.content.test_cases"
              :key="idx"
              :case-idx="idx"
              :value="caseObj"
              @remove="removeTestCase(item.content, caseObj)"
              @input="updateTestCase(item.content.test_cases, caseObj, $event)"
            />
            <flag-btn
              class="mt-4"
              @click="addTestCase(item.content.test_cases)"
            >
              Добавить кейс
            </flag-btn>
          </template>
        </template>
      </create-edit-sheet>
    </template>
  </general-list-page>
</template>

<script>
import testCase from '../components/testCase.vue'
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import FormWrapper from '@/modules/CRUD/components/FormWrapper.vue'

export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
    testCase,
    FormWrapper,
  },
  data() {
    return {
      questionTypes: [
        { text: 'Код', id: 'code' },
        { text: 'Тест', id: 'text' },
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
        {
          text: 'level',
          value: 'level',
        },
        {
          text: 'type',
          value: 'type',
        },
      ],
    }
  },
  methods: {
    updateTestCase(cases, old, newCase) {
      const idx = cases.indexOf(old)
      console.log('🚀 ~ file: index.vue:132 ~ updateTestCase ~ idx:', idx)
      this.$set(cases, idx, newCase)
    },
    removeTestCase(cases, old) {
      cases.test_cases = cases.test_cases.filter((el) => el !== old)
    },
    addTestCase(cases) {
      cases.push({
        input: '',
        output: '',
        error: '',
      })
    },
    defaultQuestion() {
      return {
        title: '',
        description: '',
        level: 1,
        type: '',
        content: {
          content: '',
          test_cases: [
            {
              input: '',
              output: '',
              error: '',
            },
          ],
        },
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
