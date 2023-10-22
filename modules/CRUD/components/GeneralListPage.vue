<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <v-container>
      <slot name="top" />
      <v-row v-if="showCreate">
        <v-col class="d-flex" cols="12">
          <v-spacer />
          <flag-btn color="primary" @click="isCreateEditSheetOpen = true">
            <v-icon>mdi-plus</v-icon>
            Добавить
          </flag-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="page-wrapper">
            <v-alert v-if="$fetchState.error" class="py-4" type="error">
              Ошибка: {{ $fetchState.error.message }}
            </v-alert>
            <!-- <table-list-action-bar
              :is-shown="isActionBarShow"
              @delete="onMultipleDelete"
            /> -->
            <app-form-wrapper ref="formWrapper" :request-errors="[400, 404]">
              <template #default="{ isLoading }">
                <!-- show-select -->
                <flag-table
                  v-model="selected"
                  :loading="$fetchState.pending || isLoading"
                  :hide-default-footer="true"
                  :items="items"
                  :headers="innerActions"
                  disable-pagination
                >
                  <template #item.vehicle.inventory_number="{ item }">
                    <div class="d-flex align-center">
                      <img
                        class="ts-avatar"
                        :src="item.avatar || item.vehicle.avatar"
                      />
                      <div class="flagman-h3-bold">
                        {{
                          item.inventory_number || item.vehicle.inventory_number
                        }}
                        <!-- {{  }} -->
                      </div>
                    </div>
                  </template>

                  <template #item.type="{ item }">
                    <slot name="type" :item="item" />
                  </template>
                  <template #item.status="{ item }">
                    <slot name="status" :item="item" />
                  </template>

                  <template #item.comment="{ item }">
                    <slot name="comment" :item="item" />
                  </template>
                  <template #item.issues-users="{ item }">
                    <slot name="issues-users" :item="item" />
                  </template>

                  <template #item.deleted_at="{ item }">
                    <v-icon v-if="item.deleted_at" class="red--text">
                      mdi-close-thick
                    </v-icon>
                  </template>

                  <template #item.tasks="{ item }">
                    <slot name="tasks" :item="item" />
                  </template>

                  <template #item.issues="{ item }">
                    <slot name="issues" :item="item" />
                  </template>

                  <template #item.actions="{ item }">
                    <v-icon
                      v-if="showDetails"
                      class="mr-2"
                      @click="onShowDetails(item)"
                    >
                      mdi-eye
                    </v-icon>
                    <v-icon
                      v-if="showEdit"
                      class="mr-2"
                      @click="onEditItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon v-if="showDelete" @click.stop="onDeleteItem(item)">
                      mdi-delete
                    </v-icon>
                    <slot name="actions" :item="item" />
                  </template>
                  <template #no-data>
                    <v-btn color="primary" @click="initialize"> Reset </v-btn>
                  </template>
                </flag-table>
              </template>
            </app-form-wrapper>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <flag-right-sheet v-model="isCreateEditSheetOpen" width="40%">
      <slot
        v-if="isCreateEditSheetOpen"
        name="create-edit-sheet"
        :edited-item="editedUserId"
        :on-succes-data-update="onSuccesDataUpdate"
      />
    </flag-right-sheet>

    <entity-details-dialog
      v-if="isDetailsModalOpen"
      :item-id="editedUserId"
      header-title="Детали"
      :repository="repository"
      @close-modal="isDetailsModalOpen = false"
    >
      <template #default="{ item }">
        <slot :item="item" name="details-modal" />
      </template>
    </entity-details-dialog>
  </div>
</template>

<script>
import EntityDetailsDialog from './EntityDetailsDialog.vue'

export default {
  components: {
    EntityDetailsDialog,
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    deleteConfirmText: {
      type: String,
      required: true,
    },
    repository: {
      type: Object,
      required: true,
    },
    showCreate: {
      type: Boolean,
      default: false,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
    showDetails: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      items: [], //
      selected: [],
      isCreateEditSheetOpen: false,
      editedUserId: null,

      isDetailsModalOpen: false,

      hasDeletedField: false,
    }
  },
  fetchOnServer: false,
  async fetch() {
    this.items = await this.repository.index(this.filters)
    // eslint-disable-next-line no-prototype-builtins
    if (
      Array.isArray(this.items) &&
      this.items[0] &&
      // eslint-disable-next-line no-prototype-builtins
      this.items[0].hasOwnProperty('deleted_at')
    )
      this.hasDeletedField = true
    this.$emit('update-items', this.items)
  },
  computed: {
    innerActions() {
      const res = [...this.headers]
      if (this.hasDeletedField)
        res.push({
          value: 'deleted_at',
          text: '',
          sortable: false,
          align: 'right',
          width: 200,
        })

      res.push({
        value: 'actions',
        sortable: false,
        align: 'right',
        width: 200,
      })
      return res
    },
  },
  watch: {
    isCreateEditSheetOpen(vall) {
      if (!vall) this.editedUserId = null
    },
    isDetailsModalOpen(vall) {
      if (!vall) this.editedUserId = null
    },
  },
  methods: {
    onSuccesDataUpdate() {
      this.$fetch()
      this.isCreateEditSheetOpen = false

      this.$emit('success-edited')
    },
    onEditItem(item) {
      this.isCreateEditSheetOpen = true
      this.editedUserId = item.id
    },

    async deleteEntity(id) {
      const res = await this.$refs.formWrapper.makeRequest(
        async () => await this.repository.delete(id)
      )
      if (res) {
        this.$notify.success({ text: 'Удаление прошло успешно' })
        this.$fetch()
      }
    },

    onDeleteItem(item) {
      this.$confirm({
        text: `Вы уверенны, что хотите удалить ${this.deleteConfirmText}?`,
      }).then((res) => {
        if (res) {
          this.deleteEntity(item.id)
        }
      })
    },
    applyFilters() {
      this.$fetch()
    },
    onShowDetails(item) {
      this.$emit('details-click', item)

      if (this.$scopedSlots['details-modal']) {
        this.editedUserId = item.id
        this.isDetailsModalOpen = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: white;
  border-radius: 10px;
  padding: 10px 20px;
}
.ts-avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 8px;
}
</style>
