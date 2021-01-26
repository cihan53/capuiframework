/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";
import MobxReactForm from 'mobx-react-form';
import Loadable from 'react-loadable';
import moment from "moment";
import 'moment/locale/tr'
import classnames from "classnames";
import PropTypes from 'prop-types';
import Request from "./Lib/Request";
import FormPanel from "./Lib/CAP/Form/FormPanel";
import Panel from "./Lib/CAP/Panel/Panel";
import JsonSchemaEditor from "./Lib/CAP/Form/JsonSchemaEditor";
import Utils from "./Lib/CAP/Utils/Utils";
import DefaultController from "./Controller/DefaultController";
import Grid from "./Lib/CAP/Grid/Grid";
import StoreManager from "./Lib/StoreManager";
import Alert from "./Lib/CAP/Message/Alert";
import Confirm from "./Lib/CAP/Message/Confirm";
import Text from "./Lib/CAP/Form/Text";
import CapController from "./Lib/CapController";
import JsonInput from "./Lib/CAP/Form/JsonInput";
import ComboBox from "./Lib/CAP/Form/ComboBox";
import DropZone from "./Lib/CAP/Form/DropZone";
import CapException from "./Lib/CAP/Exception/CapException";
import Validator from "./Lib/CAP/Utils/Validator";
import ErrorBoundary from "./Lib/ErrorBoundary";
import BreadCrumb from "./Lib/CAP/Utils/BreadCrumb";
import Button from "./Lib/CAP/Form/Button";
import AlertPanel from "./Lib/CAP/Panel/AlertPanel";
import DatePicker from "./Lib/CAP/Form/DatePicker";
import BaseStore from "./Lib/CAP/Store/BaseStore"; // without this line it didn't work
import {DataProxy} from "./Lib/CAP/Data/DataProxy";
import View from "./View/View";
import LoadingSpinner from "./Lib/LoadingSpinner";
import Col from "./Lib/CAP/Layout/Col";
import SwitchField from "./Lib/CAP/Form/Switch";
import Row from "./Lib/CAP/Layout/Row";
import Select2 from "./Lib/CAP/Form/Select2";
import FormGroup from "./Lib/CAP/Form/FormGroup";
import ButtonGroup from "./Lib/CAP/Form/ButtonGroup";
import ButtonToolbar from "./Lib/CAP/Form/ButtonToolbar";
import Wizard from "./Lib/CAP/Panel/Wizard";
import Multiselect from "./Lib/CAP/Form/Multiselect";
import Modal from "./Lib/CAP/Panel/Modal/Modal";
import ModalHeader from "./Lib/CAP/Panel/Modal/ModalHeader";
import ModalBody from "./Lib/CAP/Panel/Modal/ModalBody";
import ModalFooter from "./Lib/CAP/Panel/Modal/ModalFooter";
import Nav from "./Lib/CAP/Nav/Nav";
import NavItem from "./Lib/CAP/Nav/NavItem";
import NavLink from "./Lib/CAP/Nav/NavLink";
import TabContent from "./Lib/CAP/TabPane/TabContent";
import TabPane from "./Lib/CAP/TabPane/TabPane";
import InputGroup from "./Lib/CAP/Form/InputGroup";


moment.locale('tr')

const BaseController = CapController;

window.moment = moment();


const CAPFrameWork = e => {

    return {
        BaseStore: BaseStore,
        Data: {
            Proxy: DataProxy
        },
        DefaultController: DefaultController,
        BaseController: BaseController,
        newInstance: async (className, type) => {
            //
            // let classNamePath = className;
            // let fn = await import(
            //     /* webpackMode: "lazy" */
            //     /* webpackChunkName: "${className}" */
            //     `@src/${classNamePath}`
            //     );
            //
            // console.log("newInstance ", fn );
            // type = type || "object";
            // var arr = className.split(".");
            //
            // let fn = (window || this);
            // let classNamePath = className.replace(".", "/");
            // let fn2 = await import(`$classNamePath`);
            //
            // console.log(fn2)
            // for (var i = 0, len = arr.length; i < len; i++) {
            //     fn = fn[arr[i]];
            // }
            //
            // if (typeof fn != type) {
            //     throw  new Error(type + " not found: " + className);
            // }
            return fn;
        },
        BreadCrumb: BreadCrumb,
        ClassNames: classnames,
        PropTypes: PropTypes,
        Utils: Utils,
        Request: Request,
        Date: moment,
        Loadable: Loadable,
        Formatter: {
            date: (date, format = "YYYY.MM.DD HH :mm:ss") => moment(date).format(format),
            duration: (duration, units = "minutes", format = "HH:mm:ss") => moment.duration(duration, units)
        },
        loadBar: Utils.Mask,
        toHtml: Utils.Parser,
        ShortId: Utils.ShortId,
        Stores: StoreManager,
        __t: Utils.Translate,
        MessageBox: Utils.Alert,
        Message: {
            Alert: Alert,
            Confirm: Confirm
        },
        Mask: Utils.Mask,
        Spinner: (props,options = {}) => <LoadingSpinner {...props} spinner={true}/>,
        Validator: Validator,
        Panel: (props, options = {}) => <Panel {...props} options={options}/>,
        Wizard: (props, options = {}) => <Wizard {...props}/>,
        Nav: (props, options = {}) => <Nav {...props}/>,
        NavItem: (props, options = {}) => <NavItem {...props}/>,
        NavLink: (props, options = {}) => <NavLink {...props}/>,

        /** TAB **/
        TabContent: (props, options = {}) => <TabContent {...props}/>,
        TabPane: (props, options = {}) => <TabPane {...props}/>,
        /**
         *
         * @param config
         * @returns {*}
         * @constructor
         */
        Grid: React.forwardRef((config, ref) => {
            return <Grid ref={ref} keyField={config.keyField} columns={config.columns} config={config}/>
        }),
        /**
         *
         * @type {{Field: {}}}
         */
        FormPanel: (props) => {
            return <FormPanel ref={props.ref || null} {...props}/>
        },
        AlertPanel: AlertPanel,
        Modal: (props, options = {}) => <Modal {...props}/>,
        ModalHeader: (props, options = {}) => <ModalHeader {...props}/>,
        ModalBody: (props, options = {}) => <ModalBody {...props}/>,
        ModalFooter: (props, options = {}) => <ModalFooter {...props}/>,
        Form: {
            // JsonSchemaEditor:  (props) => <JsonSchemaEditor {...props}/> ,
            JsonSchemaEditor: React.forwardRef((props, ref) => (
                <JsonSchemaEditor ref={ref} {...props}/>
            )),
            JsonInput: React.forwardRef((props, ref) => (
                <JsonInput ref={ref} {...props}/>
            )),
            form: MobxReactForm,
            Field: {
                base: {},
                FormGroup: FormGroup,
                InputGroup: InputGroup,
                Button: Button,
                ButtonGroup: ButtonGroup,
                ButtonToolbar: ButtonToolbar,

                // Field: Field,
                Number: {},
                Radio: {},
                Checkbox: {},
                SwitchField: React.forwardRef((props, ref) => (
                    <SwitchField ref={ref} {...props}/>
                )),
                Multiselect: (c) => <Multiselect {...c}/>,
                ComboBox: React.forwardRef((props, ref) => (
                    <ComboBox ref={ref} {...props}/>
                )),
                Select2: React.forwardRef((props, ref) => (
                    <Select2 ref={ref} {...props}/>
                )),
                // ComboBox: observer((props) => {
                //     return <ComboBox {...props}/>
                // }),
                DatePicker: DatePicker,
                Display: {},
                File: {},
                FileButton: {},
                Hidden: {},
                HtmlEditor: {},
                Picker: {},
                Spinner: {},
                Tag: {},
                // Text:React.forwardRef((props, ref) => (  <Text type={"text"} ref={ref} {...props}/> )), // observer((props) => <Field type={"text"} {...props}/>),
                Text: Text,
                TextArea: {},
                Time: {},
                DropZone: DropZone,
                JsonSchemaEditor: JsonSchemaEditor,


            }
        },
        View: {
            View: View,
            Col: Col,
            Row: Row
        },
        Log: console.log,
        Debug: console.debug,
        Logger: console,
        Raise: (name, e) => {
            throw new CapException(name, e);
        },
        ErrorBoundary: ErrorBoundary

    }
}


const Xtypes = {
    xpanel: CAPFrameWork().Panel,
    xwizard: CAPFrameWork().Wizard,
    xmask: CAPFrameWork().Mask,
    xmessagebox: CAPFrameWork().MessageBox,
    xformatter: CAPFrameWork().Formatter,
    xgrid: CAPFrameWork().Grid,
    xformpanel: CAPFrameWork().FormPanel,
    xform: CAPFrameWork().Form,
    xjsoneditor: CAPFrameWork().Form.JsonSchemaEditor,
    xfield: CAPFrameWork().Form.Field.Field,
    xnumberfield: CAPFrameWork().Form.Field.Number,
    xradiofield: CAPFrameWork().Form.Field.Radio,
    xcheckboxfield: CAPFrameWork().Form.Field.Checkbox,
    xcheckboxmultiselect: CAPFrameWork().Form.Field.CheckboxMultiSelect,
    xcomboxfield: CAPFrameWork().Form.Field.ComboBox,
    xswitchfield: CAPFrameWork().Form.Field.SwitchField,
    xdatefield: CAPFrameWork().Form.Field.Date,
    xdisplayfield: CAPFrameWork().Form.Field.Display,
    xfilefield: CAPFrameWork().Form.Field.File,
    xfilebuttonfield: CAPFrameWork().Form.Field.FileButton,
    xhiddenfield: CAPFrameWork().Form.Field.Hidden,
    xhtmleditorfield: CAPFrameWork().Form.Field.HtmlEditor,
    xpickerfield: CAPFrameWork().Form.Field.Picker,
    xspinnerfield: CAPFrameWork().Form.Field.Spinner,
    xjsoninputfield: CAPFrameWork().Form.Field.JsonInput,
    xtagfield: CAPFrameWork().Form.Field.Tag,
    xtextfield: CAPFrameWork().Form.Field.Text,
    xtextareafield: CAPFrameWork().Form.Field.TextArea,
    xtimefield: CAPFrameWork().Form.Field.Time,
    xdropzone: CAPFrameWork().Form.Field.Dropzone,
    xview: CAPFrameWork().View.View
};


export default {...CAPFrameWork()}
export {Xtypes}