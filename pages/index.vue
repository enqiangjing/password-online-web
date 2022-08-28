<template>
  <div id="_index" class="cc-display">
    <!-- 主页内容 -->
    <div id="_index_out">
      <!-- 上方图标 -->
      <div id="_index_top" class="ce-display">
        <img src="~/assets/img/index/default.svg" alt="" />
      </div>

      <!-- 网站名称 -->
      <div id="_index_welcome" class="cc-display">
        <span class="color-fff fs-20 ls-4">欢迎使用在线密码管理工具</span>
      </div>

      <!-- 跳转按钮 -->
      <div id="_index_go" class="cs-display" @click="toLogin">
        <div class="button cc-display br-8">
          <span class="color-fff fs-16 ls-2">GO</span>
          <img src="~/assets/img/index/go.svg" alt="" />
        </div>
      </div>

      <!-- 公告列表 -->
      <div class="tell">
        <div
          class="_index_tell_you cc-display"
          v-for="item in tellList"
          :key="item.id"
        >
          <img src="~/assets/img/index/position.svg" alt="" />
          <div>
            <span class="color-fff ls-2">{{ item.content }}</span>
          </div>
        </div>
        <div class="clean-float"></div>
      </div>
    </div>

    <!-- 底部导航 -->
    <Bootom />
  </div>
</template>

<script>
import Bootom from "~/components/common/Bottom.vue";

export default {
  /**
   * 组件名称
   */
  name: "PageIndex",

  /**
   * 子组件
   */
  components: {
    Bootom,
  },

  /**
   * 服务端渲染
   */
  async asyncData(content) {
    // 查询公告数据
    const res = await content.app.$api.get_(
      content.app.$baseUrl + "api/pub/getTells"
    );
    // 结果写入响应式系统
    return { tellList: res.data };
  },

  /**
   * 组件方法
   */
  methods: {
    // go 按钮，跳转 login 页面
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
#_index {
  width: 100%;
  height: 100%;
  background-color: rgb(46, 121, 218);
}
#_index_out {
  height: 100%;
}
#_index_top {
  height: 30%;
  min-height: 200px;
}
#_index_welcome {
  height: 8%;
  min-height: 50px;
}
#_index_go {
  height: 80px;

  .button {
    width: 100px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;

    img {
      width: 40px;
      height: 30px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.25);
    }
  }
}
._index_tell_you {
  position: relative;
  width: 260px;
  height: 240px;
  margin: 0 5px 10px 5px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px 0 20px 0;
  float: left;

  img {
    position: absolute;
    height: 20px;
    width: 20px;
    right: 10px;
    top: 10px;
  }

  div {
    width: 220px;
    height: 180px;
  }
}
.tell {
  min-width: 540px;
}
</style>