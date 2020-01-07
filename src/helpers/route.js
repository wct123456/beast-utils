import {parse, stringify} from "qs";
export function getPlainNode(nodeList, parentPath = '') {
    const arr = [];
    nodeList.forEach(node => {
        const item = node;
        item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
        item.exact = true;
        if (item.children && !item.component) {
            arr.push(...getPlainNode(item.children, item.path));
        } else {
            if (item.children && item.component) {
                item.exact = false;
            }
            arr.push(item);
        }
    });
    return arr;
}

function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn('Two path are equal!'); // eslint-disable-line
    }
    const arr1 = str1.split('/');
    const arr2 = str2.split('/');
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1;
    }
    if (arr1.every((item, index) => item === arr2[index])) {
        return 2;
    }
    return 3;
}

function getRenderArr(routes) {
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i += 1) {
        // 去重
        renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
        // 是否包含
        const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    }
    return renderArr;
}



// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
    return window.location.hostname === 'preview.pro.ant.design';
}

export const importCDN = (url, name) =>
    new Promise(resolve => {
        const dom = document.createElement('script');
        dom.src = url;
        dom.type = 'text/javascript';
        dom.onload = () => {
            resolve(window[name]);
        };
        document.head.appendChild(dom);
    });

export const sleepFunc = (millisecond, params) => {
    // console.log(millisecond, params);
    return new Promise(function(resolve, reject) {
        window.setTimeout(function() {
            resolve(params);
        }, millisecond);
    }).catch((e) => {
        console.error('sleepFunc', e);
    });
};


export function loadScript(url, callback, bakURLs = []) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = 'async';
    script.src = url;
    document.body.appendChild(script);
    if (script.readyState) {   //IE
        script.onreadystatechange = function() {
            console.log('script.readyState', script.readyState);
            if (script.readyState == 'complete' || script.readyState == 'loaded') {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {    //非IE
        script.onload = function() {
            callback();
        };
        script.onerror = function(e) {
            console.log('>>> error', e);
            if (isArray(bakURLs) && !isEmpty(bakURLs)) {
                // 备用的链接
                let bakUrl = bakURLs.shift();
                loadScript(bakUrl, callback, bakURLs);
            }
        };
    }
}

export function jsGetDPI() {
    var arrDPI = new Array();
    if (window.screen.deviceXDPI != undefined) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
    } else {
        var tmpNode = document.createElement('DIV');
        tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
    }
    return arrDPI;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(
        routePath => routePath.indexOf(path) === 0 && routePath !== path,
    );
    // Replace path to '' eg. path='user' /user/name => name
    routes = routes.map(item => item.replace(path, ''));
    // Get the route to be rendered to remove the deep rendering
    const renderArr = getRenderArr(routes);
    // Conversion and stitching parameters
    const renderRoutes = renderArr.map(item => {
        const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
        return {
            exact,
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`,
        };
    });
    return renderRoutes;
}

export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}