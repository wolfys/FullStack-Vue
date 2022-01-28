<template>
  <div class="container">
    <NavBarController/>
    <router-view/>
  </div>
</template>

<script>
import NavBarController from "@/components/menu/NavBarController";

export default {
  name: "MainLayout",
  components: {
    NavBarController
  }
}
</script>

<style scoped>

</style>
