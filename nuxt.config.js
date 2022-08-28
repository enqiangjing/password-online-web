const env = require('./env')


module.exports = {

    // 环境信息
    env: {
        baseUrl: env[process.env.NODE_ENV].ENV_API
    },

    // 网站头
    head: {
        title: '十年生活随笔-在线密码管理工具',
        htmlAttrs: {
            lang: 'zh',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // 全局css
    css: [
        {
            src: "assets/base.less",
            lang: "less"
        }
    ],

    // 插件
    plugins: [
        {
            src: '~/plugins/api_c.js',
            // 服务端不引入
            ssr: false
        },
        {
            src: '~/plugins/api.js',
            // 服务端、客户端同时引入
            ssr: true
        }
    ],

    // 服务
    server: {
        host: '0.0.0.0',
        port: '3000'
    },

    // buildModules: [
    //     // https://go.nuxtjs.dev/typescript
    //     '@nuxt/typescript-build',
    // ],
}