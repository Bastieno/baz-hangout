<template>
  <div>
    <h1 class="title m-b-sm">What's your new Meetup location?</h1>
    <div class="m-b-lg">
      <span v-if="ipLocation && !changeLocation" class="subtitle">{{ipLocation}}</span>
      <a v-if="ipLocation && !changeLocation" @click="toggleChangeLocation">(change location)</a>
      <a v-if="ipLocation && changeLocation" @click="toggleChangeLocation">(Set default location)</a>
      <input
        v-if="!ipLocation || changeLocation"
        @input="emitFormData"
        @blur="$v.form.location.$touch()"
        v-model="form.location"
        type="text"
        class="input"
      >
      <div v-if="$v.form.location.$error">
        <span v-if="!$v.form.location.required" class="help is-danger">Location is required</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        changeLocation: false,
         form: {
           location: null
        }
      }
    },
    created() {
      if (this.ipLocation) {
        this.form.location = this.ipLocation
        this.emitFormData()
      }
    },
    computed: {
      ipLocation() {
        return this.$store.getters['meta/location']
      }
    },
    validations: {
      form: {
        location: { required }
      }
    },
    methods: {
      emitFormData() {
        this.$emit('updateData', { data: this.form, isValid: !this.$v.$invalid})
      },
      toggleChangeLocation() {
        if (this.ipLocation) {
        this.form.location = this.ipLocation
        this.emitFormData()
      }
        this.changeLocation = !this.changeLocation
      }
    }
  }
</script>

<style scoped>
