import service from "./request.js";
import message_ from "@/components/common/Message.js";


// get
export function get_(api, params, url) {
    return service.request({
        method: 'get',
        timeout: 100000,
        url: api,
        baseURL: url,
        params: params
    }).then(response => {
        return response
    }).catch((err) => {
        console.log(err)
    })
}

// post
export function post_(api, data, url) {
    return service.request({
        method: 'post',
        timeout: 100000,
        url: api,
        baseURL: url,
        headers: { 'Content-Type': 'application/json' },
        data: data
    }).then(response => {
        message_.run(response.errMsg, response.errCode)
        return response.data
    }).catch((err) => {
        console.log(err)
    })
}

// 存储
export function localStore(type = 'local', value = '') {
    if ((typeof value) === 'object') return localStorage.setItem(type, JSON.stringify(value));
    localStorage.setItem(type, value);
}

// 取值 默认需要转换为json对象
export function localData(type = 'local', value = true) {
    if (value) return JSON.parse(localStorage.getItem(type));
    return localStorage.getItem(type);
}

export function sessionStore(type = 'local', value = '') {
    if ((typeof value) === 'object') return sessionStorage.setItem(type, JSON.stringify(value));
    sessionStorage.setItem(type, value);
}

// 取值 默认需要转换为json对象
export function sessionData(type = 'local', value = true) {
    if (value) return JSON.parse(sessionStorage.getItem(type));
    return sessionStorage.getItem(type);
}