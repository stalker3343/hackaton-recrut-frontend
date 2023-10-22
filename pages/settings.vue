<template>
  <div>
    <v-row>
      <!-- <v-icon left> mdi-account </v-icon> -->
      <v-col cols="3">
        <v-tabs vertical>
          <v-tab nuxt :to="{ name: 'settings' }"> Типы топлива </v-tab>
          <!-- /api/vehicles/brands/ -->
          <v-tab nuxt :to="{ name: 'settings-brands' }"> марки ТС </v-tab>

          <!-- /api/vehicles/groups/ -->
          <v-tab nuxt :to="{ name: 'settings-groups' }">Штатные группы </v-tab>

          <v-tab nuxt :to="{ name: 'settings-expenses' }">Типы расходов </v-tab>

          <!-- /api/vehicles/types/ -->
          <v-tab
            nuxt
            :to="{ name: 'settings-rep', params: { rep: 'vehiclesTypes' } }"
          >
            Типы
          </v-tab>
          <!-- /api/vehicles/manufacturers/ -->
          <v-tab
            nuxt
            :to="{
              name: 'settings-rep',
              params: { rep: 'vehiclesManufacturers' },
            }"
          >
            завод изготовитель
          </v-tab>

          <!-- /api/vehicles/sources/ -->
          <v-tab
            nuxt
            :to="{
              name: 'settings-rep',
              params: { rep: 'vehiclesSources' },
            }"
          >
            Организ. выдавш. наряд
          </v-tab>
          <!-- /api/vehicles/warehouses/ -->
          <v-tab
            nuxt
            :to="{
              name: 'settings-rep',
              params: { rep: 'vehiclesWarehouses' },
            }"
          >
            Склады
          </v-tab>
          <!-- /api/vehicles/bodies/ -->
          <v-tab
            nuxt
            :to="{
              name: 'settings-rep',
              params: { rep: 'vehiclesBodies' },
            }"
          >
            Типы кузова
          </v-tab>
          <!-- /api/vehicles/classes/ -->
          <v-tab
            nuxt
            :to="{
              name: 'settings-rep',
              params: { rep: 'vehiclesClasses' },
            }"
          >
            Классы ТС
          </v-tab>

          <!-- /api/vehicles/colors/-->
          <v-tab
            nuxt
            :to="{
              name: 'settings-rep',
              params: { rep: 'vehiclesColors' },
            }"
          >
            Цвета ТС
          </v-tab>

          <!-- /api/vehicles/services/ -->
          <v-tab
            nuxt
            :to="{
              name: 'settings-rep',
              params: { rep: 'vehiclesServices' },
            }"
          >
            Службы эксп. ТС
          </v-tab>

          <v-tab
            nuxt
            :to="{
              name: 'settings-rep',
              params: { rep: 'vehiclesGroups' },
            }"
          >
            Штатные группы
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="9">
        <nuxt-child :key="$route.path" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
