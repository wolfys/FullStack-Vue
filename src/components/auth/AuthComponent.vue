<template>
  <div v-if="!auth">
    <Button class="ml-2 p-button-sm" @click="displayDialog">Авторизация</Button>
    <router-link to="/register">
      <Button class="ml-2 p-button-sm">Регистрация</Button>
    </router-link>
  </div>
  <div v-else style="width: 300px">
    <div class="grid flex justify-content-center flex-wrap">
      <div class="col-1 flex align-items-center justify-content-center">
      </div>
      <div class="col-3 flex align-items-center justify-content-center">
        <a class="p-menuitem-link"><span class="p-menuitem-icon pi pi-pw pi-shopping-cart"></span><Badge :value="cart" class="mr-3"></Badge></a>
      </div>
      <div class="col-8 flex align-items-center justify-content-center">
        <Button type="button" :label="ME['name']" @click="toggle"/>
        <Menu ref="menu" :model="items" :popup="true">
          <template #item="{item}">
            <div v-if="item.command">
              <div v-if="item.to === '/admin' && role !== 0">
                <a class="p-menuitem-link" @click="item.command"><span
                    :class="'p-menuitem-icon ' + item.icon"></span>{{ item.label }}</a>
              </div>
              <div v-else>
                <div v-if="item.to !== '/admin'">
                  <a class="p-menuitem-link" @click="item.command"><span
                      :class="'p-menuitem-icon ' + item.icon"></span>{{ item.label }}</a>
                </div>
              </div>
            </div>
          </template>
        </Menu>
      </div>
    </div>
  </div>
  <Dialog header="Авторизация" v-model:visible="display" :style="{width: '50vw'}">
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
      Ваш Email <br/>
      <InputText v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}"
                 class="inputfield w-full mt-2 mb-2"/>
      <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error mb-2">
        Пожалуйста введите корректный Email.
      </small> <br/>
      Ваш Пароль <br/>
      <Password class="inputfield w-full mt-1 mb-2 geInput" :class="{'p-invalid':v$.password.$invalid && submitted}"
                v-model="v$.password.$model" :feedback="false" toggleMask/>
      <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error mb-2">
        Пожалуйста введите корректный пароль.
      </small> <br/>
      <div class="grid">
        <div class="col-offset-9 col-3">
          <Button type="submit" @click="handleSubmit()" label="Войти" autofocus/>
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import {useVuelidate} from "@vuelidate/core"
import {email, required, minLength} from "@vuelidate/validators"
import axios from "axios"
import store from "../../store"
import {mapGetters} from "vuex"
import Menu from "primevue/menu"
import Badge from "primevue/badge"

export function validPassword(name) {
  let validNamePattern = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$");
  return validNamePattern.test(name);

}

export default {
  name: "AuthComponent",
  data() {
    return {
      display: false,
      password: '',
      email: '',
      submitted: false,
      auth: store.getters.isAuthenticated,
      cart: store.getters.cart,
      role: store.getters.ROLE,
      items: [
        {
          label: 'Профиль', icon: 'pi pi-fw pi-user', command: () => {
            this.$router.push('/profile')
            this.$refs.menu.hide()
          }
        },
        {label: 'Админка', icon: 'pi pi-fw pi-id-card', to: '/admin', command: () => {
            this.$router.push('/admin')
            this.$refs.menu.hide()
          }},
        {
          label: 'Выход', icon: 'pi pi-fw pi-sign-out', command: () => {
            this.getLogout()
          }
        },
      ]
    }
  },
  setup: () => ({v$: useVuelidate()}),
  validations() {
    return {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        password_validator: {
          $validator: validPassword,
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'ME', 'ROLE'
    ])
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    displayDialog() {
      this.display = true
    },
    handleSubmit(isFormValid) {
      console.log(isFormValid);
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      return this.getAuth()
    },
    getAuth() {
      axios.request({
        url: this.$store.getters.apiUrl + "/auth/login",
        method: "post",
        data: {
          email: this.email,
          password: this.password
        }
      })
          .then((res) => {
            this.$store.commit('bearer', res.data.token)
            this.$store.commit('tokenTime', res.data.tokenTime)
            this.$store.commit('me', res.data.me)
            this.$store.commit('role', res.data.me.is_admin)
            this.auth = true
            this.$toast.add({severity: 'success', summary: 'Успешно', detail: 'Выполнен вход на сайт :)', life: 3000});
            this.display = false
          })
          .catch((err) => {
            if (err.response) {
              this.$toast.add({severity: 'error', summary: 'Ошибка', detail: err.response.data.error, life: 3000});
              // client received an error response (5xx, 4xx)
            } else if (err.request) {
              console.log(err.request)
              // client never received a response, or request never left
            } else {
              // anything else
            }
          })
    },
    getLogout() {
      axios.request({
        url: this.$store.getters.apiUrl + "/auth/logout",
        method: "post",
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.BEARER
        }
      })
          .then((res) => {
            localStorage.clear()
            this.$store.commit('isAuthenticated', false)
            this.$store.commit('bearer', null)
            this.$store.commit('tokenTime', null)
            this.$store.commit('me', [])
            this.$store.commit('role', "")
            this.auth = false
            this.$toast.add({severity: 'success', summary: 'Успешно', detail: res.data.message, life: 3000});
            this.$router.push('/')
          })
          .catch((err) => {
            if (err.response) {
              localStorage.clear()
              this.$store.commit('isAuthenticated', false)
              this.$store.commit('bearer', null)
              this.$store.commit('tokenTime', null)
              this.$store.commit('me', [])
              this.$store.commit('role', "")
              this.auth = false
              this.$router.push('/')
            }
          })
    },
  },
  components: {
    Button,
    Dialog,
    InputText,
    Password,
    Menu,
    Badge
  }
}
</script>

<style scoped>
.p-inputtext {
  width: 100%;
}

.p-menubar .p-menubar-custom, .p-menubar .p-menubar-end {
  width: 200px;
}
</style>
