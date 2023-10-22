<template>
  <div>
    <h3 class="mb-4">Список возможных вакансий</h3>
    <v-row>
      <v-col v-for="(spec, idx) in specializations" :key="idx" cols="4">
        <v-card elevation="2" tile>
          <v-card-title>{{ spec.name }}</v-card-title>
          <v-card-text>{{ spec.description }}</v-card-text>
          <v-card-actions>
            <v-btn @click="onCreateReq(spec)"> Подать заявку </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <flag-right-sheet v-model="isCreateEditSheetOpen" width="40%">
      <create-edit-sheet
        header-title="Заявка"
        :repository="customRepository"
        :get-default-item="defaultGrade"
        @success-create="onSuccesDataUpdate"
        @success-edit="onSuccesDataUpdate"
      >
        <template #default="{ item }">
          <form-wrapper class="mb-2">
            <form-item label="Специализация">
              <flag-text-field
                :value="currentSpec.name"
                disabled
                placeholder="Специализация"
                :height="40"
              />
            </form-item>

            <form-item label="Форма работы">
              <flag-select
                v-model="item.type"
                item-text="text"
                placeholder="Форма работы"
                :height="40"
                :items="typeItems"
              />
            </form-item>

            <form-item label="Резюме">
              <input type="file" :height="40" @input="onSelectFile" />
            </form-item>
          </form-wrapper>
        </template>
      </create-edit-sheet>
    </flag-right-sheet>
    <!-- <h4>Стажеры</h4>

    <h4>Практиканты</h4> -->
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import FormWrapper from '@/modules/CRUD/components/FormWrapper.vue'

export default {
  components: {
    createEditSheet,
    FormItem,
    FormWrapper,
  },
  async asyncData({ $specializationsRepository }) {
    const res = await $specializationsRepository.index()

    return {
      specializations: res,
    }
  },
  data() {
    return {
      resume: null,
      typeItems: [
        { text: 'Стажер', id: 'intern' },
        { text: 'Практикант', id: 'practice' },
      ],
      currentSpec: null,
      isCreateEditSheetOpen: false,
      customRepository: {
        ...this.$gradeRequestsRepository,
        create: async (item) => {
          return await this.$gradeRequestsRepository.create({
            ...item,
            specialization_id: this.currentSpec.id,
          })
        },
      },
    }
  },
  methods: {
    onSuccesDataUpdate() {
      this.isCreateEditSheetOpen = false
      // this.currentSpec = null
    },
    onCreateReq(spec) {
      this.isCreateEditSheetOpen = true
      this.currentSpec = spec
    },
    async onSelectFile(input) {
      const image = new FormData()
      image.append('file_in', input.target.files[0])

      const res = await this.$gradeRequestsRepository.load(image)
    },

    defaultGrade() {
      return {
        specialization_id: 0,
        type: '',
        resume: '',
      }
    },
  },
}
</script>

<style></style>
