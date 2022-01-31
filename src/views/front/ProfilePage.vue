<template>
  <i v-if="loading" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
  <div v-else class="grid mt-4">
    <div class="col-4">
      <Card>
        <template #title>
          Основная информация
        </template>
        <template #content>
          <div>
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
            <Button @click="saveMainInfo">Сохранить</Button>
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
                v-model="newPassword"
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
                v-model="newPassword2"
            />
          </div>
          <div class="mt-2">
            <Button @click="saveNewPassword">Сохранить</Button>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-4">
      <Card>
        <template #title>
          Изменить аватар
        </template>
        <template #content>
          <div>
            <label class="form-label">
              Изображение
            </label>
            <br>
            <Image alt=""
                   width="100"
                   :src="url + '/' + data.picture" preview
            />
            <input class="inputfield w-full mt-2 mb-2" id="file" ref="file" name="picture" type="file"
                   v-on:change="handleFileUpload()"/>
          </div>
          <div class="mt-2">
            <Button @click="saveNewAvatar">Сохранить</Button>
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
          <i v-if="loadingStreet" class="pi pi-spin pi-spinner mt-2" style="font-size: 2rem"></i>
          <div v-else>
            <div v-if="street.length === 0">
              Адреса не добавлены на сайт.
            </div>
            <div v-else>
              <div class="mt-2">
                <Button>Сохранить</Button>
              </div>
            </div>
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
          <AutoComplete
              class="inputfield w-full mt-1"
              v-model="newStreet"
              :suggestions="filteredCountriesBasic"
              @complete="searchStreet($event)"
              @item-select="selectStreet()"
              placeholder="Улица проживания"
              minLength="3"
              inputClass="inputfield w-full"
              field="street_with_type">
            {{ newStreet }}
            <template #content="slotProps">
              <div class="country-item">
                <div class="p-ml-2">{{ slotProps.item.value }}</div>
              </div>
            </template>
            <template #chip="slotProps">
              {{ slotProps }}
            </template>
            <template #item="slotProps">
              <div class="country-item">
                <div class="p-ml-2">{{ slotProps.item.value }}</div>
              </div>
            </template>
          </AutoComplete>
          <div class="field-checkbox mt-2">
            <Checkbox class="mt-2" id="city1" name="city" value="Chicago" v-model="newStreetMain"/>
            <label for="city1">Основной адресс</label>
          </div>
          <div class="mt-2">
            <Button @click="saveNewStreet">Сохранить</Button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import Card from "primevue/card";
import Image from "primevue/image";
import AutoComplete from "primevue/autocomplete";
import axios from "axios";

export default {
  name: "ProfilePage",
  data() {
    return {
      loading: true,
      data: '',
      url: this.$store.getters.imageUrl,
      id: null,
      newPassword: '',
      newPassword2: '',
      file: null,
      newStreet: null,
      filteredCountriesBasic: null,
      newStreetMain: false,
      street: null,
      loadingStreet: true,
    }
  },
  components: {
    InputText,
    Button,
    Password,
    Checkbox,
    Card,
    Image,
    AutoComplete
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
        this.id = res.data.id
        this.loading = false
        this.getStreetList()
      })
    },
    getStreetList() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/profile/streetList",
        method: "post",
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        }
      }).then(res => {
        this.street = res.data
        this.loadingStreet = false
      })
    },
    saveMainInfo() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/profile/saveMainInfo",
        method: "post",
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        },
        data: {
          name: this.data.name
        }
      }).then(res => {
        this.$toast.add({severity: 'success', summary: 'Успешно', detail: res.data.message, life: 3000});
        this.loading = true
        this.data = null
        this.getUsers()
      }).catch(err => {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: err.response.data.errors,
          life: 3000
        });
      })
    },
    saveNewPassword() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/profile/saveNewPassword",
        method: "post",
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        },
        data: {
          password: this.data.password,
          newPassword: this.newPassword,
          newPassword2: this.newPassword2
        }
      }).then(res => {
        this.$toast.add({severity: 'success', summary: 'Успешно', detail: res.data.message, life: 3000});
        this.loading = true
        this.data = null
        this.getUsers()
      }).catch(err => {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: err.response.data.errors,
          life: 3000
        });
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    saveNewAvatar() {
      let formData = new FormData();
      formData.append('picture', this.file)
      axios.post(this.$store.getters.apiUrl + "/front/profile/saveNewAvatar", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        }
      }).then(res => {
        console.log(res.data)
        this.$toast.add({severity: 'success', summary: 'Успешно', detail: res.data.message, life: 3000});
        this.loading = true
        this.data = null
        this.getUsers()
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
    searchStreet(event) {
      axios.request({
        url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token c8eeb106ae0cb42039d2004fc8ec5f48569589c8"
        },
        data: JSON.stringify({query: event.query})
      }).then(response => {
        this.filteredCountriesBasic = response.data.suggestions
      })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false))
    },
    selectStreet() {
      this.newStreet = this.newStreet.unrestricted_value
    },
    saveNewStreet() {
      axios.request({
        url: this.$store.getters.apiUrl + "/front/profile/saveNewStreet",
        method: "post",
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        },
        data: {
          street: this.newStreet,
          mainStreet: this.newStreetMain
        }
      }).then(res => {
        console.log(res.data)
        this.$toast.add({severity: 'success', summary: 'Успешно', detail: res.data.message, life: 3000});
        this.loading = true
        this.data = null
        this.getUsers()
      }).catch(err => {
        console.log(err.response)
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: err.response.data.errors.picture[0],
          life: 3000
        });
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
