// 直接导出即可

export const state = () => ({
    "isLogin": false,
    "userName": "",
    "email": "",
    "phone": "",
    "publicKey": "",
    "privateKey": "",
    "editStatus": false,
    "editItem": {},
})

export const mutations = {
    upUserInfo(state, userInfo) {
        state.userName = userInfo.userName || "";
        state.email = userInfo.email || "";
        state.phone = userInfo.phone || "";
        state.publicKey = userInfo.publicKey || "";
    },
    upLogStatus(state, flag) {
        if (state.userName !== '' && flag) return state.isLogin = flag;
        state.isLogin = false;
    },
    upPublicKey(state, val) {
        state.publicKey = val;
    },
    upPrivateKey(state, val) {
        state.privateKey = val;
    },
    upEditItem(state, val) {
        state.editItem = val;
    },
    upEditStatus(state, val) {
        state.editStatus = val;
    },
}