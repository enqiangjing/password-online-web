import Vue from 'vue';
import { get_, post_ } from '~/assets/utils/api.js';
import _ from "lodash";


var userApi = {
    install(Vue) {
        Vue.prototype.$api = {
            get_,
            post_
        };
        Vue.prototype._ = _;
    }
}

Vue.use(userApi)

// 这里是 为了在 asyncData 方法中使用
export default ({ app }, inject) => {
    // Nuxt 全局变量
    app.$api = {
        get_,
        post_
    };
    // Nuxt访问后台服务地址
    app.$baseUrl = process.env.baseUrl;
};