<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->
    <!--  show-details  -->
    <general-list-page
      ref="generalListPage"
      :filters="filters"
      delete-confirm-text="подразделение"
      :headers="headers"
      show-create
      show-edit
      :repository="$subdivisionsRepository"
    >
      <!-- <template #records-dates="{ item }">
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
      </template> -->

      <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="Подразделение"
          :repository="$subdivisionsRepository"
          :get-default-item="defaultVehicle"
          @success-create="onSuccesDataUpdate"
          @success-edit="onSuccesDataUpdate"
        >
          <template #default="{ item }">
            <form-item label="Название">
              <flag-text-field
                v-model="item.name"
                :height="40"
                placeholder="name "
              />
            </form-item>

            <form-item label="Телефон">
              <flag-text-field
                v-model="item.phone"
                :height="40"
                placeholder="Телефон"
              />
            </form-item>

            <form-item label="Начальник">
              <flag-text-field
                v-model="item.chief"
                :height="40"
                placeholder="Начальник"
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
    // VehiclesFilter,
    // DatePicker,
    // FiltersLayout,
  },

  data() {
    return {
      tab: null,
      filters: getDefaultFilters(),

      headers: [
        {
          text: 'Название',
          value: 'name',
        },
        {
          text: 'Телефон',
          value: 'phone',
        },
        {
          text: 'Начальник',
          value: 'chief',
        },
      ],
      defaultVehicle: () => ({
        name: '',
        phone: '',
        chief: '',

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
