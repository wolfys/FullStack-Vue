<template>
  <div class="grid">
    <div class="col-12">
      <Breadcrumb :home="home" :model="items"></Breadcrumb>
    </div>
    <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
    <div v-else class="col-12">
      <DataTable
          :value="category"
          class="p-datatable-sm"
          showGridlines
          stripedRows
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10,20,50]"
          currentPageReportTemplate="Показано с {first} по {last} из {totalRecords}"
          responsiveLayout="scroll">
        <template #header>
          <div class="grid flex justify-content-end flex-wrap">
            <div class="col-4">
            <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
            </div>
            <div class="col-offset-6 col-2 flex align-items-center justify-content-center">
              <router-link to="/admin/category/add">
              <Button>Добавить</Button>
              </router-link>
            </div>
          </div>
        </template>
        <Column field="id" header="Id" :sortable="true"></Column>
        <Column field="name" header="Имя" :sortable="true"></Column>
        <Column field="description" header="Описание" :sortable="true"></Column>
        <Column :exportable="false" style="min-width:2rem">
          <template #body="slotProps">
            <router-link :to="'category/edit/' + slotProps.data.id">
              <Button icon="pi pi-pencil"
                      class="p-button-rounded p-button-success mr-2"
              />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "primevue/breadcrumb";
import axios from "axios";
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Button from "primevue/button"
import {FilterMatchMode, FilterOperator} from "primevue/api";
import InputText from "primevue/inputtext"

export default {
  name: "AdminCategoryPage",
  data() {
    return {
      home: {icon: 'pi pi-home', to: '/admin'},
      items: [
        {label: 'Категории', to: '/admin/category'}
      ],
      loading: true,
      category: null,
      url: this.$store.getters.imageUrl,
      filters: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'description': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      },
    }
  },
  methods: {
    getUsers() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/category",
        method: "get",
      }).then(res => {
        this.category = res.data
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
    Column,
    Button,
    InputText
  }
}
</script>

<style scoped>

</style>