<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      delete-confirm-text="Заправку"
      :headers="headers"
      :show-delete="false"
      :repository="customeFueling"
    >
      <template #details-modal="{ item }">
        <div class="d-flex align-center">
          <img style="width: 70px" class="mr-3" :src="item.vehicle.avatar" />

          <div>
            <div class="d-flex justify-space-between">
              <div class="mr-2">Инвентарный номер</div>
              <div>
                {{ item.vehicle.inventory_number }}
              </div>
            </div>

            <div class="d-flex justify-space-between">
              <div class="mr-2">Бренд</div>
              <div>
                {{ item.vehicle.brand }}
              </div>
            </div>

            <div class="d-flex justify-space-between">
              <div class="mr-2">Гос. номер</div>
              <div>
                {{ item.vehicle.gov_number }}
              </div>
            </div>
          </div>
        </div>

        <!-- {{ item }} -->
      </template>
    </general-list-page>
  </div>
</template>

<script>
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'

export default {
  components: {
    GeneralListPage,
  },

  data() {
    return {
      tab: null,
      customeFueling: {
        ...this.$countersRepository,
        index: () => {
          return this.$countersRepository.index({
            vehicle: this.$route.params.id,
          })
        },
      },

      headers: [
        {
          text: 'Дата',
          value: 'date',
        },
        {
          text: 'значение',
          value: 'value',
        },
        {
          text: 'тип',
          value: 'type',
        },
      ],
    }
  },
}
</script>
