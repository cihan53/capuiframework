function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";
import { observer } from "mobx-react/index";
import MobxReactForm from 'mobx-react-form';
import Loadable from 'react-loadable';
import moment from "moment";
import 'moment/locale/tr';
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
import Text from "./Lib/CAP/Form/Text";
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
import BaseStore from "./Lib/CAP/Store/BaseStore"; // without this line it didn't work

import { DataProxy } from "./Lib/CAP/Data/DataProxy";
import View from "./View/View";
import Mask from "./Lib/CAP/Utils/Mask";
import LoadingSpinner from "./Lib/LoadingSpinner";
import Col from "./Lib/CAP/Layout/Col";
import SwitchField from "./Lib/CAP/Form/Switch";
import Row from "./Lib/CAP/Layout/Row";
import Select2 from "./Lib/CAP/Form/Select2";
moment.locale('tr');
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
    Spinner: props => React.createElement(LoadingSpinner, _extends({}, props, {
      spinner: true
    })),
    Validator: Validator,
    Panel: (props, options = {}) => React.createElement(Panel, _extends({}, props, {
      options: options
    })),

    /**
     *
     * @param config
     * @returns {*}
     * @constructor
     */
    Grid: React.forwardRef((config, ref) => {
      return React.createElement(Grid, {
        ref: ref,
        keyField: config.keyField,
        columns: config.columns,
        config: config
      });
    }),

    /**
     *
     * @type {{Field: {}}}
     */
    FormPanel: props => {
      return React.createElement(FormPanel, _extends({
        ref: props.ref || null
      }, props));
    },
    AlertPanel: AlertPanel,
    Form: {
      // JsonSchemaEditor:  (props) => <JsonSchemaEditor {...props}/> ,
      JsonSchemaEditor: React.forwardRef((props, ref) => React.createElement(JsonSchemaEditor, _extends({
        ref: ref
      }, props))),
      JsonInput: React.forwardRef((props, ref) => React.createElement(JsonInput, _extends({
        ref: ref
      }, props))),
      form: MobxReactForm,
      Field: {
        base: {},
        Button: CButton,
        // Field: Field,
        Number: {},
        Radio: {},
        Checkbox: {},
        SwitchField: React.forwardRef((props, ref) => React.createElement(SwitchField, _extends({
          ref: ref
        }, props))),
        Multiselect: c => React.createElement(Multiselect, c),
        ComboBox: React.forwardRef((props, ref) => React.createElement(ComboBox, _extends({
          ref: ref
        }, props))),
        Select2: React.forwardRef((props, ref) => React.createElement(Select2, _extends({
          ref: ref
        }, props))),
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
        Text: React.forwardRef((props, ref) => React.createElement(Text, _extends({
          type: "text",
          ref: ref
        }, props))),
        // observer((props) => <Field type={"text"} {...props}/>),
        TextArea: {},
        Time: {},
        DropZone: DropZone,
        JsonSchemaEditor: JsonSchemaEditor
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
  };
};

const Xtypes = {
  xpanel: CAPFrameWork().Panel,
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
export default { ...CAPFrameWork()
};
export { Xtypes };