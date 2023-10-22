<template>
  <general-list-page
    delete-confirm-text="Специализации"
    :headers="headers"
    :repository="$specializationsRepository"
    show-create
    show-edit
  >
    <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
      <create-edit-sheet
        :item-id="editedItem"
        header-title="специализацию"
        :repository="$specializationsRepository"
        :get-default-item="defaultSpec"
        @success-create="onSuccesDataUpdate"
        @success-edit="onSuccesDataUpdate"
      >
        <template #default="{ item }">
          <form-wrapper>
            <form-item label="Название">
              <flag-text-field
                v-model="item.name"
                :height="40"
                placeholder="Название"
              />
            </form-item>

            <form-item label="Описание">
              <flag-textarea
                v-model="item.description"
                placeholder="Описание"
              />
            </form-item>
          </form-wrapper>
        </template>
      </create-edit-sheet>
    </template>
  </general-list-page>
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
  data() {
    return {
      headers: [
        {
          text: 'Название',
          value: 'name',
        },
        {
          text: 'Описание',
          value: 'description',
        },
      ],
    }
  },
  methods: {
    defaultSpec() {
      return {
        name: '',
        description: '',
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
