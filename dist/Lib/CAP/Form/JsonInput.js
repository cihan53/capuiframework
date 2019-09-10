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
import PropTypes from "prop-types";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import React from "react";

let JsonInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JsonInput, _React$Component);

  function JsonInput(props) {
    var _this;

    _classCallCheck(this, JsonInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JsonInput).call(this, props));
    _this.placeholder = {};
    _this.state = {
      placeholder: _this.props.placeholder || {}
    };
    _this.placeholder = _this.props.placeholder || {};
    _this.onChange = _this.props.onChange || _this.onChange.bind(_assertThisInitialized(_this));
    _this.getValues = _this.getValues.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JsonInput, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state == nextState) this.placeholder = nextProps.placeholder;
    }
  }, {
    key: "onChange",
    value: function onChange(v) {
      if (v.error == false) {
        this.placeholder = v.jsObject;
        this.setState({
          placeholder: v.jsObject
        });
      } else {
        this.placeholder = null;
      }
    }
    /**
     *
     */

  }, {
    key: "getValues",
    value: function getValues() {
      return this.placeholder;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(JSONInput, _extends({}, this.props, {
        placeholder: this.placeholder,
        onChange: this.onChange
      }));
    }
  }]);

  return JsonInput;
}(React.Component);

export { JsonInput as default };
JsonInput.propTypes = {
  id: PropTypes.string.isRequired,
  onKeyPressUpdate: PropTypes.bool,
  waitAfterKeyPress: PropTypes.number,
  modifyErrorText: PropTypes.func,
  theme: PropTypes.string,
  colors: PropTypes.object,
  style: PropTypes.object,
  locale: PropTypes.object,
  reset: PropTypes.bool,
  viewOnly: PropTypes.bool,
  onChange: PropTypes.func,
  confirmGood: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
};
JsonInput.defaultProps = {
  id: "a_unique_id",
  colors: {},
  locale: locale
};