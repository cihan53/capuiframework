import React from "react";
import LoadingSpinner from "../../LoadingSpinner";
import ProgressBar from "react-progress-bar-plus";

const Mask = {
  show: function(spinner = false, percent = -1, autoIncrement = true, intervalTime = 200, container = ".notifications-wrapper") {
    ReactDOM.render(<ProgressBar spinner={spinner} percent={percent} autoIncrement={autoIncrement} intervalTime={intervalTime}/>, document.querySelector(container));
  },
  hide: function(container = ".notifications-wrapper") {
    ReactDOM.render(<ProgressBar spinner={false} percent={0} autoIncrement={false} intervalTime={1}/>, document.querySelector(container));
  },
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
  mask: function(name="cube-grid" ,color="") {
    return <LoadingSpinner spinner name={name}  color={color}/>;
  }

};

export default Mask;