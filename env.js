module.exports = {
    // 本地环境
    dev: {
        NODE_ENV: 'dev',
        ENV_API: 'http://localhost/'
    },

    // 测试环境
    test: {
        NODE_ENV: 'test',
        ENV_API: 'http://8.129.75.199/'
    },

    // 生产环境
    production: {
        NODE_ENV: 'production',
        ENV_API: 'https://pw.suisei.work/'
    }
}