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
import { observer } from "mobx-react/index";
import PropTypes from "prop-types";
import { Col, FormFeedback, FormGroup, Input, Label, FormText } from "reactstrap";
import Utils from "../Utils/Utils";
import Validator from "../Utils/Validator";
import StoreManager from "../../StoreManager";

let Text =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Text, _React$Component);

  function Text(props) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, props));
    _this.rule = [];
    _this.state = {
      value: null,
      error: null
    };
    return _this;
  }
  /**
   *
   * @param event
   */


  _createClass(Text, [{
    key: "onChange",
    value: function onChange(event) {
      if (this.props.hasOwnProperty("onChange")) this.props.onChange(event, this);
      this.setState({
        selected: event.target.selected
      });
    }
  }, {
    key: "render",
    value: function render() {
      let config = this.props;
      let errorMessage = this.state.error;
      let input = React.createElement(Input, {
        name: config.inputName,
        value: this.props.value
      });
      if (config.layout == "row") input = React.createElement(Col, {
        sm: config.options.col
      }, input);
      return React.createElement(FormGroup, {
        row: config.layout == "row"
      }, config.label && config.layout != "row" ? React.createElement(Label, {
        htmlFor: config.id || config.inputName + "-form-field"
      }, config.label) : "", config.label && config.layout == "row" ? React.createElement(Label, {
        htmlFor: config.id || config.inputName + "-form-field",
        sm: config.options.labelCol
      }, config.label) : "", input, errorMessage ? React.createElement(FormFeedback, {
        valid: true,
        tooltip: true
      }, errorMessage) : void 0, config.text && config.text != "" ? React.createElement(FormText, null, config.text) : void 0);
    }
  }]);

  return Text;
}(React.Component);

Text.defaultProps = {
  id: Utils.ShortId.generate(),
  inputName: "",
  label: "",
  defaultValue: "",
  placeholder: "",
  allowBlank: true,
  rule: null,
  addon: true,
  layout: "row",
  // inline | row,
  store: null,
  options: {
    validateClass: "danger",
    col: "10",
    labelCol: "2",
    type: "input"
  }
};
export { Text as default };