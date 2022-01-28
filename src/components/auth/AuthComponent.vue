<template>
  <Button class="ml-2" @click="displayDialog">Авторизация</Button>
  <Dialog header="Авторизация" v-model:visible="display"  :style="{width: '50vw'}">
    <div>
       Email <br />
       <InputText v-model="name" class="inputfield w-full mt-1 mb-2" />
        Пароль <br />
       <Password  class="inputfield w-full mt-1 mb-2 geInput" v-model="password" :feedback="false" toggleMask />
    </div>
    <template #footer>
      <Button label="Войти" autofocus />
    </template>
  </Dialog>
</template>

<script>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
export default {
  name: "AuthComponent",
  data() {
    return {
      display: false,
      password: null,
      name: null,
    }
  },
  methods: {
    displayDialog() {
      this.display = true
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
