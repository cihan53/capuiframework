import {toJS} from "mobx";
import NotificationSystem from "react-mobx-notification-system";
import ShortId from "./ShortId";
import Lodash from "./Lodash";
import Parser from "./Parser";
import Translate from "./Translate";
import Mask from "./Mask";
import "./capitalizeFirstLetter";
import _Array from "./_Array";
import findProp from "./findProp";
import createElement from "./CreateElements";
import CreateComponent from "./CreateComponent";
import   Base64Encode   from "./Base64Encode";
import Pivot from "./Pivot";
import getMethods from "./getMethods";



const isDebug = process.env.PRODUCTION ? false : true;
const queryString = require("query-string");


/**
 *
 * @param obj
 * @returns {String}
 */
// eslint-disable-next-line
String.prototype.allReplace = function (obj) {
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
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};


/**
 *  Humman read file size
 *  console.log( (1234567864).fileSize() )
 *  // 177.82 MB
 * @param bytes
 * @param si
 * @returns {string}
 */
function hummanSize(bytes, si) {
    var thresh = si ? 1024 : 1000;
    if (Math.abs(bytes) < thresh) {
        return bytes + '';
    }

    var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['K', 'B', 'G', 'T', 'P', 'E', 'Z', 'Y']
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1)
    return bytes.toFixed(1) + ' ' + units[u];
}


const Download = (dataurl, filename) => {
    let a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
    return false;
}


const Utils = {
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
    isDebug,
    CreateComponent,
    createElement,
    toJS: toJS,
    toJSON: JSON.stringify,
    queryString: queryString,
    Base64Encode: Base64Encode,
    Base64Decode: atob,
    Download: Download,
    Pivot :Pivot ,
    hummanSize: hummanSize,
    getMethods
};
export default Utils;