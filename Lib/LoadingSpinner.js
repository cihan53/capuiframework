/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";

import { Card, CardBody } from "reactstrap";
import ProgressBar from "react-progress-bar-plus";
var Spinner = require('react-spinkit');


export default class LoadingSpinner extends React.Component {

  loadPercent = 100;
  loadAutoIncrement = true;
  loadIntervalTime = 300;

  componentWillMount() {
    // CAP.Stores.get("CommonStore").setLoadAutoIncrement(true)
  }

  componentWillUnmount() {
    //CAP.Stores.get("CommonStore").setLoadPercent(100)
  }


  render() {


    if (this.props.error) {
      console.debug("Loading Error:", this.props.error);
      return (<React.Fragment><Card className="text-white bg-danger text-center">
        <CardBody>
          <blockquote className="card-bodyquote">
            <p>{this.props.error.toString()}</p>
          </blockquote>
        </CardBody>
      </Card></React.Fragment>);
    } else {
      if (this.props.spinner)
        return (<Spinner name="ball-grid-pulse" className={" margin-center "} />);
        // return (
        //   <div className="loading-spinner" style={style}>
        //     <style>
        //       {`@keyframes loading-spinner {
        //           0% { transform : rotate(0deg); }
        //           100% { transform : rotate(360deg); }
        //         }`}
        //     </style>
        //   </div>
        // );

      return (<ProgressBar spinner={false} percent={this.loadPercent} autoIncrement={this.loadAutoIncrement}
                           intervalTime={this.loadIntervalTime}/>);


    }
  }
}