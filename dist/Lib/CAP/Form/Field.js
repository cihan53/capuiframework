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
import PropTypes from "prop-types";
import { Col, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap";
import Utils from "../Utils/Utils";
import Validator from "../Utils/Validator";

let Field =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Field, _React$Component);

  function Field(props) {
    var _this;

    _classCallCheck(this, Field);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Field).call(this, props));
    _this.state = {
      error: null
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.isValid = _this.isValid.bind(_assertThisInitialized(_this));
    _this.rule = [];
    _this.valid = null;
    _this.invalid = false; //TODO burası güncellenecek

    _this.store = null; // StoreManager.get('ModuleAdminStore')

    let config = _this.props;

    if (!config.allowBlank) {
      _this.rule.push("required");
    }

    if (_this.props.rule && _this.props.rule != "") {
      _this.rule = Utils.concat(_this.rule, _this.props.rule.split("|"));
    }

    _this.state = {
      value: null
    };
    return _this;
  }

  _createClass(Field, [{
    key: "isValid",
    value: function isValid(inputname) {
      return Validator.fieldValid(inputname);
    } // onChange(event) {
    //
    //     if (this.store.Attributes.hasOwnProperty(event.target.name)) {
    //
    //         if (!this.isValid(event.target.name, event.target.value)) {
    //             this.store.setAttr(event.target.name, event.target.value);
    //         }
    //     } else {
    //         throw Utils.__t("Tanımlanmamış alan adı");
    //     }
    // }

    /**
     *
     * @param event
     */

  }, {
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
      let input = null;
      let value = "";
      if (this.store != null) value = this.store.getAttr[config.inputName] || "";

      if (this.store == null) {
        input = React.createElement(Input, {
          defaultValue: config.defaultValue,
          valid: this.valid,
          invalid: this.invalid,
          type: config.options.type || config.type,
          default: true,
          name: config.inputName,
          id: config.id,
          placeholder: config.placeholder
        });
      } else {
        input = React.createElement(Input, {
          valid: this.valid,
          invalid: this.invalid,
          type: config.options.type || config.type,
          default: true,
          name: config.inputName,
          id: config.id,
          value: value,
          placeholder: config.placeholder,
          onChange: this.onChange
        });
      }

      if (config.layout == "row") input = React.createElement(Col, {
        sm: config.options.col
      }, input);
      return React.createElement(FormGroup, {
        row: config.layout == "row"
      }, config.label && config.layout != "row" ? React.createElement(Label, {
        htmlFor: config.id
      }, config.label) : "", config.label && config.layout == "row" ? React.createElement(Label, {
        htmlFor: config.id,
        sm: config.options.labelCol
      }, config.label) : "", input, React.createElement(FormFeedback, null, this.rule.length > 0 ? Validator.message(config.inputName, value, this.rule.join("|")) : ""), config.text && config.text != "" ? React.createElement(FormText, null, config.text) : "");
    }
  }]);

  return Field;
}(React.Component);

Field.defaultProps = {
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
export { Field as default };
Field.propTypes = {
  options: PropTypes.any,
  layout: PropTypes.string,
  inputName: PropTypes.string.Required // inputName: PropTypes.string.required

};