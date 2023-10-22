<template>
  <div>
    <v-progress-linear v-if="$fetchState.pending" indeterminate />

    <v-alert v-else-if="$fetchState.error" type="error">
      Ошибка: {{ $fetchState.error.message }}
    </v-alert>

    <div v-else>Главная страница</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  fetch() {},
}
</script>

<style></style>
