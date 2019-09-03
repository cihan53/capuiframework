/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import Ajax from "./Ajax";
import LocalStorage from "./LocalStorage";
import ElasticSql from "./ElasticSql";

export default class DataProxy {
    constructor() {
        this.createProxy = function (type) {
            let proxy;
            if (type === 'ajax' || type === 'ajax') proxy = new Ajax();
            else if (type === 'localstorage') proxy = new LocalStorage();
            else if (type === 'elasticsql') proxy = new ElasticSql();
            proxy.inf = function () {
                return `The ${this._type} is rolling.`;
            };

            proxy.init();
            return proxy;
        };
    }


}
export {DataProxy}