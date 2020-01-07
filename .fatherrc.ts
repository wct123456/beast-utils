import {IBundleOptions} from 'father'

// @ts-ignore
const options: IBundleOptions = {
    // entry: 'index.tsx',
    // file: 'beast',
    esm: {
        // type: 'babel'
        type: 'rollup'
    },
    // cjs: 'rollup',
    // @ts-ignore
    doc: {
        // themeConfig: { mode: 'dark' },
        base: '/beast-utils'
    },
    // 是否把 helper 方法提取到 @babel/runtime 里。只对 esm 有效。官网：https://babeljs.io/docs/en/babel-runtime
    runtimeHelpers: true,
    // extraBabelPlugins: [ // 配置 babel-plugin-import 按需加载 lodash
    //     ['babel-plugin-import', {
    //         libraryName: 'lodash',
    //         "libraryDirectory": "",
    //         "camel2DashComponentName": false
    //     }],
    // ],
};

export default options;