<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         @blur="$v.form.username.$touch()"
                         type="text"
                         v-model.trim="form.username"
                         placeholder="Username">
                  <div v-if="$v.form.username.$error" class="form-error">
                    <span class="help is-danger" v-if="!$v.form.username.required">Username is required</span>
                    <span class="help is-danger" v-if="!$v.form.username.minLength">Username must have at least {{$v.form.username.$params.minLength.min}} letters.</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         @blur="$v.form.name.$touch()"
                         type="text"
                         v-model="form.name"
                         placeholder="Name">
                  <div v-if="$v.form.name.$error" class="form-error">
                    <span class="help is-danger" v-if="!$v.form.name.required">Name is required</span>
                    <span class="help is-danger" v-if="!$v.form.name.minLength">Name must have at least {{$v.form.name.$params.minLength.min}} letters.</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         @blur="$v.form.email.$touch()"
                         type="email"
                         v-model="form.email"
                         placeholder="Email">
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">Email is required</span>
                    <span v-if="!$v.form.email.email" class="help is-danger">Email is invalid</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         @blur="$v.form.avatar.$touch()"
                         type="text"
                         v-model="form.avatar"
                         placeholder="Avatar"
                         autocomplete="">
                  <div v-if="$v.form.avatar.$error" class="form-error">
                    <span v-if="!$v.form.avatar.url" class="help is-danger">Url format is invalid</span>
                    <span v-if="!$v.form.avatar.supportedFileType" class="help is-danger">File extension not supported</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         @blur="$v.form.password.$touch()"
                         type="password"
                         v-model="form.password"
                         placeholder="Password"
                         autocomplete="new-password">
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span class="help is-danger" v-if="!$v.form.password.required">Password is required</span>
                    <span class="help is-danger" v-if="!$v.form.password.minLength">Password must have at least {{$v.form.password.$params.minLength.min}} characters.</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         @blur="$v.form.confirmPassword.$touch()"
                         type="password"
                         v-model="form.confirmPassword"
                         placeholder="Confirm password"
                         autocomplete="off">
                  <div v-if="$v.form.confirmPassword.$error" class="form-error">
                    <span class="help is-danger" v-if="!$v.form.confirmPassword.sameAsPassword">Passwords must be identical.</span>
                  </div>
                </div>
              </div>
              <button  @click.prevent="register" type="submit" class="button is-block is-info is-large is-fullwidth">Register</button>
              <p class="typo__p is-success" v-if="submitStatus === 'Ok'">Thanks for registering!</p>
              <p class="typo__p" v-if="submitStatus === 'Error' && isFormInvalid">Please fill the form correctly.</p>
              <p class="typo__p" v-if="submitStatus === 'Pending'">Sending...</p>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="'/login'"> login </router-link> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import { required, email, minLength, sameAs, url } from 'vuelidate/lib/validators'
  import { supportedFileType } from '../helpers/validators'

  export default {
    data() {
      return {
        submitStatus: null,
        form: {
          username: null,
          name: null,
          email: null,
          avatar: null,
          password: null,
          confirmPassword: null
        }
      }
    },
    computed: {
      isFormInvalid() {
        return this.$v.form.$invalid
      }
    },
    validations: {
      form: {
        username: {
          required,
          minLength: minLength(3),
        },
        name: {
          required,
          minLength: minLength(4)
        },
        email: {
          required,
          email
        },
        avatar: {
          url,
          supportedFileType
        },
        password: {
          required,
          minLength: minLength(6)
        },
        confirmPassword: {
          sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      ...mapActions('auth', ['registerUser']),
      register() {
        this.$v.form.$touch()
        if (this.$v.form.$invalid) {
          this.submitStatus = 'Error'
        } else {
          this.submitStatus = 'Pending'
          setTimeout(() => {
            this.registerUser(this.form)
              .then(() => {
                this.$toasted.success('Thanks for registering', {duration: 6000})
                this.$router.push('/login')
                this.$toasted.success('Please login to continue', {duration: 15000})
                this.submitStatus = 'Ok'
              })
              .catch(errorMessage => {
                this.$toasted.error(errorMessage, {duration: 5000})
                this.submitStatus = 'Error'
              })
          }, 1500)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  .typo__p {
    margin-top: 15px;
  }

  .typo__p.is-success {
      color: darkolivegreen
    }

  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>
