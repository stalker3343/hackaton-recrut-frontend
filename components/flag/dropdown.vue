<template>
  <div class="icis-dropdown">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.icis-dropdown {
  background: #ffffff;
  // padding: 8px 0px;
  border: 1px solid #f7fafc;
  box-shadow: 1px 9px 30px #edf0f3;
  // border-radius: 16px;
  min-width: 240px;
}
</style>
