<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard @meetupConfirmed="createMeetup" />
      </div>
    </section>
  </div>
</template>

<script>
  import MeetupCreateWizard from '@/components/MeetupCreate/MeetupCreateWizard'
  export default {
    components: {
      MeetupCreateWizard
    },
    methods: {
      createMeetup(meetupData) {
        this.$store.dispatch('meetups/createMeetup', meetupData)
          .then(createdMeetup => {
            this.$router.push(`/meetups/${createdMeetup._id}`)
          })
          .catch(error => console.log(error))
      }
    }
  }
</script>

<style scoped lang="scss">
  .meetup-create-page {
    min-height: 100vh;
  }
</style>
