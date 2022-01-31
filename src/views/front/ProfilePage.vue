<template>
  <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
  <div v-else class="grid mt-4">
    <div class="col-4">
      <Card>
        <template #title>
          Основная информация
        </template>
        <template #content>
          <div class="mt-2">
            Почта <br/>
            <InputText type="email" name="email" class="inputfield w-full mt-2 mb-2" v-model="data.email" disabled/>
          </div>
          <div class="mt-2">
            <label for="exampleInputTextPassword1" class="form-label">
              Имя
            </label>
            <InputText
                class="inputfield w-full mt-2 mb-2"
                name="name"
                v-model="data.name"
            />
          </div>
          <div class="mt-2">
            <Button>Сохранить</Button>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-4">
      <Card>
        <template #title>
          Изменить пароль
        </template>
        <template #content>
          <div class="mb-3">
            <label for="exampleInputTextPassword1" class="form-label">
              Текущий пароль
            </label> <br/>
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
            </label> <br/>
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
            </label> <br/>
            <Password
                class="inputfield w-full mt-2 mb-2"
                name="password_confirmation"
                type="password"
                v-model="data.newPassword2"
            />
          </div>
          <div class="mt-2">
            <Button>Сохранить</Button>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-4">
      <Card>
        <template #title>
          Изменить пароль
        </template>
        <template #content>
          <div class="mt-2">
            <label class="form-label">
              Изображение
            </label>
            <br>
            <Image alt=""
                   width="100"
                 :src="url + '/' + data.picture"  preview
            />
            <InputText class="inputfield w-full mt-2 mb-2" name="picture" type="file"/>
          </div>
          <div class="mt-2">
            <Button>Сохранить</Button>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-6">
      <Card>
        <template #title>
          Список адресов
        </template>
        <template #content>
          <div class="mt-2">
            <Button>Сохранить</Button>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-6">
      <Card>
        <template #title>
          Добавить новый адрес
        </template>
        <template #content>
          <InputText name="new_address" class="inputfield w-full mt-2 mb-2"/>
          <div class="field-checkbox">
            <Checkbox id="city1" name="city" value="Chicago" v-model="newAdressMain" />
            <label for="city1">Основной адресс</label>
          </div>
          <div class="mt-2">
            <Button>Сохранить</Button>
          </div>
        </template>
      </Card>
    </div>
    <div class="mb-3">
      <label class="form-label">
        Новый адрес
      </label>
      <InputText name="new_address" class="inputfield w-full mt-2 mb-2"/>
      <label>Сделать основным</label>
      <Checkbox type="checkbox"/>
    </div>
    <Button type="submit" class="btn btn-primary">Сохранить</Button>
    {{ data }}
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import Card from "primevue/card";
import Image from "primevue/image";
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
    Checkbox,
    Card,
    Image
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
