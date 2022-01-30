<template>
 <Menubar :model="items">
   <template #start>
     <b class="mr-4">Shop Platonov</b>
   </template>
   <template #end>
     <div>
       <AuthComponent />
     </div>
   </template>
 </Menubar>
</template>

<script>
import AuthComponent from "../../components/auth/AuthComponent";
import Menubar from 'primevue/menubar';
import {useVuelidate} from "@vuelidate/core";
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
  setup: () => ({v$: useVuelidate()}),
  components: {
    Menubar,
    AuthComponent
  }
}
</script>

<style scoped>

</style>
