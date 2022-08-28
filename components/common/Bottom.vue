<template>
  <div class="bottom cc-display">
    <div class="block cc-display br-4 pmb0 border-none" @click="fnToGitHub">
      <img :src="iconImg" alt="gitee" />
      <span class="fs-20 fw-6">Gitee</span>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 组件名
   */
  name: "CompnsBottom",

  /**
   * 组件响应式数据
   */
  data() {
    return {
      iconImg: "app-img/icon/gitee.svg",
    };
  },

  /**
   * 组件方法
   */
  methods: {
    fnToGitHub() {
      window.open("https://gitee.com/jingenqiang/suisei.git", "_blank");
    },
  },

  /**
   * create 在服务端也会执行，注意一些只能在客户端使用的数据 process.client
   */
  created() {
    // 仅客户端运行
    if (process.client) {
      // 调用全局loading
      this.iconImg = this.$baseUrl + "app-img/icon/gitee.svg";
    }
  },
};
</script>

<style lang="less" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  // box-shadow: 0 0 6px #ddd;

  .block {
    height: 90%;
    cursor: pointer;
    overflow: hidden;
    border: 5px solid rgba(0, 0, 0, 0);

    &:hover {
      background-color: rgba(255, 255, 255, 0.85);
    }

    img {
      height: 20px;
      margin: 0 5px;
    }
  }
}
</style>
