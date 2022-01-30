<template>
  <div class="grid">
    <div class="col-12">
      <Breadcrumb :home="home" :model="items"></Breadcrumb>
    </div>
    <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
    <div v-else class="col-12">
      <div class="grid flex justify-content-end  flex-wrap">
        <div class="col-12">
          Название категории <br/>
          <InputText class="inputfield w-full mt-1 mb-2 geInput" v-model="category.name" autofocus/>
          Название категории <br/>
          <Editor class="inputfield w-full mt-1 mb-2 geInput" v-model="category.description"/>
          Картинка категории <br/>
          <Image :src="url + '/' + category.picture"  width="250" preview />
          <input type="file" id="file" ref="file" class="inputfield w-full mt-1 mb-2 geInput" v-on:change="handleFileUpload()"/>
        </div>
        <div class="col-offset-10 col-2">
          <Button @click="saveCategory">Сохранить</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "primevue/breadcrumb";
import InputText from "primevue/inputtext";
import axios from "axios";
import Editor from "primevue/editor"
import Button from "primevue/button";
import Image from 'primevue/image';

export default {
  name: "AdminCategoryEditPage",
  data() {
    return {
      home: {icon: 'pi pi-home', to: '/admin'},
      items: [
        {label: 'Категории', to: '/admin/category'},
        {label: 'Редактировать', to: ''}
      ],
      loading: true,
      category: null,
      url: this.$store.getters.imageUrl,
      id: this.$route.params.id,
      file: ''
    }
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
        this.loading = false
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    saveCategory() {
      let formData = new FormData();
      formData.append('id',this.id)
      formData.append('picture',this.file)
      formData.append('name',this.category.name)
      formData.append('description',this.category.description)
      axios.post(this.$store.getters.apiUrl + "/admin/category/save",formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        }
      }).then(res => {
        console.log(res.data)
        this.$toast.add({severity: 'success', summary: 'Успешно', detail: res.data.message, life: 3000});
        this.$router.push('/admin/category')
      }).catch(err => {
        console.log(err.response)
        this.$toast.add({severity: 'error', summary: 'Ошибка', detail: err.response.data.errors.picture[0], life: 3000});
      })
    }
  },
  components: {
    Breadcrumb,
    InputText,
    Editor,
    Button,
    Image
  },
  mounted() {
    this.getCategory()
  }
}
</script>

<style scoped>

</style>