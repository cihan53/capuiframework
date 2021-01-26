/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
// import React from "react";
import CAPFrameWork, {Xtypes} from "./Initialization";

//React bileşenleri

window.CAPFrameWork = CAPFrameWork;
const CAP = CAPFrameWork;
const DataProxy = CAPFrameWork.Data.Proxy;
const BaseStore = CAPFrameWork.BaseStore;
const StoreManager = CAPFrameWork.Stores;

const BreadCrumb = CAPFrameWork.BreadCrumb;
const ClassNames = CAPFrameWork.ClassNames

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
const SwitchField = Form.Field.SwitchField;
const FormGroup = Form.Field.FormGroup;
const InputGroup = Form.Field.InputGroup;
const Button = Form.Field.Button;
const ButtonGroup = Form.Field.ButtonGroup;
const ButtonToolbar = Form.Field.ButtonToolbar;
const Multiselect = Form.Field.Multiselect;
const ComboBox = Form.Field.ComboBox;
const TextField = Form.Field.Text;
const DatePicker = Form.Field.DatePicker;
/**
 * Action View
 * @type {View}
 */
const View = CAPFrameWork.View.View;
const Col = CAPFrameWork.View.Col;
const Row = CAPFrameWork.View.Row;
/**
 *
 * @type {Panel}
 */
const Panel = CAPFrameWork.Panel;
const Wizard = CAPFrameWork.Wizard;
const Modal = CAPFrameWork.Modal;
const ModalHeader = CAPFrameWork.ModalHeader;
const ModalBody = CAPFrameWork.ModalBody;
const ModalFooter = CAPFrameWork.ModalFooter;
const AlertPanel = CAPFrameWork.AlertPanel;
const Loadable = CAPFrameWork.Loadable;

/**
 * @type Tab
 */
const TabContent = CAPFrameWork.TabContent;
const TabPane = CAPFrameWork.TabPane;
/**
 * @type Nav
 */
const Nav = CAPFrameWork.Nav;
const NavItem = CAPFrameWork.NavItem;
const NavLink = CAPFrameWork.NavLink;

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


export default {...CAPFrameWork};
export {
    CAP,
    DataProxy,
    BreadCrumb,
    MessageBox,
    ConfirmBox,
    BaseController,
    Date,
    Mask,
    Spinner,
    ShortId,
    Grid,
    Request,
    StoreManager,
    BaseStore,
    ClassNames,
    FormPanel,
    Panel,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Wizard,
    TabPane,
    TabContent,
    Nav,
    NavItem,
    NavLink,
    Form,
    FormField,
    SwitchField,
    FormGroup,
    InputGroup,
    ComboBox,
    Multiselect,
    DatePicker,
    TextField,
    AlertPanel,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Loadable,
    PropTypes,
    Xtypes,
    View,
    Col,
    Row,
    Utils,
    Raise,
    Log,
    Debug,
    Logger
}


