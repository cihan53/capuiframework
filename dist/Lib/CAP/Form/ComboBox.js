var _class, _temp;

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
import Field from "./Field";
import Utils from "../Utils/Utils";
import StoreManager from "../../StoreManager";

let ComboBox = observer(_class = (_temp =
/*#__PURE__*/
function (_Field) {
  _inherits(ComboBox, _Field);

  function ComboBox(props) {
    var _this;

    _classCallCheck(this, ComboBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ComboBox).call(this, props));
    _this.autoload = true;
    _this.data = [];
    _this.store = null;
    _this.key = _this.props.key || Utils.ShortId.generate();
    _this.generateItems = _this.generateItems.bind(_assertThisInitialized(_this));

    _this.init();

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
    key: "componentWillMount",
    value: function componentWillMount() {
      const currentIndex = 0;
      if (this.store && this.autoload) this.store.load({
        page: 0,
        start: currentIndex,
        size: this.limit
      });
    }
    /**
     *
     * @param event
     */

  }, {
    key: "onChange",
    value: function onChange(event) {
      if (this.store.Attributes.hasOwnProperty(event.target.name)) {
        if (!this.isValid(event.target.name, event.target.value)) {
          this.store.setAttr(event.target.name, event.target.value);
        }
      } else {
        throw Utils.Translate("Tanımlanmamış alan adı");
      }
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
          defaultValue: config.defaultValue,
          valid: valid,
          invalid: invalid,
          type: "select",
          default: true,
          name: config.inputName,
          id: config.id || this.key,
          placeholder: config.placeholder
        }, optionItems);
      } else {
        input = React.createElement(Input, {
          defaultValue: config.defaultValue || "",
          valid: valid,
          invalid: invalid,
          type: "select",
          default: true,
          name: config.inputName,
          id: config.id || config.inputName + "-form-field",
          value: this.store.Attributes[config.valueField],
          placeholder: config.placeholder,
          onChange: this.onChange
        }, optionItems);
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
}(Field), _temp)) || _class;

export { ComboBox as default };
Field.propTypes = {
  valueField: PropTypes.any,
  displayField: PropTypes.any,
  inputName: PropTypes.string.required,
  options: PropTypes.any // data: PropTypes.any.required,

};