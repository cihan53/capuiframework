import NotificationSystem from "react-mobx-notification-system";
import ShortId from "./ShortId";
import Lodash from "./Lodash";
import Parser from "./Parser";
import Translate from "./Translate";
import Mask from "./Mask";
import "./capitalizeFirstLetter";
import _Array from "./_Array";
import findProp from "./findProp";



const isDebug = process.env.PRODUCTION ? false : true;


/**
 *
 * @param obj
 * @returns {String}
 */
// eslint-disable-next-line
String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(":" + x, "g"), obj[x]);
    }
    return retStr;
};

/**
 * uWord
 * @returns {string}
 */
// eslint-disable-next-line
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};



var Utils = {
    Alert: NotificationSystem.addNotification,
    Parser: Parser,
    ShortId: ShortId,
    Translate: Translate,
    __t: Translate,
    Mask: Mask,
    ...Lodash,
    Array: _Array,
    capitalizeFirstLetter: e => (e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()),
    findProp,
    isDebug
};
export default Utils;