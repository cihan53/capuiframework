var _dec, _dec2, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import { action, observable, toJS, values } from "mobx";
import Utils from "../Utils/Utils";
import Validator from "../Utils/Validator";
import DataProxy from "../Data/DataProxy"; // import lodash from "lodash";
// Load the core build.
// var lodash = require("lodash/core");

/*
rules = {
    accepted       : {message: 'The :attribute must be accepted.',                              rule: (val) => val === true },
    alpha          : {message: 'The :attribute may only contain letters.',                      rule: (val) => validator.helpers.testRegex(val,/^[A-Z]*$/i) },
    alpha_num      : {message: 'The :attribute may only contain letters and numbers.',          rule: (val) => validator.helpers.testRegex(val,/^[A-Z0-9]*$/i) },
    alpha_num_dash : {message: 'The :attribute may only contain letters, numbers, and dashes.', rule: (val) => validator.helpers.testRegex(val,/^[A-Z0-9_-.]*$/i) },
    card_exp       : {message: 'The :attribute must be a valid expiration date.',               rule: (val) => validator.helpers.testRegex(val,/^(([0]?[1-9]{1})|([1]{1}[0-2]{1}))\s?\/\s?(\d{2}|\d{4})$/) },
    card_num       : {message: 'The :attribute must be a valid credit card number.',            rule: (val) => validator.helpers.testRegex(val,/^\d{4}\s?\d{4,6}\s?\d{4,5}\s?\d{0,8}$/) },
    email          : {message: 'The :attribute must be a valid email address.',                 rule: (val) => validator.helpers.testRegex(val,/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) },
    gt             : {message: 'The :attribute must be greater than :gt.',                      rule: (val, options) => validator.helpers.testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) > parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':gt', options[0]) },
    gte            : {message: 'The :attribute must be greater than or equal to :gte.',         rule: (val, options) => validator.helpers.testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) >= parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':gte', options[0]) },
    in             : {message: 'The selected :attribute must be :values.',                      rule: (val, options) => options.indexOf(val) > -1, messageReplace: (message, options) => message.replace(':values', this._toSentence(options)) },
    integer        : {message: 'The :attribute must be an integer.',                            rule: (val) => validator.helpers.testRegex(val,/^\d+$/)},
    lt             : {message: 'The :attribute must be less than :lt.',                         rule: (val, options) => validator.helpers.testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) < parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':lt', options[0]) },
    lte            : {message: 'The :attribute must be less than or equal to :lte.',            rule: (val, options) => validator.helpers.testRegex(val,/^\d+.?\d*$/) ? parseFloat(val) <= parseFloat(options[0]) : false, messageReplace: (message, options) => message.replace(':lte', options[0]) },
    max            : {message: 'The :attribute may not be greater than :max characters.',       rule: (val, options) => val.length <= options[0], messageReplace: (message, options) => message.replace(':max', options[0]) },
    min            : {message: 'The :attribute must be at least :min characters.',              rule: (val, options) => val.length >= options[0], messageReplace: (message, options) => message.replace(':min', options[0]) },
    not_in         : {message: 'The selected :attribute must not be :values.',                  rule: (val, options) => options.indexOf(val) === -1, messageReplace: (message, options) => message.replace(':values', this._toSentence(options)) },
    numeric        : {message: 'The :attribute must be a number.',                              rule: (val) => validator.helpers.testRegex(val,/^\d+.?\d*$/)},
    phone          : {message: 'The :attribute must be a valid phone number.',                  rule: (val) => validator.helpers.testRegex(val,/(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)/)},
    required       : {message: 'The :attribute field is required.',                             rule: (val) => validator.helpers.testRegex(val,/.+/) },
    url            : {message: 'The :attribute must be a url.',                                 rule: (val) => validator.helpers.testRegex(val,/^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i) },
    ...customRules,
};
*/

let BaseStore = (_dec = observable.struct, _dec2 = observable.ref, (_class = (_temp =
/*#__PURE__*/
function () {
  /**
   *
   * @type {{baseParams: {page: number, size: number, dir: string, desc: string}}}
   * @private
   */

  /**
   *
   * @type {{postMultiPart: (function(*, *=): *), postJson: (function(*, *=): *), post: _Request.post, get: (function(*, *=): *), del: (function(*): *), deadline: number, postForm: (function(*, *=): *), timeout: number, put: (function(*, *=): *)}}
   */

  /**
   * Request parameters
   * @type {{page: number, size: number, dir: string, desc: string}}
   */

  /**
   *
   * @type {Map<any, any>}
   */

  /**
   * Primary key
   * @url parameter
   * @type {string}
   */

  /**
   *
   * @type {string}
   * @private
   */

  /**
   * Page size Limit
   * @type {number}
   */

  /**
   * Ajax Request Base URL
   * @type {string}
   */

  /**
   * Rest api action type
   * @type {{get: string, read: string, save: string, update: string, delete: string}}
   */

  /**
   * Ajax request status
   * @type {{read: boolean, save: boolean, update: boolean, delete: boolean}}
   */

  /**
   * Attributes validation rules
   * @type {Array}
   */

  /**
   * Attributes
   * @type {Array}
   */

  /**
   * Cache URL
   */

  /**
   *
   * @type {Map<any, any>}
   * @private
   */

  /**
   * Record TotalCount
   * @type {number}
   */

  /**
   * Aktif sayfa
   * @type {number}
   */

  /**
   * errors
   */

  /**
   * isValid
   */

  /**
   *
   * @type {string}
   * @private
   */

  /**
   *
   */
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
  /**
   *
   */


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
    /**
     *
     * @param key
     * @param record
     */

  }, {
    key: "addRecord",
    value: function addRecord(key, record) {
      this._data.set(key, record);
    }
    /**
     *
     * @param key
     */

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
    /**
     *
     */

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
    /**
     *
     */

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
      this.actionStatus.set("get", false).set("read", false).set("load", false).set("save", false).set("update", false).set("delete", false); //this.parameters = Object.assign({}, this._defaultConfig.baseParams);

      return this;
    }
    /**
     *
     * @param dir
     * @param sort
     */

  }, {
    key: "setDefaultSortDir",
    value: function setDefaultSortDir(dir, sort = "ASC") {
      this._defaultConfig.baseParams.dir = dir;
      this._defaultConfig.baseParams.sort = sort;
    }
    /**
     * Base Request Parameters Set
     * @param newParameters
     */

  }, {
    key: "setParameters",
    value: function setParameters(newParameters = {}) {
      this._parameters = Object.assign(this.parameters, newParameters);
    }
    /**
     *
     * @param action
     * @param status
     */

  }, {
    key: "getActionStatus",
    value: function getActionStatus(action) {
      this.actionStatus.get(action);
    }
    /**
     *
     * @param action
     * @param status
     */

  }, {
    key: "setActionStatus",
    value: function setActionStatus(action, status) {
      this.actionStatus.set(action, status);
    } //region data filter

    /**
     *
     * @param id
     * @returns {any | undefined}
     */

  }, {
    key: "findById",
    value: function findById(id) {
      return this._data.get(id);
    }
    /**
     *
     * @param id
     * @returns {any | undefined}
     */

  }, {
    key: "find",
    value: function find(id) {
      return this._data.get(id);
    }
    /**
     *
     * @param id
     * @returns {any | undefined}
     */

  }, {
    key: "findByModel",
    value: function findByModel(id) {
      return this._model.get(id);
    }
    /**
     *
     * @param key
     * @param value
     * @returns {*}
     */

  }, {
    key: "findByField",
    value: function findByField(key, value) {
      let find = [];

      this._data.forEach((_value, _key, _map) => {
        if (_value[key] == value) find.push(_value);
      });

      return find;
    } //regionend

    /**
     * load
     */

  }, {
    key: "load",
    value: function load(params = {}) {
      /**
       * clear request data
       */
      this.clear();
      /**
       *
       * @type {boolean}
       */

      this.setActionStatus("read", true);
      this.setActionStatus("load", true);
      /**
       * Run Ajax Request
       */

      if (!Utils.isEmpty(params)) {
        //filter parametresi json ceviriliyor.
        if (params.filter) params.filter = JSON.stringify(params.filter);
        this.setParameters(params);
      } // console.debug("Store Base Params :", this.parameters);

      /**
       *
       * @type {string}
       */


      let url = this.baseUrl + this.Action.read + "?" + this.stringify(this.parameters);
      if (!this.cacheUrl) url = url + "&rnd=" + Math.random();
      return this._Request.get(url).then(action(res => {
        if (res) {
          res.data.forEach(app => {
            this.addRecord(app[this.primaryKey], app);
          });
          this.totalCount = res.totalCount;
        } else {//throw new Error("Data Error: Data");
        }

        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        this.setActionStatus("read", false);
        this.setActionStatus("load", false);
      }));
    }
    /**
     * get record detail
     * @param primaryKeyValue
     * @returns {*|Promise<any>|Promise<T>}
     */

  }, {
    key: "get",
    value: function get(primaryKeyValue, primaryKey = this.primaryKey) {
      /**
       * Set action status
       */
      this.actionStatus.get = true;
      let url = this.baseUrl + this.Action.get;
      let params = {};

      if (!(primaryKeyValue == false || primaryKeyValue == null)) {
        if (Utils.isObject(primaryKey)) {
          params = primaryKey;
        } else {
          params[primaryKey] = primaryKeyValue;
        }
      } // let url = primaryKeyValue != null ? this.baseUrl + this.Action.get + "?" + primaryKey + "=" + primaryKeyValue : this.baseUrl + this.Action.get;


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
    /**
     * Record Save
     * @param params
     * @param isNewRecord
     * @returns {*|Promise<any>|Promise<T>}
     */

  }, {
    key: "save",
    value: function save(params, isNewRecord = true, postType = "json") {
      /**
       * Set action status
       */
      this.actionStatus.save = true;
      return this._Request.post(this.baseUrl + this.Action.save, params, postType).then(action(res => {
        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        /**
         * Set action status
         */
        this.actionStatus.save = true;
      }));
    }
    /**
     *  Record Update
     * @param params
     * @param isNewRecord
     * @returns {*|Promise<any>|Promise<T>}
     */

  }, {
    key: "update",
    value: function update(params, postType = "json") {
      /**
       * Set action status
       */
      this.actionStatus.update_ = true;
      return this._Request.post(this.baseUrl + this.Action.update, params, postType).then(action(res => {
        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        /**
         * Set action status
         */
        this.actionStatus.update_ = false;
      }));
    }
    /**
     * Record Delete
     * @param params
     * @returns {*|Promise<any>|Promise<T>}
     */

  }, {
    key: "delete",
    value: function _delete(params, postType = "formdata") {
      /**
       * Set action status
       */
      this.actionStatus.delete = false;
      return this._Request.post(this.baseUrl + this.Action.delete, params, postType).then(action(res => {
        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(action(() => {
        /**
         * Set action status
         */
        this.actionStatus.delete = true;
      }));
    } //region validate

    /**
     * Record Validation
     * Save and Update Data validate
     */

  }, {
    key: "validate",
    value: function validate(data, scenario = this._scenario) {
      this.ValidateErrors = [];
      this._validator.errorMessages = {};
      this.Rules.forEach(function (val) {
        if (val.scenario == scenario) {
          // this._validator.message(val.name, Utils.has(data, val.name) ? data[val.name] : "", val.rule, false, val.msg);
          this._validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {
            message: val.message
          });
        } else if (val.scenario == "default" && scenario == "default") {
          console.log(val, scenario);

          this._validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {
            message: val.message
          }); // this._validator.message(val.name, Utils.has(data, val.name) ? data[val.name] : "", val.rule, false, val.msg);

        }
      }.bind(this));
      this.ValidateErrors = this._validator.getErrorMessages();
      this._isValid = this._validator.allValid();
      return this._isValid;
    } //endregion
    //region util

    /**
     * object to urlParams
     * @param obj
     * @returns {string}
     */

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
    } //region

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