import { firebaseAuth, firebaseStorage, firestoreDb } from "@/infra/firebase";
import { setDb } from "@/infra/setFirebase";
import { router } from "@/router";
import "flowbite";
import { createPinia } from "pinia";
import { createApp } from "vue";
import InstantSearch, { AisInstantSearch } from "vue-instantsearch/vue3/es";
import App from "./App.vue";
import "./index.css";

setDb({ _db: firestoreDb, _auth: firebaseAuth, _storage: firebaseStorage });

const app = createApp(App);

app.component("AisInstantSearch", AisInstantSearch);
app.use(createPinia());
app.use(InstantSearch);
app.use(router);

app.mount("#app");
