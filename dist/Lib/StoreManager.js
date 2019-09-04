var _obj, _init;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

import { observable, computed, action } from "mobx";
const StoreManager = (_obj = {
  __stores: new Map(),

  add(alias, store) {
    this.__stores.set(alias, store);
  },

  get(alias) {
    return this.__stores.get(alias);
  },

  get stores() {
    return Array.from(this.__stores.values());
  },

  get keys() {
    return Array.from(this.__stores.keys());
  },

  get entries() {
    return Array.from(this.__stores.entries());
  },

  get size() {
    return this.__stores.size;
  },

  toObject() {
    let stores = {};

    this.__stores.forEach((value, key, map) => {
      stores[key] = value;
    });

    return stores;
  },

  toJS() {
    return this.__stores.toJS();
  }

}, (_applyDecoratedDescriptor(_obj, "__stores", [observable], (_init = Object.getOwnPropertyDescriptor(_obj, "__stores"), _init = _init ? _init.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function () {
    return _init;
  }
}), _obj), _applyDecoratedDescriptor(_obj, "add", [action], Object.getOwnPropertyDescriptor(_obj, "add"), _obj), _applyDecoratedDescriptor(_obj, "get", [action], Object.getOwnPropertyDescriptor(_obj, "get"), _obj), _applyDecoratedDescriptor(_obj, "stores", [computed], Object.getOwnPropertyDescriptor(_obj, "stores"), _obj), _applyDecoratedDescriptor(_obj, "keys", [computed], Object.getOwnPropertyDescriptor(_obj, "keys"), _obj), _applyDecoratedDescriptor(_obj, "entries", [computed], Object.getOwnPropertyDescriptor(_obj, "entries"), _obj), _applyDecoratedDescriptor(_obj, "size", [computed], Object.getOwnPropertyDescriptor(_obj, "size"), _obj)), _obj);
export default StoreManager;