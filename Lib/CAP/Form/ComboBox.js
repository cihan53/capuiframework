/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {observer} from "mobx-react/index";
import PropTypes from "prop-types";
import {Col, FormFeedback, FormGroup, Input, Label, FormText} from "reactstrap";
import Field from "./Field";
import Utils from "../Utils/Utils";
import StoreManager from "../../StoreManager";


@observer
export default class ComboBox extends Field {

    autoload = true;

    constructor(props) {
        super(props);

        this.store = null;

        this.key = this.props.key || Utils.ShortId.generate();

        this.init()
    }

    init() {

        if (this.props.store) {
            if (typeof  this.props.store == "string") {
                this.store = StoreManager.get(this.props.store) || null;
            } else {
                let storeName = this.props.store.name;
                let baseParams = this.props.store.baseParams || null;
                let defaultSort = this.props.store.defaultSort || null;
                this.store = StoreManager.get(storeName) || null ;
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

    componentWillMount() {
        const currentIndex = 0;
        if (this.autoload)
            this.store.load({page: 0, start: currentIndex, size: this.limit});
    }


    onChange(event) {

        if (this.store.Attributes.hasOwnProperty(event.target.name)) {
            console.log("Field Valid", this.isValid(event.target.name, event.target.value))
            if (!this.isValid(event.target.name, event.target.value)) {
                this.store.setAttr(event.target.name, event.target.value);
            }
        } else {
            throw Utils.Translate("Tanımlanmamış alan adı");
        }
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
        if (config.store == null) {
            let optionItems = config.items.map((opt) => {
                    return <option key={opt.value}>{opt.name}</option>
                }
            );

            input = <Input defaultValue={config.defaultValue}
                           valid={valid}
                           invalid={invalid}
                           type={"select"}
                           default
                           name={config.inputName}
                           id={config.id}
                           placeholder={config.placeholder}
            >{optionItems}</Input>;
        } else {
            let optionItems = this.store.data.map((opt) => {
                    return <option key={opt.value} value={opt.id}>{opt.name}</option>
                }
            );

            input = <Input defaultValue={config.defaultValue}
                           valid={valid}
                           invalid={invalid}
                           type={"select"}
                           default
                           name={config.inputName}
                           id={config.id}
                           value={this.store.Attributes[config.defaultValue]}
                           placeholder={config.placeholder}
                           onChange={this.onChange}
            >{optionItems}</Input>
        }


        if (config.layout == "row")
            input = <Col sm={config.options.col}>{input}</Col>;

            console.log("Combobox errorMessage",errorMessage)

        return <FormGroup row={config.layout == "row"}>
            {config.label && config.layout != "row" ? <Label htmlFor={config.id}>{config.label}</Label> : ""}
            {config.label && config.layout == "row" ? <Label htmlFor={config.id} sm={config.options.labelCol}>{config.label}</Label> : ""}
            {input}
            <FormFeedback valid tooltip>{errorMessage}</FormFeedback>
            {config.text && config.text != "" ? <FormText>{config.text}</FormText> : ""}
        </FormGroup>;
    }
}


Field.propTypes = {
    options: PropTypes.any,
    // data: PropTypes.any.required,
};