<template>
  <div>
    <div class="card-req" @click="isCreateEditSheetOpen = true">
      <div class="text-caption">Заявка #{{ item.id }}</div>

      <div class="card-req-header">
        {{ item.user.id }}
      </div>
      {{ typeToRus[item.type] }} {{ item.specialization.name }}
      <!-- {{ item.user.id }} -->
      <template v-if="item.tests.length">
        <h3 class="mt-2">Тесты</h3>
        <div
          v-for="(test, key) in item.tests"
          :key="key"
          class="d-flex justify-space-between"
        >
          <div>
            {{ test.title }}
          </div>
          <div>
            {{ test.complitedPoints }}
          </div>
        </div>
      </template>
    </div>
    <flag-right-sheet v-model="isCreateEditSheetOpen" width="40%">
      <v-tabs v-model="tab">
        <v-tab>Общее</v-tab>
        <v-tab>Чат</v-tab>
      </v-tabs>

      <div class="pa-5">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card
              v-if="
                ['entering', 'completed', 'department_interview'].includes(
                  item.status
                )
              "
              class="mx-auto"
              outlined
            >
              <v-card-text>
                <div>Требуемое действие для смены этапа</div>
              </v-card-text>
              <div class="pa-4 pt-0">
                <div v-if="item.status === 'entering'">
                  <h3 class="mb-2">Назначить тест</h3>
                  <v-data-table
                    v-model="selectedTests"
                    hide-default-header
                    hide-default-footer
                    show-select
                    :headers="headers"
                    :items="testsList"
                    class="elevation-1"
                  />
                </div>

                <div v-if="item.status === 'completed'">
                  <h3>Назначить HR</h3>
                  <flag-select
                    v-model="selectedHR"
                    item-text="first_name"
                    placeholder="HR"
                    :height="40"
                    :items="HR"
                  />
                </div>

                <div v-if="item.status === 'department_interview'">
                  <h3>Назанчить техлида</h3>
                  <flag-select
                    v-model="selectedTechLid"
                    item-text="first_name"
                    placeholder="HR"
                    :height="40"
                    :items="HR"
                  />
                </div>

                <v-btn
                  color="primary"
                  class="mt-3"
                  :loading="loading"
                  @click="onActionClick"
                >
                  Сохранить
                </v-btn>
              </div>
            </v-card>

            <div v-if="item.status !== 'entering'" class="mt-4">
              <h3>Тесты</h3>
              <v-data-table
                hide-default-header
                hide-default-footer
                :headers="headers"
                :items="item.tests"
                class="elevation-1"
              />
            </div>

            <v-list three-line>
              <v-list-item v-if="item.hr">
                <v-list-item-content>
                  <v-list-item-title>HR</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.hr.first_name }}
                    {{ item.hr.last_name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="item.tech_lead">
                <v-list-item-content>
                  <v-list-item-title>Тех. специалист</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.tech_lead.first_name }}
                    {{ item.tech_lead.last_name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <chat-component :req-id="item.id" />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </flag-right-sheet>
  </div>
</template>

<script>
import ChatComponent from './ChatComponent.vue'
export default {
  components: {
    ChatComponent,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    testsList: {
      type: Array,
      required: true,
    },
    allUsers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      tab: null,
      selectedTests: [],
      selectedHR: null,
      selectedTechLid: null,

      isCreateEditSheetOpen: false,
      typeToRus: {
        intern: 'Стажер',
        practice: 'Практикант',
      },
      headers: [
        {
          text: 'Название',
          value: 'title',
        },
        {
          text: 'Описание',
          value: 'description',
        },
      ],
    }
  },
  computed: {
    HR() {
      return this.allUsers.filter((el) => el.role === 'HR')
    },
    techLead() {
      return this.allUsers.filter((el) => el.role === 'TechLead')
    },
  },
  methods: {
    setTest() {},
    async onActionClick() {
      this.loading = true
      if (this.item.status === 'entering') {
        const res = await this.$confirm({
          text: `После установки теста, заявка переёдет в статус "На тестировании". Вы уверены?`,
          textStyleType: 'confirm-text-small',
        })
        if (res) {
          await this.$gradeRequestsRepository.tests(
            this.item.id,
            this.selectedTests.map((el) => el.id)
          )
          await this.$gradeRequestsRepository.update(this.item.id, {
            status: 'tested',
          })
        }
      }
      if (this.item.status === 'completed') {
        const res = await this.$confirm({
          text: `После установки теста, заявка переёдет в статус "Интервью с HR". Вы уверены?`,
          textStyleType: 'confirm-text-small',
        })
        if (res) {
          await this.$gradeRequestsRepository.addHr(
            this.item.id,
            this.selectedHR
          )
          await this.$gradeRequestsRepository.update(this.item.id, {
            status: 'department_interview',
          })
        }
      }
      if (this.item.status === 'department_interview') {
        const res = await this.$confirm({
          text: `После установки теста, заявка переёдет в статус "Интервью с тех-спецом". Вы уверены?`,
          textStyleType: 'confirm-text-small',
        })
        if (res) {
          await this.$gradeRequestsRepository.addTechLead(
            this.item.id,
            this.selectedTechLid
          )
          await this.$gradeRequestsRepository.update(this.item.id, {
            status: 'tech_lead_interview',
          })
        }
      }

      this.$emit('succes-edited-status')
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.card-req {
  background: white;
  border-radius: 7px;
  padding: 12px;
}

.card-req-header {
  font-size: 18px;
  font-weight: 600;
}

.current-action {
}
</style>
