import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// PrimeVue
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import BadgeDirective from 'primevue/badgedirective';

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'
import './css/main.css'

const app = createApp(App)
app.use(store)
app.use(PrimeVue, {
    locale: {
        dayNamesMin: ["Вс","Пн","Вт","Ср","Чт","Пт","Су"],
        monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
        monthNamesShort: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь","Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    }
})
app.directive('badge', BadgeDirective);
app.use(ToastService)
app.use(ConfirmationService)
app.use(router)
app.mount('#app')
