<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

    <div class="content">
      <div >
        <span class="result-title">
        Location
        </span>
        <p>{{form.location}}</p>
      </div>
      <div>
        <span class="result-title">
        Title
        </span>
        <p>{{form.title}}</p>
      </div>
      <div>
        <span class="result-title">
        Start Date
        </span>
        <p>{{form.startDate | formatDate}}</p>
      </div>
      <div>
        <span class="result-title">
        From
        </span>
        <p>{{form.timeFrom}}</p>
      </div>
      <div>
        <span class="result-title">
        To
        </span>
        <p>{{form.timeTo}}</p>
      </div>
      <div>
        <span class="result-title">
        Category
        </span>
        <p>{{form.category.name}}</p>
      </div>
      <div>
        <span class="result-title">
        Image
        </span>
        <p>{{form.image || 'this is an image'}}</p>
      </div>
      <div>
        <span class="result-title">
        Short Info
        </span>
        <p>{{form.shortInfo}}</p>
      </div>
      <div>
        <span class="result-title">
        Description
        </span>
        <p>{{form.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      form: {
        type: Object,
        required: true
      }
    },
    validations: {}
  }
</script>

<style scoped>
  .result-title {
    font-size: 29px;
    font-weight: bold;
  }

  .result-title + p {
    font-size: 20px;
  }
</style>
