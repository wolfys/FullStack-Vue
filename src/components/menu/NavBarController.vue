<template>
 <Menubar :model="items">
   <template #end>
     <div>
       <RegisterComponent />
       <AuthComponent />
     </div>
   </template>
 </Menubar>
</template>

<script>
import AuthComponent from "../../components/auth/AuthComponent";
import RegisterComponent from "../../components/auth/RegisterComponent";
import Menubar from 'primevue/menubar';
export default {
  name: "NavBarController",
  data() {
    return {
      items: [
        {
          label:'Главная',
          icon: 'pi pi-home',
          to: '/'
        }
      ]
    }
  },
  components: {
    Menubar,
    RegisterComponent,
    AuthComponent
  }
}
</script>

<style scoped>

</style>
