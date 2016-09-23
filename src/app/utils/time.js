/* eslint-disable */
export function formatTime(time, option) {
    time = +time * 1000;
    var d = new Date(time);
    var now = Date.now();

    var diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { //less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分')
    }
}

//格式化时间
export function parseTime(time, format) {
    if (arguments.length == 0) {
        return null;
    }
    var format = format || '{y}-{m}-{d} {h}:{i}:{s}';
    if (typeof(time) == "object") {
        var date = time;
    } else {
        var date = new Date(parseInt(time));
    }
    var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
        var value = formatObj[key];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}