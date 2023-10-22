<template>
  <general-list-page
    delete-confirm-text="Заявка"
    :headers="headers"
    :repository="$gradeRequestsRepository"
    show-create
    show-edit
  >
    <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
      <create-edit-sheet
        :item-id="editedItem"
        header-title="Заявка"
        :repository="$gradeRequestsRepository"
        :get-default-item="defaultGrade"
        @success-create="onSuccesDataUpdate"
        @success-edit="onSuccesDataUpdate"
      >
        <template #default="{ item }">
          <form-wrapper class="mb-2">
            <form-item label="Форма работы">
              <flag-select
                v-model="item.type"
                item-text="text"
                placeholder="Форма работы"
                :height="40"
                :items="typeItems"
              />
            </form-item>

            <form-item label="Специализация">
              <flag-select
                v-model="item.specialization_id"
                item-text="name"
                placeholder="Специализация"
                :height="40"
                :items="specealizations"
              />
            </form-item>

            <form-item label="Резюме">
              <input type="file" :height="40" @input="onSelectFile" />
            </form-item>
          </form-wrapper>
        </template>
      </create-edit-sheet>
    </template>

    <template #type="{ item }">
      {{ typeToRus[item.type] }}
    </template>

    <template #status="{ item }">
      {{ STATUSES[item.status] }}
    </template>
  </general-list-page>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import FormWrapper from '@/modules/CRUD/components/FormWrapper.vue'
import { STATUSES } from '@/utils/index'
export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
    FormWrapper,
  },
  async asyncData({ $specializationsRepository }) {
    const res = await $specializationsRepository.index()
    return {
      specealizations: res,
    }
  },
  data() {
    return {
      STATUSES,
      typeToRus: {
        intern: 'Стажер',
        practice: 'Практикант',
      },
      resume: null,
      typeItems: [
        { text: 'Стажер', id: 'intern' },
        { text: 'Практикант', id: 'practice' },
      ],
      headers: [
        {
          text: 'Специализация',
          value: 'specialization.name',
        },
        {
          text: 'status',
          value: 'status',
        },
        {
          text: 'type',
          value: 'type',
        },
      ],
    }
  },
  methods: {
    async onSelectFile(input) {
      const image = new FormData()
      image.append('file_in', input.target.files[0])

      const res = await this.$gradeRequestsRepository.load(image)
    },
    defaultGrade() {
      return {
        specialization_id: 0,
        type: '',
        resume: '',
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
