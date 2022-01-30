<template>
  <div class="mt-8">
    Спасибо за регистрацию, вам требуется подтвердить вашу электронную почту. <br/><br/>
    <router-link to="/">
      <Button label="Вернуться на главную"/>
    </router-link>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  name: "RegisterComplete",
  components: {
    Button
  }
}
</script>

<style scoped>

</style>