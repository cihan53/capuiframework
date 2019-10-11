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
import { AppSwitch } from "@coreui/react";
import PropTypes from "prop-types";
import Utils from "../Utils/Utils";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
export const colourOptions = [{
  value: 'ocean',
  label: 'Ocean',
  color: '#00B8D9',
  isFixed: true
}, {
  value: 'blue',
  label: 'Blue',
  color: '#0052CC',
  isDisabled: true
}, {
  value: 'purple',
  label: 'Purple',
  color: '#5243AA'
}, {
  value: 'red',
  label: 'Red',
  color: '#FF5630',
  isFixed: true
}, {
  value: 'orange',
  label: 'Orange',
  color: '#FF8B00'
}, {
  value: 'yellow',
  label: 'Yellow',
  color: '#FFC400'
}, {
  value: 'green',
  label: 'Green',
  color: '#36B37E'
}, {
  value: 'forest',
  label: 'Forest',
  color: '#00875A'
}, {
  value: 'slate',
  label: 'Slate',
  color: '#253858'
}, {
  value: 'silver',
  label: 'Silver',
  color: '#666666'
}];
export const flavourOptions = [{
  value: 'vanilla',
  label: 'Vanilla',
  rating: 'safe'
}, {
  value: 'chocolate',
  label: 'Chocolate',
  rating: 'good'
}, {
  value: 'strawberry',
  label: 'Strawberry',
  rating: 'wild'
}, {
  value: 'salted-caramel',
  label: 'Salted Caramel',
  rating: 'crazy'
}];
export const stateOptions = [{
  value: 'AL',
  label: 'Alabama'
}, {
  value: 'AK',
  label: 'Alaska'
}, {
  value: 'AS',
  label: 'American Samoa'
}, {
  value: 'AZ',
  label: 'Arizona'
}, {
  value: 'AR',
  label: 'Arkansas'
}, {
  value: 'CA',
  label: 'California'
}, {
  value: 'CO',
  label: 'Colorado'
}, {
  value: 'CT',
  label: 'Connecticut'
}, {
  value: 'DE',
  label: 'Delaware'
}, {
  value: 'DC',
  label: 'District Of Columbia'
}, {
  value: 'FM',
  label: 'Federated States Of Micronesia'
}, {
  value: 'FL',
  label: 'Florida'
}, {
  value: 'GA',
  label: 'Georgia'
}, {
  value: 'GU',
  label: 'Guam'
}, {
  value: 'HI',
  label: 'Hawaii'
}, {
  value: 'ID',
  label: 'Idaho'
}, {
  value: 'IL',
  label: 'Illinois'
}, {
  value: 'IN',
  label: 'Indiana'
}, {
  value: 'IA',
  label: 'Iowa'
}, {
  value: 'KS',
  label: 'Kansas'
}, {
  value: 'KY',
  label: 'Kentucky'
}, {
  value: 'LA',
  label: 'Louisiana'
}, {
  value: 'ME',
  label: 'Maine'
}, {
  value: 'MH',
  label: 'Marshall Islands'
}, {
  value: 'MD',
  label: 'Maryland'
}, {
  value: 'MA',
  label: 'Massachusetts'
}, {
  value: 'MI',
  label: 'Michigan'
}, {
  value: 'MN',
  label: 'Minnesota'
}, {
  value: 'MS',
  label: 'Mississippi'
}, {
  value: 'MO',
  label: 'Missouri'
}, {
  value: 'MT',
  label: 'Montana'
}, {
  value: 'NE',
  label: 'Nebraska'
}, {
  value: 'NV',
  label: 'Nevada'
}, {
  value: 'NH',
  label: 'New Hampshire'
}, {
  value: 'NJ',
  label: 'New Jersey'
}, {
  value: 'NM',
  label: 'New Mexico'
}, {
  value: 'NY',
  label: 'New York'
}, {
  value: 'NC',
  label: 'North Carolina'
}, {
  value: 'ND',
  label: 'North Dakota'
}, {
  value: 'MP',
  label: 'Northern Mariana Islands'
}, {
  value: 'OH',
  label: 'Ohio'
}, {
  value: 'OK',
  label: 'Oklahoma'
}, {
  value: 'OR',
  label: 'Oregon'
}, {
  value: 'PW',
  label: 'Palau'
}, {
  value: 'PA',
  label: 'Pennsylvania'
}, {
  value: 'PR',
  label: 'Puerto Rico'
}, {
  value: 'RI',
  label: 'Rhode Island'
}, {
  value: 'SC',
  label: 'South Carolina'
}, {
  value: 'SD',
  label: 'South Dakota'
}, {
  value: 'TN',
  label: 'Tennessee'
}, {
  value: 'TX',
  label: 'Texas'
}, {
  value: 'UT',
  label: 'Utah'
}, {
  value: 'VT',
  label: 'Vermont'
}, {
  value: 'VI',
  label: 'Virgin Islands'
}, {
  value: 'VA',
  label: 'Virginia'
}, {
  value: 'WA',
  label: 'Washington'
}, {
  value: 'WV',
  label: 'West Virginia'
}, {
  value: 'WI',
  label: 'Wisconsin'
}, {
  value: 'WY',
  label: 'Wyoming'
}];
export const optionLength = [{
  value: 1,
  label: 'general'
}, {
  value: 2,
  label: 'Evil is the moment when I lack the strength to be true to the Good that compels me.'
}, {
  value: 3,
  label: "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you."
}];
export const dogOptions = [{
  id: 1,
  label: 'Chihuahua'
}, {
  id: 2,
  label: 'Bulldog'
}, {
  id: 3,
  label: 'Dachshund'
}, {
  id: 4,
  label: 'Akita'
}]; // let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export const groupedOptions = [{
  label: 'Colours',
  options: colourOptions
}, {
  label: 'Flavours',
  options: flavourOptions
}];

const filterColors = inputValue => {
  return colourOptions.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const loadOptions = (inputValue, callback) => {};

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
/**
 * guncelle
 * @type {*[]}
 */

const defaultOptions = [];

const createOption = label => ({
  label,
  value: label.toLowerCase().replace(/\W/g, '')
});

let Select2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Select2, _React$Component);

  function Select2(props) {
    var _this;

    _classCallCheck(this, Select2);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select2).call(this, props));

    _this.loadOptions = (inputValue, callback) => {
      if (_this.props.hasOwnProperty("loadOptions")) _this.props.loadOptions(inputValue, callback);
    };

    _this.handleChange = (newValue, actionMeta) => {
      if (_this.props.hasOwnProperty("handleChange")) _this.props.handleChange(newValue, actionMeta);
    };

    _this.handleInputChange = (inputValue, actionMeta) => {
      if (_this.props.hasOwnProperty("handleInputChange")) _this.props.handleInputChange(inputValue, actionMeta);
    };

    _this.handleCreate = inputValue => {
      const {
        options
      } = _this.state;
      const newOption = createOption(inputValue);

      _this.setState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption
      });

      _this.props.handleCreate(inputValue);
    };

    _this.state = {
      isLoading: _this.props.isLoading || false,
      options: _this.props.defaultOptions || defaultOptions,
      value: _this.props.value || undefined
    };
    _this.loadOptions = _this.loadOptions.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleCreate = _this.handleCreate.bind(_assertThisInitialized(_this));
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
      console.log(this.state);
      return React.createElement(AsyncCreatableSelect, _extends({}, this.props, {
        isLoading: isLoading,
        options: options,
        value: value
      }));
    }
  }]);

  return Select2;
}(React.Component);
/**
 * isClearable

 isMulti
 isDisabled={isLoading}
 isLoading={isLoading}
 loadOptions={promiseOptions}
 onChange={this.handleChange}
 onCreateOption={this.handleCreate}
 options={options}
 value={value}
 * @type {{isMulti: *, isLoading: *, getValue: *, onCreateOption: *, emotion: *, onChange: *, selectProps: *, options: *, hasValue: *, isDisabled: *, loadOptions: *}}
 */


Select2.defaultProps = {
  id: Utils.ShortId.generate(),
  defaultChecked: false,
  variant: "pill",
  className: "mx-1",
  color: "primary"
};
export { Select2 as default };
Select2.propTypes = {
  getValue: PropTypes.func,
  hasValue: PropTypes.bool,
  isMulti: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  options: PropTypes.any,
  selectProps: PropTypes.any,
  emotion: PropTypes.any,
  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  onCreateOption: PropTypes.func
};