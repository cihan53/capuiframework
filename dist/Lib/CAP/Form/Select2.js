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
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

const filterColors = inputValue => {
  return colourOptions.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const createOption = label => ({
  label,
  value: label.toLowerCase().replace(/\W/g, '')
});

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

const promiseOptions = inputValue => new Promise(resolve => {
  setTimeout(() => {
    resolve(filterColors(inputValue));
  }, 1000);
});

const components = {
  DropdownIndicator: null
};
const options = [{
  value: 'chocolate',
  label: 'Chocolate'
}, {
  value: 'strawberry',
  label: 'Strawberry'
}, {
  value: 'vanilla',
  label: 'Vanilla'
}];

let Select2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Select2, _React$Component);

  function Select2(props) {
    var _this;

    _classCallCheck(this, Select2);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select2).call(this, props));

    _this.handleChange = (newValue, actionMeta) => {
      console.group('Value Changed');
      console.log(newValue);
      console.log(`action: ${actionMeta.action}`);
      console.groupEnd();
    };

    _this.handleInputChange = (inputValue, actionMeta) => {
      console.group('Input Changed');
      console.log(inputValue);
      console.log(`action: ${actionMeta.action}`);
      console.groupEnd();
    };

    _this.handleCreate = inputValue => {
      _this.setState({
        isLoading: true
      });

      console.group('Option created');
      console.log('Wait a moment...');
      setTimeout(() => {
        const {
          options
        } = _this.state;
        const newOption = createOption(inputValue);
        console.log(newOption);
        console.groupEnd();

        _this.setState({
          isLoading: false,
          options: [...options, newOption],
          value: newOption
        });
      }, 1000);
    };

    _this.state = {
      isLoading: false,
      options: options,
      value: undefined
    };
    return _this;
  }

  _createClass(Select2, [{
    key: "render",
    value: function render() {
      const {
        isLoading,
        options,
        value
      } = this.state;
      return React.createElement(Select, {
        isClearable: true,
        isDisabled: isLoading,
        isLoading: isLoading,
        loadOptions: promiseOptions,
        onChange: this.handleChange,
        onCreateOption: this.handleCreate,
        options: options,
        value: value
      });
    }
  }]);

  return Select2;
}(React.Component);

Select2.defaultProps = {
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
export { Select2 as default };
Select2.propTypes = {
  onChange: PropTypes.func
};