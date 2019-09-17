/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
// import React from "react";
import createClass from "create-react-class";
import ReactDOM from "react-dom";
import CAPFrameWork, { Xtypes } from "./Initialization"; // import {CapBaseStore as BaseStore} from "./Lib/CapBaseStore";
//React bileşenleri
// window.React = React;
// window.ReactCreateClass = createClass;
// window.ReactDOM = ReactDOM;
//Sistem araçları
//window.Utils = Util;

window.CAPFrameWork = CAPFrameWork; // CAP.Log(BaseStore)

const CAP = CAPFrameWork;
const DataProxy = CAPFrameWork.Data.Proxy;
const BaseStore = CAPFrameWork.BaseStore;
const StoreManager = CAPFrameWork.Stores;
const BreadCrumb = CAPFrameWork.BreadCrumb;
const ClassNames = CAPFrameWork.ClassNames;
const BaseController = CAPFrameWork.BaseController;
/**
 *
 * @type {Mask}
 */

const Mask = CAPFrameWork.Mask;
const Spinner = CAPFrameWork.Spinner;
/**
 *
 * @type {React.ComponentType<{} & React.ClassAttributes<unknown>>}
 */

const Grid = CAPFrameWork.Grid;
/**
 *
 * @type {{postMultiPart, postJson, post, get, del, deadline, postForm, timeout, put}}
 */

const Request = CAPFrameWork.Request;
/**
 *
 */

const MessageBox = CAPFrameWork.MessageBox;
const ConfirmBox = CAPFrameWork.Message.Confirm;
/**
 *
 * @type {Form|{Field, JsonInput, form, JsonSchemaEditor}}
 */

const Form = CAPFrameWork.Form;
const FormPanel = CAPFrameWork.FormPanel;
const FormField = Form.Field;
const Button = CAPFrameWork.Form.Field.Button;
/**
 * Action View
 * @type {View}
 */

const View = CAPFrameWork.View.View;
const Col = CAPFrameWork.View.Col;
/**
 *
 * @type {Panel}
 */

const Panel = CAPFrameWork.Panel;
const AlertPanel = CAPFrameWork.AlertPanel;
const Loadable = CAPFrameWork.Loadable;
/**
 *
 * @type {{oneOfType, symbol, bool, string, shape, arrayOf, any, instanceOf, number, node, objectOf, oneOf, func, array, exact, elementType, object, element}|{oneOfType, symbol, checkPropTypes, bool, string, shape, arrayOf, any, instanceOf, number, node, objectOf, oneOf, func, array, exact, resetWarningCache, elementType, object, element}}
 */

const PropTypes = CAPFrameWork.PropTypes;
/**
 *
 * @type {moment | ((inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean) => moment.Moment) | ((inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean) => moment.Moment)}
 */

const Date = CAPFrameWork.Date;
const ShortId = CAPFrameWork.ShortId;
/**
 *
 * @type {{[p: string]: *}}
 */

const Utils = CAPFrameWork.Utils;
/**
 *
 * @type {Raise}
 */

const Raise = CAPFrameWork.Raise;
const Log = CAPFrameWork.Log;
const Logger = CAPFrameWork.Logger;
const Debug = CAPFrameWork.Debug;
export default { ...CAPFrameWork
};
export { CAP, DataProxy, BreadCrumb, MessageBox, ConfirmBox, BaseController, Date, Mask, Spinner, ShortId, Grid, Request, StoreManager, BaseStore, ClassNames, FormPanel, Panel, Form, FormField, AlertPanel, Button, Loadable, PropTypes, Xtypes, View, Col, Utils, Raise, Log, Debug, Logger };