function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from "react";
import { matchPath } from "react-router";
import Utils from "./CAP/Utils/Utils";
import StoreManager from "./StoreManager";
import { Loadable, Spinner, Log, Raise, Logger } from "../index";

let CapController = function (_React$Component) {
  _inherits(CapController, _React$Component);

  function CapController(props) {
    var _this;

    _classCallCheck(this, CapController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CapController).call(this, props));
    _this._BreadCrumbStore = null;
    _this._BreadCrumb = [];
    _this._SecurityProvider = 0;
    _this._components = {};
    _this._urlMap = [];
    _this._theme = "Default";
    _this._layout = "Layout";
    _this._view = "index";
    _this._controllerName = _this.constructor.name;
    _this._action = "actionIndex";
    _this._viewPath = null;
    _this._errors = [];

    _this.getMethods = obj => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function');

    _this.loading = params => {
      if (params.error) {
        Log("Loading Error:", params.error);
        return React.createElement(React.Fragment, null, React.createElement("div", {
          className: "text-white bg-danger text-center"
        }, React.createElement("div", {
          className: "cart card-error p-4"
        }, React.createElement("blockquote", {
          className: "card-bodyquote"
        }, React.createElement("p", null, params.error.toString())))));
      } else if (params.pastDelay) {
        return React.createElement(Spinner, null);
      } else {
        return null;
      }
    };

    _this.renderView = (view, data = {}, loadmask = false, controller = _this.controllerName) => {
      Logger.debug(`@ThemeViewsPath/${controller}/${view}`);

      if (!loadmask) {
        let View = Loadable({
          loader: () => import(`@ThemeViewsPath/${controller}/${view}`),
          loading: _this.loading
        });
        Logger.debug(`@ThemeViewsPath/${controller}/${view}`);
        return React.createElement(View, _extends({}, data, _this.props, {
          Controller: _assertThisInitialized(_this)
        }));
      } else {
        return React.createElement(Spinner, null);
      }
    };

    _this.renderAjax = (view, data = {}, loadmask = false, controller = _this.controllerName) => {};

    _this.render = () => {
      let methods = _this.getMethods(_assertThisInitialized(_this));

      Logger.debug("Controller Find action", _this.controllerName + "/" + _this.action);
      let method = methods.filter(f => f.toLocaleLowerCase() == "action" + _this.action.toLocaleLowerCase());

      if (method.length > 0) {
        return _this[method[0]]({ ..._this.getUrlParams()
        });
      } else {
        return _this.renderView("Page404", {
          action: _this.action
        }, false, "Default");
      }
    };

    _this.addError = error => {
      _this._errors.push(error);

      console.error(error);
      return _assertThisInitialized(_this);
    };

    _this.actionError = params => {
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "text-white bg-danger text-center"
      }, React.createElement("div", {
        className: "cart card-error p-4"
      }, React.createElement("blockquote", {
        className: "card-bodyquote"
      }, params.errors ? React.createElement("p", null, params.errors) : "", React.createElement("p", null, _this.errors.map(e => {
        return e;
      }))))));
    };

    _this.getUrlParams = (paramString = ":id?") => {
      const match = matchPath(_this.props.location.pathname, {
        path: _this.props.match.path + paramString,
        exact: true,
        strict: false
      }) || {};
      let params = match.params || {};
      return Object.assign(params, Utils.queryString.parse(_this.props.location.search));
    };

    _this.createUrl = (actionName, params = {}, hash = true) => {
      let queryStringParams = "";

      if (!Utils.isEmpty(params)) {
        if (Utils.has(params, "id") && !Utils.isEmpty(params.id)) {
          queryStringParams = params.id;
          delete params.id;
        }
      }

      if (!Utils.isEmpty(params)) queryStringParams = queryStringParams + "/?" + Utils.queryString.stringify(params);
      let controller = "/" + _this.controllerName + "/" + actionName;
      if (Utils.startsWith(actionName, "/")) controller = actionName;
      if (hash) return "/#" + Utils.trimEnd(controller, "/") + "/" + queryStringParams;else return Utils.trimEnd(controller, "/") + (Utils.startsWith(queryStringParams, "/") ? queryStringParams : "/" + queryStringParams);
    };

    _this.toUrl = (actionName, params = {}) => {
      return window.location = _this.createUrl(actionName, params);
    };

    _this.toChange = (actionName, params = {}) => {
      return _this.props.history.push(_this.createUrl(actionName, params, false));
    };

    _this.init();

    return _this;
  }

  _createClass(CapController, [{
    key: "init",
    value: function init() {
      let c = this.props.match.params.controller || "Default";
      let a1 = (this.props.match.params.action || "Index").capitalizeFirstLetter().split("-");
      let a = "";
      a1.forEach(e => {
        a += e.capitalizeFirstLetter();
      });
      this._action = a;
      this._controllerName = c;
      this._components = StoreManager.get("CommonStore").getComponent(c);

      if (!Utils.isEmpty(this.urlMap)) {}
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      if (this._BreadCrumbStore != null) StoreManager.get(this._BreadCrumbStore).setItem(this.BreadCrumb);
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      Logger.error("MyCatch", error, info);
    }
  }, {
    key: "componentWillReact",
    value: function componentWillReact() {
      Logger.debug("Store Change");
    }
  }, {
    key: "BreadCrumbStore",
    get: function () {
      return this._BreadCrumbStore;
    },
    set: function (value) {
      this._BreadCrumbStore = value;
    }
  }, {
    key: "BreadCrumb",
    get: function () {
      return this._BreadCrumb;
    },
    set: function (value) {
      this._BreadCrumb = value;
    }
  }, {
    key: "SecurityProvider",
    get: function () {
      return this._SecurityProvider;
    },
    set: function (value) {
      this._SecurityProvider = value;
    }
  }, {
    key: "theme",
    get: function () {
      return this._theme;
    },
    set: function (value) {
      this._theme = value;
    }
  }, {
    key: "view",
    get: function () {
      return this._view;
    },
    set: function (value) {
      this._view = value;
    }
  }, {
    key: "controllerName",
    get: function () {
      return this._controllerName;
    },
    set: function (value) {
      this._controllerName = value;
    }
  }, {
    key: "action",
    get: function () {
      return this._action;
    },
    set: function (value) {
      this._action = value;
    }
  }, {
    key: "urlMap",
    get: function () {
      return this._urlMap;
    },
    set: function (value) {
      this._urlMap = value;
    }
  }, {
    key: "viewPath",
    get: function () {
      return this._viewPath;
    },
    set: function (value) {
      this._viewPath = value;
    }
  }, {
    key: "layout",
    get: function () {
      return this._layout;
    },
    set: function (value) {
      this._layout = value;
    }
  }, {
    key: "components",
    get: function () {
      return this._components;
    },
    set: function (value) {
      this._components = value;
    }
  }, {
    key: "errors",
    get: function () {
      return this._errors;
    },
    set: function (value) {
      this._errors.push(value);
    }
  }]);

  return CapController;
}(React.Component);

export { CapController as default };