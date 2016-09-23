import classnames from 'classnames';

function dedupe(arr) {
    return arr.reduce((prev, cur) => {
        if (prev.indexOf(cur) < 0 && cur !== '' && cur !== undefined) prev.push(cur);
        return prev;
    }, []);
}

export default (...args) => {
    const arr = dedupe(classnames(...args).split(' '));
    const res = new String(arr.join(' ')); // eslint-disable-line
    res.withNS = (...namespaces) => arr.map(c => dedupe(namespaces).map(ns => `${ns}-${c}`).join(' ')).join(' ');
    return res;
};

export const withNS = (...namespaces) => (...args) => {
    const arr = dedupe(classnames(...args).split(' '));
    return arr.map(c => dedupe(namespaces).map(ns => `${ns}-${c}`).join(' ')).join(' ');
};

