/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import Loadable from 'react-loadable';
import moment from "moment";
import classNames from "classnames";
import PropTypes from 'prop-types';
import Request from "./Lib/Request";
import FormPanel from "./Lib/CAP/Form/FormPanel";
import Panel from "./Lib/CAP/Panel/Panel";
import JsonEditorForm from "./Lib/CAP/Form/JsonEditorForm";
import Utils from "./Lib/CAP/Utils/Utils";
import DefaultController from "./Controller/DefaultController";
import Grid from "./Lib/CAP/Grid/Grid";
import StoreManager from "./Lib/StoreManager";
import Alert from "./Lib/CAP/Message/Alert";
import Confirm from "./Lib/CAP/Message/Confirm";
import Field from "./Lib/CAP/Form/Field";
import CapController from "./Lib/CapController";

const BaseController = CapController;


const CAPFrameWork = e => {
    return {
        DefaultController:DefaultController,
        BaseController: BaseController,
        classNames: classNames,
        PropTypes: PropTypes,
        Utils: Utils,
        Request: Request,
        Date: moment(),
        Loadable:Loadable,
        Formatter: {
            date: (date, format = "YYYY MM DD H:mm:ss") => moment(date).format(format),
            duration: (duration, units = "minutes", format = "H:mm:ss") => moment.duration(duration, units)
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
        Spinner: Utils.Mask.mask,
        Validator: {},
        Panel: (config, options = {}) => <Panel config={config} options={options}/>,
        /**
         *
         * @param config
         * @returns {*}
         * @constructor
         */
        Grid: (config) => <Grid key={Utils.ShortId.generate()} config={config}/>,
        /**
         *
         * @type {{Field: {}}}
         */
        FormPanel: (props) => <FormPanel {...props}/>,
        Form: {
            JsonEditor: (props) => <JsonEditorForm {...props}/>,
            Panel: {},
            Field: {
                base: {},
                Field: Field,
                Number: {},
                Radio: {},
                Checkbox: {},
                ComboBox: {},
                Date: {},
                Display: {},
                File: {},
                FileButton: {},
                Hidden: {},
                HtmlEditor: {},
                Picker: {},
                Spinner: {},
                Tag: {},
                Text: (config) => <Field type={"text"} {...config}/>,
                TextArea: {},
                Time: {}
            }
        },
        Log: console.log
    }
}

export default {...CAPFrameWork() }