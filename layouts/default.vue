<template>
  <div id="app">
    <!-- 页面 -->
    <nuxt />
  </div>
</template>

<script>
export default {
  /**
   * 组件方法
   */
  methods: {
    // 本地加载密钥
    async loadKeyFromLocal() {
      // 获取本地用户信息
      let user = this.$api_c.localData("poUserInfo", false); // 从本地读取用户信息
      // 登录判断
      if (
        user === undefined ||
        user === null ||
        user === "" ||
        user === "null"
      ) {
        // 未登录
        console.log("用户未登录！");
      } else {
        // 登录存活确认
        let data = await this.$api.get_(this.$baseUrl + "api/isLogin");
        let userinfo = JSON.parse(user);
        if (data.errCode == "001") {
          // 需要重新登录
          // 登录请求
          await this.$api
            .post_(this.$baseUrl + "api/pub/login", {
              userName: userinfo.userName,
              password: userinfo.password,
            })
            .then((res) => {
              console.log(res);
            });
        }
        // 登录保持状态
        this.$store.commit("upUserInfo", JSON.parse(user)); // 用户信息写入内存
        this.$store.commit("upLogStatus", true); // 用户登录状态写入内存
        this.$store.commit(
          "upPrivateKey",
          this.$api_c.localData("poPrivateKey", false)
        ); // 私钥写入内存
        this.$router.push("/home/" + this.$store.state.userName + "/main");
      }
    },
  },

  /**
   * 渲染后挂载数据
   */
  mounted() {
    this.loadKeyFromLocal();
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: webfont Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>