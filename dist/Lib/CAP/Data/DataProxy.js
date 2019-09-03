function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import Ajax from "./Ajax";
import LocalStorage from "./LocalStorage";
import ElasticSql from "./ElasticSql";

let DataProxy = function DataProxy() {
  _classCallCheck(this, DataProxy);

  this.createProxy = function (type) {
    let proxy;
    if (type === 'ajax' || type === 'ajax') proxy = new Ajax();else if (type === 'localstorage') proxy = new LocalStorage();else if (type === 'elasticsql') proxy = new ElasticSql();

    proxy.inf = function () {
      return `The ${this._type} is rolling.`;
    };

    proxy.init();
    return proxy;
  };
};

export { DataProxy as default };
export { DataProxy };