/**
 * 
 * 验证是否已登录的中间件
 */

export default function ({ store, redirect }) {

    // 如果用户信息不存在（未登录），重定向到登录页
    // 保护 需登录才能访问的的 页面
    if (store.state.isLogin) {
    } else {
        return redirect('/login')
    }
}