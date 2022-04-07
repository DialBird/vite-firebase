<script lang="ts" setup>
import { router } from "@/router";
import { onMounted } from "vue";

onMounted(() => {
  router.push({ name: "Home" });
});
</script>
