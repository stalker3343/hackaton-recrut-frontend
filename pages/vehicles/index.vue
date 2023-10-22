<template>
  <div>
    <div class="filters-layout mb-3">
      <vehicles-filter v-model="filters.inventory_number" />
      <!-- <flag-text-field
        v-model="filters.inventory_number"
        :height="40"
       
      /> -->
    </div>
    <div class="d-flex">
      <flag-btn color="primary" @click="onApplyFilters"> Показать </flag-btn>
      <flag-btn @click="resetFilters"> Сброс </flag-btn>
    </div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      :filters="filters"
      delete-confirm-text="Транспортное средство"
      :headers="headers"
      show-create
      show-edit
      show-details
      :repository="$vehiclesRepository"
      @details-click="
        $router.push({ name: 'vehicles-id', params: { id: $event.id } })
      "
    >
      <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="ТС"
          :repository="$vehiclesRepository"
          :get-default-item="defaultVehicle"
          @success-create="onSuccesDataUpdate"
          @success-edit="onSuccesDataUpdate"
        >
          <template #default="{ item }">
            <v-tabs v-model="tab" :height="35" class="mb-4" align-with-title>
              <v-tab>Информация</v-tab>
              <v-tab>Даты</v-tab>
              <v-tab>Дополнительно</v-tab>

              <v-tab>Двигатель</v-tab>
              <v-tab>Распределение</v-tab>
              <v-tab>Паспорт</v-tab>
              <v-tab>Файлы</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <form-item label="Номер. гос регистрации">
                  <flag-text-field
                    v-model="item.gov_number"
                    :height="40"
                    placeholder="Номер. гос регистрации"
                  />
                </form-item>

                <form-item label="Год выпуска">
                  <flag-text-field
                    v-model="item.year"
                    :height="40"
                    placeholder="Год выпуска"
                  />
                </form-item>

                <form-item label="Инвентарный номер">
                  <flag-text-field
                    v-model="item.inventory_number"
                    :height="40"
                    placeholder="Инвентарный номер"
                  />
                </form-item>

                <form-item label="Вид Топлива">
                  <flag-select
                    v-model="item.fuel_type"
                    is-server-items-load
                    :repository="$fuelTypesRepository"
                  />
                  <!-- <flag-text-field
                  v-model="item.inventory_number"
                  :height="40"
                  placeholder="inventory_number"
                /> -->
                </form-item>

                <form-item
                  v-for="setting in stringSettings"
                  :key="setting.value"
                  :label="setting.title"
                >
                  <flag-text-field
                    v-model="item[setting.value]"
                    :height="40"
                    :placeholder="setting.title"
                  />
                </form-item>
              </v-tab-item>
              <v-tab-item>
                <form-item
                  v-for="setting in dateSettings"
                  :key="setting.value"
                  :label="setting.title"
                >
                  <date-picker
                    v-model="item[setting.value]"
                    :placeholder="setting.title"
                  />
                </form-item>
              </v-tab-item>

              <v-tab-item>
                <form-item
                  v-for="setting in dictionarySettings"
                  :key="setting.value"
                  :label="setting.title"
                >
                  <flag-select
                    v-model="item[setting.value]"
                    is-server-items-load
                    is-repository-function
                    :repository="$vehiclesDictionaryRepository[setting.value]"
                  />

                  <!-- <date-picker
                    v-model="item[setting.value]"
                    :placeholder="setting.title"
                  /> -->
                </form-item>
              </v-tab-item>

              <v-tab-item>
                <form-item label="Номер">
                  <flag-text-field
                    v-model="item.engine.number"
                    :height="40"
                    placeholder="Номер"
                  />
                </form-item>
                <form-item label="Модель">
                  <flag-text-field
                    v-model="item.engine.model"
                    :height="40"
                    placeholder="модель"
                  />
                </form-item>
                <form-item label="Мощность">
                  <flag-text-field
                    v-model="item.engine.power"
                    :height="40"
                    placeholder="мощность"
                  />
                </form-item>
                <form-item label="Обьем">
                  <flag-text-field
                    v-model="item.engine.capacity"
                    :height="40"
                    placeholder="Обьем"
                  />
                </form-item>
              </v-tab-item>

              <v-tab-item>
                <form-item label="Номер">
                  <flag-text-field
                    v-model="item.distribution.number"
                    :height="40"
                    placeholder="Номер"
                  />
                </form-item>
                <form-item label="Дата">
                  <date-picker
                    v-model="item.distribution.date"
                    placeholder="Дата"
                  />
                </form-item>
              </v-tab-item>
              <v-tab-item>
                <form-item label="Номер">
                  <flag-text-field
                    v-model="item.passport.number"
                    :height="40"
                    placeholder="Номер"
                  />
                </form-item>
                <form-item label="Дата">
                  <date-picker
                    v-model="item.passport.date"
                    placeholder="Дата"
                  />
                </form-item>
              </v-tab-item>

              <v-tab-item> Файлы </v-tab-item>
            </v-tabs-items>
          </template>
        </create-edit-sheet>
      </template>
    </general-list-page>
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import DatePicker from '@/components/filters/DatePicker.vue'
import VehiclesFilter from '@/components/filters/VehiclesFilter.vue'

import FormItem from '@/modules/CRUD/components/FormItem.vue'

const getDefaultFilters = () => ({
  inventory_number: [],
})
export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
    DatePicker,
    VehiclesFilter,
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
          text: 'Инвентарный номер',
          value: 'inventory_number',
        },
        {
          text: 'Номер гос регистрации',
          value: 'gov_number',
        },
        {
          text: 'Группа',
          value: 'group',
        },
        {
          text: 'Марка ТС',
          value: 'brand',
        },

        {
          text: 'Год выпуска',
          value: 'year',
        },
        {
          text: 'Счетчик',
          value: 'counter',
        },
      ],

      stringSettings: [
        {
          title: 'Номер Шасси',
          value: 'chass_number',
        },
        {
          title: 'Номер Кузова',
          value: 'body_number',
        },
        {
          title: 'Балансовая стоимость',
          value: 'cost',
        },
        {
          title: 'Номер Фондового извещения',
          value: 'source_number',
        },
        {
          title: 'Месячная норма пробега',
          value: 'mileage_rate',
        },
        {
          title: 'Норма расхода топлива на 100 км',
          value: 'fuel_rate',
        },
        {
          title: 'Идентификационный номер',
          value: 'id_number',
        },
        {
          title: 'Базовая норма расхода топлива',
          value: 'base_rate',
        },
      ],
      dateSettings: [
        {
          title: 'Дата действия страхавого полиса',
          value: 'trust_date',
        },
        {
          title: 'Дата действия технического осмотра',
          value: 'to_date',
        },
        {
          title: 'Дата выдачи номерного знака',
          value: 'sign_date',
        },
        {
          title: 'Дата ввода в эксплутацию',
          value: 'exploitation_date',
        },
        {
          title: 'Дата документа',
          value: 'source_date',
        },
        {
          title: 'Дата передачи в подразделение',
          value: 'transfer_date',
        },
        {
          title: 'Дата списания',
          value: 'del_date',
        },
      ],
      dictionarySettings: [
        {
          title: 'Склад',
          value: 'warehouse',
        },
        {
          title: 'Источник получения',
          value: 'source',
        },
        {
          title: 'Служба эксплутации',
          value: 'service',
        },
        {
          title: 'Цвет автомобиля',
          value: 'color',
        },
        {
          title: 'Класс автомобиля',
          value: 'vehicle_class',
        },
        {
          title: 'Штатная группа',
          value: 'group',
        },
        {
          title: 'Марка',
          value: 'brand',
        },
        {
          title: 'Завод-Изготовитель',
          value: 'manufacturer',
        },
        {
          title: 'Тип транспорта',
          value: 'type',
        },
      ],

      // identifier_fuel_rate	integer
      // title: Инд. процент баз. нормы расхода топлива
      // maximum: 999

      // category	string
      // title: Категория автомобиля
      //  Enum:
      // Array [ 4 ]

      // body	integer
      // title: Тип Кузова

      // subdivision	integer
      // title: Подразделение-владелец транспорта

      // climate_control	boolean
      // title: Наличие системы Климат контроль

      defaultVehicle: () => ({
        engine: {
          number: '',
          model: '',
          power: 1,
          capacity: '',
        },

        distribution: {
          number: null,
          date: null,
        },
        passport: {
          number: null,
          date: null,
        },
        inventory_number: '',
        year: null,
        gov_number: '',
        fuel_type: null,

        chass_number: '',
        body_number: '',
        cost: '',
        source_number: '',
        mileage_rate: '',
        id_number: '',
        base_rate: '',
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
