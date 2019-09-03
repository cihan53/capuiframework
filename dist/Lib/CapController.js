function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";
import { matchPath } from "react-router";
import Utils from "./CAP/Utils/Utils";
import StoreManager from "./StoreManager";
import { Loadable, Spinner, Log, Raise, Logger } from "../index"; // const queryString = require("query-string");

/**
 * Kontroler Framework içerisinde sıkça kullanılan methodları tek bir yerde toplamak
 * ve kolay kullanım için geliştirilmiştir.
 *
 * Aslında react için bir kontroller sistemi yoktur  (01-10-2018)
 *
 * Geliştirilmesi gereken bir kaç yer var
 *
 * Component Güncelleme mekanizması kontrol altına alınmalı
 * Component unmount olduğunda yapılması gereken bir dizi işlem var , storeların temizlenmesi ramdaki gereksiz alanları temizlenmes vb..
 *
 *
 * ......
 */

let CapController =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CapController, _React$Component);

  /**
   * Sistem genelinde kullanılabilmesi için Kontroller üzerinde tutuluyor.
   *
   * @SecurityProvider
   *    local
   *    ldap
   *    activedirectory
   *    radius
   * @type {{}}
   * @private
   */

  /**
   * Sistemde kullanılacak componenetleri listesi
   * @type {{}}
   * @private
   */

  /**
   * Sistemde kullanılacak tema'yı belirliyor
   * Tema aynı zamanda layout içerdiğinden tüm yapı düzen değişebilir.
   * @comment
   *    Tema oluşturulurken aşağıdaki hiyerarşi oluşturulmalı
   *      /Themes
   *        /Default
   *          /Views
   *            /{Component}/
   *            /{Component2}/
   *            ..
   *            MainView.js
   *            LoginView.js
   *            ForgetPassword.js
   *          /Widget
   * @type {string}
   * @private
   */
  //TODO burası kullanılacak
  //TODO bu kaldırılabilir kontrol dilmesi gerekiyor
  //TODO bu aktif olarak kullanılmıyor gerekli ayarlar yapılırsa render işleminde view parametresi verilmeden kullanmak için

  /**
   * Her kontroller içinde olması gereken aksiyon
   * Aksiyon isimlendirme
   *  @comment
   *  Action lar 'action' ile başlamalı sonrasında gelen ilk karkater büyük harf olmalı
   *    actionList
   *    actionDelete
   *    actionIndex
   *    ...
   *
   *    Şimdilik alt level bir aksiyon islemi yapılmak isteniyorsa leveller arasına "-" konmali
   *
   *    Örnek : http://local/Manager/Customer-Order-List şeklinde bir url miz var bunu parçalarsak
   *
   *    Manager => Kontroller
   *    Customer-Order-List => Aksiyon ( Customer/Order/List şeklinde'de ifade edebiliriz)
   *
   *    Bu controler şu şekilde olmalı
   *
   *    export default Manager extent CapController{
   *
   *      actionCustomerOrderList(){
   *        ....
   *      }
   *
   *      ....
   *    }
   *
   *
   *  <p>Her aksiyon içinde kesinlikle return olmalı</p>
   *
   * @type {string}
   * @private
   */

  /**
   * Tema path belirleme için kullanılıyor,
   *
   * _theme değeri kullanılıyor, ancak bu değer Envoriment ile değiştirilebilir.
   *
   * @type {string}
   * @private
   */

  /**
   * Kontroller işlenirken oluşan hataları depolayacak.
   * @type {Array}
   * @private
   */
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
      //
      // let viewPath = this.viewPath;
      // let theme = this.theme;
      // let layout = this.layout;
      Logger.debug(`@ThemeViewsPath/${controller}/${view}`);

      if (!loadmask) {
        let View = Loadable({
          loader: () => import(
          /* webpackMode: "lazy" */
          `@ThemeViewsPath/${controller}/${view}`),
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

    _this.renderAjax = (view, data = {}, loadmask = false, controller = _this.controllerName) => {}
    /*var xhr = new XMLHttpRequest();
    xhr.open("get", this.props.url, true);
    xhr.onload = function() {
      var response = JSON.parse(xhr.responseText);
        this.setState({ data: response.result });
    }.bind(this);
    xhr.send();*/

    /**
     *
     * @returns {*}
     */
    ;

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
      }) || {}; // let params = this.props.match.params || {};

      let params = match.params || {};
      return Object.assign(params, Utils.queryString.parse(_this.props.location.search));
    };

    _this.init();

    return _this;
  }

  _createClass(CapController, [{
    key: "init",
    value: function init() {
      // let type = this.props.location.pathname.split('/'); //this is the name of the route
      let c = this.props.match.params.controller || "Default"; // let m = this.props.match.params.module || null ;

      let a1 = (this.props.match.params.action || "Index").capitalizeFirstLetter().split("-");
      let a = "";
      a1.forEach(e => {
        a += e.capitalizeFirstLetter();
      }); // CAP.Log(this.props.match.params)

      this._action = a;
      this._controllerName = c;
      this._components = StoreManager.get("CommonStore").getComponent(c); // let match = null;

      if (!Utils.isEmpty(this.urlMap)) {} //
      //   match = matchPath(this.urlMap, {
      //     path: this._urlMap,
      //     exact: true,
      //     strict: false
      //   });
      //
      //
      // if (this.viewPath == null)
      //   this.viewPath = this._theme + "/Views/" + this._controllerName + "/";

    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      //TODO mount olunca neler yapılmalı bunlar belilenmeli
      //BreadCrumb
      if (this._BreadCrumbStore != null) StoreManager.get(this._BreadCrumbStore).setItem(this.BreadCrumb); //console.log(this.getMethods(this));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {} // componentWillUpdate(nextProps, nextState) {
    //     // Logger.debug("Controller Update NextProps ", nextProps, this.props)
    //     return nextProps != this.props;
    // }

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      Logger.error("MyCatch", error, info);
    }
    /**
     *
     ### About `shouldComponentUpdate`
       When using `@observer` on a component, don't implement `shouldComponentUpdate`, as it will override the default implementation that MobX provides.
     When using mobx-react, you should in general not need to write an `sCU` (in our entire Mendix code base we have none). If you really need to implement `sCU`, split the component into two, a reactive and non-reactive (with the `sCU`) part, or use `<Observer>` sections instead of `observer` on the entire component.
       Similarly, `PureComponent` should not be combined with `observer`. As pure components are supposed to be dumb and never update themselves automatically, but only by getting passed in new props from the parent. `observer` is the opposite, it makes components smart and dependency aware, allowing them to update without the parents even needing to be aware of the change.
       ### `componentWillReact` (lifecycle hook)
       React components usually render on a fresh stack, so that makes it often hard to figure out what _caused_ a component to re-render.
     When using `mobx-react` you can define a new life cycle hook, `componentWillReact` (pun intended) that will be triggered when a component is scheduled to be re-rendered because
     data it observes has changed. This makes it easy to trace renders back to the action that caused the rendering.
       ```javascript
     import { observer } from "mobx-react"
       @observer
     class TodoView extends React.Component {
      componentWillReact() {
          console.info("I will re-render, since the todo has changed!")
      }
        render() {
          return <div>{this.props.todo.title}</div>
      }
    }
     ```
       *   `componentWillReact` doesn't take arguments
     *   `componentWillReact` won't fire before the initial render (use `componentDidMount` or `constructor` instead)
     *
     * @returns {boolean}
     */

  }, {
    key: "componentWillReact",
    value: function componentWillReact() {
      Logger.debug("Store Change");
    }
    /**
     *
     * @param view
     * @param data
     * @returns {*}
     */

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
    /**
     * İlgili komponent
     * @returns {{}}
     */

  }, {
    key: "components",
    get: function () {
      return this._components;
    },
    set: function (value) {
      this._components = value;
    }
    /**
     * kontroller da oluşan hatalar
     * @returns {Array}
     */

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

CapController.createUrl = (actionName, params = {}, hash = true) => {
  // return <Link
  //     to={{
  //         pathname: actionName,
  //         search:  params,
  //         // hash: "#the-hash"
  //     }}
  // />;
  let queryStringParams = "";

  if (!Utils.isEmpty(params)) {
    if (Utils.has(params, "id") && !Utils.isEmpty(params.id)) {
      queryStringParams = params.id;
      delete params.id;
    }
  }

  if (!Utils.isEmpty(params)) queryStringParams = queryStringParams + "/?" + Utils.queryString.stringify(params);
  let controller = "/" + CapController.controllerName + "/" + actionName;
  if (Utils.startsWith(actionName, "/")) controller = actionName;
  if (hash) return "/#" + Utils.trimEnd(controller, "/") + "/" + queryStringParams;else return Utils.trimEnd(controller, "/") + (Utils.startsWith(queryStringParams, "/") ? queryStringParams : "/" + queryStringParams);
};

CapController.toUrl = (actionName, params = {}) => {
  return window.location = CapController.createUrl(actionName, params);
};

CapController.toChange = (actionName, params = {}) => {
  return CapController.props.history.push(CapController.createUrl(actionName, params, false));
};

export { CapController as default };