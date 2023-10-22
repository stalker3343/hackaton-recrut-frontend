<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      delete-confirm-text="Запись"
      :headers="headers"
      :show-delete="false"
      :repository="customeFueling"
    >
      <template #records-dates="{ item }">
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
      customeFueling: {
        ...this.$maintenanceRecordsRepository,
        index: () => {
          return this.$maintenanceRecordsRepository.index(this.$route.params.id)
        },
      },

      headers: [
        {
          text: 'Даты',
          value: 'records-dates',
        },
        {
          text: 'Задачи',
          value: 'tasks',
        },
        {
          text: 'Проблемы',
          value: 'issues',
        },

        {
          text: 'Сумма',
          value: 'price',
        },
        {
          text: 'Создан в системе',
          value: 'created_at',
        },
      ],
    }
  },
}
</script>
