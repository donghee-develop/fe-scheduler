import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import "@/assets/public/public.css";
import "@/assets/schedule/add_schedule.css";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(router);  // ✅ Vue Router 등록
app.use(createPinia());
app.mount("#app");
