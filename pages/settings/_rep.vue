<template>
  <general-list-page
    :delete-confirm-text="pageData.deleteConfirm"
    :headers="headers"
    show-create
    show-edit
    :repository="pageData.rep"
  >
    <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
      <create-edit-sheet
        :item-id="editedItem"
        :header-title="pageData.header"
        :repository="pageData.rep"
        :get-default-item="defaultCategory"
        @success-create="onSuccesDataUpdate"
        @success-edit="onSuccesDataUpdate"
      >
        <template #default="{ item }">
          <form-item label="Название">
            <flag-text-field
              v-model="item.name"
              :height="40"
              placeholder="Название"
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
  computed: {
    pageData() {
      const repToPageData = {
        vehiclesTypes: {
          rep: this.$vehiclesTypesRepository,
          deleteConfirm: 'Тип',
          header: 'Тип',
        },
        vehiclesManufacturers: {
          rep: this.$vehiclesManufacturersRepository,
          deleteConfirm: 'завод изготовитель',
          header: 'завод изготовитель',
        },
        vehiclesSources: {
          rep: this.$vehiclesSourcesRepository,
          deleteConfirm: 'Организ. выдавш. наряд',
          header: 'Организ. выдавш. наряд',
        },
        vehiclesWarehouses: {
          rep: this.$vehiclesWarehousesRepository,
          deleteConfirm: 'Склад',
          header: 'Склад',
        },
        vehiclesBodies: {
          rep: this.$vehiclesBodiesRepository,
          deleteConfirm: 'Тип кузова',
          header: 'Тип кузова',
        },

        vehiclesClasses: {
          rep: this.$vehiclesClassesRepository,
          deleteConfirm: 'Службу эксп. ТС',
          header: 'Службу эксп. ТС',
        },
        vehiclesColors: {
          rep: this.$vehiclesColorsRepository,
          deleteConfirm: 'Цвет',
          header: 'Цвет',
        },
        vehiclesServices: {
          rep: this.$vehiclesServicesRepository,
          deleteConfirm: 'Службу эксп. ТС',
          header: 'Службу эксп. ТС',
        },

        vehiclesGroups: {
          rep: this.$vehiclesGroupsRepository,
          deleteConfirm: 'Штатную группу',
          header: 'Штатную группу',
        },
        // vehiclesGroupsRepository: {
        //   rep: this.$vehiclesTypesRepository,
        //   deleteConfirm: 'Тип',
        //   header: 'Тип',
        // },
      }

      return repToPageData[this.$route.params.rep]
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
