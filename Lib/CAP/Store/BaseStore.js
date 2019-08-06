/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import {action, observable, toJS, values} from "mobx";
import Utils from "../Utils/Utils";
import Request from "../../Request";
import Validator from "../Utils/Validator";

// import lodash from "lodash";

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
export default class BaseStore {
    /**
     *
     * @type {{baseParams: {page: number, size: number, dir: string, desc: string}}}
     * @private
     */
    _defaultConfig = {
        baseParams: {
            page: 0,
            size: 50,
            dir: "id",
            desc: "asc"
        }
    };


    /**
     * Request parameters
     * @type {{page: number, size: number, dir: string, desc: string}}
     */
    @observable _parameters = Object.assign({}, this._defaultConfig.baseParams);


    /**
     *
     * @type {Map<any, any>}
     */
    @observable.struct _model = new Map();

    /**
     * Primary key
     * @url parameter
     * @type {string}
     */
    primaryKey = "id";
    /**
     *
     * @type {string}
     * @private
     */
    _scenario = "default";
    /**
     * Page size Limit
     * @type {number}
     */
    _limit = 20;
    /**
     * Ajax Request Base URL
     * @type {string}
     */
    _baseUrl = "";
    /**
     * Rest api action type
     * @type {{get: string, read: string, save: string, update: string, delete: string}}
     */
    _Action = {
        get: "get",
        read: "read",
        save: "save",
        update: "update",
        delete: "delete"
    };

    /**
     * Ajax request status
     * @type {{read: boolean, save: boolean, update: boolean, delete: boolean}}
     */
    @observable.ref _actionStatus = new Map()
        .set("get", false)
        .set("read", false)
        .set("load", false)
        .set("save", false)
        .set("update", false)
        .set("delete", false);


    /**
     * Attributes validation rules
     * @type {Array}
     */
    _Rules = [];
    /**
     * Attributes
     * @type {Array}
     */
    @observable Attributes = {};


    /**
     * Cache URL
     */
    cacheUrl = false;

    /**
     *
     * @type {Map<any, any>}
     * @private
     */
    @observable _data = new Map();

    /**
     * Record TotalCount
     * @type {number}
     */
    @observable totalCount = 0;
    /**
     * Aktif sayfa
     * @type {number}
     */
    @observable currentPage = 1;


    _validator=Validator;
    /**
     * errors
     */
    @observable _ValidateErrors = {};

    /**
     * isValid
     */
    @observable _isValid = false;


    /**
     *
     * @type {string}
     * @private
     */
    @observable _ErrorText = "";


    /**
     *
     */
    constructor() {
        this.init();
    }


    /**
     *
     */
    init() {
        // this.validator = Validator;
        this._validator.showMessages();
        this._Rules = this._Rules.map(function (val) {
            if (!val.scenario) val = Object.assign(val, {scenario: "default"});
            return val;
        });
    }


    get scenario() {
        return this._scenario;
    }

    set scenario(value) {
        this._scenario = value;
    }


    setScenario(value) {
        this._scenario = value;
    }


    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }

    get baseUrl() {
        return this._baseUrl;
    }

    set baseUrl(value) {
        this._baseUrl = value;
    }

    get Action() {
        return this._Action;
    }

    set Action(value) {
        this._Action = value;
    }

    get Rules() {
        return this._Rules;
    }

    set Rules(value) {
        this._Rules = value;
    }


    @action getAttr(attr) {
        return this.Attributes[attr] || null
    }

    @action setAttr(attr, value) {
        this.Attributes[attr] = value;
    }


    get data() {
        return toJS(values(this._data));
    }

    set data(value) {
        this._data = value;
    }


    get model() {
        return toJS(values(this._model));
    }

    set model(value) {
        this._model = value;
    }

    get actionStatus() {
        return this._actionStatus;
    }

    set actionStatus(value) {
        this._actionStatus = value;
    }


    get validator() {
        return this._validator;
    }

    set validator(value) {
        this._validator = value;
    }

    get ValidateErrors() {
        return this._ValidateErrors;
    }

    set ValidateErrors(value) {
        this._ValidateErrors = value;
    }


    get isValid() {
        return this._isValid;
    }

    set isValid(value) {
        this._isValid = value;
    }

    get errors() {
        return this.ValidateErrors;
    }

    get ErrorText() {
        return this._ErrorText;
    }

    set ErrorText(value) {
        this._ErrorText = value;
    }


    get defaultConfig() {
        return this._defaultConfig;
    }

    set defaultConfig(value) {
        this._defaultConfig = value;
    }


    get parameters() {
        return this._parameters;
    }

    set parameters(value) {
        this._parameters = value;
    }

    addError(error) {
        this.ValidateErrors = Object.assign(this.ValidateErrors, error);
    }

    /**
     *
     * @param key
     * @param record
     */
    @action
    addRecord(key, record) {
        this._data.set(key, record);
    }

    /**
     *
     * @param key
     */
    removeRecord(key) {
        this._data.delete(key);
    }

    /**
     *
     */
    @action reset() {
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
    @action clear() {
        this._data.clear();
        this.ErrorText = "";
        this.ValidateErrors = [];
        this.isLoading = false;
        this.page = 0;
        this.totalCount = 0;
        this.currentPage = 0;

        this.actionStatus
            .set("get", false)
            .set("read", false)
            .set("load", false)
            .set("save", false)
            .set("update", false)
            .set("delete", false);

        //this.parameters = Object.assign({}, this._defaultConfig.baseParams);

        return this;
    }


    /**
     *
     * @param dir
     * @param sort
     */
    setDefaultSortDir(dir, sort = "ASC") {
        this._defaultConfig.baseParams.dir = dir;
        this._defaultConfig.baseParams.sort = sort;
    }


    /**
     * Base Request Parameters Set
     * @param newParameters
     */
    @action setParameters(newParameters = {}) {
        this._parameters = Object.assign(this.parameters, newParameters);
    }

    /**
     *
     * @param action
     * @param status
     */
    @action getActionStatus(action) {
        this.actionStatus.get(action);
    }


    /**
     *
     * @param action
     * @param status
     */
    @action setActionStatus(action, status) {
        this.actionStatus.set(action, status);
    }

    //region data filter
    /**
     *
     * @param id
     * @returns {any | undefined}
     */
    findById(id) {
        return this._data.get(id);
    }

    /**
     *
     * @param id
     * @returns {any | undefined}
     */
    find(id) {
        return this._data.get(id);
    }

    /**
     *
     * @param id
     * @returns {any | undefined}
     */
    findByModel(id) {
        return this._model.get(id);
    }

    /**
     *
     * @param key
     * @param value
     * @returns {*}
     */
    findByField(key, value) {
        let find = [];

        this._data.forEach((_value, _key, _map) => {
            if (_value[key] == value) find.push(_value);
        });

        return find;
    }

    //regionend


    /**
     * load
     */
    @action
    load(params = {}) {

        /**
         * clear request data
         */
        this.clear();

        /**
         *
         * @type {boolean}
         */
        this.setActionStatus("read", true)
        this.setActionStatus("load", true)

        /**
         * Run Ajax Request
         */

        if (!Utils.isEmpty(params)) {
            //filter parametresi json ceviriliyor.
            if (params.filter) params.filter = JSON.stringify(params.filter);
            this.setParameters(params);
        }

        // console.debug("Store Base Params :", this.parameters);

        /**
         *
         * @type {string}
         */
        let url = this.baseUrl + this.Action.read + "?" + this.stringify(this.parameters);

        if (!this.cacheUrl) url = url + "&rnd=" + Math.random();

        return Request.get(url)
            .then(action((res) => {

                if (res) {
                    res.data.forEach(app => {
                        this.addRecord(app[this.primaryKey], app);
                    });
                    this.totalCount = res.totalCount;
                } else {
                    //throw new Error("Data Error: Data");
                }


                return res;
            }))
            .catch(action((err) => {

                this.ErrorText = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                this.setActionStatus("read", false)
                this.setActionStatus("load", false)


            }));
    }


    /**
     * get record detail
     * @param primaryKeyValue
     * @returns {*|Promise<any>|Promise<T>}
     */
    get(primaryKeyValue, primaryKey = this.primaryKey) {

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
        }
        // let url = primaryKeyValue != null ? this.baseUrl + this.Action.get + "?" + primaryKey + "=" + primaryKeyValue : this.baseUrl + this.Action.get;


        return Request.get(url, params)
            .then(action((res) => {
                this._model.set(primaryKeyValue, res);
                return res;
            }))
            .catch(action((err) => {
                this.ErrorText = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                this.actionStatus.get = false;
            }));

    }


    /**
     * Record Save
     * @param params
     * @param isNewRecord
     * @returns {*|Promise<any>|Promise<T>}
     */
    @action save(params, isNewRecord = true, postType = "json") {
        /**
         * Set action status
         */
        this.actionStatus.save = true;

        return Request.post(this.baseUrl + this.Action.save, params, postType)
            .then(action((res) => {
                return res;
            }))
            .catch(action((err) => {
                this.ErrorText = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
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
    @action update(params, postType = "json") {

        /**
         * Set action status
         */
        this.actionStatus.update_ = true;
        return Request.post(this.baseUrl + this.Action.update, params, postType)
            .then(action((res) => {
                return res;
            }))
            .catch(action((err) => {
                this.ErrorText = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
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
    @action delete(params,postType = "formdata") {
        /**
         * Set action status
         */
        this.actionStatus.delete = false;

        return Request.post(this.baseUrl + this.Action.delete, params,postType)
            .then(action((res) => {
                return res;
            }))
            .catch(action((err) => {
                this.ErrorText = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                /**
                 * Set action status
                 */
                this.actionStatus.delete = true;
            }));
    }


    //region validate

    /**
     * Record Validation
     * Save and Update Data validate
     */
    @action validate(data, scenario = this._scenario) {

        this.ValidateErrors = [];
        this._validator.errorMessages = {};

        this.Rules.forEach(function (val) {
            if (val.scenario == scenario) {
                // this._validator.message(val.name, Utils.has(data, val.name) ? data[val.name] : "", val.rule, false, val.msg);
                this._validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {message: val.message});
            } else if (val.scenario == "default" && scenario == "default") {
                this._validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {message: val.message});
                // this._validator.message(val.name, Utils.has(data, val.name) ? data[val.name] : "", val.rule, false, val.msg);
            }
        }.bind(this));


        this.ValidateErrors = this._validator.getErrorMessages();

        this._isValid = this._validator.allValid();
        return this._isValid;

    }

    //endregion


    //region util

    /**
     * object to urlParams
     * @param obj
     * @returns {string}
     */
    stringify(obj) {
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


    //region
}