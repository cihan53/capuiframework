var _class, _class2, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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
import Field from "./Field";
import PropTypes from "prop-types";
import Utils from "../Utils/Utils";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { observer } from "mobx-react";
import StoreManager from "../../StoreManager";
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

const createOption = label => ({
  label,
  value: label.toLowerCase().replace(/\W/g, '')
});

const defaultOptions = [createOption('One'), createOption('Two'), createOption('Three')];

let Select2 = observer(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Field) {
  _inherits(Select2, _Field);

  function Select2(props) {
    var _this;

    _classCallCheck(this, Select2);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select2).call(this, props));

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
    }; // this.loadOptions = this.loadOptions.bind(this);

    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.handleCreate = _this.handleCreate.bind(_assertThisInitialized(_this));

    _this.init();

    return _this;
  }

  _createClass(Select2, [{
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
  }, {
    key: "generateItems",
    value: function generateItems(data) {
      if (this.store) {
        return data.map((opt, index) => {
          return {
            label: opt[this.props.displayField],
            value: opt[this.props.valueField]
          };
        });
      }

      return data;
    } // loadOptions = (inputValue, callback) => {
    //     if (this.props.hasOwnProperty("loadOptions"))
    //         this.props.loadOptions(inputValue, callback)
    // }

  }, {
    key: "itemRender",
    value: function itemRender() {
      const {
        isLoading,
        options,
        value
      } = this.state;
      let config = this.props;
      let optionItems = this.generateItems(this.store ? this.store.data : config.items);
      return React.createElement(React.Fragment, null, React.createElement(AsyncCreatableSelect, _extends({
        isLoading: isLoading,
        options: options,
        value: value,
        defaultOptions: optionItems
      }, this.props)));
    }
  }, {
    key: "render",
    value: function render() {
      console.log("Render");
      return _get(_getPrototypeOf(Select2.prototype), "render", this).call(this);
    }
  }]);

  return Select2;
}(Field), _class2.defaultProps = {
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

export { Select2 as default };
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

Select2.propTypes = {
  defaultOptions: PropTypes.array,
  getValue: PropTypes.func,
  hasValue: PropTypes.bool,
  isMulti: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  options: PropTypes.any,
  selectProps: PropTypes.any,
  emotion: PropTypes.any,
  loadOptions: PropTypes.any,
  onChange: PropTypes.func,
  onCreateOption: PropTypes.func,
  displayField: PropTypes.string,
  valueField: PropTypes.string
};