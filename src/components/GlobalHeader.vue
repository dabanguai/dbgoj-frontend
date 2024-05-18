<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/LogosAi.svg" />
            <div class="title">大阪怪 OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-content: center;
}

.title {
  margin-left: 16px;
  color: #444;
}

.logo {
  height: 28px;
}
</style>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { isText } from "@arco-design/web-vue/es/_utils/vue-utils";

const router = useRouter();
const store = useStore();

// 定义 需要呈现在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});
// 默认主页
const selectKeys = ref(["/"]);

// 点击菜单项 -> 跳转，更新路由 -> 更新路由后，同步更新菜单栏的高亮状态
router.afterEach((to, from, failure) => {
  selectKeys.value = [to.path];
});

// 动态变化用户登陆名
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "大阪怪",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
