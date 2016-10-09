function getBlength(str) {
    let n = 0;
    for (let i = str.length; i--;) {
        n += str.charCodeAt(i) > 255 ? 2 : 1;
    }
    return n;
}

export default function trimString(str, length, endString) {
    const len = +length;
    let endStr = typeof endStrting == 'undefined' ? '...' : endString.toString();
    let endStrBl = getBlength(endStr);

    function n2(a) {
        const n = a / 2 | 0;
        return (n > 0 ? n : 1);
    } // 用于二分法查找

    if (!(str + '').length || !len || len <= 0) {
        return '';
    }
    if (len < endStrBl) {
        endStr = '';
        endStrBl = 0;
    }
    const lenS = len - endStrBl;
    let lenS2 = 0;
    let strl = 0;
    while (strl <= lenS) {
        const lenS1 = n2(lenS - strl);
        const addn = getBlength(str.substr(lenS2, lenS1));
        if (addn == 0) {
            return str;
        }
        strl += addn;
        lenS2 += lenS1;
    }
    if (str.length - lenS2 > endStrBl || getBlength(str.substring(lenS2 - 1)) > endStrBl) {
        return str.substr(0, lenS2 - 1) + endStr;
    }
    return str;
}
