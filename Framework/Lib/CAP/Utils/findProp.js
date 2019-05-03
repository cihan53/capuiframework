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

export default findProp;