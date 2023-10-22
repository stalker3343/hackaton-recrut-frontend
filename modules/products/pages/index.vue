<template>
  <general-list-page
    delete-confirm-text="Товар"
    :headers="headers"
    :repository="$productRepository"
  >
    <template #create-edit-sheet="{ editedItem }">
      <create-edit-sheet
        :get-default-item="getDefaultItem"
        :item-id="editedItem"
        header-title="Товара"
        :repository="$productRepository"
        :default-item="defaultProduct"
      >
        <template #default="{ item }">
          <form-item label="Название товара">
            <flag-text-field
              v-model="item.name"
              :height="40"
              placeholder="Название товара"
            />
          </form-item>

          <form-item label="Категория товара">
            <flag-select
              v-model="item.category"
              item-text="name"
              placeholder="Категория товара"
              :height="40"
              :items="categories"
              return-object
            />
          </form-item>

          <form-item label="Описание товара">
            <flag-textarea
              v-model="item.description"
              full-width
              :rows="4"
              placeholder="Описание товара"
            />
          </form-item>
        </template>
      </create-edit-sheet>
    </template>
  </general-list-page>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'

export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
  },
  async asyncData({ $gradeRequestsRepository }) {
    const requests = await $gradeRequestsRepository.index()
    return {
      requests,
    }
  },
  data() {
    return {
      headers: [
        //         {
        //   "id": 0,
        //   "resume": "string",
        //   "status": "entering",
        //   "tests": [],
        //   "user": {
        //     "id": 0
        //   }
        // }

        {
          text: 'Резюме',
          value: 'resume',
        },
        {
          text: 'Статус',
          value: 'status',
        },
        {
          text: 'Юзер',
          value: 'user.id',
        },
        {
          text: 'Тесты',
          value: 'tests',
        },
      ],
    }
  },
  methods: {
    getDefaultItem() {
      return {
        file_in: null,
        // name: '',
        // description: '',
        // category: null,
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
