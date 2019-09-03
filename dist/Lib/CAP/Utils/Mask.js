function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from "react";
import ReactDOM from 'react-dom';
import LoadingSpinner from "../../LoadingSpinner";
import ProgressBar from "react-progress-bar-plus";
const notificationWrapper = document.querySelector('notifications-wrapper');

let Mask =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Mask, _React$Component);

  function Mask(props) {
    var _this;

    _classCallCheck(this, Mask);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mask).call(this, props));

    _this.show = (spinner = false, percent = -1, autoIncrement = true, intervalTime = 200, container = ".notifications-wrapper") => {
      _this.setState({
        mask: React.createElement(ProgressBar, {
          spinner: spinner,
          percent: percent,
          autoIncrement: autoIncrement,
          intervalTime: intervalTime
        })
      });
    };

    _this.hide = (container = ".notifications-wrapper") => {
      _this.setState({
        mask: React.createElement(ProgressBar, {
          spinner: false,
          percent: 0,
          autoIncrement: false,
          intervalTime: 1
        })
      }); // ReactDOM.render(<ProgressBar spinner={false} percent={0} autoIncrement={false} intervalTime={1}/>, document.querySelector(container));

    };

    _this.mask = (name = "cube-grid", color = "") => {
      _this.setState({
        mask: React.createElement(LoadingSpinner, {
          spinner: true,
          name: name.toString(),
          color: color.toString()
        })
      });
    };

    _this.el = document.createElement('div');
    _this.state = {
      mask: ""
    };
    return _this;
  }

  _createClass(Mask, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // The portal element is inserted in the DOM tree after
      // the Modal's children are mounted, meaning that children
      // will be mounted on a detached DOM node. If a child
      // component requires to be attached to the DOM tree
      // immediately when mounted, for example to measure a
      // DOM node, or uses 'autoFocus' in a descendant, add
      // state to Modal and only render the children when Modal
      // is inserted in the DOM tree.
      notificationWrapper.appendChild(this.el);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      notificationWrapper.removeChild(this.el);
    }
  }, {
    key: "render",
    value: function render() {
      return ReactDOM.createPortal(this.state.mask, this.el);
    }
  }]);

  return Mask;
}(React.Component);
/**
 * http://kyleamathews.github.io/react-spinkit/
 Spinkit Spinners
 <Spinner name="circle" />
 <Spinner name="circle" color="steelblue"/>



 <Spinner name="cube-grid" />
 <Spinner name="cube-grid" color="blue"/>



 <Spinner name="wave" />
 <Spinner name="wave" color="purple"/>



 <Spinner name="folding-cube" />
 <Spinner name="folding-cube" color="purple"/>



 <Spinner name="three-bounce" />
 <Spinner name="three-bounce" color="steelblue"/>



 <Spinner name="double-bounce" />
 <Spinner name="double-bounce" color="coral"/>



 <Spinner name="wandering-cubes" />
 <Spinner name="wandering-cubes" color="goldenrod"/>



 <Spinner name="chasing-dots" />
 <Spinner name="chasing-dots" color="purple"/>



 <Spinner name="rotating-plane" />
 <Spinner name="rotating-plane" color="red"/>



 <Spinner name="pulse" />
 <Spinner name="pulse" color="aqua"/>



 <Spinner name="wordpress" />
 <Spinner name="wordpress" color="orange"/>



 loaders.css Spinners
 (not all of these center here, but are easily centerable with flexbox)
 <Spinner name="ball-grid-beat" />
 <Spinner name="ball-grid-beat" color="orange"/>



 <Spinner name="ball-grid-pulse" />
 <Spinner name="ball-grid-pulse" color="olive"/>



 <Spinner name="line-spin-fade-loader" />
 <Spinner name="line-spin-fade-loader" color="green"/>



 <Spinner name="ball-spin-fade-loader" />
 <Spinner name="ball-spin-fade-loader" color="fuchsia"/>



 <Spinner name="ball-pulse-rise" />
 <Spinner name="ball-pulse-rise" color="fuchsia"/>



 <Spinner name="line-scale" />
 <Spinner name="line-scale" color="steelblue"/>



 <Spinner name="line-scale-pulse-out" />
 <Spinner name="line-scale-pulse-out" color="coral"/>



 <Spinner name="line-scale-pulse-out-rapid" />
 <Spinner name="line-scale-pulse-out-rapid" color="fuchsia"/>



 <Spinner name="pacman" />
 <Spinner name="pacman" color="fuchsia"/>



 <Spinner name="line-scale-party" />
 <Spinner name="line-scale-party" color="steelblue"/>



 <Spinner name="ball-triangle-path" />
 <Spinner name="ball-triangle-path" color="coral"/>



 <Spinner name="ball-scale-multiple" />
 <Spinner name="ball-scale-multiple" color="orange"/>



 <Spinner name="ball-scale-ripple-multiple" />
 <Spinner name="ball-scale-ripple-multiple" color="orange"/>



 <Spinner name="ball-pulse-sync" />
 <Spinner name="ball-pulse-sync" color="steelblue"/>



 <Spinner name="ball-beat" />
 <Spinner name="ball-beat" color="red"/>



 <Spinner name="ball-zig-zag" />
 <Spinner name="ball-zig-zag" color="olive"/>



 <Spinner name="ball-zig-zag-deflect" />
 <Spinner name="ball-zig-zag-deflect" color="fuchsia"/>



 <Spinner name="ball-clip-rotate-pulse" />
 <Spinner name="ball-clip-rotate-pulse" color="blue"/>



 <Spinner name="ball-clip-rotate-multiple" />
 <Spinner name="ball-clip-rotate-multiple" color="green"/>



 <Spinner name="ball-clip-rotate" />
 <Spinner name="ball-clip-rotate" color="green"/>



 <Spinner name="ball-scale-ripple" />
 <Spinner name="ball-scale-ripple" color="goldenrod"/>



 <Spinner name="triangle-skew-spin" />
 <Spinner name="triangle-skew-spin" color="green"/>



 Spinner Options
 <Spinner name="wordpress" fadeIn="none" />



 <Spinner name="wordpress" fadeIn="quarter" />



 <Spinner name="wordpress" fadeIn="half" />



 <Spinner name="wordpress" overrideSpinnerClassName="my-class-to-override" />



 <Spinner name="wordpress" className="my-class" />



 <Spinner name="wordpress" color="green" />
 * @returns {*}
 */


Mask.defaultProps = {
  type: 'mask'
};
export default Mask;