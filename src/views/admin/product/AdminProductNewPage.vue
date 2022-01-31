<template>
  <div class="grid">
    <div class="col-12">
      <Breadcrumb :home="home" :model="items"></Breadcrumb>
    </div>
    <div class="col-12">
      <div class="grid flex justify-content-end  flex-wrap">
        <div class="col-12">
          Название продукта <sup class="text-pink-600">*</sup> <br/>
          <InputText class="inputfield w-full mt-1 mb-2 geInput" v-model="name" autofocus/>
          Название продукта <sup class="text-pink-600">*</sup> <br/>
          <Textarea class="inputfield w-full mt-1 mb-2 geInput" v-model="description" :autoResize="true" rows="5" cols="30"/>
          Цена продукта <sup class="text-pink-600">*</sup> <br/>
          <InputNumber mode="currency" currency="RUB" :minFractionDigits="2" class="inputfield w-full mt-1 mb-2 geInput" v-model="price" />
          <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
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

export default {
  name: "AdminCategoryNewPage",
  data() {
    return {
      home: {icon: 'pi pi-home', to: '/admin'},
      items: [
        {label: 'Товар', to: '/admin/product'},
        {label: 'Добавить', to: ''}
      ],
      loading: true,
      url: this.$store.getters.imageUrl,
      file: '',
      name: '',
      description: '',
      category: null,
      selectedCategory: '',
      price: ''
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    saveCategory() {
      let formData = new FormData();
      formData.append('picture', this.file)
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('category',this.selectedCategory.id)
      formData.append('sum', this.price)
      axios.post(this.$store.getters.apiUrl + "/admin/product/add", formData, {
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
        this.loading = false
      })
    },
  },
  mounted() {
    this.getCategory()
  },
  components: {
    Breadcrumb,
    InputText,
    Textarea,
    Button,
    Dropdown,
    InputNumber
  }
}
</script>

<style scoped>

</style>
