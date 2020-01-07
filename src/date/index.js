import moment from 'dayjs'
import {trim} from 'lodash-es'

/**
 * 当前系统的 日期格式
 * @type {string}
 */
export const curDateFormat = 'YYYY-MM-DD';

/**
 * 获取支持输入的日期格式，一般用于设置 DatePicker 组件的 format 属性
 * @returns {string[]}
 */
export const getDateFormats = () => (['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD', 'YYYY-M-D', 'YYYY/M/D']);

/**
 * 触发 DatePicker 组件的 Click 事件，以弹出日期选择浮层，并获得输入焦点
 * @param e Event
 */
export const triggerDateClick = (e) => {
    if (e && e.currentTarget) {
        let isFirst = e.currentTarget.getAttribute('isfirst');

        if ('1' !== isFirst) {
            e.currentTarget.setAttribute('isfirst', '1');

            if (e.currentTarget.childNodes && e.currentTarget.childNodes[0] &&
                e.currentTarget.childNodes[0].childNodes && e.currentTarget.childNodes[0].childNodes[0]) {
                e.currentTarget.childNodes[0].childNodes[0].click();
            }
        }

    }
};

/**
 * 根据开始和结束期间，回显对应的中文
 * @param beginPeriod
 * @param endPeriod
 * @returns {string}
 */
export const previewPeriod = (beginPeriod, endPeriod) => {
    if (beginPeriod && endPeriod) {
        return (
            beginPeriod.name ?
                `${beginPeriod.name}${endPeriod.name ?
                    endPeriod.name === beginPeriod.name ?
                        '' :
                        ' 至 ' + endPeriod.name
                    :
                    ' 至今'}`
                :
                endPeriod.name ?
                    `${endPeriod.name} 及之前` : '全部'
        );
    } else {
        return '全部';
    }
};

/**
 * 将 datetime（YYYY-MM-DD HH:mm:ss） 转成 date（YYYY-MM-DD）
 * @param datetime
 * @returns {string}
 */
export function datetime2Date(datetime) {
    let date = moment(datetime, 'YYYY-MM-DD HH:mm:ss');
    if (date.isValid()) {
        return date.format('YYYY-MM-DD');
    } else {
        return '';
    }
}

export const myFormatTime = function(timestamp, format = '') {
    if (null == format || '' == trim(format)) {
        format = 'yyyy-MM-dd hh:mm:ss';
    }
    if (!window.myFormatDate || typeof window.myFormatDate == 'undefined') {
        window.myFormatDate = new Date();
    }
    return window.myFormatDate.format(format, timestamp);
};

Date.prototype.format = function(format, timestamp) {
    var tempDate;

    if (timestamp && timestamp > 0) {
        if (timestamp > 9999999999) {
            tempDate = new Date(timestamp);
        } else {
            tempDate = new Date(timestamp * 1000);
        }
    } else {
        tempDate = this;
    }
    var date = {
        'M+': tempDate.getMonth() + 1,
        'd+': tempDate.getDate(),
        'h+': padLeft(tempDate.getHours().toString(), 2),
        'm+': padLeft(tempDate.getMinutes().toString(), 2),
        's+': padLeft(tempDate.getSeconds().toString(), 2),
        'q+': Math.floor((tempDate.getMonth() + 3) / 3),
        'S+': tempDate.getMilliseconds(),
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (tempDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
        }
    }
    return format;
};
const padLeft = (str, length) => {
    if (str.length >= length)
        return str;
    else
        return padLeft('0' + str, length);
};
export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}