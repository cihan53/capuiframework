var _class, _class2, _temp;

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
import { observer } from "mobx-react/index";
import PropTypes from "prop-types";
import { Col, FormFeedback, FormGroup, Input, Label, FormText } from "reactstrap";
import Utils from "../Utils/Utils";
import StoreManager from "../../StoreManager";

let ComboBox = observer(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ComboBox, _React$Component);

  function ComboBox(props) {
    var _this;

    _classCallCheck(this, ComboBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ComboBox).call(this, props));
    _this.autoload = true;
    _this.data = [];
    _this.state = {
      selected: {}
    };
    _this.store = null;
    _this.key = _this.props.key || Utils.ShortId.generate();
    _this.generateItems = _this.generateItems.bind(_assertThisInitialized(_this));

    _this.init();

    _this.load = _this.load.bind(_assertThisInitialized(_this));
    _this.getValue = _this.getValue.bind(_assertThisInitialized(_this));
    _this.getSelected = _this.getSelected.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.selectField = React.createRef();
    return _this;
  }

  _createClass(ComboBox, [{
    key: "init",
    value: function init() {
      if (this.props.store) {
        if (typeof this.props.store == "string") {
          this.store = StoreManager.get(this.props.store) || null;
        } else {
          let storeName = this.props.store.name;
          let baseParams = this.props.store.baseParams || null;
          let defaultSort = this.props.store.defaultSort || null;
          this.store = StoreManager.get(storeName) || null;
          if (this.store && baseParams) this.store.setParameters(baseParams);

          if (this.store && defaultSort) {
            this.store.setDefaultSortDir(defaultSort.dir, defaultSort.sort);
          }
        }

        if (!this.store) throw new Error(Utils.__t("Data Store Tanımsız"));
        this.autoload = this.props.hasOwnProperty('autoload') ? this.props.autoload : true;
      }
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      const currentIndex = 0;
      if (this.store && this.autoload) this.load();
    }
    /**
     *
     * @returns {void|any}
     */

  }, {
    key: "load",
    value: function load() {
      return this.props.store.load ? this.props.store.load(this) : this.store.load();
    }
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
    /**
     *
     * @param data
     * @returns {*}
     */

  }, {
    key: "generateItems",
    value: function generateItems(data) {
      if (this.store) {
        return data.map((opt, index) => {
          return React.createElement("option", {
            key: this.key + "-combobox-item-" + index,
            value: opt[this.props.valueField]
          }, opt[this.props.displayField]);
        });
      } else {
        return data.map((opt, index) => {
          return React.createElement("option", {
            key: this.key + "-combobox-item-" + index,
            value: opt.value
          }, opt.name);
        });
      }
    }
  }, {
    key: "getSelected",
    value: function getSelected() {
      return this.state.selected;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.state.selected;
    }
  }, {
    key: "render",
    value: function render() {
      let valid = false;
      let invalid = false;
      let config = this.props;
      let errorMessage = this.state.error;

      if (config.allowBlank) {
        valid = false;
        invalid = false;
      } // let allowedProps =["defaultValue","valid","invalid","type","name","id","placeholder"];


      let input = null;
      let optionItems = this.generateItems(this.store ? this.store.data : config.items);

      if (config.store == null) {
        input = React.createElement(Input, {
          ref: this.selectField,
          defaultValue: config.defaultValue,
          valid: valid,
          invalid: invalid,
          type: "select",
          default: true,
          name: config.inputName,
          id: config.id || this.key,
          placeholder: config.placeholder,
          onChange: this.onChange
        }, React.createElement("option", {
          value: ""
        }, Utils.__t("Seçiniz")), optionItems);
      } else {
        input = React.createElement(Input, {
          ref: this.selectField,
          defaultValue: config.defaultValue || "",
          valid: valid,
          invalid: invalid,
          type: "select",
          default: true,
          name: config.inputName,
          id: config.id || config.inputName + "-form-field" //value={this.store.Attributes[config.valueField]}
          // value={this.state.selected}
          ,
          placeholder: config.placeholder,
          onChange: this.onChange
        }, React.createElement("option", {
          value: ""
        }, Utils.__t("Seçiniz")), optionItems);
      }

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

  return ComboBox;
}(React.Component), _class2.defaultProps = {
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
}, _temp)) || _class;

export { ComboBox as default };
ComboBox.propTypes = {
  valueField: PropTypes.string.isRequired,
  displayField: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  options: PropTypes.any // data: PropTypes.any.required,

};