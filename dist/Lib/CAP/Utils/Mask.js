import React from "react";
import ReactDOM from 'react-dom';
import LoadingSpinner from "../../LoadingSpinner";
import ProgressBar from "react-progress-bar-plus";
const Mask = {
  show: function (spinner = false, percent = -1, autoIncrement = true, intervalTime = 200, container = ".notifications-wrapper") {
    ReactDOM.render(React.createElement(ProgressBar, {
      spinner: spinner,
      percent: percent,
      autoIncrement: autoIncrement,
      intervalTime: intervalTime
    }), document.querySelector(container));
  },
  hide: function (container = ".notifications-wrapper") {
    ReactDOM.render(React.createElement(ProgressBar, {
      spinner: false,
      percent: 0,
      autoIncrement: false,
      intervalTime: 1
    }), document.querySelector(container));
  },
  mask: function (name = "cube-grid", color = "") {
    return React.createElement(LoadingSpinner, {
      spinner: true,
      name: name.toString(),
      color: color.toString()
    });
  }
};
export default Mask;