function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import DataProxy from "./DataProxy";

let WebStocket =
/*#__PURE__*/
function (_DataProxy) {
  _inherits(WebStocket, _DataProxy);

  function WebStocket() {
    _classCallCheck(this, WebStocket);

    return _possibleConstructorReturn(this, _getPrototypeOf(WebStocket).apply(this, arguments));
  }

  _createClass(WebStocket, [{
    key: "get",
    value: function get(key, db = "rgl-8") {
      let ls = {};

      if (global.localStorage) {
        try {
          ls = JSON.parse(global.localStorage.getItem(db)) || {};
        } catch (e) {
          /*Ignore*/
        }
      }

      return ls[key];
    }
  }, {
    key: "read",
    value: function read(db = "rgl-8") {
      let ls = {};

      if (global.localStorage) {
        try {
          ls = JSON.parse(global.localStorage.getItem(key)) || {};
        } catch (e) {
          /*Ignore*/
        }
      }

      return ls;
    }
  }, {
    key: "save",
    value: function save(key, value, db = "rgl-8") {
      if (global.localStorage) {
        global.localStorage.setItem("rgl-8", JSON.stringify({
          [key]: value
        }));
      }
    }
  }]);

  return WebStocket;
}(DataProxy);