<template>
  <div class="form-wrapper">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: grid;
  row-gap: 20px;
}
</style>
