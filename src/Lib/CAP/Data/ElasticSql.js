/*
 *  Copyright (c) 2019. Crypttech Yazılım
 *  Author: Cihan Öztürk
 *  Email: cihanozturk@crypttech.com
 *
 *
 */

import {action, observable, toJS} from "mobx";
import Ajax from "./Ajax";
import Utils from "../Utils/Utils";
import DataProxy from "./DataProxy";

export default class ElasticSql {
    _baseUrl = "";
    currentId = 0;
    running = null;
    Ajax = null;
    @observable _select = [];
    @observable _joins = [];
    _limit = 50;
    _from = "";
    _maps = {};
    _start = 0;
    _fetch = 0;
    _sqlText = "";
    _whereText = "";
    _mainTable = process.env.REACT_APP_DEFAULT_INDEX || "eventdata-prod";
    @observable _where = null;
    @observable _orderBy = null;
    _groupBy = null;
    _debug = false;

    @observable isRunning = false;

    tokenPlugin = (req) => {

    }

    handleErrors = (err, res) => {

    }

    responseBody = (res) => {
        return res.body;
    }

    constructor() {
        this._type = 'elasticsql';
        this.dataProxy = new DataProxy();
        this.Ajax = this.dataProxy.createProxy('ajax');
        // this.oldEnd = superagent.prototype.end;
        this.init = this.init.bind(this);

    }

    static _uniqueIdGenerator() {
        return ++this.currentId;
    }

    get Request() {
        return this._Request;
    }

    set Request(value) {
        this._Request = value;
    }


    get baseUrl() {
        return this._baseUrl;
    }

    set baseUrl(value) {
        this._baseUrl = value;
    }

    /**
     * işlemi kes
     */
    abort = () => {
        if (!Utils.isEmpty(this.Ajax.running))
            this.Ajax.running.abort();
    }

    init = () => {
        this.regenerateQuery();
    };

    regenerateQuery() {
        this._select = [];
        this._joins = [];
        this._from = [];
        this._limit = null;
        this._start = 0;
        this._fetch = 0;
        this._sqlText = "";
        this._mainTable = process.env.REACT_APP_DEFAULT_INDEX || "eventdata-prod";
        this._where = null;
        this._orderBy = null;
        this._groupBy = null;
    }

    get table() {
        return this._mainTable;
    }

    get wheres() {
        return toJS(this._where);
    }

    get whereText() {
        return Utils.trimStart(this._whereText.trim(), 'and');
    }

    mainTable(mainTable) {
        this._mainTable = mainTable;
        return this;
    }

    where(where) {
        this._where = where;
        return this;
    }

    addWhere(where) {
        // this._where += where;
        return this;
    }

    select(selectArr = []) {
        this.regenerateQuery();
        this._select = selectArr;
        return this;
    }

    join(type = "", table = "", on = []) {
        this._joins.push({"type": type, "table": table, "on": on});
        return this;
    }

    order(order = []) {
        this.order = order;
        return this;
    }


    limits(limits = null) {
        this._limit = limits;
        return this;
    }

    orderBy(orderBy) {
        this._orderBy = orderBy;
        return this;
    }

    groupBy(groupBy) {
        this._groupBy = groupBy;
        return this;
    }

    from(from) {
        this._mainTable = from;
        return this;
    }


    conditions(param, logic = "and") {

        if (Utils.isArray(param)) {
            /**
             * Eğer arary ise bütün itemları gez
             */
            for (let index in param) {
                let item = param[index];

                //eğer item string ise
                if (Utils.isString(item)) {
                    this._whereText += " " + logic + " " + item;
                } else {

                    let operator = "=";

                    //Alt query var ise
                    if (item["type"]) {
                        if (item["type"] == "subset") {
                            if (item["items"]) {
                                if (CAP.Utils.isArray(item["items"])) {
                                    this._whereText += " " + logic + " ( 1=1  ";
                                    item["items"].forEach((subsetItem) => {
                                        this.conditions(subsetItem, "or");
                                    });
                                    this._whereText += ")";
                                    continue;
                                }
                            }
                        }
                    }

                    //operator var ise
                    if (item["operator"]) {
                        operator = item["operator"];
                    }

                    if (operator.trim() == "in" || operator.trim() == "is" || operator.trim() == "between") {
                        this._whereText += " " + logic + " " + item["column"] + " " + operator + " " + item["value"] + " ";
                    } else {
                        this._whereText += " " + logic + " " + item["column"] + " " + operator + "'" + item["value"] + "'";
                    }
                }
            }


        } else if (Utils.isString(param) && !CAP.Utils.isEmpty(param)) {
            /**
             * string bir değer var ise param içinde
             * @type {string}
             * @private
             */
            this._whereText += " " + logic + " " + param;
        }


    }

    build() {
        this._sqlText = "";
        this._whereText = "";
        this._sqlText += "select " + this._select.join(", ");
        this._sqlText += " from " + this._mainTable;


        this._joins.forEach((item) => {
            this._sqlText += " " + item["type"] +
                " join " + item["table"] +
                " on " + item["on"].join(" and ");
        });

        //where block
        if (this._where != "") {
            this.conditions(this._where);
            this._sqlText += " where 1=1 " + this._whereText;
        }

        //groupBy block
        if (this._groupBy) {
            let groupStr = " group by ";
            this._groupBy.forEach((item) => {
                groupStr += item + ",";
            });
            groupStr = groupStr.substr(0, groupStr.length - 1);
            this._sqlText += groupStr;
        }

        //orderBy block
        if (this._orderBy) {
            if (!Utils.isArray(this._orderBy)) {
                this._orderBy = [this._orderBy];
            }
            let orderStr = " order by ";
            this._orderBy.forEach((item) => {
                orderStr += item["field"] + " " + item["dir"] + ",";
            });

            orderStr = orderStr.substr(0, orderStr.length - 1);
            this._sqlText += orderStr;
        }
        // limits
        if (this._limit) {
            this._sqlText += " limit " + this._limit["start"] + "," + this._limit["limit"];
        }
        return this._sqlText;
    }

    @action
    execute(sql = null) {
        let newSql = sql || this.build();

        this.isRunning = true;

        var params = {
            parameters: Object.assign({
                dashboardType: "GenericElasticSearch"
            }, {query: newSql})
        };


        if (Utils.isEmpty(newSql)) return new Promise((resolve, reject) => {
            reject(Utils.__t("Hatalı sorgu. Sorgu Boş olamaz"))
        });

        console.debug("Run Elastic SQL:", newSql);
        let post = this.Ajax.post(this._baseUrl, params);


        return post.then(action((res) => {
            if (res && res.data.hasOwnProperty("error")) {
                this.ErrorText = res.data.error.root_cause.map(e => {
                    return e.reason + " ";
                });
                throw this.ErrorText;
            }
            return res;
        }))
            .catch(action((err) => {
                this.ErrorText = err.response && err.response.body && err.response.body.errors;
                throw err;
            })).finally(e => {
                this.isRunning = false;
            });


    }


    /**
     * get table schema
     */
    @action
    schema() {
        let sql = "show " + this.table + "/_doc/_mapping";
        return this.execute(sql).then(e => this._maps = e);
    }


    /**
     * Show commands is just a wrapper for the mapping request.
     But using it on the web interface give you information about what are the indices in your cluster, which types they contains and what is the mapping for each type.
     The supported Commands:
     1.Show * - shows all indices on cluster
     on _sql?sql=show * you'll get all the mapping for all indices
     on web interface you'll get a table of index to types image

     2.Show myIndex - shows a specific index
     on _sql?sql=show myIndex you'll get the mapping for this specific index
     on web interface you'll get a table of type to fields for this specific index image

     3.Show myIndex/myType - shows a specific type
     on _sql?sql=show myIndex/myType you'll get the mapping for this specific type
     on web interface you'll get a table of fields to mappings for this specific type
     *
     * @param index
     * @returns {*}
     */
    @action
    show(index = null) {
        let sql = "show " + (index == null ? this.table : index);
        return this.execute(sql).then(e => this._maps = e);
    }

}