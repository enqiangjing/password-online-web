import Vue from 'vue';
import { localStore, localData, sessionStore, sessionData } from '~/assets/utils/api.js';
import message_ from "@/components/common/Message.js";
import clipboard from 'clipboard';
import JSEncrypt from "jsencrypt";


var userApiC = {
    install(Vue) {
        // 公共函数
        Vue.prototype.$api_c = {
            // 本地存储
            localStore,
            // 本地数据读取
            localData,
            // 临时存储
            sessionStore,
            // 临时数据读取
            sessionData
        };
        // 消息提示框
        Vue.prototype.$message = message_;
        // 客户端根路径
        Vue.prototype.$baseUrl = window.location.protocol + "//" + window.location.host + "/";
        // RSA
        Vue.prototype.$rsa = new JSEncrypt();
        // 内容复制
        Vue.prototype.$clipboard = clipboard;
        // 修改的内容
        Vue.prototype.$editItem = {};
    }
}

Vue.use(userApiC)