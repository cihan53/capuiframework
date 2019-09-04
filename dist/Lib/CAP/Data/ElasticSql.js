var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

import { action, observable, toJS } from "mobx";
import Ajax from "./Ajax";
import Utils from "../Utils/Utils";
import DataProxy from "./DataProxy";
let ElasticSql = (_class = (_temp = function () {
  function ElasticSql() {
    _classCallCheck(this, ElasticSql);

    this._baseUrl = "";
    this.currentId = 0;
    this.running = null;
    this.Ajax = null;

    _initializerDefineProperty(this, "_select", _descriptor, this);

    _initializerDefineProperty(this, "_joins", _descriptor2, this);

    this._limit = 50;
    this._from = "";
    this._maps = {};
    this._start = 0;
    this._fetch = 0;
    this._sqlText = "";
    this._whereText = "";
    this._mainTable = process.env.REACT_APP_DEFAULT_INDEX || "eventdata-prod";

    _initializerDefineProperty(this, "_where", _descriptor3, this);

    _initializerDefineProperty(this, "_orderBy", _descriptor4, this);

    this._groupBy = null;
    this._debug = false;

    _initializerDefineProperty(this, "isRunning", _descriptor5, this);

    this.tokenPlugin = req => {};

    this.handleErrors = (err, res) => {};

    this.responseBody = res => {
      return res.body;
    };

    this.abort = () => {
      if (!Utils.isEmpty(this.Ajax.running)) this.Ajax.running.abort();
    };

    this.init = () => {
      this.regenerateQuery();
    };

    this._type = 'elasticsql';
    this.dataProxy = new DataProxy();
    this.Ajax = this.dataProxy.createProxy('ajax');
    this.init = this.init.bind(this);
  }

  _createClass(ElasticSql, [{
    key: "regenerateQuery",
    value: function regenerateQuery() {
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
  }, {
    key: "mainTable",
    value: function mainTable(_mainTable) {
      this._mainTable = _mainTable;
      return this;
    }
  }, {
    key: "where",
    value: function where(_where) {
      this._where = _where;
      return this;
    }
  }, {
    key: "addWhere",
    value: function addWhere(where) {
      return this;
    }
  }, {
    key: "select",
    value: function select(selectArr = []) {
      this.regenerateQuery();
      this._select = selectArr;
      return this;
    }
  }, {
    key: "join",
    value: function join(type = "", table = "", on = []) {
      this._joins.push({
        "type": type,
        "table": table,
        "on": on
      });

      return this;
    }
  }, {
    key: "order",
    value: function order(_order = []) {
      this.order = _order;
      return this;
    }
  }, {
    key: "limits",
    value: function limits(_limits = null) {
      this._limit = _limits;
      return this;
    }
  }, {
    key: "orderBy",
    value: function orderBy(_orderBy) {
      this._orderBy = _orderBy;
      return this;
    }
  }, {
    key: "groupBy",
    value: function groupBy(_groupBy) {
      this._groupBy = _groupBy;
      return this;
    }
  }, {
    key: "from",
    value: function from(_from) {
      this._mainTable = _from;
      return this;
    }
  }, {
    key: "conditions",
    value: function conditions(param, logic = "and") {
      if (Utils.isArray(param)) {
        for (let index in param) {
          let item = param[index];

          if (Utils.isString(item)) {
            this._whereText += " " + logic + " " + item;
          } else {
            let operator = "=";

            if (item["type"]) {
              if (item["type"] == "subset") {
                if (item["items"]) {
                  if (CAP.Utils.isArray(item["items"])) {
                    this._whereText += " " + logic + " ( 1=1  ";
                    item["items"].forEach(subsetItem => {
                      this.conditions(subsetItem, "or");
                    });
                    this._whereText += ")";
                    continue;
                  }
                }
              }
            }

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
        this._whereText += " " + logic + " " + param;
      }
    }
  }, {
    key: "build",
    value: function build() {
      this._sqlText = "";
      this._whereText = "";
      this._sqlText += "select " + this._select.join(", ");
      this._sqlText += " from " + this._mainTable;

      this._joins.forEach(item => {
        this._sqlText += " " + item["type"] + " join " + item["table"] + " on " + item["on"].join(" and ");
      });

      if (this._where != "") {
        this.conditions(this._where);
        this._sqlText += " where 1=1 " + this._whereText;
      }

      if (this._groupBy) {
        let groupStr = " group by ";

        this._groupBy.forEach(item => {
          groupStr += item + ",";
        });

        groupStr = groupStr.substr(0, groupStr.length - 1);
        this._sqlText += groupStr;
      }

      if (this._orderBy) {
        if (!Utils.isArray(this._orderBy)) {
          this._orderBy = [this._orderBy];
        }

        let orderStr = " order by ";

        this._orderBy.forEach(item => {
          orderStr += item["field"] + " " + item["dir"] + ",";
        });

        orderStr = orderStr.substr(0, orderStr.length - 1);
        this._sqlText += orderStr;
      }

      if (this._limit) {
        this._sqlText += " limit " + this._limit["start"] + "," + this._limit["limit"];
      }

      return this._sqlText;
    }
  }, {
    key: "execute",
    value: function execute(sql = null) {
      let newSql = sql || this.build();
      this.isRunning = true;
      var params = {
        parameters: Object.assign({
          dashboardType: "GenericElasticSearch"
        }, {
          query: newSql
        })
      };
      if (Utils.isEmpty(newSql)) return new Promise((resolve, reject) => {
        reject(Utils.__t("Hatalı sorgu. Sorgu Boş olamaz"));
      });
      console.debug("Run Elastic SQL:", newSql);
      let post = this.Ajax.post(this._baseUrl, params);
      return post.then(action(res => {
        if (res && res.data.hasOwnProperty("error")) {
          this.ErrorText = res.data.error.root_cause.map(e => {
            return e.reason + " ";
          });
          throw this.ErrorText;
        }

        return res;
      })).catch(action(err => {
        this.ErrorText = err.response && err.response.body && err.response.body.errors;
        throw err;
      })).finally(e => {
        this.isRunning = false;
      });
    }
  }, {
    key: "schema",
    value: function schema() {
      let sql = "show " + this.table + "/_doc/_mapping";
      return this.execute(sql).then(e => this._maps = e);
    }
  }, {
    key: "show",
    value: function show(index = null) {
      let sql = "show " + (index == null ? this.table : index);
      return this.execute(sql).then(e => this._maps = e);
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
    key: "baseUrl",
    get: function () {
      return this._baseUrl;
    },
    set: function (value) {
      this._baseUrl = value;
    }
  }, {
    key: "table",
    get: function () {
      return this._mainTable;
    }
  }, {
    key: "wheres",
    get: function () {
      return toJS(this._where);
    }
  }, {
    key: "whereText",
    get: function () {
      return Utils.trimStart(this._whereText.trim(), 'and');
    }
  }], [{
    key: "_uniqueIdGenerator",
    value: function _uniqueIdGenerator() {
      return ++this.currentId;
    }
  }]);

  return ElasticSql;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_select", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_joins", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_where", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "_orderBy", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "isRunning", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "execute", [action], Object.getOwnPropertyDescriptor(_class.prototype, "execute"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "schema", [action], Object.getOwnPropertyDescriptor(_class.prototype, "schema"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "show", [action], Object.getOwnPropertyDescriptor(_class.prototype, "show"), _class.prototype)), _class);
export { ElasticSql as default };