<template>
  <v-menu
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <flag-text-field
        :height="48"
        icis-type="white"
        :value="$attrs.value"
        :label="placeholder"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker v-bind="$attrs" v-on="$listeners" @input="menu2 = false" />
  </v-menu>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menu2: false,
    }
  },
}
</script>

<style></style>
