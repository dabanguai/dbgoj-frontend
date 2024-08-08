// 定义state的类型
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      // 一开始不设置userRole，方便区分登录失败时的修改（userRole: ACCESS_ENUM.NOT_LOGIN）
      userName: "未登录",
    },
  }),
  // actions
  /* Action 提交的是 mutation，而不是直接变更状态。
  Action 可以包含任意异步操作。
  actions调用mutation */
  actions: {
    // 从远程请求获取登录信息
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  // mutations 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  mutations: {
    // Payload:提交载荷。可以向 store.commit 传入额外的参数，
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
