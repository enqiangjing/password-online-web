<template>
  <div class="box ce-display">
    <!-- 已登录 -->
    <div class="outside" v-if="isLogin">
      <div class="top cc-display">
        <img src="~/assets/img/login/user.svg" alt="top" />
      </div>
      <div class="item cs-display">
        <span class="fs-20 fw-6">{{ currentUser }}</span>
      </div>
      <div class="item cc-display">
        <Button @click="fnLogOut">退出</Button>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="outside" v-else>
      <div class="top cc-display">
        <img src="~/assets/img/login/user.svg" alt="top" />
      </div>
      <div class="item cs-display">
        <LoginInput
          type="email"
          class="input"
          v-model="userName"
          placeholder="请输入用户名"
        />
      </div>
      <div class="item cs-display">
        <LoginInput
          type="password"
          class="input"
          v-model="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="item cc-display">
        <Button @click="fnLogin">登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginInput from "@/components/common/LoginInput.vue";
import Button from "@/components/common/Button.vue";

export default {
  name: "Box",
  components: {
    LoginInput,
    Button,
  },
  props: {
    msg: String,
  },
  data() {
    return { userName: "", password: "" };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    currentUser() {
      return this.$store.state.userName;
    },
  },
  methods: {
    // 登录请求发送
    fnLogin() {
      let userName = this.userName;
      if (userName === "") {
        this.$message.run("用户名未输入！", "warning");
        return;
      }
      let password = this.password;
      if (password === "") {
        this.$message.run("密码未输入！", "warning");
        return;
      }
      // 登录请求
      this.$api
        .post_(this.$baseUrl + "api/pub/login", {
          userName: this.userName,
          password: this.password,
        })
        .then((res) => {
          // 判断是否登录失败
          if (res === undefined)
            return this.$message.run("登录失败！", "error");
          // 用户信息挂载到全局
          res.password = this.password;
          this.$api_c.localStore("poUserInfo", res);
          this.$store.commit("upUserInfo", res);
          this.$store.commit("upLogStatus", true);
          // 路由跳转
          this.$router.push("/home/" + res.userName + "/main");
        });
    },

    // 退出登录
    fnLogOut() {
      this.$api.post_(this.$baseUrl + "api/logout").then(() => {
        this.$store.commit("upUserInfo", {}); // 清除内存用户信息
        this.$store.commit("upPrivateKey", ""); // 清除内存用户信息
        this.$store.commit("upLogStatus", false); // 清除用户登录状态
        this.$api_c.localStore("poUserInfo", ""); // 清除本地用户信息
        this.$api_c.localStore("poPrivateKey", ""); // 清除本地私钥
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box {
  width: 100%;
  height: 50%;

  .outside {
    width: 50%;
    max-width: 600px;
    min-width: 500px;
    height: 70%;
    min-height: 400px;
    background-color: rgba(250, 250, 250, 0.625);
    border-radius: 6px;

    .top {
      height: 50%;
      overflow: hidden;

      img {
        width: 160px;
        height: 160px;
        border-radius: 80px;
        background-color: #eee;
      }
    }

    .item {
      height: 15%;

      .input {
        width: 80%;
        height: 50px;
      }
    }
  }
}
</style>
