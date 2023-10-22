<template>
  <div>
    <filters-layout class="mb-3">
      <vehicles-filter v-model="filters.vehicle" multiple />
      <date-picker v-model="filters.date_after" placeholder="С" />
      <date-picker v-model="filters.date_before" placeholder="По" />
    </filters-layout>

    <div class="d-flex">
      <flag-btn color="primary" @click="onApplyFilters"> Показать </flag-btn>
      <flag-btn @click="resetFilters"> Сброс </flag-btn>
    </div>
    <!-- eslint-disable vue/valid-v-slot  -->
    <!--  show-details -->
    <general-list-page
      ref="generalListPage"
      :filters="filters"
      delete-confirm-text="Счетчик"
      :headers="headers"
      show-create
      show-edit
      :repository="$countersRepository"
    >
      <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="Счетчик"
          :repository="$countersRepository"
          :get-default-item="defaultVehicle"
          @success-create="onSuccesDataUpdate"
          @success-edit="onSuccesDataUpdate"
        >
          <template #default="{ item }">
            <form-item label="ТС">
              <flag-select
                v-model="item.vehicle_id"
                item-text="inventory_number"
                is-server-items-load
                :repository="$vehiclesRepository"
              />
            </form-item>

            <form-item label="Дата">
              <date-picker v-model="item.date" placeholder="Дата" />
            </form-item>

            <form-item label="Текущие показания счетчика">
              <flag-text-field
                v-model="item.value"
                :height="40"
                placeholder="value"
              />
            </form-item>
          </template>
        </create-edit-sheet>
      </template>

      <template #details-modal="{ item }">
        <fueld-details :item="item" />
      </template>
    </general-list-page>
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import fueldDetails from '@/components/fueling/fueldDetails.vue'
import VehiclesFilter from '@/components/filters/VehiclesFilter.vue'
import DatePicker from '@/components/filters/DatePicker.vue'
import FiltersLayout from '@/components/filters/FiltersLayout.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'

const getDefaultFilters = () => ({
  vehicle: [],
  date_after: '',
  date_before: '',
})
export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
    fueldDetails,

    VehiclesFilter,
    DatePicker,
    FiltersLayout,
  },

  data() {
    return {
      tab: null,
      filters: getDefaultFilters(),

      headers: [
        {
          text: 'ТС',
          value: 'vehicle.inventory_number',
        },
        {
          text: 'Дата',
          value: 'date',
        },
        {
          text: 'Значение',
          value: 'value',
        },
        {
          text: 'Тип',
          value: 'type',
        },
      ],
      defaultVehicle: () => ({
        date: null,
        value: null,
        vehicle_id: null,
      }),
    }
  },
  methods: {
    resetFilters() {
      this.filters = getDefaultFilters()
      this.$nextTick(() => {
        this.$refs.generalListPage.applyFilters()
      })
    },
    onApplyFilters() {
      this.$refs.generalListPage.applyFilters()
    },
    onClickVehicle() {
      console.log('onClickVehicle')
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

.filters-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
