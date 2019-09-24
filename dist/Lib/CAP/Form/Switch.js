function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";
import { AppSwitch } from "@coreui/react";
import PropTypes from "prop-types";
import Utils from "../Utils/Utils";

let SwitchField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SwitchField, _React$Component);

  function SwitchField() {
    _classCallCheck(this, SwitchField);

    return _possibleConstructorReturn(this, _getPrototypeOf(SwitchField).apply(this, arguments));
  }

  _createClass(SwitchField, [{
    key: "render",
    value: function render() {
      return React.createElement(AppSwitch, {
        defaultChecked: this.props.defaultChecked,
        onChange: this.props.onChange,
        className: this.props.className,
        variant: this.props.variant,
        color: this.props.color
      });
    }
  }]);

  return SwitchField;
}(React.Component);

SwitchField.defaultProps = {
  id: Utils.ShortId.generate(),
  defaultChecked: false,
  onChange: (e, v) => {},
  variant: "pill",
  className: "mx-1",
  color: "primary",
  label: {
    on: Utils.__t("On"),
    off: Utils.__t("Off")
  }
};
export { SwitchField as default };
SwitchField.propTypes = {
  onChange: PropTypes.func
};