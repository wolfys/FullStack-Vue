<template>
  <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
  <form v-else method="POST" action="{{ route('profileUpdate') }}" enctype="multipart/form-data">
    <div class="mt-4">
      <label for="exampleInputTextEmail1" class="form-label">
        Почта
      </label>
      <InputText type="email" name="email" class="inputfield w-full mt-2 mb-2" v-model="data.email" />
    </div>
    <div class="mb-3">
      <label for="exampleInputTextPassword1" class="form-label">
        Имя
      </label>
      <InputText
          class="inputfield w-full mt-2 mb-2"
          name="name"
          v-model="data.name"
          />
    </div>
    <div class="mb-3">
      <label for="exampleInputTextPassword1" class="form-label">
        Текущий пароль
      </label> <br />
      <Password
          autocomplete="new-password"
          class="inputfield w-full mt-2 mb-2"
          name="current_password"
          type="password"
          v-model="data.password"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputTextPassword1" class="form-label">
        Новый пароль
      </label> <br />
      <Password
          class="inputfield w-full mt-2 mb-2"
          name="password"
          type="password"
          v-model="data.newPassword"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputTextPassword1" class="form-label">
        Повторите пароль
      </label> <br />
      <Password
          class="inputfield w-full mt-2 mb-2"
          name="password_confirmation"
          type="password"
          v-model="data.newPassword2"
      />
    </div>
    <div class="mb-3">
      <label class="form-label">
        Изображение
      </label>
      <br>
      <img alt=""
          style="height:100px;margin-bottom: 10px;border-radius: 100px;border: 2px solid grey;"
          :src="url + '/' + data.picture"
      >
      <InputText class="inputfield w-full mt-2 mb-2" name="picture" type="file" />
    </div>
    <div class="mb-3">
      <label class="form-label">
        Список адресов
      </label>
      <br>
    </div>
    <div class="mb-3">
      <label class="form-label">
        Новый адрес
      </label>
      <InputText name="new_address" class="inputfield w-full mt-2 mb-2" />
      <label>Сделать основным</label>
      <Checkbox type="checkbox" />
    </div>
    <Button type="submit" class="btn btn-primary">Сохранить</Button>
    {{data}}
  </form>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import axios from "axios";
export default {
  name: "ProfilePage",
  data() {
    return {
      loading: true,
      data: '',
      url: this.$store.getters.imageUrl
    }
  },
  components: {
    InputText,
    Button,
    Password,
    Checkbox
  },
  methods: {
    getUsers() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/profile",
        method: "post",
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        }
      }).then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped>

</style>