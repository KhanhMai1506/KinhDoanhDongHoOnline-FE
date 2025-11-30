import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Blank from './layout/wrapper/index_blank.vue'
import Cdio from './layout/wrapper/index_cdio.vue'
import Admin from './layout/wrapper/index_admin.vue'
import Toaster from "@meforma/vue-toaster"
const app = createApp(App)

app.use(router)
app.use(Toaster, {
    position: "top-right"
})
app.component("blank-layout", Blank);
app.component("cdio-layout", Cdio);
app.component("admin-layout", Admin);
app.mount("#app")

