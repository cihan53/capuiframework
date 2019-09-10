var _class, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

/*
 *  Copyright (c) 2019. Crypttech Yazılım
 *  Author: Cihan Öztürk
 *  Email: cihanozturk@crypttech.com
 *
 *
 */
import { action, observable, reaction } from "mobx";
import Utils from "../Lib/CAP/Utils/Utils";
import BaseStore from "../Lib/CAP/Store/BaseStore";
import { Logger } from "../index";
export let CapAuthStore = (_class = (_temp =
/*#__PURE__*/
function (_BaseStore) {
  _inherits(CapAuthStore, _BaseStore);

  function CapAuthStore(props) {
    var _this;

    _classCallCheck(this, CapAuthStore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CapAuthStore).call(this, props));

    _initializerDefineProperty(_this, "accessToken", _descriptor, _assertThisInitialized(_this));

    _this.baseUrl = "/login/";
    _this.Rules = [{
      name: "password",
      rule: "required",
      msg: {
        required: Utils.__t("Zorunlu alan")
      }
    }, {
      name: "userName",
      rule: "required|alpha_num",
      msg: {
        alpha: Utils.__t("Sadece harflerden oluşabilir"),
        required: Utils.__t("Zorunlu alan")
      }
    }];
    reaction(() => _this.accessToken, accessToken => {
      Logger.debug("CapAuthStore Token", accessToken);

      if (accessToken) {
        _this.accessToken = accessToken;
      }
    });
    return _this;
  }

  _createClass(CapAuthStore, [{
    key: "login",
    value: function login(params) {}
  }, {
    key: "logout",
    value: function logout() {}
  }, {
    key: "isLogin",
    value: function isLogin() {
      if (this.accessToken == null) {
        return false;
      } else {
        return true;
      }
    }
  }]);

  return CapAuthStore;
}(BaseStore), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "accessToken", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return window.localStorage.getItem("accessToken");
  }
}), _applyDecoratedDescriptor(_class.prototype, "login", [action], Object.getOwnPropertyDescriptor(_class.prototype, "login"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "logout", [action], Object.getOwnPropertyDescriptor(_class.prototype, "logout"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isLogin", [action], Object.getOwnPropertyDescriptor(_class.prototype, "isLogin"), _class.prototype)), _class);
export default CapAuthStore;