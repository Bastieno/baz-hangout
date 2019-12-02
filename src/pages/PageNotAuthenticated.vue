<template>
  <div class="container">
    <ErrorView
      :title="'You need to login to access this page'"
      :status="'401'"
      :navigateToPage="'PageLogin'"
      :navigateToText="'Navigate to login'"
    />
  </div>
</template>

<script>
  import ErrorView from '../components/ErrorView'

  export default {
    components: { ErrorView }
  }
</script>

<style scoped>

</style>

