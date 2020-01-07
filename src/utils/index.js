import {trim,isEmpty,isObject,forEach} from "lodash-es";
import cryptoCore from  './cryptoCore'


export function urlEncode(param) {
    let paramStr = urlEncodeFunc(param);
    if (!isEmpty(paramStr)) {
        paramStr = trim(paramStr, '&');
    }
    return paramStr;
}

function urlEncodeFunc(param, key) {
    if (param == null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t === 'string' || t === 'index.js' || t === 'boolean') {
        // let val = isObject(param) ? '[]' : param;
        paramStr += encodeURIComponent(key) + '=' + encodeURIComponent(param) + '&';
    } else {
        for (let i in param) {
            // let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            let k = key == null ? i : key + '[' + i + ']';
            paramStr += urlEncodeFunc(param[i], k);
        }
    }
    return paramStr;
}


export function getFromObjByKeys(srcO, keys) {

    if (!isObject(srcO)) {
        return false;
    }
    var o = {};

    forEach(keys, function(item) {

        if ('undefined' != typeof srcO[item]) {
            o[item] = srcO[item];
        }
    });
    return o;
}


/**
 * 生成随机的 key
 * @returns {number}
 */
export const getRandomKey = () => {
    // return Math.floor(+new Date() - Math.random() * 100000);
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
};

export const getGID = () => {
    var s = [];
    var hexDigits = '0123456789qwertyuiopasdfghjklzxcvbnm';
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[20];

    return s.join('');
};

export const setStorage = (key, val) => {
    window.localStorage.setItem(key, JSON.stringify(val));
};

export const getStorage = (key) => {
    let reVal = null;
    try {
        reVal = JSON.parse(window.localStorage.getItem(key));
    } catch (e) {
        reVal = window.localStorage.getItem(key) || null;
        // console.log('getStorage', e);
    }
    return reVal;
};

export const removeStorage = (key) => {
    window.localStorage.removeItem(key);
};
export const clearStorage = () => {
    window.localStorage.removeItem('accountInfo');
    window.localStorage.removeItem('userInfo');
};
export const pswSha1 = (values) => {
    let { username, password } = values;
    var ciphertext = username.toLowerCase() + password;
    for (var i = 0; i < 1024; i++) {
        ciphertext = cryptoCore.SHA1(ciphertext);
    }
    return ciphertext.toString();
};