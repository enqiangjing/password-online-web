<template>
  <div class="login primary-bg">
    <!-- 进入密码查看页面 -->
    <div class="logo sc-display">
      <!-- 密码查看 -->
      <div class="logo-img sc-display br-8" @click="fnToMain('main')">
        <img src="app-img/icon/eye.svg" />
        <span class="fs-20 fw-6 ls-2">查看密码</span>
      </div>
      <!-- 主页 -->
      <div
        class="logo-img sc-display br-8"
        style="margin-left: 20px"
        @click="fnToMain('index')"
      >
        <img src="app-img/icon/home.svg" />
        <span class="fs-20 fw-6 ls-2">主页</span>
      </div>
    </div>

    <!-- 登录框 -->
    <Box />

    <!-- 底部导航 -->
    <Bootom />
  </div>
</template>

<script>
import Box from "~/components/login/Box.vue";
import Bootom from "~/components/common/Bottom.vue";

export default {
  /**
   * 组件名称
   */
  name: "PageLogin",

  /**
   * 子组件
   */
  components: {
    Box,
    Bootom,
  },

  /**
   * 组件方法
   */
  methods: {
    // 跳转图标
    fnToMain(path) {
      // 跳转用户密码
      if (path == "main") {
        // 判断登录状态
        if (this.$store.state.isLogin) {
          this.$router.push("/home/" + this.$store.state.userName + "/main");
        } else {
          this.$message.run("请先登录！", "error");
        }
        return;
      }
      // 跳转根页面
      if (path == "index") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="less" scoped>
@bg-s: center;

.login {
  position: relative;
  height: 100%;
  width: 100%;
  // background: url(../assets/logo.png) no-repeat top center;
}

.logo {
  height: 80px;
  padding: 0 0 0 20px;

  .logo-img {
    padding: 5px;
    cursor: pointer;
    background-color: rgba(250, 250, 250, 0.8);

    img {
      width: 26px;
      margin-right: 6px;
    }

    span {
      color: #666;
    }

    &:hover {
      background-color: rgba(250, 250, 250, 0.5);
      box-shadow: 0 0 8px rgb(127, 127, 127);
    }
  }
}
</style>
