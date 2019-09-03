/*
 * Copyright (c) 2018. CreyptTech Yazılım
 * Author : Cihan Ozturk
 *
 */

import { observable, computed, action } from "mobx";

const StoreManager = {

  @observable __stores: new Map(),

  @action add(alias, store) {

    this.__stores.set(alias, store);
  },

  @action get(alias) {
    return this.__stores.get(alias);
  },

  @computed get stores() {
    return Array.from(this.__stores.values());
  }
  ,
  @computed get keys() {
    return Array.from(this.__stores.keys());
  }
  ,
  @computed get entries() {
    return Array.from(this.__stores.entries());
  }
  ,

  @computed get size() {
    return this.__stores.size;
  }
  ,

  toObject() {
    let stores = {};
    this.__stores.forEach((value, key, map) => {
      stores[key] = value;
    });
    return stores;
  }
  ,
  toJS() {
    return this.__stores.toJS();
  }


};


export default StoreManager;