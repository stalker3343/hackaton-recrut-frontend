<template>
  <div v-scroll="onScroll" style="position: relative">
    <div
      class="board d-flex"
      :class="{
        sticked: scrolledPX >= startSticked,
      }"
    >
      <slot
        name="board"
        :top="
          scrolledPX >= startSticked
            ? scrolledPX - headerHeightOffset + 'px'
            : '0px'
        "
      />
    </div>
    <div v-if="loading" class="disable-overlay" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    startSticked: {
      type: Number,
      default: 159,
    },
    headerHeightOffset: {
      type: Number,
      default: 70,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const scrolledPX = ref(0)
    const onScroll = () => {
      scrolledPX.value = window.scrollY
    }

    return {
      onScroll,
      scrolledPX,
    }
  },
})
</script>

<style lang="scss">
.sticked {
  .stack__header {
    background-color: #fff;
    z-index: 1;
    .title {
      padding-top: 13px !important;
      font-size: 14px !important;
    }
    .subtitle {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
.board {
  overflow-x: auto;
}

.disable-overlay {
  content: '';
  position: absolute;
  z-index: 10;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
</style>
