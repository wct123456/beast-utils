import {isArray, isEmpty, isNumber, pick,omit,functionsIn,findIndex, isString } from "lodash-es";
import {getFromObjByKeys} from '../utils'

/**
 判断是否为邮箱地址
 @param {String} str
 @return {Boolean}
 */
export const  isEmail=(str)=>{
    if(!str)return false;
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(str)
};


/**
 判断是否为手机号
 @param {String|Number} str
 @return {Boolean}
 */
export const isPhoneNum = (num)=>{
    if(!num)return false;
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(num)
};

/**
 判断身份证号码是否正确
 @param {String|Number} str
 @return {Boolean}
 */
export const isCard= (str)=>{
    if(!str)return false;
    if(!(str instanceof String)){
        str = str.toString();
    }
    let city = [11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91];

    if(!/^\d{17}(\d|x)$/.test(str))return false;

    if(-1===city.indexOf(parseInt(str.substr(0,2))))return false;

    let birthday = str.substr(6,4)+'/'+str.substr(10,2)+'/'+str.substr(12,2);
    let date = new Date(birthday);
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    m<10&&(m = '0'+m);
    d<10&&(d = '0'+d);
    if(birthday!==(y+'/'+m+'/'+ d))return false;

    //for(var i=17;i>=0;i--)sum+=(Math.pow(2,i)%11)*parseInt(str.charAt(17 - i),11);
    //if(1!=sum%11)return false;

    return true;
};

/**
 * 判断对象是否含有空值
 * @param obj Object 待判断的对象
 * @param keyArray Array 指定需要做判断的属性，不指定，则默认判断所有属性是否为空
 * @returns {boolean}
 */
export function isObjectHadEmpty(obj, keyArray) {
    if (isEmpty(obj)) return true;

    let hadEmp = false;
    let tmpO = isArray(keyArray) && !isEmpty(keyArray) ? pick(obj, keyArray) : obj;

    for (let key in tmpO) {
        const val = tmpO[key];

        if (isValEmpty(val)) {
            hadEmp = true;
            break;
        }
    }
    return hadEmp;
}


export function isValEmpty(val) {
    return ((isNumber(val) && 0 === val) || (!isNumber(val) && isEmpty(val)));
}

/**
 * 判断对象 v 的值是否都为空
 * @returns {boolean}
 * @param obj
 */
export const isObjectValueEmpty = (obj) => {
    if (isEmpty(obj)) return true;

    let isEmp = true;

    for (let key in obj) {
        const val = obj[key];

        if (!isValEmpty(val)) {
            isEmp = false;
            break;
        }
    }
    return isEmp;
};
/**
 * 对比两个对象的值是否相等（只支持基础数据类型的比较）
 */
export function isObjectValEqual(srcObj, othObj, needCheckAttrs = null) {

    if (isArray(needCheckAttrs) && 0 < needCheckAttrs.length) {
        return isEqual(
            getFromObjByKeys(omit(srcObj, functionsIn(srcObj)), needCheckAttrs),
            getFromObjByKeys(omit(othObj, functionsIn(othObj)), needCheckAttrs),
        );
    } else {
        return isEqual(omit(srcObj, functionsIn(srcObj)), omit(othObj, functionsIn(othObj)));
    }
}
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

export function isIE() {
    return /Edge/.test(window.navigator.userAgent) || 'ActiveXObject' in window || !!window.ActiveXObject;
}
const imgTypeArr = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

export const isImgByExt = (ext) => {
    let isOk = false;
    if (isString(ext) && '' !== ext) {
        let extStr = ext.toLowerCase();

        if((-1 !== extStr.search(/image/i))) {
            isOk = true
        } else {
            isOk = -1 !== findIndex(imgTypeArr, (v) => (-1 !== v.indexOf(extStr) || -1 !== extStr.indexOf(v)))
        }
    }
    // console.log('isOk', ext, isOk);
    return isOk;
};
