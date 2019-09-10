var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/*
 *  Copyright (c) 2019. Crypttech Yazılım
 *  Author: Cihan Öztürk
 *  Email: cihanozturk@crypttech.com
 *
 *
 */
import { action, computed } from "mobx";
import BaseStore from "../Lib/CAP/Store/BaseStore"; // import Request from "../Lib/Request";

let CapUserStore = (_class =
/*#__PURE__*/
function (_BaseStore) {
  _inherits(CapUserStore, _BaseStore);

  function CapUserStore() {
    _classCallCheck(this, CapUserStore);

    return _possibleConstructorReturn(this, _getPrototypeOf(CapUserStore).apply(this, arguments));
  }

  _createClass(CapUserStore, [{
    key: "getProfile",
    value: function getProfile() {}
  }, {
    key: "forgetUser",
    value: function forgetUser() {}
  }, {
    key: "setCurrentUser",
    value: function setCurrentUser(user) {}
  }, {
    key: "detail",
    get: function () {}
  }]);

  return CapUserStore;
}(BaseStore), (_applyDecoratedDescriptor(_class.prototype, "detail", [computed], Object.getOwnPropertyDescriptor(_class.prototype, "detail"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getProfile", [action], Object.getOwnPropertyDescriptor(_class.prototype, "getProfile"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "forgetUser", [action], Object.getOwnPropertyDescriptor(_class.prototype, "forgetUser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setCurrentUser", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setCurrentUser"), _class.prototype)), _class);
export { CapUserStore as default };