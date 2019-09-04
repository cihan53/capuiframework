var _dec, _dec2, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

import { action, observable, toJS, values } from "mobx";
import Utils from "../Utils/Utils";
import Validator from "../Utils/Validator";
import DataProxy from "../Data/DataProxy";
let BaseStore = (_dec = observable.struct, _dec2 = observable.ref, (_class = (_temp = function () {
  function BaseStore() {
    _classCallCheck(this, BaseStore);

    this._defaultConfig = {
      baseParams: {
        page: 0,
        size: 50,
        dir: "id",
        desc: "asc"
      }
    };
    this._Request = {};
    this.dataProxy = new DataProxy();

    _initializerDefineProperty(this, "_parameters", _descriptor, this);

    _initializerDefineProperty(this, "_model", _descriptor2, this);

    this.primaryKey = "id";
    this._scenario = "default";
    this._limit = 20;
    this._baseUrl = "";
    this._Action = {
      get: "get",
      read: "read",
      save: "save",
      update: "update",
      delete: "delete"
    };

    _initializerDefineProperty(this, "_actionStatus", _descriptor3, this);

    this._Rules = [];

    _initializerDefineProperty(this, "Attributes", _descriptor4, this);

    this.cacheUrl = false;

    _initializerDefineProperty(this, "_data", _descriptor5, this);

    _initializerDefineProperty(this, "totalCount", _descriptor6, this);

    _initializerDefineProperty(this, "currentPage", _descriptor7, this);

    this._validator = Validator;

    _initializerDefineProperty(this, "_ValidateErrors", _descriptor8, this);

    _initializerDefineProperty(this, "_isValid", _descriptor9, this);

    _initializerDefineProperty(this, "_ErrorText", _descriptor10, this);

    this._validator.showMessages();

    this._Rules = this._Rules.map(function (val) {
      if (!val.scenario) val = Object.assign(val, {
        scenario: "default"
      });
      return val;
    });
    this.init();
  }

  _createClass(BaseStore, [{
    key: "init",
    value: function init() {
      this.Request = this.dataProxy.createProxy('ajax');
    }
  }, {
    key: "setScenario",
    value: function setScenario(value) {
      this._scenario = value;
    }
  }, {
    key: "getAttr",
    value: function getAttr(attr) {
      return this.Attributes[attr] || null;
    }
  }, {
    key: "setAttr",
    value: function setAttr(attr, value) {
      this.Attributes[attr] = value;
    }
  }, {
    key: "addError",
    value: function addError(error) {
      this.ValidateErrors = Object.assign(this.ValidateErrors, error);
    }
  }, {
    key: "addRecord",
    value: function addRecord(key, record) {
      this._data.set(key, record);
    }
  }, {
    key: "removeRecord",
    value: function removeRecord(key) {
      this._data.delete(key);
    }
  }, {
    key: "abort",
    value: function abort() {
      this._Request.abort();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.ErrorText = "";
      this.ValidateErrors = [];
      this.isLoading = false;
      this.page = 0;
      this.totalCount = 0;
      this.currentPage = 0;

      this._data.clear();

      this.parameters = {
        page: 0,
        size: 50,
        dir: "id",
        desc: "asc"
      };
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._data.clear();

      this.ErrorText = "";
      this.ValidateErrors = [];
      this.isLoading = false;
      this.page = 0;
      this.totalCount = 0;
      this.currentPage = 0;
      this.actionStatus.set("get", false).set("read", false).set("load", false).set("save", false).set("update", false).set("delete", false);
      return this;
    }
  }, {
    key: "setDefaultSortDir",
    value: function setDefaultSortDir(dir, sort = "ASC") {
      this._defaultConfig.baseParams.dir = dir;
      this._defaultConfig.baseParams.sort = sort;
    }
  }, {
    key: "setParameters",
    value: function setParameters(newParameters = {}) {
      this._parameters = Object.assign(this.parameters, newParameters);
    }
  }, {
    key: "getActionStatus",
    value: function getActionStatus(action) {
      this.actionStatus.get(action);
    }
  }, {
    key: "setActionStatus",
    value: function setActionStatus(action, status) {
      this.actionStatus.set(action, status);
    }
  }, {
    key: "findById",
    value: function findById(id) {
      return this._data.get(id);
    }
  }, {
    key: "find",
    value: function find(id) {
      return this._data.get(id);
    }
  }, {
    key: "findByModel",
    value: function findByModel(id) {
      return this._model.get(id);
    }
  }, {
    key: "findByField",
    value: function findByField(key, value) {
      let find = [];

      this._data.forEach((_value, _key, _map) => {
        if (_value[key] == value) find.push(_value);
      });

      return find;
    }
  }, {
    key: "load",
    value: function load(params = {}) {
      this.clear();
      this.setActionStatus("read", true);
      this.setActionStatus("load", true);

      if (!Utils.isEmpty(params)) {
        if (params.filter) params.filter = JSON.stringify(params.filter);
        this.setParameters(params);
      }

      let url = this.baseUrl + this.Action.read + "?" + this.stringify(this.parameters);
      if (!this.cacheUrl) url = url + "&rnd=" + Math.random();
      return this._Request.get(url).then(action(res => {
        if (res) {
          res.data.forEach(app => {
            this.addRecord(app[this.primaryKey], app);
          });
          this.totalCount = res.totalCount;
        } else {}

        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        this.setActionStatus("read", false);
        this.setActionStatus("load", false);
      }));
    }
  }, {
    key: "get",
    value: function get(primaryKeyValue, primaryKey = this.primaryKey) {
      this.actionStatus.get = true;
      let url = this.baseUrl + this.Action.get;
      let params = {};

      if (!(primaryKeyValue == false || primaryKeyValue == null)) {
        if (Utils.isObject(primaryKey)) {
          params = primaryKey;
        } else {
          params[primaryKey] = primaryKeyValue;
        }
      }

      return this._Request.get(url, params).then(action(res => {
        this._model.set(primaryKeyValue, res);

        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        this.actionStatus.get = false;
      }));
    }
  }, {
    key: "save",
    value: function save(params, isNewRecord = true, postType = "json") {
      this.actionStatus.save = true;
      return this._Request.post(this.baseUrl + this.Action.save, params, postType).then(action(res => {
        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        this.actionStatus.save = true;
      }));
    }
  }, {
    key: "update",
    value: function update(params, postType = "json") {
      this.actionStatus.update_ = true;
      return this._Request.post(this.baseUrl + this.Action.update, params, postType).then(action(res => {
        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        this.actionStatus.update_ = false;
      }));
    }
  }, {
    key: "delete",
    value: function _delete(params, postType = "formdata") {
      this.actionStatus.delete = false;
      return this._Request.post(this.baseUrl + this.Action.delete, params, postType).then(action(res => {
        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        this.actionStatus.delete = true;
      }));
    }
  }, {
    key: "validate",
    value: function validate(data, scenario = this._scenario) {
      this.ValidateErrors = [];
      this._validator.errorMessages = {};
      this.Rules.forEach(function (val) {
        if (val.scenario == scenario) {
          this._validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {
            message: val.message
          });
        } else if (val.scenario == "default" && scenario == "default") {
          console.log(val, scenario);

          this._validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {
            message: val.message
          });
        }
      }.bind(this));
      this.ValidateErrors = this._validator.getErrorMessages();
      this._isValid = this._validator.allValid();
      return this._isValid;
    }
  }, {
    key: "stringify",
    value: function stringify(obj) {
      return obj ? Object.keys(obj).map(function (key) {
        var val = obj[key];

        if (Array.isArray(val)) {
          return val.map(function (val2) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(val2);
          }).join("&");
        } else if (val instanceof Object) {
          return encodeURIComponent(key) + "=" + JSON.stringify(val);
        }

        return encodeURIComponent(key) + "=" + encodeURIComponent(val);
      }.bind(this)).join("&") : "";
    }
  }, {
    key: "Request",
    get: function () {
      return this._Request;
    },
    set: function (value) {
      this._Request = value;
    }
  }, {
    key: "scenario",
    get: function () {
      return this._scenario;
    },
    set: function (value) {
      this._scenario = value;
    }
  }, {
    key: "limit",
    get: function () {
      return this._limit;
    },
    set: function (value) {
      this._limit = value;
    }
  }, {
    key: "baseUrl",
    get: function () {
      return this._baseUrl;
    },
    set: function (value) {
      this._baseUrl = value;
    }
  }, {
    key: "Action",
    get: function () {
      return this._Action;
    },
    set: function (value) {
      this._Action = value;
    }
  }, {
    key: "Rules",
    get: function () {
      return this._Rules;
    },
    set: function (value) {
      this._Rules = value;
    }
  }, {
    key: "data",
    get: function () {
      return toJS(values(this._data));
    },
    set: function (value) {
      this._data = value;
    }
  }, {
    key: "model",
    get: function () {
      return toJS(values(this._model));
    },
    set: function (value) {
      this._model = value;
    }
  }, {
    key: "actionStatus",
    get: function () {
      return this._actionStatus;
    },
    set: function (value) {
      this._actionStatus = value;
    }
  }, {
    key: "validator",
    get: function () {
      return this._validator;
    },
    set: function (value) {
      this._validator = value;
    }
  }, {
    key: "ValidateErrors",
    get: function () {
      return toJS(this._ValidateErrors);
    },
    set: function (value) {
      this._ValidateErrors = value;
    }
  }, {
    key: "isValid",
    get: function () {
      return this._isValid;
    },
    set: function (value) {
      this._isValid = value;
    }
  }, {
    key: "errors",
    get: function () {
      return this.ValidateErrors;
    }
  }, {
    key: "ErrorText",
    get: function () {
      return this._ErrorText;
    },
    set: function (value) {
      this._ErrorText = value;
    }
  }, {
    key: "defaultConfig",
    get: function () {
      return this._defaultConfig;
    },
    set: function (value) {
      this._defaultConfig = value;
    }
  }, {
    key: "parameters",
    get: function () {
      return toJS(this._parameters);
    },
    set: function (value) {
      this._parameters = value;
    }
  }]);

  return BaseStore;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_parameters", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Object.assign({}, this._defaultConfig.baseParams);
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_model", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new Map();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_actionStatus", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new Map().set("get", false).set("read", false).set("load", false).set("save", false).set("update", false).set("delete", false);
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "Attributes", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "_data", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new Map();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "totalCount", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "currentPage", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "_ValidateErrors", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "_isValid", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "_ErrorText", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return "";
  }
}), _applyDecoratedDescriptor(_class.prototype, "getAttr", [action], Object.getOwnPropertyDescriptor(_class.prototype, "getAttr"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setAttr", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setAttr"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addRecord", [action], Object.getOwnPropertyDescriptor(_class.prototype, "addRecord"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "abort", [action], Object.getOwnPropertyDescriptor(_class.prototype, "abort"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "reset", [action], Object.getOwnPropertyDescriptor(_class.prototype, "reset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clear", [action], Object.getOwnPropertyDescriptor(_class.prototype, "clear"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setParameters", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setParameters"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getActionStatus", [action], Object.getOwnPropertyDescriptor(_class.prototype, "getActionStatus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setActionStatus", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setActionStatus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "load", [action], Object.getOwnPropertyDescriptor(_class.prototype, "load"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "save", [action], Object.getOwnPropertyDescriptor(_class.prototype, "save"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "update", [action], Object.getOwnPropertyDescriptor(_class.prototype, "update"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "delete", [action], Object.getOwnPropertyDescriptor(_class.prototype, "delete"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "validate", [action], Object.getOwnPropertyDescriptor(_class.prototype, "validate"), _class.prototype)), _class));
export { BaseStore as default };