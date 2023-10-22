<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      delete-confirm-text="Накладную"
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
        ...this.$waybillsRepository,
        index: () => {
          return this.$waybillsRepository.index(this.$route.params.id)
        },
      },

      headers: [
        {
          text: 'Номер',
          value: 'number',
        },
        {
          text: 'Дата',
          value: 'date',
        },
      ],
    }
  },
}
</script>
