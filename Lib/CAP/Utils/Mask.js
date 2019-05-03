import React from "react";
import LoadingSpinner from "../../LoadingSpinner";
import ProgressBar from "react-progress-bar-plus";

const Mask = {
  show: function(spinner = false, percent = -1, autoIncrement = true, intervalTime = 200, container = ".notifications-wrapper") {
    console.log(document.querySelector(container))
    ReactDOM.render(<ProgressBar spinner={spinner} percent={percent} autoIncrement={autoIncrement} intervalTime={intervalTime}/>, document.querySelector(container));
  },
  hide: function(container = ".notifications-wrapper") {
    ReactDOM.render(<ProgressBar spinner={false} percent={0} autoIncrement={false} intervalTime={1}/>, document.querySelector(container));
  },
  mask: function() {
    return <LoadingSpinner spinner/>;
  }

};

export default Mask;