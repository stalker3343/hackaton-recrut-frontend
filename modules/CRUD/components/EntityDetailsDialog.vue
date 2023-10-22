<template>
  <flag-dialog v-model="isDialogOpen" @close-modal="$emit('close-modal')">
    <div class="sheet-header">
      <span class="flagman-h2-bold">{{ headerTitle }} </span>
    </div>
    <div class="sheet-wrapper-inner">
      <v-progress-linear v-if="$fetchState.pending" indeterminate />

      <v-alert v-else-if="$fetchState.error" type="error">
        Ошибка: {{ $fetchState.error.message }}
      </v-alert>

      <slot v-else :item="item" />

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
  </flag-dialog>
</template>

<script>
export default {
  props: {
    itemId: {
      type: [String, Number],
      required: true,
    },
    repository: {
      type: Object,
      required: true,
    },

    headerTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDialogOpen: true,
      item: null,
    }
  },
  async fetch() {
    const res = await this.repository.show(this.itemId)
    this.item = res
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.cropper-buttons {
  @include flex(row, right, center);
}

.sheet-wrapper-inner {
  padding: 20px 30px;
}

.sheet-header {
  border-bottom: 1px solid var(--v-secondary-light-base);
  padding: 10px 30px;
}
</style>
