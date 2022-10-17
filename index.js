module.exports = {
    // 给gitbook注入自定义的css和js文件
    website: {
        assets: './assets',
        js: [
            'base.js'
        ],
        css: [
            'style.css',
            'iconfont.css'
        ]
    },
    // Map of hooks 一些钩子函数
    hooks: {},

    // Map of new blocks
    blocks: {},

    // Map of new filters
    filters: {}
};
