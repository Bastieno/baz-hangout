<template>
  <form @input="emitFormData">
    <div class="field">
      <label class="title m-b-sm">Choose Title</label>
      <input v-model="form.title"
             @blur="$v.form.title.$touch()"
             class="input"
             type="text"
             placeholder="Enter Title">
      <div v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="help is-danger">Title is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">Start Date</label>
      <datepicker
        :input-class="'input'"
        @input="setDate"
        :disabledDates="disabledDates"
        :placeholder="new Date | formatDate "
      >
      </datepicker>
      <div v-if="$v.form.startDate.$error">
        <span v-if="!$v.form.startDate.required" class="help is-danger">Starts at is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">From</label>
      <input v-model="form.timeFrom"
             @blur="$v.form.timeFrom.$touch()"
             class="input"
             type="text"
             placeholder="Time From">
    </div>
    <div class="field">
      <label class="title m-b-sm">To</label>
      <input v-model="form.timeTo"
             @blur="$v.form.timeTo.$touch()"
             class="input"
             type="text"
             placeholder="Time to">
    </div>
    <div class="field">
      <label class="title m-b-sm">Please Choose the Category.</label>
      <div class="m-b-lg">
        <div class="select">
          <!-- TODO: Get Here Categories -->
          <select @change="emitFormData" v-model="form.category" @blur="$v.form.category.$touch()">
            <option value="" disabled>Pick one</option>
            <option v-for="category of categories"
                    :value="category"
                    :key="category.id">{{category.name}}</option>
          </select>
        </div>
        <div v-if="$v.form.category.$error">
          <span v-if="!$v.form.category.required" class="help is-danger">Category is required</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import Datepicker from 'vuejs-datepicker'
  import moment from 'moment'

  export default {
    components: {
      Datepicker
    },
    data () {
      return {
        disabledDates: {
          customPredictor: function(date) {
            const today = new Date()
            const yesterday = today.setDate(today.getDate() - 1)
            return date < yesterday
          }
        },
        form: {
          title: null,
          startDate: null,
          timeTo: null,
          timeFrom: null,
          category: ''
        }
      }
    },
    created() {
      if (!this.categories.length) this.$store.dispatch('categories/fetchCategories')
    },
    computed: {
      categories() {
        return this.$store.state.categories.items
      }
    },
    validations: {
      form: {
        title: { required },
        startDate: { required },
        category: { required },
        timeTo: { required },
        timeFrom: { required }
      }
    },
    methods: {
      emitFormData() {
        this.$emit('updateData', { data: this.form, isValid: !this.$v.$invalid})
      },
      setDate(date) {
        this.form.startDate = moment(date).format()
        this.emitFormData()
      }
    }
  }
</script>

<style scoped>
  .time-picker {
    display: block;
  }
</style>
