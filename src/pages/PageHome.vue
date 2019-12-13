<template>
  <div>
    <AppHero />
    <div v-if="isDataLoaded" class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Hangouts
          <span v-if="ipLocation"> in {{ipLocation}}</span>
        </h1>
        <AppDropdown />
        <router-link v-if="user" :to="{name:'PageMeetupCreate'}" class="button is-primary is-pulled-right m-r-sm">Create Hangouts</router-link>
        <router-link :to="'/find'" class="button is-primary is-pulled-right m-r-sm">All</router-link>
      </div>
      <div class="row columns is-multiline">
        <MeetupItem
          v-for="meetup in meetups"
          :key="meetup._id"
          :meetup="meetup"
        />
      </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline">
            <CategoryItem
              v-for="category in categories"
              :key="category._id"
              :category="category"
            />
          </div>
        </div>
      </section>
    </div>
    <div v-else class="container">
      <AppSpinner />
    </div>
  </div>
</template>

<script>
  import CategoryItem from '../components/CategoryItem'
  import MeetupItem from '../components/MeetupItem'
  import { mapActions, mapState, mapGetters } from 'vuex'
  import { processLocation } from '../helpers'

  export default {
    components: { CategoryItem, MeetupItem },
    data() {
      return {
        isDataLoaded: false
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/selectAuthUser',
        ipLocation: 'meta/location'
      }),
      ...mapState({
        meetups: state => state.meetups.items,
        categories: state => state.categories.items
      })
    },
    created() {
      const filter = {}
      if (this.ipLocation) {
        filter['location'] = processLocation(this.ipLocation)
      }

      Promise.all([this.fetchMeetups({filter}), this.fetchCategories()])
        .then(() => this.isDataLoaded = true)
        .catch(error => {
          console.error(error)
          this.isDataLoaded = true
        })
    },
    methods: {
      ...mapActions('meetups', ['fetchMeetups']),
      ...mapActions('categories', ['fetchCategories'])
    }
  }
</script>

<style scoped>

</style>
