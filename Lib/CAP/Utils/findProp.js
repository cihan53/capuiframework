/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

/**
 *
 * @param obj
 * @param prop
 * @param defval
 * @returns {*}
 */
const findProp = function findProp(obj, prop, defval) {
    if (typeof defval == "undefined") defval = null;
    prop = prop.split(".");
    for (var i = 0; i < prop.length; i++) {
        if (typeof obj[prop[i]] == "undefined")
            return defval;
        obj = obj[prop[i]];
    }
    return obj;
}

/**
 *
 * @param o
 * @param prop
 * @param val
 * @param retprop
 * @returns {*}
 */
function findByPropVal(o, prop, val, retprop) {
    if (o == null) return false;
    if (o[prop] === val) {
        return (retprop) ? o[retprop] : o;
    }
    var result, p;
    for (p in o) {
        if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
            result = findByPropVal(o[p], prop, val);
            if (result) {
                return (retprop) ? result[retprop] : result;
            }
        }
    }
    return (retprop) ? result[retprop] : result;
}


/**
 *
 * @param o
 * @param prop
 * @returns {*}
 */

function findByPropKey(o, prop) {
    console.log(o)
    if (o == null) return false;
    if (o.hasOwnProperty(prop)) {
        return o[prop];
    }
    var result, p;
    for (p in o) {
        if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
            result = findByPropKey(o[p], prop);
            if (result) {
                return result;
            }
        }
    }
    return  result;
}

export default findProp;
export {findByPropVal, findByPropKey}