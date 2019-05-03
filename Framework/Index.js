/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";
import createClass from "create-react-class";
import ReactDOM from "react-dom";
import CAPFrameWork from "./Initialization";
import BaseStore from "./Lib/CAP/Store/BaseStore";
// import {CapBaseStore as BaseStore} from "./Lib/CapBaseStore";

//React bileşenleri
window.React = React;
window.ReactCreateClass = createClass;
window.ReactDOM = ReactDOM;

//Sistem araçları
//window.Utils = Util;
window.CAPFrameWork = CAPFrameWork;

// console.log(BaseStore)

const CAP = CAPFrameWork;
const MessageBox = CAPFrameWork.MessageBox;
const BaseController = CAPFrameWork.BaseController;
const Spinner = CAPFrameWork.Spinner;
const Grid = CAPFrameWork.Grid;
const Request = CAPFrameWork.Request;
const ClassNames = CAPFrameWork.classNames;
const Form = CAPFrameWork.Form;
const Loadable = CAPFrameWork.Loadable;
const PropTypes = CAPFrameWork.PropTypes;
const Date = CAPFrameWork.Date;
const ShortId = CAPFrameWork.ShortId;
// const BaseStore= BaseStore;
// const BaseStore= BaseStore;
// //Jquery
// window.$ = require("jquery");
// window.jQuery = require("jquery");

// const BaseStore = CapBaseStore;
export default {...CAPFrameWork};
// export {BaseStore};
export {CAP,MessageBox,BaseController,Date,Spinner,ShortId,Grid,Request,BaseStore,ClassNames,Form,Loadable,PropTypes}


