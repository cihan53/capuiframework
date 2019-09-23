/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import PropTypes from "prop-types";
import {Col, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";
import Utils from "../Utils/Utils";
import Validator from "../Utils/Validator";

export default class Field extends React.Component {
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


    constructor(props) {
        super(props)
        this.state = {error: null};
        this.onChange = this.onChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.rule = [];
        this.valid = null;
        this.invalid = false;

        //TODO burası güncellenecek
        this.store = null;// StoreManager.get('ModuleAdminStore')

        let config = this.props;
        if (!config.allowBlank) {
            this.rule.push("required")
        }

        if (this.props.rule && this.props.rule != "") {
            this.rule = Utils.concat(this.rule, this.props.rule.split("|"))
        }

        this.state = {
            value: null
        }


    }

    isValid(inputname) {
        return Validator.fieldValid(inputname)
    }

    // onChange(event) {
    //
    //     if (this.store.Attributes.hasOwnProperty(event.target.name)) {
    //
    //         if (!this.isValid(event.target.name, event.target.value)) {
    //             this.store.setAttr(event.target.name, event.target.value);
    //         }
    //     } else {
    //         throw Utils.__t("Tanımlanmamış alan adı");
    //     }
    // }

    /**
     *
     * @param event
     */
    onChange(event) {
        if (this.props.hasOwnProperty("onChange"))
            this.props.onChange(event,this);

        this.setState({selected: event.target.selected});
    }

    render() {

        let config = this.props;
        let input = null;
        let value = "";


        if (this.store != null)
            value = this.store.getAttr[config.inputName] || "";


        if (this.store == null) {
            input = <Input defaultValue={config.defaultValue}
                           valid={this.valid}
                           invalid={this.invalid}
                           type={config.options.type || config.type}
                           default
                           name={config.inputName}
                           id={config.id}
                           placeholder={config.placeholder}
            />;
        } else {

            input = <Input
                valid={this.valid}
                invalid={this.invalid}
                type={config.options.type || config.type}
                default
                name={config.inputName}
                id={config.id}
                value={value}
                placeholder={config.placeholder}
                onChange={this.onChange}
            />;
        }
        if (config.layout == "row")
            input = <Col sm={config.options.col}>{input}</Col>


        return <FormGroup row={config.layout == "row"}>
            {config.label && config.layout != "row" ? <Label htmlFor={config.id}>{config.label}</Label> : ""}
            {config.label && config.layout == "row" ?
                <Label htmlFor={config.id} sm={config.options.labelCol}>{config.label}</Label> : ""}
            {input}

            {/*{Validator.message(config.inputName, value, this.rule.join("|"))}*/}
            <FormFeedback>
                {this.rule.length > 0 ? Validator.message(config.inputName, value, this.rule.join("|")) : ""}
            </FormFeedback>
            {config.text && config.text != "" ? <FormText>{config.text}</FormText> : ""}
        </FormGroup>;
    }
}


Field.propTypes = {
    options: PropTypes.any,
    layout: PropTypes.string,
    inputName: PropTypes.string.Required,
    // inputName: PropTypes.string.required
};
