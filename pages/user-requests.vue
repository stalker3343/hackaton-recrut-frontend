<template>
  <div>
    <h3 class="mb-4">Список возможных вакансий</h3>
    <v-row>
      <v-col v-for="(spec, idx) in requests" :key="idx" cols="4">
        <v-card class="req-wrapper" elevation="2" tile>
          <!-- {{ spec }} -->

          <v-chip class="req-wrapper-status">
            {{ STATUSES[spec.status] }}</v-chip
          >
          <div>Заявка #{{ spec.id }}</div>
          <v-list three-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Тип трудоустройства</v-list-item-title>
                <v-list-item-subtitle>
                  {{ TYPES[spec.type] }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Специализация</v-list-item-title>
                <v-list-item-subtitle>
                  {{ spec.specialization.name }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <!-- <v-card-title>{{ spec.name }}</v-card-title>
          <v-card-text>{{ spec.description }}</v-card-text> -->
          <!-- <v-card-actions>
            <v-btn @click="onCreateReq(spec)"> Подать заявку </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>

    <!-- <h4>Стажеры</h4>

    <h4>Практиканты</h4> -->
  </div>
</template>

<script>
// import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
// import FormItem from '@/modules/CRUD/components/FormItem.vue'
// import FormWrapper from '@/modules/CRUD/components/FormWrapper.vue'
import { STATUSES } from '@/utils/index'

export default {
  components: {
    // createEditSheet,
    // FormItem,
    // FormWrapper,
  },
  async asyncData({ $gradeRequestsRepository }) {
    const res = await $gradeRequestsRepository.index()

    return {
      requests: res,
    }
  },
  data() {
    return {
      STATUSES,
      TYPES: {
        intern: 'Стажер',
        practice: 'Практикант',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.req-wrapper {
  position: relative;
}

.req-wrapper-status {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
