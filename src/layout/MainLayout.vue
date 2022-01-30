<template>
  <Toast/>
  <div class="container">
    <NavBarController/>
    <router-view/>
  </div>
</template>

<script>
import Toast from 'primevue/toast'
import NavBarController from "@/components/menu/NavBarController";
import moment from "moment";
import store from "@/store";

require('moment-timezone')

const Moscow = moment.tz(moment.now(), 'Europe/Moscow')
console.log(Moscow.format('YYYY-MM-DD HH:mm:ss'))
console.log(store.getters.tokenTime)
if (store.getters.tokenTime) {
  if (Moscow.format('YYYY-MM-DD HH:mm:ss') >= store.getters.tokenTime) {
    localStorage.clear()
    store.commit('isAuthenticated', false)
    store.commit('bearer', null)
    store.commit('tokenTime', null)
    store.commit('me', [])
    store.commit('role', "")
  }
}
export default {
  name: "MainLayout",
  components: {
    NavBarController,
    Toast
  }
}
</script>

<style scoped>

</style>
