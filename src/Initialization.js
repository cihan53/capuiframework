/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";

import {observer} from "mobx-react/index";
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
import Field from "./Lib/CAP/Form/Field";
import CapController from "./Lib/CapController";
import JsonInput from "./Lib/CAP/Form/JsonInput";
import ComboBox from "./Lib/CAP/Form/ComboBox";
import DropZone from "./Lib/CAP/Form/DropZone";
import Multiselect from "react-bootstrap-multiselect";
import CapException from "./Lib/CAP/Exception/CapException";
import Validator from "./Lib/CAP/Utils/Validator";
import ErrorBoundary from "./Lib/ErrorBoundary";
import BreadCrumb from "./Lib/CAP/Utils/BreadCrumb";
import CButton from "./Lib/CAP/Form/Button";
import AlertPanel from "./Lib/CAP/Panel/AlertPanel";
import DatePicker from "./Lib/CAP/Form/DatePicker";
import BaseStore from "./Lib/CAP/Store/BaseStore";  // without this line it didn't work
import {DataProxy} from "./Lib/CAP/Data/DataProxy";
import View from "./View/View";
import Mask from "./Lib/CAP/Utils/Mask";
import LoadingSpinner from "./Lib/LoadingSpinner";


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
        BreadCrumb: BreadCrumb,
        ClassNames: classnames,
        PropTypes: PropTypes,
        Utils: Utils,
        Request: Request,
        Date: moment,
        Loadable: Loadable,
        Formatter: {
            date: (date, format = "YYYY.MM.DD HH:mm:ss") => moment(date).format(format),
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
        Spinner: (props) => <LoadingSpinner {...props} spinner={true} />,
        Validator: Validator,
        Panel: (props, options = {}) => <Panel {...props} options={options}/>,
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
                Button: CButton,
                Field: Field,
                Number: {},
                Radio: {},
                Checkbox: {},
                Multiselect: (c) => <Multiselect {...c}/>,
                ComboBox: observer((props) => {
                    return <ComboBox {...props}/>
                }),
                DatePicker: DatePicker,
                Display: {},
                File: {},
                FileButton: {},
                Hidden: {},
                HtmlEditor: {},
                Picker: {},
                Spinner: {},
                Tag: {},
                Text: observer((props) => <Field type={"text"} {...props}/>),
                TextArea: {},
                Time: {},
                DropZone: DropZone,
                JsonSchemaEditor: JsonSchemaEditor,


            }
        },
        View: {
            View: View
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
    xmask: CAPFrameWork().Mask,
    xmessagebox: CAPFrameWork().MessageBox,
    xformatter: CAPFrameWork().Formatter,
    xgrid: CAPFrameWork().Grid,
    xformpanel: CAPFrameWork().FormPanel,
    xform: CAPFrameWork().Form,
    xjsoneditor: CAPFrameWork().Form.JsonSchemaEditor,
    xfield: Field,
    xnumberfield: CAPFrameWork().Form.Field.Number,
    xradiofield: CAPFrameWork().Form.Field.Radio,
    xcheckboxfield: CAPFrameWork().Form.Field.Checkbox,
    xcheckboxmultiselect: CAPFrameWork().Form.Field.CheckboxMultiSelect,
    xcomboxfield: CAPFrameWork().Form.Field.ComboBox,
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
}


export default {...CAPFrameWork()}
export {Xtypes}