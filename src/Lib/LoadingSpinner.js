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
        return (<Spinner name={this.props.name} color={this.props.color} className={" margin-center "} />);


      return (<ProgressBar spinner={false} percent={this.loadPercent} autoIncrement={this.loadAutoIncrement}  intervalTime={this.loadIntervalTime}/>);


    }
  }
}