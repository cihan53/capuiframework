/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {observer} from "mobx-react/index";
import PropTypes from "prop-types";
import {Col, FormFeedback, FormGroup, Input, Label, FormText} from "reactstrap";
import Utils from "../Utils/Utils";
import StoreManager from "../../StoreManager";


@observer
export default class ComboBox extends React.Component {

    static defaultProps = {
        id: Utils.ShortId.generate(),
        inputName: "",
        label: "",
        defaultValue: "",
        placeholder: "",
        allowBlank: true,
        rule: null,
        addon: true,
        layout: "row", // inline | row,
        store: null,
        options: {
            validateClass: "danger",
            col: "10",
            labelCol: "2",
            type: "input"
        }
    };

    autoload = true;
    data = [];

    constructor(props) {
        super(props);

        this.state = {
            selected: {}
        }


        this.store = null;
        this.key = this.props.key || Utils.ShortId.generate();
        this.generateItems = this.generateItems.bind(this);
        this.init()
        this.load = this.load.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.onChange = this.onChange.bind(this);
        this.selectField = React.createRef();

    }

    init() {

        if (this.props.store) {
            if (typeof this.props.store == "string") {
                this.store = StoreManager.get(this.props.store) || null;
            } else {
                let storeName = this.props.store.name;
                let baseParams = this.props.store.baseParams || null;
                let defaultSort = this.props.store.defaultSort || null;
                this.store = StoreManager.get(storeName) || null;
                if (this.store && baseParams)
                    this.store.setParameters(baseParams);

                if (this.store && defaultSort) {
                    this.store.setDefaultSortDir(defaultSort.dir, defaultSort.sort);
                }
            }


            if (!this.store)
                throw new Error(Utils.__t("Data Store Tanımsız"));


            this.autoload = this.props.hasOwnProperty('autoload') ? this.props.autoload : true;
        }

    }

    UNSAFE_componentWillMount() {
        const currentIndex = 0;
        if (this.store && this.autoload)
            this.load()
    }

    /**
     *
     * @returns {void|any}
     */
    load() {
        return this.props.store.load ? this.props.store.load(this) : this.store.load();
    }

    /**
     *
     * @param event
     */
    onChange(event) {
        if (this.props.hasOwnProperty("onChange"))
            this.props.onChange(event,this);

        this.setState({selected: event.target.selected});
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    generateItems(data) {

        if (this.store) {
            return data.map((opt, index) => {
                return <option key={this.key + "-combobox-item-" + index}
                               value={opt[this.props.valueField]}>{opt[this.props.displayField]}</option>
            });
        } else {
            return data.map((opt, index) => {
                return <option key={this.key + "-combobox-item-" + index} value={opt.value}>{opt.name}</option>
            });
        }

    }


    getSelected() {
        return this.state.selected
    }


    getValue() {
        return this.state.selected
    }

    render() {


        let valid = false;
        let invalid = false;
        let config = this.props;
        let errorMessage = this.state.error;

        if (config.allowBlank) {
            valid = false;
            invalid = false;
        }
        // let allowedProps =["defaultValue","valid","invalid","type","name","id","placeholder"];


        let input = null;
        let optionItems = this.generateItems(this.store ? this.store.data : config.items);

        if (config.store == null) {
            input = <Input ref={this.selectField}
                           defaultValue={config.defaultValue}
                           valid={valid}
                           invalid={invalid}
                           type={"select"}
                           default
                           name={config.inputName}
                           id={config.id || this.key}
                           placeholder={config.placeholder}
                           onChange={this.onChange}
            >
                <option value={""}>{Utils.__t("Seçiniz")}</option>
                {optionItems}
            </Input>;
        } else {


            input = <Input ref={this.selectField}
                           defaultValue={config.defaultValue || ""}
                           valid={valid}
                           invalid={invalid}
                           type={"select"}
                           default
                           name={config.inputName}
                           id={config.id || config.inputName + "-form-field"}
                           //value={this.store.Attributes[config.valueField]}
                           // value={this.state.selected}
                           placeholder={config.placeholder}
                           onChange={this.onChange}
            >
                <option value={""}>{Utils.__t("Seçiniz")}</option>
                {optionItems}</Input>
        }


        if (config.layout == "row")
            input = <Col sm={config.options.col}>{input}</Col>;


        return <FormGroup row={config.layout == "row"}>
            {config.label && config.layout != "row" ? <Label htmlFor={config.id || config.inputName + "-form-field"}>{config.label}</Label> : ""}
            {config.label && config.layout == "row" ? <Label htmlFor={config.id || config.inputName + "-form-field"} sm={config.options.labelCol}>{config.label}</Label> : ""}
            {input}
            {errorMessage ? <FormFeedback valid tooltip>{errorMessage}</FormFeedback> : void (0)}
            {config.text && config.text != "" ? <FormText>{config.text}</FormText> : void (0)}
        </FormGroup>;
    }
}


ComboBox.propTypes = {
    valueField: PropTypes.string.isRequired,
    displayField: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    options: PropTypes.any,
    // data: PropTypes.any.required,
};