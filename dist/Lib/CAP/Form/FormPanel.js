var _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from "react";
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react/index";
import PropTypes from "prop-types";
import Utils from "../Utils/Utils";
import Panel from "../Panel/Panel";
import { Button, Form } from "reactstrap";
import Validator from "../Utils/Validator";
import { Xtypes } from "../../../Initialization";

let FormPanel = observer(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormPanel, _React$Component);

  // key= Utils.ShortId.generate();
  function FormPanel(props) {
    var _this;

    _classCallCheck(this, FormPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormPanel).call(this, props));
    _this.key = _this.props.key || Utils.ShortId.generate();
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    _this.getValues = _this.getValues.bind(_assertThisInitialized(_this));
    _this.createItems = _this.createItems.bind(_assertThisInitialized(_this));

    if (Utils.isEmpty(_this.props.config.footer)) {
      _this.props.config.footer = [React.createElement(Button, {
        type: "submit",
        key: _this.key + "-save-btn",
        form: _this.props.name
      }, React.createElement("i", {
        className: "fa fa-dot-circle-o"
      }), " ", Utils.__t("Save"))];
    }

    _this.formRef = React.createRef();
    _this.children = null;
    _this.Validator = Validator;
    return _this;
  }

  _createClass(FormPanel, [{
    key: "submit",
    value: function submit(event) {
      event.preventDefault();
      let values = this.getValues();
      this.props.onSubmit(values, this);
    }
    /**
     *
     */

  }, {
    key: "isValid",
    value: function isValid() {
      let valid = true;
      let values = this.getValues();

      if (this.props.store != null) {
        valid = this.props.store.validate(values);
      } else {
        return this.validate(values);
      }

      return valid;
    }
  }, {
    key: "validate",
    value: function validate(data, scenario = "default") {
      this.validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {
        message: val.message
      });
    }
    /**
     * form values
     */

  }, {
    key: "getValues",
    value: function getValues() {
      let values = {};

      if (this.props.store == null) {
        const formData = new FormData(ReactDOM.findDOMNode(this.formRef.current));

        for (let entry of formData.entries()) {
          values[entry[0]] = values[1];
        }
      } else {
        values = this.props.store.Attributes;
      }

      return values;
    }
    /**
     *
     */

  }, {
    key: "createItems",
    value: function createItems() {
      this.children = this.props.children || this.props.items.map((e, i) => {
        e.id = this.props.name + "-child-item-" + i;
        e.key = this.key + "-child-item-" + i;
        e.store = this.props.store || null;
        e.layout = this.props.layout || null;

        if (e.hasOwnProperty("xtype")) {
          //return Utils.CreateComponent(e);
          const Cp = observer(message => {
            const Container = Xtypes[e.xtype];
            return React.createElement(Container, message);
          }); // const Cp = Observer(Xtypes[e.xtype]);

          return React.createElement(Cp, {
            p: e
          });
        } else {
          return Utils.createElement(e);
        } // return Utils.CreateComponent(e);
        // return e;

      });
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.createItems();
    }
  }, {
    key: "_renderItem",
    value: function _renderItem() {
      return React.createElement(Panel, this.props, this.children);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Panel, this.props, React.createElement(Form, {
        ref: this.formRef,
        id: this.props.name,
        name: this.props.name,
        onSubmit: e => this.submit(e)
      }, this.children));
    }
  }]);

  return FormPanel;
}(React.Component), _class2.defaultProps = {
  name: "form-panel",
  onSubmit: e => {},
  config: {},
  options: {},
  optionsBody: {},
  optionsTitle: {},
  optionsHeader: {},
  optionsFooter: {},
  title: true,
  header: "Panel Title",
  footer: false,
  items: [],
  store: null,
  xtype: "formpanel",
  layout: null
}, _temp)) || _class;

export { FormPanel as default };
FormPanel.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  title: PropTypes.any,
  header: PropTypes.any,
  items: PropTypes.array,
  options: PropTypes.any,
  store: PropTypes.any
};