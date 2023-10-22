<template>
  <div>
    <filters-layout class="mb-3">
      <vehicles-filter v-model="filters.vehicle" multiple />
      <!-- <date-picker v-model="filters.date" placeholder="date" /> -->
    </filters-layout>

    <div class="d-flex">
      <flag-btn color="primary" @click="onApplyFilters"> Показать </flag-btn>
      <flag-btn @click="resetFilters"> Сброс </flag-btn>
    </div>
    <!-- eslint-disable vue/valid-v-slot  -->
    <!--  show-details  -->
    <general-list-page
      ref="generalListPage"
      :filters="filters"
      delete-confirm-text="проблему"
      :headers="headers"
      show-create
      show-edit
      :repository="$maintenanceRecordsRepository"
    >
      <template #records-dates="{ item }">
        <div class="d-flex">
          <div class="flagman-h3-bold mr-2">Начало работ</div>
          <div>{{ item.start_date }}</div>
        </div>
        <div class="d-flex">
          <div class="flagman-h3-bold mr-2">Крайний срок</div>
          <div>{{ item.end_date }}</div>
        </div>
      </template>

      <template #tasks="{ item }">
        <div v-for="task in item.tasks" :key="task.id">{{ task.name }}</div>
      </template>
      <template #issues="{ item }">
        <div v-for="task in item.issues" :key="task.id">{{ task.summary }}</div>
      </template>

      <template #records-details="{ item }">
        <div class="flagman-h3-bold mr-2">Задачи</div>
        <div v-for="task in item.tasks" :key="task.id">{{ task.name }}</div>
        <div class="flagman-h3-bold mt-4">Проблемы</div>
        <div v-for="task in item.issues" :key="task.id">{{ task.summary }}</div>
      </template>

      <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="Сервисную запись"
          :repository="$maintenanceRecordsRepository"
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

            <form-item label="Текущие показания счетчика">
              <flag-text-field
                v-model="item.counter.value"
                :height="40"
                placeholder="Текущие показания счетчика"
              />
            </form-item>
            <form-item label="Стоимость">
              <flag-text-field
                v-model="item.price"
                :height="40"
                placeholder="Стоимость"
              />
            </form-item>

            <form-item label="Задачи">
              <flag-select
                v-model="item.tasks"
                multiple
                item-text="name"
                is-server-items-load
                :repository="$maintenanceTasksRepository"
              />
            </form-item>

            <form-item label="Проблемы">
              <flag-select
                v-model="item.issues"
                multiple
                item-text="summary"
                is-server-items-load
                :repository="$maintenanceIssuesRepository"
              />
            </form-item>

            <form-item label="Начало работ">
              <date-picker
                v-model="item.start_date"
                placeholder="Начало работ"
              />
            </form-item>

            <form-item label="Крайний срок">
              <date-picker v-model="item.end_date" placeholder="Крайний срок" />
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

import FormItem from '@/modules/CRUD/components/FormItem.vue'
import VehiclesFilter from '@/components/filters/VehiclesFilter.vue'
import DatePicker from '@/components/filters/DatePicker.vue'
import FiltersLayout from '@/components/filters/FiltersLayout.vue'

const getDefaultFilters = () => ({
  vehicle: [],
  //   date: '',
  //   status: 'open',
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
          text: 'Даты',
          value: 'records-dates',
        },
        {
          text: 'Задачи',
          value: 'tasks',
        },
        {
          text: 'Проблемы',
          value: 'issues',
        },

        {
          text: 'Сумма',
          value: 'price',
        },
        {
          text: 'Создан в системе',
          value: 'created_at',
        },
      ],
      defaultVehicle: () => ({
        vehicle_id: null,
        counter: { value: null },
        start_date: '',
        end_date: '',
        price: '',
        tasks: [],
        issues: [],
        // fuel_type: null,
        // price: null,
        // summ: null,
        // liters: null,
        // date: null,
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
    async onsSetIssuStatus(item, status) {
      const res = await this.$maintenanceIssuesRepository.show(item.id)
      await this.$maintenanceIssuesRepository.update(item.id, {
        ...res,
        status,
      })
      this.$refs.generalListPage.applyFilters()
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
