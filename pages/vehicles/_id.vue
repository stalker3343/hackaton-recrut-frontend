<template>
  <div>
    <v-progress-linear v-if="$fetchState.pending" indeterminate />

    <v-alert v-else-if="$fetchState.error" type="error">
      Ошибка: {{ $fetchState.error.message }}
    </v-alert>

    <div v-else>
      <v-row>
        <v-col justify="center" cols="1">
          <img style="width: 60px" :src="vehicle.avatar" />
        </v-col>
        <v-col>
          <div>Инвентарный номер</div>
          <div>
            {{ vehicle.inventory_number }}
          </div>
        </v-col>
        <v-col>
          <div>Гос. номер</div>
          <div>
            {{ vehicle.gov_number }}
          </div>
        </v-col>
        <v-col>
          <div>Бренд</div>
          <div>
            {{ vehicle.brand }}
          </div>
        </v-col>
        <v-col>
          <div>Год</div>
          <div>
            {{ vehicle.year }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-tabs vertical>
            <v-tab exact nuxt :to="{ name: 'vehicles-id' }">
              <!-- <v-icon left> mdi-account </v-icon> -->
              О ТС
            </v-tab>
            <v-tab nuxt :to="{ name: 'vehicles-id-counter' }">
              <!-- <v-icon left> mdi-account </v-icon> -->
              Показания счетчика
            </v-tab>
            <v-tab nuxt :to="{ name: 'vehicles-id-fueling' }">
              <!-- <v-icon left> mdi-account </v-icon> -->
              Заправки
            </v-tab>
            <v-tab nuxt :to="{ name: 'vehicles-id-history' }">
              <!-- <v-icon left> mdi-account </v-icon> -->
              История
            </v-tab>

            <v-tab nuxt :to="{ name: 'vehicles-id-records' }">
              <!-- <v-icon left> mdi-account </v-icon> -->
              Сервисные записи
            </v-tab>
            <v-tab nuxt :to="{ name: 'vehicles-id-waybills' }">
              <!-- <v-icon left> mdi-account </v-icon> -->
              Накладные
            </v-tab>
            <v-tab nuxt :to="{ name: 'vehicles-id-expenses' }">
              <!-- <v-icon left> mdi-account </v-icon> -->
              Доп. Расходы
            </v-tab>

            <!-- <v-tab nuxt>
        <v-icon left> mdi-lock </v-icon>
        Option 2
      </v-tab>
      <v-tab nuxt>
        <v-icon left> mdia-access-point </v-icon>
        Option 3
      </v-tab> -->
          </v-tabs>
        </v-col>
        <v-col cols="9">
          <nuxt-child />
        </v-col>
      </v-row>
    </div>

    <!-- 
          <div class="cropper-buttons mt-4">
            <flag-btn
              color="dark-main"
              class="mr-3"
              large
              outlined
              @click="$emit('cancel')"
            >
              Отмена
            </flag-btn>
            <flag-btn :loading="isLoading" color="primary-main" @click="onSave">
              Сохранить
            </flag-btn>
          </div> -->
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      vehicle: null,
    }
  },
  async fetch() {
    const vehicle = await this.$vehiclesRepository.show(this.$route.params.id)
    this.vehicle = vehicle
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.cropper-buttons {
  @include flex(row, right, center);
}

.sheet-header {
  border-bottom: 1px solid var(--v-secondary-light-base);
  padding: 10px 30px;
}
</style>
