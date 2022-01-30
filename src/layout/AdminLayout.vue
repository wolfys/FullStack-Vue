<template>
 <div class="grid mt-3">
   <div class="col-2">
     <Menu :model="items"></Menu>
   </div>
   <div class="col-10">
     <router-view />
   </div>
 </div>
</template>

<script>
import Menu from 'primevue/menu';
export default {
  name: "AdminMainPage",
  data() {
    return {
      items: [
        {
          label: 'Главная',
          icon: 'pi pi-home',
          to: '/admin'
        },
        {
          label: 'Пользователи',
          icon: 'pi pi-users',
          to: '/admin/users'
        },
        {
          label: 'Категории',
          icon: 'pi pi-book',
          to: '/admin/category'
        },
        {
          label: 'Товары',
          icon: 'pi pi-tablet',
          to: '/admin/product'
        }
      ]
    }
  },
  components: {
    Menu
  }
}
</script>

<style scoped>

</style>