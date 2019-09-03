/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
// import React from "react";
import createClass from "create-react-class";
import ReactDOM from "react-dom";
import CAPFrameWork, {Xtypes} from "./Initialization";

// import {CapBaseStore as BaseStore} from "./Lib/CapBaseStore";

//React bileşenleri
// window.React = React;
// window.ReactCreateClass = createClass;
// window.ReactDOM = ReactDOM;

//Sistem araçları
//window.Utils = Util;
window.CAPFrameWork = CAPFrameWork;

// CAP.Log(BaseStore)

const CAP = CAPFrameWork;
const DataProxy = CAPFrameWork.Data.Proxy;
const BaseStore = CAPFrameWork.BaseStore;
const StoreManager = CAPFrameWork.Stores;

const BreadCrumb = CAPFrameWork.BreadCrumb;
const MessageBox = CAPFrameWork.MessageBox;
const ConfirmBox = CAPFrameWork.Message.Confirm;
const BaseController = CAPFrameWork.BaseController;
const Spinner = CAPFrameWork.Spinner;
const Grid = CAPFrameWork.Grid;
const Request = CAPFrameWork.Request;
const ClassNames = CAPFrameWork.ClassNames;
const Form = CAPFrameWork.Form;
const FormPanel = CAPFrameWork.FormPanel;
const View = CAPFrameWork.View.View;
const Panel = CAPFrameWork.Panel;
const Loadable = CAPFrameWork.Loadable;
const PropTypes = CAPFrameWork.PropTypes;
const Date = CAPFrameWork.Date;
const ShortId = CAPFrameWork.ShortId;
const Utils = CAPFrameWork.Utils;
const Button = CAPFrameWork.Form.Field.Button;
const AlertPanel = CAPFrameWork.AlertPanel;
const Raise = CAPFrameWork.Raise;
const Log = CAPFrameWork.Log;
const Logger = CAPFrameWork.Logger;
const Debug = CAPFrameWork.Debug;


export default {...CAPFrameWork};
export {
    CAP,
    DataProxy,
    BreadCrumb,
    MessageBox,
    ConfirmBox,
    BaseController,
    Date,
    Spinner,
    ShortId,
    Grid,
    Request,
    StoreManager,
    BaseStore,
    ClassNames,
    FormPanel,
    Panel,
    Form,
    AlertPanel,
    Button,
    Loadable,
    PropTypes,
    Xtypes,
    View,
    Utils,
    Raise,
    Log,
    Debug,
    Logger
}


