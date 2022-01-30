<template>
  <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
  <div class="grid" v-else>
    <div class="col-12">
      <h3>{{ category.name }}</h3>
      <p>{{ category.description }}</p>
    </div>
    <div v-for="(item, index) in product" :key="index" class="col-3">
      <Card>
        <template #header>
          <img :alt="item.name" :src="url + '/' + item.picture" width="300" height="300">
        </template>
        <template #title>
          {{ item.name }}
        </template>
        <template #content>
          {{ item.description }} <br />
          <h4>Цена: {{ item.price }}</h4>
        </template>
        <template #footer>
          <div class="grid">
            <div class="col-3">
              <Button icon="pi pi-minus" class="p-button-rounded p-button-danger"></Button>
            </div>
            <div class="col-3">
              <Button icon="pi pi-plus" class="p-button-rounded"></Button>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from 'primevue/card'
import Button from 'primevue/button'
export default {
  name: "ProductPage",
  data() {
    return {
      loading: true,
      category: null,
      product: null,
      url: this.$store.getters.imageUrl
    }
  },
  components: {
    Card,
    Button
  },
  methods: {
    getCategory() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/category/find",
        method: "post",
        data: {
          id: this.$route.params.id
        }
      }).then(res => {
        this.category = res.data[0]
        this.getProduct()
      })
    },
    getProduct() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/product/find",
        method: "post",
        data: {
          id: this.$route.params.id
        }
      }).then(res => {
        this.product = res.data
        this.loading = false
      })
    }
  },
  mounted() {
     this.getCategory()
  }
}
</script>

<style scoped>

</style>