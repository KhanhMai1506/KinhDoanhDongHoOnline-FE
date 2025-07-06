import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Blank from './layout/wrapper/index_blank.vue'
import Client from './layout/wrapper/index_client.vue'
import Cdio from './layout/wrapper/index_cdio.vue'
import Toaster from "@meforma/vue-toaster"
const app = createApp(App)

app.use(router)
app.use(Toaster, {
    position: "top-right"
})
app.component("blank-layout", Blank);
app.component("client-layout", Client);
app.component("cdio-layout", Cdio);
app.mount("#app")