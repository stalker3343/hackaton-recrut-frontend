<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      delete-confirm-text="Расход"
      :headers="headers"
      :show-delete="false"
      :repository="customeFueling"
    />
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
      customeFueling: {
        ...this.$vehiclesExpensesRepository,
        index: () => {
          return this.$vehiclesExpensesRepository.index(this.$route.params.id)
        },
      },

      headers: [
        {
          text: 'Цена',
          value: 'price',
        },

        {
          text: 'Дата',
          value: 'date',
        },

        {
          text: 'Описание',
          value: 'description',
        },

        {
          text: 'Тип',
          value: 'type',
        },
      ],
    }
  },
}
</script>
