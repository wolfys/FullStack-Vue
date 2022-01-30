<template>
  <div class="grid">
    <div class="col-12">
      <Breadcrumb :home="home" :model="items"></Breadcrumb>
    </div>
    <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
    <div v-else class="col-12">
      <DataTable
          :value="users"
          class="p-datatable-sm"
          showGridlines
          stripedRows
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10,20,50]"
          currentPageReportTemplate="Показано с {first} по {last} из {totalRecords}"
          responsiveLayout="scroll">
        <Column field="id" header="Id" :sortable="true"></Column>
        <Column field="name" header="Имя" :sortable="true"></Column>
        <Column field="email" header="Почта" :sortable="true"></Column>
        <Column field="is_admin" header="Админ" :sortable="true"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "primevue/breadcrumb";
import axios from "axios";
import DataTable from "primevue/datatable"
import Column from  "primevue/column"
export default {
  name: "AdminUsersPage",
  data() {
    return {
      home: {icon: 'pi pi-home', to: '/admin'},
      items: [
        {label: 'Пользователи', to: '/admin/users'}
          ],
      loading: true,
      users: null,
      url: this.$store.getters.imageUrl
    }
  },
  methods: {
    getUsers() {
      axios.request({
        url: this.$store.getters.apiUrl + "/admin/users/all",
        method: "post",
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        },
      }).then(res => {
        this.users = res.data
        this.loading = false
      })
    },
  },
  mounted() {
    this.getUsers()
  },
  components: {
    Breadcrumb,
    DataTable,
    Column
  }
}
</script>

<style scoped>

</style>