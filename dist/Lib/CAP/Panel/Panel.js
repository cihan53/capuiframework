var _class, _class2, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from "react";
import { observer } from "mobx-react/index";
import PropTypes from "prop-types";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "reactstrap";
import Utils from "../Utils/Utils";

let Panel = observer(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Panel, _React$Component);

  // key= Utils.ShortId.generate();
  function Panel(props) {
    var _this;

    _classCallCheck(this, Panel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Panel).call(this, props));
    _this.key = _this.props._key || Utils.ShortId.generate();
    _this.childRender = _this.childRender.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   *
   * @param items
   * @returns {any}
   */


  _createClass(Panel, [{
    key: "childRender",
    value: function childRender(items = []) {
      return Utils.isArray(items) ? items.map((E, i) => {
        //CAP.Log(this.key,E,i)
        //E.key = this.key + "-child-item-" + i;
        if (E.hasOwnProperty("xtype")) return Utils.createElement(E);
        if (typeof E.$$typeof == "symbol") return React.createElement(React.Fragment, {
          key: E.key
        }, E);
        return React.createElement(E, {
          key: this.key + "-child-item-" + i
        });
      }) : null;
    }
    /**
     *
     * @param children
     * @returns {*}
     */

  }, {
    key: "render",
    value: function render(children = null) {
      children = children || this.props.items.length > 0 ? this.childRender(this.props.items) : null;
      children = children || this.props.children || null;
      const footer = this.props.footer || null;
      const title = this.props.config.title || this.props.title;
      let header = this.props.header;

      if (this.props.config.hasOwnProperty("header")) {
        header = this.props.config.header;
      } //items var ise
      // if (children == null && this.props.items && this.props.items.length > 0)
      // children = this.props.items.map((e, i) => {
      //     e.key = this.key + "-child-item-" + i;
      //     if (e.hasOwnProperty("xtype"))
      //         return Utils.createElement(e);
      //     return e;
      // });
      //config içinde items var ise
      // if (children == null &&  this.props.config && this.props.config.items && this.props.config.items.length > 0)
      // children = this.props.config.items.map((E, i) => {
      //     E.key = this.key + "-child-item-" + i;
      //     if (E.hasOwnProperty("xtype"))
      //         return Utils.createElement(E);
      //
      //     if ((typeof  E.$$typeof) == "symbol")
      //         return <React.Fragment key={E.key}>{E}</React.Fragment>;
      //
      //     return <E key={this.key + "-child-item-" + i}/>;
      // });


      let optionsHeader = this.props.options.optionsHeader || this.props.config.optionsHeader || {};
      let optionsTitle = this.props.options.optionsTitle || this.props.config.optionsTitle || {};
      let optionsBody = this.props.options.optionsBody || this.props.config.optionsBody || {};
      let optionsFooter = this.props.options.optionsFooter || this.props.config.optionsFooter || {}; //
      // delete this.props.options.optionsHeader;
      // delete this.props.options.optionsTitle;

      delete this.props.options.optionsBody; // delete this.props.options.optionsFooter;

      return React.createElement(Card, _extends({
        key: this.key + "-card"
      }, this.props.options), header ? React.createElement(CardHeader, _extends({
        key: this.key + "-card-header"
      }, optionsHeader), header) : "", title ? React.createElement(CardTitle, _extends({
        key: this.key + "-card-title"
      }, optionsTitle), title) : "", React.createElement(CardBody, _extends({
        key: this.key + "-card-body"
      }, optionsBody), children), footer ? React.createElement(CardFooter, _extends({
        key: this.key + "-card-footer"
      }, optionsFooter), footer) : "");
    }
  }]);

  return Panel;
}(React.Component), _class2.defaultProps = {
  config: {},
  options: {},
  optionsBody: {},
  optionsTitle: {},
  optionsHeader: {},
  optionsFooter: {},
  title: false,
  header: "Panel Title",
  footer: false,
  items: [],
  xtype: "panel"
}, _temp)) || _class;

export { Panel as default };
Panel.propTypes = {
  config: PropTypes.object.isRequired,
  title: PropTypes.any,
  header: PropTypes.any,
  // children: PropTypes.element,
  items: PropTypes.array,
  options: PropTypes.any
};