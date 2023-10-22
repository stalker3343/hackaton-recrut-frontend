<template>
  <div>
    <filters-layout class="mb-3">
      <flag-select
        v-model="filters.status"
        :items="statuses"
        placeholder="статус"
      />
      <vehicles-filter v-model="filters.vehicle" multiple />
      <date-picker v-model="filters.date_after" placeholder="С" />
      <date-picker v-model="filters.date_before" placeholder="По" />
    </filters-layout>

    <div class="d-flex">
      <flag-btn color="primary" @click="onApplyFilters"> Показать </flag-btn>
      <flag-btn @click="resetFilters"> Сброс </flag-btn>
    </div>
    <!-- eslint-disable vue/valid-v-slot  -->
    <!-- show-details -->
    <general-list-page
      ref="generalListPage"
      :filters="filters"
      delete-confirm-text="проблему"
      :headers="headers"
      show-create
      show-edit
      :repository="$maintenanceIssuesRepository"
    >
      <template #issues-users="{ item }">
        <div v-for="user in item.users" :key="user.id">
          {{ user.first_name }} {{ user.last_name }} {{ user.username }}
        </div>
      </template>
      <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="Проблему"
          :repository="$maintenanceIssuesRepository"
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
            <form-item label="Проблема">
              <flag-text-field
                v-model="item.summary"
                :height="40"
                placeholder="Проблема"
              />
            </form-item>
            <form-item label="Ответсвенные лица">
              <flag-select
                v-model="item.users_id"
                multiple
                item-text="id"
                is-server-items-load
                :repository="$usersRepository"
              />
            </form-item>

            <form-item label="Дата сообщения">
              <date-picker v-model="item.date" placeholder="Дата сообщения" />
            </form-item>

            <form-item label="Крайний срок">
              <date-picker v-model="item.due_date" placeholder="Крайний срок" />
            </form-item>
          </template>
        </create-edit-sheet>
      </template>

      <template #actions="{ item }">
        <v-menu bottom left>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-if="item.status === 'open'"
              @click="onsSetIssuStatus(item, 'solved')"
            >
              <v-list-item-title>отметить решенной</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onsSetIssuStatus(item, 'closed')">
              <v-list-item-title>закрыть</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
  date_after: '',
  date_before: '',
  status: 'open',
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

      statuses: [
        { id: 'open', name: 'Открыта' },
        { id: 'overdue', name: 'Просрочена' },
        { id: 'solved', name: 'Решена' },
        { id: 'closed', name: 'Закрыта' },
      ],
      filters: getDefaultFilters(),
      // <template #comment="{ item }">
      //         <div class="d-flex">
      //           <div class="flagman-h3-bold mr-2" />
      //           <div>{{ item.summary }}</div>
      //         </div>
      //         <div class="d-flex">
      //           <div class="flagman-h3-bold mr-2">Дата создания</div>
      //           <div>{{ item.created_at }}</div>
      //         </div>
      //         <div class="d-flex">
      //           <div class="flagman-h3-bold mr-2">Дата сообщения</div>
      //           <div>{{ item.date }}</div>
      //         </div>
      //         <div class="d-flex">
      //           <div class="flagman-h3-bold mr-2">Крайний срок</div>
      //           <div>{{ item.due_date }}</div>
      //         </div>
      //       </template>

      headers: [
        {
          text: 'ТС',
          value: 'vehicle.inventory_number',
        },
        // {
        //   text: 'Комментарий',
        //   value: 'comment',
        // },
        {
          text: 'Проблема',
          value: 'summary',
        },
        {
          text: 'Дата сообщения',
          value: 'date',
        },
        {
          text: 'Крайний срок',
          value: 'due_date',
        },
        {
          text: 'Ответсвенные лица',
          value: 'issues-users',
        },
      ],
      defaultVehicle: () => ({
        vehicle_id: null,
        counter: { value: null },
        summary: '',
        date: '',
        due_date: '',
        description: '',
        users_id: [],

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
