<template>
  <div>
    <div
      v-for="(msg, idx) in massages"
      :key="idx"
      class="message"
      :class="{ msg_is_me: $auth.user.id === msg.user_id }"
    >
      {{ msg.content }}
    </div>

    <div class="d-flex">
      <flag-text-field v-model="newMsgText" />
      <flag-btn x-large :loading="loading" icon @click="sendMsg">
        <v-icon> mdi-send </v-icon>
      </flag-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reqId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      massages: [],
      newMsgText: '',
      loading: false,
      interval: null,
    }
  },
  mounted() {
    this.interval = setInterval(async () => {
      this.massages = await this.$chatRepository.index({
        grade_request_id: this.reqId,
      })
    }, 1000)
  },
  destroyed() {
    clearInterval(this.interval)
  },
  deactivated() {
    clearInterval(this.interval)
  },
  methods: {
    async sendMsg() {
      this.loading = true
      await this.$chatRepository.createMsg({
        content: this.newMsgText,
        user_id: this.$auth.user.id,
        grade_request_id: this.reqId,
        full_name: 'Имя 1',
      })

      this.newMsgText = ''
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.msg_is_me {
  margin-left: 0px;
}
.message {
  background: red;
  border-radius: 6px;
  margin-left: auto;
  margin-bottom: 10px;
}
</style>
