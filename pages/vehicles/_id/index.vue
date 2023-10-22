<template>
  <div>
    <v-row>
      <v-col cols="6">
        <chart-vehikle-date
          header="Стоимость километра пути"
          :repository="$dashboardRepository.kilometer"
          :base-filters="{
            vehile: $route.params.id,
          }"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ChartVehikleDate from '~/components/ChartVehikleDate.vue'

export default {
  components: {
    ChartVehikleDate,
  },
}
</script>

<style></style>
