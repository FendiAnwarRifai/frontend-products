<template>
    <div>
        <H1>Register</H1>
        <div class="container">
<form autocomplete="off" style="border-radius:28px;" class="shadow-lg p-5 mb-5 bg-white" @submit.prevent="RegisterData">
  <div class="mb-3">
    <label for="username" class="form-label">Username</label>
    <input type="text" v-model="username" class="form-control" id="username" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" v-model="password" class="form-control" id="password">
  </div>
  <button type="submit" class="btn btn-primary">Create Account</button>
</form>
</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    RegisterData () {
      const payload = {
        username: this.username,
        password: this.password
      }
      this.register(payload)
        .then((res) => {
          this.$swal.fire({
            title: 'Success',
            text: 'Register successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.$router.push({ path: '/' })
        })
        .catch((err) => {
          this.$swal.fire({
            title: 'Warning',
            text: `${err.response.data.message}`,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
