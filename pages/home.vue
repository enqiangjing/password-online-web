<template>
  <div class="home primary-bg">
    <!-- 顶部导航 -->
    <nav class="cc-display">
      <div class="menu cc-display" @mouseleave="fnSonMenuShow">
        <!-- 子菜单展示按钮 -->
        <img
          src="@/assets/img/home/menu.svg"
          alt=""
          @mouseenter="fnSonMenuShow"
        />
        <!-- 子菜单按钮 -->
        <div class="son-menu br-8" v-if="sonMenu">
          <div
            class="s-item cc-display fs-18 ls-4"
            @click="fnToContent('index')"
          >
            主页
          </div>
          <div
            class="s-item cc-display fs-18 ls-4"
            @click="fnToContent('main')"
          >
            查看
          </div>
          <div
            class="s-item cc-display fs-18 ls-4"
            @click="fnToContent('content')"
          >
            新增
          </div>
          <div
            class="s-item cc-display fs-18 ls-4"
            @click="fnToContent('cipher')"
          >
            密钥
          </div>
          <div class="s-item cc-display fs-18 ls-4" @click="fnLogut">退出</div>
        </div>
      </div>

      <!-- 密码展示按钮 -->
      <div class="logo cc-display">
        <img
          src="@/assets/img/home/mlogo.svg"
          alt="mlogo"
          @click="fnGetAccountList"
        />
      </div>

      <!-- 搜索框 -->
      <div class="search cc-display">
        <LoginInput
          type="search"
          class="input"
          v-model="searchInupt"
          placeholder="请输入搜索值"
          @v-click="fnToSearch"
        />
      </div>
    </nav>

    <!-- 内容区域 -->
    <nuxt-child :msgList="accountList" />

    <!-- 底部导航 -->
    <Bottom />
  </div>
</template>

<script>
import LoginInput from "~/components/common/LoginInput.vue";
import Bottom from "~/components/common/Bottom.vue";

export default {
  /**
   * 组件名称
   */
  name: "PageHome",

  middleware: "notLogin",

  /**
   * 子组件
   */
  components: {
    LoginInput,
    Bottom,
  },

  /**
   * 组件响应式数据
   */
  data() {
    return {
      sonMenu: false,
      searchInupt: "",
      accountList: [],
      accountListCopy: [],
    };
  },

  /**
   * 组件方法
   */
  methods: {
    // function --- 账户信息查询
    fnGetAccountList() {
      // 判断私钥加载
      if (this.$store.state.privateKey === "") {
        this.$message.run("未读入私钥", "error");
        // 私钥未加载，进入私钥加载页面
        this.$router.push("/home/" + this.$store.state.userName + "/cipher");
        return;
      }
      // 加载私钥
      // this.$rsa.setPrivateKey(
      //   "-----BEGIN RSA PRIVATE KEY-----" +
      //     this.$store.state.privateKey +
      //     "-----END RSA PRIVATE KEY-----"
      // );
      this.$rsa.setPrivateKey(this.$store.state.privateKey);
      // 查询加密数据列表
      this.$api
        .post_(this.$baseUrl + "api/getListLike", {
          userName: this.$store.state.userName,
        })
        .then((res) => {
          // 数据解密
          res = res.map((e) => {
            return {
              ...e,
              account: this.$rsa.decrypt(e.account),
              extra: this.$rsa.decrypt(e.extra),
              password: this.$rsa.decrypt(e.password),
              systemName: this.$rsa.decrypt(e.systemName),
            };
          });
          this.accountList = res;
          this.accountListCopy = res;
        });
      // 路由跳转
      this.$router.push("/home/" + this.$store.state.userName + "/main");
    },

    // function --- 搜索
    fnSearchInCurrent() {
      // 页面内数据搜索
      this.accountList = this.accountListCopy.filter((x) => {
        let flag = false;
        for (let i in x) {
          if (String(x[i]).includes(this.searchInupt)) {
            flag = true;
            break;
          }
        }
        return flag;
      });
    },

    // function --- 子菜单是否展示按钮
    fnSonMenuShow() {
      this.sonMenu = !this.sonMenu;
    },

    // function --- 子菜单路由
    fnToContent(val) {
      if (val == "index") return this.$router.push("/");
      let toMenu = "/home/" + this.$store.state.userName + "/" + val;
      if (this.$route.path !== toMenu) {
        this.$router.push(toMenu);
      }
    },

    // function --- 退出登录
    fnLogut() {
      // 向后台发送退出请求
      this.$api.post_(this.$baseUrl + "api/logout").then(() => {
        this.$router.push("/"); // 返回首页
        this.$store.commit("upUserInfo", {}); // 清除内存用户信息
        this.$store.commit("upPrivateKey", ""); // 清除内存用户信息
        this.$store.commit("upLogStatus", false); // 清除用户登录状态
        this.$api_c.localStore("poUserInfo", ""); // 清除本地用户信息
        this.$api_c.localStore("poPrivateKey", ""); // 清除本地私钥
      });
    },

    // function --- 搜索框点击事件
    fnToSearch() {
      let toMenu = "/home/" + this.$store.state.userName + "/main";
      if (this.$route.path !== toMenu) {
        this.$router.push(toMenu);
      }
    },
  },

  /**
   * 事件监听
   */
  watch: {
    // listener --- 输入变化后进行搜索
    searchInupt(newVal, oldVal) {
      if (newVal !== oldVal && newVal.trim() !== "")
        return this.accountSearch();
      this.accountList = this.accountListCopy;
    },
  },

  /**
   * 挂载
   */
  mounted() {
    // 自动执行密钥加载
    this.fnGetAccountList();
    this.accountSearch = _.debounce(this.fnSearchInCurrent, 500);
  },
};
</script>

<style lang="less" scoped>
// 菜单按钮背景
@menu-bg: rgb(67, 148, 253);

.home {
  position: relative;
  height: 100%;
  width: 100%;
  // background: url(../assets/logo.png) no-repeat top center;
  overflow: hidden;
  z-index: 1000;

  &:hover {
    overflow-y: auto;
    overflow-y: overlay;
    overflow-x: auto;
  }

  nav {
    width: 100%;
    min-width: 680px;
    height: 60px;
    position: relative;
    position: sticky;
    top: 0;
    z-index: 1100;
    background-color: rgba(250, 250, 250, 0.25);

    .menu {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 80px;

      img {
        width: 40px;
        height: 40px;

        &:hover {
          cursor: pointer;
          background-color: @menu-bg;
        }
      }

      .son-menu {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 100px;
        padding: 10px 0;
        background-color: @menu-bg;
        box-shadow: 0 0 6px #aaa;
        z-index: 1200;

        .s-item {
          width: 100%;
          height: 50px;
          color: #fff;

          &:hover {
            background-color: rgb(101, 162, 243);
            cursor: pointer;
          }
        }
      }
    }

    .logo {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 80px;

      img {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }

    .search {
      width: 80%;
      height: 100%;

      .input {
        width: 50%;
        min-width: 500px;
        height: 45px;
      }
    }
  }
}
</style>
