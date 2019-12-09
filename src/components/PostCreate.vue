<template>
  <form class="post-create">
    <div class="field">
      <textarea
        class="textarea textarea-post"
        v-auto-expand
        v-model="text"
        placeholder="Write a post"
        rows="1">
      </textarea>
      <button
        :disabled="!text"
        class="button is-primary m-t-sm"
        @click.prevent="sendPost"
      >
        Send
      </button>
    </div>
  </form>
</template>

<script>
import autoExpand from '../directives/autoExpand'
export default {
  directives: {
    autoExpand
  },
  props: {
    threadId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    sendPost() {
      this.$store.dispatch('threads/sendPost', { text: this.text, threadId: this.threadId })
        .then((createdPost) => {
          this.$socket.emit('meetup/postSave', createdPost)
          this.text = ''
        })
    }
  }
}
</script>

<style scoped>
  .textarea-post {
    padding-bottom: 30px;
  }

  .post-create {
    margin-bottom: 15px;
  }
</style>
