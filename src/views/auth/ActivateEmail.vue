<template>
  <div class="grid flex justify-content-start flex-wrap mt-8">
    <div class="col-12 flex align-items-center justify-content-center" v-if="loading">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div class="col-12 flex align-items-center justify-content-center" v-else>
      <div>
        {{ data }} <br />
        <router-link to="/">
          <Button class="mt-4" label="Вернуться на главную"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Button from "primevue/button";

export default {
  name: "ActivateEmail",
  data() {
    return {
      id: this.$route.params.id,
      token: this.$route.params.token,
      data: null,
      loading: true,
    }
  },
  components: {
    Button
  },
  methods: {
    getCheckEmail() {
      axios.request({
        url: this.$store.getters.apiUrl + '/auth/activateEmail',
        method: "post",
        data: {
          id: this.id,
          token: this.token,
        }
      }).then(res => {
        console.log(res)
        this.data = res.data.message
      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted() {
    this.getCheckEmail()
  }
}
</script>

<style scoped>

</style>