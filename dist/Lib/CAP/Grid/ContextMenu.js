function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from "react";
import Utils from "../Utils/Utils";

let ContextMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ContextMenu, _React$Component);

  function ContextMenu(...args) {
    var _this;

    _classCallCheck(this, ContextMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContextMenu).call(this, ...args));
    _this.state = {
      visible: false
    };

    _this._handleContextMenu = (event, field = null, data = null) => {
      event.preventDefault();

      _this.setState({
        visible: true,
        field: field,
        target: data
      });

      const clickX = event.clientX;
      const clickY = event.clientY;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const rootW = _this.root.offsetWidth;
      const rootH = _this.root.offsetHeight;
      const right = screenW - clickX > rootW;
      const left = !right;
      const top = screenH - clickY > rootH;
      const bottom = !top;

      if (right) {
        _this.root.style.left = `${clickX + 5}px`;
      }

      if (left) {
        _this.root.style.left = `${clickX - rootW - 5}px`;
      }

      if (top) {
        _this.root.style.top = `${clickY + 5}px`;
      }

      if (bottom) {
        _this.root.style.top = `${clickY - rootH - 5}px`;
      }
    };

    _this._handleClick = event => {
      const {
        visible
      } = _this.state;
      const wasOutside = !(event.target.contains === _this.root);

      if (wasOutside && visible) {
        _this.setState({
          visible: false
        });
      }
    };

    _this._handleScroll = () => {
      const {
        visible
      } = _this.state;
      if (visible) _this.setState({
        visible: false
      });
    };

    _this.show = (event, field, data) => {
      //this.setState({visible:visible});
      _this._handleContextMenu(event, field, data);
    };

    return _this;
  }

  _createClass(ContextMenu, [{
    key: "UNSAFE_componentDidMount",
    value: function UNSAFE_componentDidMount() {
      // document.addEventListener("contextmenu", this._handleContextMenu);
      if (document.getElementById(this.props.container)) {
        document.getElementById(this.props.container).addEventListener("click", this._handleClick);
        document.getElementById(this.props.container).addEventListener("scroll", this._handleScroll);
      }
    }
  }, {
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(nextProps, nextState) {
      if (document.getElementById(this.props.container)) {
        document.getElementById(this.props.container).addEventListener("click", this._handleClick);
        document.getElementById(this.props.container).addEventListener("scroll", this._handleScroll);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // document.removeEventListener("contextmenu", this._handleContextMenu);
      if (document.getElementById(this.props.container)) {
        document.getElementById(this.props.container).removeEventListener("click", this._handleClick);
        document.getElementById(this.props.container).removeEventListener("scroll", this._handleScroll);
      }
    }
  }, {
    key: "clickItem",
    value: function clickItem(type, event) {
      this.props.clickItem(type, this.state);
      if (this.state.visible) this.setState({
        visible: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      const {
        visible
      } = this.state;
      let disabled = " contextMenu--option__disabled";

      if (!Utils.isEmpty(this.state.target)) {
        disabled = "";
      }

      return React.createElement(React.Fragment, null, React.createElement("div", {
        style: {
          "display": visible ? "block" : "none"
        },
        ref: ref => {
          this.root = ref;
        },
        className: "contextMenu"
      }, React.createElement("div", {
        className: "contextMenu--label"
      }, Utils.__t("Filtre: ':data'", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--separator"
      }), React.createElement("div", {
        className: "contextMenu--option",
        onClick: event => this.clickItem("eq", event)
      }, Utils.__t("Eşit (=':data')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option",
        onClick: event => this.clickItem("noteq", event)
      }, Utils.__t("Eşit Değil (!=':data')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option",
        onClick: event => this.clickItem("startWith", event)
      }, Utils.__t("Başlayan (like '%:data')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option",
        onClick: event => this.clickItem("endWith", event)
      }, Utils.__t("Biten (like ':data%')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option",
        onClick: event => this.clickItem("contains", event)
      }, Utils.__t("İçeren (like '%:data%')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option",
        onClick: event => this.clickItem("not-contains", event)
      }, Utils.__t("İçermeyen (not like '%:data%')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option" + disabled,
        onClick: event => this.clickItem("gt", event)
      }, Utils.__t("Büyük (> ':data')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option" + disabled,
        onClick: event => this.clickItem("gte", event)
      }, Utils.__t("Büyük Eşit (>= ':data')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option" + disabled,
        onClick: event => this.clickItem("lt", event)
      }, Utils.__t("Küçük (< ':data')", {
        data: this.state.target
      })), React.createElement("div", {
        className: "contextMenu--option" + disabled,
        onClick: event => this.clickItem("lte", event)
      }, Utils.__t("Küçük Eşit (<= ':data')", {
        data: this.state.target
      }))));
    }
  }]);

  return ContextMenu;
}(React.Component);

export { ContextMenu as default };