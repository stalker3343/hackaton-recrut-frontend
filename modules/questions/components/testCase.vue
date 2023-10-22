<template>
  <div>
    <div class="mt-3 d-flex justify-space-between align-center">
      <h3>Кейс № {{ caseIdx + 1 }}</h3>
      <flag-btn @click="$emit('remove')"> Удалить </flag-btn>
    </div>

    <form-wrapper>
      <form-item label="Входные данные">
        <flag-text-field
          :value="value.input"
          :height="40"
          placeholder="input"
          @input="$emit('input', { ...value, input: $event })"
        />
      </form-item>
      <form-item label="Выходные данные">
        <flag-text-field
          :value="value.output"
          :height="40"
          placeholder="output"
          @input="$emit('input', { ...value, output: $event })"
        />
      </form-item>
      <form-item label="Ошибка">
        <flag-text-field
          :value="value.error"
          :height="40"
          placeholder="level"
          @input="$emit('input', { ...value, error: $event })"
        />
      </form-item>
    </form-wrapper>
  </div>
</template>

<script>
import FormItem from '@/modules/CRUD/components/FormItem.vue'
import FormWrapper from '@/modules/CRUD/components/FormWrapper.vue'

export default {
  components: {
    FormItem,
    FormWrapper,
  },
  props: {
    caseIdx: {
      type: Number,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    // input: {
    //   type: String,
    //   default: '',
    // },
    // output: {
    //   type: String,
    //   default: '',
    // },
    // error: {
    //   type: String,
    //   default: '',
    // },
  },
}
</script>

<style></style>
