<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">
      {{currentStep}} of {{allStepsCount}}
    </div>
    <!-- Form Steps -->
    <keep-alive>
      <MeetupLocation v-if="currentStep === 1" @updateData="mergeFormData" ref="currentComponent"/>
      <MeetupDetail v-if="currentStep === 2" @updateData="mergeFormData" ref="currentComponent" />
      <MeetupDescription v-if="currentStep === 3" @updateData="mergeFormData" ref="currentComponent" />
      <MeetupConfirmation :form="form" v-if="currentStep === 4" ref="currentComponent" />
    </keep-alive>

    <progress class="progress" :value="progressStatus" max="100">{{progressStatus}}%</progress>
    <div class="controll-btns m-b-md">
      <button v-if="currentStep !== 1" @click="moveToPreviousStep" class="button is-primary m-r-sm">Back</button>
      <button
        v-if="currentStep !== allStepsCount"
        @click="moveToNextStep"
        :disabled="!canProceed"
        class="button is-primary"
      >
        Next
      </button>
      <button v-else class="button is-primary">Confirm</button>
    </div>
    <!-- Just To See Data in the Form -->
    <pre><code>{{form}}</code></pre>
  </div>
</template>

<script>
  import MeetupLocation from './MeetupLocation'
  import MeetupDetail from './MeetupDetail'
  import MeetupDescription from './MeetupDescription'
  import MeetupConfirmation from './MeetupConfirmation'
  export default {
    components: {
      MeetupLocation,
      MeetupDetail,
      MeetupDescription,
      MeetupConfirmation
    },
    data () {
      return {
        currentStep: 1,
        allStepsCount: 4,
        canProceed: false,
        form: {
          location: null,
          title: null,
          startDate: null,
          category: null,
          image: null,
          shortInfo: null,
          description: null,
          timeTo: null,
          timeFrom: null
        }
      }
    },
    methods: {
       mergeFormData(mergeData) {
        this.form = {...this.form, ...mergeData.data}
        this.canProceed = mergeData.isValid
      },
      moveToNextStep() {
        this.currentStep += 1

        this.$nextTick(() => {
          this.canProceed = !this.$refs['currentComponent'].$v.$invalid
        })
      },
      moveToPreviousStep() {
        this.currentStep -= 1
        this.canProceed = true
      }
    },
    computed: {
      progressStatus() {
        return (100 / this.allStepsCount) * this.currentStep
      }
    }
  }
</script>

<style scoped>
  .meetup-create-form {
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 840px;
    padding: 24px 16px 8px;
    width: 100%;
  }
</style>
