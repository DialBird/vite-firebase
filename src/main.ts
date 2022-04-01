import { firebaseAuth, firestoreDb } from "@/infra/firebase";
import { setDb } from "@/infra/setFirebase";
import { router } from "@/router";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

setDb(firestoreDb, firebaseAuth);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
