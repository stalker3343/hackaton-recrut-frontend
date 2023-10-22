<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      delete-confirm-text="Заправку"
      :headers="headers"
      show-details
      :repository="customeFueling"
      :show-delete="false"
    >
      <template #details-modal="{ item }">
        <fueld-details :item="item" />
      </template>
    </general-list-page>
  </div>
</template>

<script>
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import fueldDetails from '@/components/fueling/fueldDetails.vue'
export default {
  components: {
    GeneralListPage,
    fueldDetails,
  },

  data() {
    return {
      tab: null,
      customeFueling: {
        ...this.$fuelingRepository,
        index: () => {
          return this.$fuelingRepository.index({
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
          text: 'Счетчик',
          value: 'counter.value',
        },
        {
          text: 'Километраж',
          value: 'vehicle.counter',
        },
        {
          text: 'обьем',
          value: 'liters',
        },

        {
          text: 'Стоимость',
          value: 'summ',
        },
      ],
    }
  },
  methods: {},
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
