<template>
  <flag-autocomplete
    :repository="$vehiclesRepository"
    v-bind="$attrs"
    is-local-search
    item-text="inventory_number"
    item-value="inventory_number"
    label="ТС"
    v-on="$listeners"
  />
</template>

<script>
export default {}
</script>

<style></style>
