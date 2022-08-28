// pm2 启动配置


module.exports = {
    apps: [
        {
            name: 'suisei nuxt',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start'
        }
    ]
}