<template>
  <div class="filters-layout">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.filters-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 12px;
}
</style>
