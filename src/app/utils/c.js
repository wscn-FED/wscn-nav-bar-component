import classnames from 'classnames';

function dedupe(arr) {
    return arr.reduce((prev, cur) => {
        if (prev.indexOf(cur) < 0 && cur !== '' && cur !== undefined) prev.push(cur);
        return prev;
    }, []);
}

function prefix(prefixArr, classNameArr) {
    if (prefixArr.length === 0) return classNameArr.join(' ');
    if (classNameArr.length === 0) return prefixArr.join(' ');
    return prefixArr.map(p => classNameArr.map(c => `${p}-${c}`).join(' ')).join(' ');
}

export default (...args) => {
    const arr = dedupe(classnames(...args).split(' '));
    const res = new String(arr.join(' ')); // eslint-disable-line
    res.withPrefix = (...prefixArr) => prefix(prefixArr);
    return res;
};

export const withPrefix = (...prefixArr) => (...args) => {
    const arr = dedupe(classnames(...args).split(' '));
    return prefix(dedupe(prefixArr), arr);
};

