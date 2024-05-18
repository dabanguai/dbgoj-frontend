<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

/**
 * 全局初始化函数，有全局凡此调用的代码，都可以写到这里
 */
const doInit = () => {
  console.log("你就在我的代码里不出来");
};

onMounted(() => {
  doInit();
});
</script>
