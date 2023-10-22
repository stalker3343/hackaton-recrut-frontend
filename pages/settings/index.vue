<template>
  <general-list-page
    delete-confirm-text="Типы топлива"
    :headers="headers"
    show-create
    show-edit
    :repository="$fuelTypesRepository"
  >
    <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
      <create-edit-sheet
        :item-id="editedItem"
        header-title="Тип топлива"
        :repository="$fuelTypesRepository"
        :get-default-item="defaultCategory"
        @success-create="onSuccesDataUpdate"
        @success-edit="onSuccesDataUpdate"
      >
        <template #default="{ item }">
          <form-item label="Название">
            <flag-text-field
              v-model="item.name"
              :height="40"
              placeholder="Название типа топлива"
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

  data() {
    return {
      headers: [
        {
          text: 'Название',
          value: 'name',
        },
      ],
      defaultCategory: () => ({
        name: '',
      }),
    }
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
