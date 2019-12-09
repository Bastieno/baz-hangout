<template>
  <form class="post-create">
    <div class="field">
      <textarea class="textarea textarea-post"
                v-auto-expand
                placeholder="Write a post"
                rows="1"></textarea>
      <button :disabled="true" class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>

<script>
import autoExpand from '../directives/autoExpand'
export default {
  directives: {
    autoExpand
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
