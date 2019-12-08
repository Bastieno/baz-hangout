<template>
  <div>
    <button @click="isOpen = !isOpen" class="button is-success">{{btnText}}</button>
    <div :class="['modal', {'is-active': isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{title}}</p>
          <button @click="isOpen = false" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">What would you like to ask?</label>
              <textarea
                v-model="form.title"
                class="textarea"
                placeholder="Just write something that interest you"
                rows="10">
              </textarea>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button @click="emitThreadCreate" class="button is-success">Save changes</button>
          <button @click="isOpen = false " class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      required: false,
      default: 'Start a thread'
    },
    title: {
      type: String,
      required: false,
      default: 'Create a thread'
    }
  },
  data() {
    return {
      isOpen: false,
      form: {
        title: null
      }
    }
  },
  methods: {
    emitThreadCreate() {
      const { title } = this.form
      this.$emit('handleThreadCreate', {title, done: () => {
        this.form.title = ''
        this.isOpen = false
      }})
      this.isOpen = false
    }
  }

}
</script>

<style>

</style>
