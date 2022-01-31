<template>
  <div class="grid">
    <div class="col-12">
      <Breadcrumb :home="home" :model="items"></Breadcrumb>
    </div>
    <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
    <div v-else class="col-12">
      <div class="grid flex justify-content-end  flex-wrap">
        <div class="col-12">
          Название продукта <sup class="text-pink-600">*</sup> <br/>
          <InputText class="inputfield w-full mt-1 mb-2 geInput" v-model="product.name" autofocus/>
          Название продукта <sup class="text-pink-600">*</sup> <br/>
          <Textarea class="inputfield w-full mt-1 mb-2 geInput" v-model="product.description" :autoResize="true" rows="5" cols="30"/>
          Цена продукта <sup class="text-pink-600">*</sup> <br/>
          <InputNumber mode="currency" currency="RUB" :minFractionDigits="2" class="inputfield w-full mt-1 mb-2 geInput" v-model="product.price" />
          <i v-if="loadingCategory" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
          <div v-else>
            Категория продукта <sup class="text-pink-600">*</sup> <br/>
            <Dropdown class="inputfield w-full mt-1 mb-2 geInput"
                      v-model="selectedCategory"
                      :options="category"
                      placeholder="Выбери категорию">
              <template #value="slotProps">
                <div class="p-dropdown-car-value" v-if="slotProps.value">
                  <span>{{ slotProps.value.name }}</span>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <span>{{ slotProps.option.name }}</span>
              </template>
            </Dropdown>
          </div>
          Картинка продукта <br />
          <Image :src="url + '/' + product.picture"  width="250" preview />
          <input type="file" id="file" ref="file" class="inputfield w-full mt-1 mb-2 geInput"
                 v-on:change="handleFileUpload()"/>
        </div>
        <div class="col-offset-10 col-2">
          <Button @click="saveCategory">Сохранить</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "primevue/breadcrumb"
import InputText from "primevue/inputtext"
import axios from "axios";
import Button from "primevue/button"
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Image from "primevue/image";

export default {
  name: "AdminCategoryNewPage",
  data() {
    return {
      home: {icon: 'pi pi-home', to: '/admin'},
      items: [
        {label: 'Товар', to: '/admin/product'},
        {label: 'Изменить', to: ''}
      ],
      loading: true,
      url: this.$store.getters.imageUrl,
      file: '',
      name: '',
      description: '',
      product: null,
      selectedCategory: null,
      price: '',
      loadingCategory: true,
      category: null,
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    getProducts() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/product/find",
        method: "post",
        data: {
          id: this.$route.params.id
        }
      }).then(res => {
        this.product = res.data[0]
        this.getCategory()
        this.loading = false
      })
    },
    saveCategory() {
      let formData = new FormData();
      formData.append('picture', this.file)
      formData.append('id',this.product.id)
      formData.append('name', this.product.name)
      formData.append('description', this.product.description)
      formData.append('category',this.selectedCategory.id)
      formData.append('sum', this.product.price)
      axios.post(this.$store.getters.apiUrl + "/admin/product/save", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        }
      }).then(res => {
        console.log(res.data)
        this.$toast.add({severity: 'success', summary: 'Успешно', detail: res.data.message, life: 3000});
        this.$router.push('/admin/product')
      }).catch(err => {
        console.log(err.response)
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: err.response.data.errors.picture[0],
          life: 3000
        });
      })
    },
    getCategory() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/category",
        method: "get",
      }).then(res => {
        this.category = res.data
        this.loadingCategory = false
        console.log(this.product.category_id)
        this.selectedCategory = res.data.find(el => el.id === this.product.category_id)
      })
    },
  },
  mounted() {
    this.getProducts()
  },
  components: {
    Breadcrumb,
    InputText,
    Textarea,
    Button,
    Dropdown,
    InputNumber,
    Image
  }
}
</script>

<style scoped>

</style>
