<template>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
      Ваша Имя <br />
      <InputText v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" class="inputfield w-full mt-1" />
      <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error mb-2">
        Пожалуйста введите корректное Имя.
      </small> <br />
      Ваш Email <br />
      <InputText v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" class="inputfield w-full mt-2 mb-2" />
      <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error mb-2">
        Пожалуйста введите корректный Email.
      </small> <br />
      Ваш Пароль <br />
      <Password  class="inputfield w-full mt-1 mb-2 geInput" :class="{'p-invalid':v$.password.$invalid && submitted}" v-model="v$.password.$model" :feedback="false" toggleMask />
      <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error mb-2">
        Пожалуйста введите корректный пароль.
      </small> <br />
      <div class="grid">
        <div class="col-offset-9 col-3">
          <Button type="submit" @click="handleSubmit()" label="Зарегистрироваться" autofocus />
        </div>
      </div>
    </form>
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import {useVuelidate} from "@vuelidate/core"
import {email, required, minLength} from "@vuelidate/validators"
import axios from "axios";

export function validPassword(name) {
  let validNamePattern = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$");
  return validNamePattern.test(name);

}

export default {
  name: "RegisterComponent",
  data() {
    return {
      display: false,
      password: '',
      name: '',
      email: '',
      submitted: false,
    }
  },
  setup: () => ({v$: useVuelidate()}),
  validations() {
    return {
      name: {
        required
      },
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
  methods: {
    toastCreate() {
      this.$toast.add({severity: 'success', summary: 'Успешно', detail: 'Выполнен вход на сайт :)', life: 3000});
    },
    displayDialog() {
      this.display = true
    },
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      return this.addUsers()
    },
    addUsers() {
      axios.request({
        url: this.$store.getters.apiUrl + '/auth/registration',
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      }).then(res => {
        console.log(res)
        this.$toast.add({severity: 'success', summary: 'Успешно', detail: 'Регистрация на сайте', life: 3000});
        this.display = false
        this.$router.push('/complete-register')
      }).catch(err => {
        if (err.response.data.errors.email) {
          if (err.response.data.errors.email[0] === 'The email has already been taken.') {
            this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Email - ' + this.email + ' используется другим пользователем',
              life: 3000
            })
          }
        }
      })
    }
  },
  components: {
    Button,
    InputText,
    Password
  }
}
</script>

<style scoped>
.p-inputtext {
  width: 100%;
}
</style>
