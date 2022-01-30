<template>
  <div class="grid">
    <div class="col-12">
      <Breadcrumb :home="home" :model="items"></Breadcrumb>
    </div>
    <div class="col-12">
      <div class="grid flex justify-content-end  flex-wrap">
        <div class="col-12">
          Название категории <br/>
          <InputText class="inputfield w-full mt-1 mb-2 geInput" v-model="name" autofocus/>
          Название категории <br/>
          <Textarea class="inputfield w-full mt-1 mb-2 geInput" v-model="description"/>
          {{ description }}
          Картинка категории <br/>
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
import Breadcrumb from "primevue/breadcrumb"
import InputText from "primevue/inputtext"
import axios from "axios";
import Button from "primevue/button"
import Textarea from 'primevue/textarea'

export default {
  name: "AdminCategoryNewPage",
  data() {
    return {
      home: {icon: 'pi pi-home', to: '/admin'},
      items: [
        {label: 'Категории', to: '/admin/category'},
        {label: 'Добавить', to: ''}
      ],
      loading: true,
      url: this.$store.getters.imageUrl,
      file: '',
      name: '',
      description: '',
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    saveCategory() {
      let formData = new FormData();
      formData.append('id',this.id)
      formData.append('picture',this.file)
      formData.append('name',this.name)
      formData.append('description',this.description)
      axios.post(this.$store.getters.apiUrl + "/admin/category/add",formData, {
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
    Textarea,
    Button
  },
  mounted() {
    this.getCategory()
  }
}
</script>

<style scoped>

</style>