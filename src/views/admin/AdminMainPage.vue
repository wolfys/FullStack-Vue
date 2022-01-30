<template>
  <div class="grid">
    <div class="col-12">
      <Breadcrumb :home="home"></Breadcrumb>
    </div>
    <div class="col-12">
      Главная страница, панели администратора. Здесь скоро будут графики ^_^
    </div>
  </div>
</template>

<script>
import Breadcrumb from 'primevue/breadcrumb';
export default {
  name: "AdminMainPage",
  data() {
    return {
      home: {icon: 'pi pi-home', to: '/admin'},
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style scoped>

</style>