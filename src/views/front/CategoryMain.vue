<template>
  <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
  <div v-else class="grid mt-2">
    <div class="col-12" v-if="!data">
      Упс. Увы на нашем сайте нет категорий..
    </div>
    <div v-else v-for="(item, index) in data" :key="index" class="col-3">
      <Card>
        <template #header>
          <img :alt="item.name" :src="url + '/' + item.picture" width="300" height="300">
        </template>
        <template #title>
          {{ item.name }}
        </template>
        <template #content>
          {{ item.description }}
        </template>
        <template #footer>
          <router-link  :to="'/product/' + item.id">
            <Button label="Перейти"/>
          </router-link>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card'
import Button from "primevue/button";
import axios from "axios";

export default {
  name: "CategoryMain",
  data() {
    return {
      data: null,
      loading: true,
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
        url: this.$store.getters.apiUrl + "/front/category",
        method: "get",
      }).then(res => {
        this.data = res.data
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
