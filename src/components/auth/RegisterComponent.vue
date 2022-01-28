<template>
  <Button class="ml-2" @click="displayDialog">Регистрация</Button>
  <Dialog header="Регистрация" v-model:visible="display"  :style="{width: '50vw'}">
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
      <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error mb-2">
        Пожалуйста введите корректный пароль.
      </small> <br />
      <div class="grid">
        <div class="col-offset-9 col-3">
          <Button type="submit" @click="handleSubmit()" label="Зарегистрироваться" autofocus />
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
      console.log('123');
    }
  },
  components: {
    Button,
    Dialog,
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
