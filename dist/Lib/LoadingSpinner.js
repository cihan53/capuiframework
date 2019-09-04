function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from "react";
import { Card, CardBody } from "reactstrap";
import ProgressBar from "react-progress-bar-plus";

var Spinner = require('react-spinkit');

let LoadingSpinner = function (_React$Component) {
  _inherits(LoadingSpinner, _React$Component);

  function LoadingSpinner(...args) {
    var _this;

    _classCallCheck(this, LoadingSpinner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoadingSpinner).call(this, ...args));
    _this.loadPercent = 100;
    _this.loadAutoIncrement = true;
    _this.loadIntervalTime = 300;
    return _this;
  }

  _createClass(LoadingSpinner, [{
    key: "render",
    value: function render() {
      if (this.props.error) {
        console.debug("Loading Error:", this.props.error);
        return React.createElement(React.Fragment, null, React.createElement(Card, {
          className: "text-white bg-danger text-center"
        }, React.createElement(CardBody, null, React.createElement("blockquote", {
          className: "card-bodyquote"
        }, React.createElement("p", null, this.props.error.toString())))));
      } else {
        if (this.props.spinner) return React.createElement(Spinner, {
          name: this.props.name,
          color: this.props.color,
          className: " margin-center "
        });
        return React.createElement(ProgressBar, {
          spinner: false,
          percent: this.loadPercent,
          autoIncrement: this.loadAutoIncrement,
          intervalTime: this.loadIntervalTime
        });
      }
    }
  }]);

  return LoadingSpinner;
}(React.Component);

export { LoadingSpinner as default };