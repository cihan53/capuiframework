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
import Validator from "../Utils/Validator";
import StoreManager from "../../StoreManager";

export default class Text extends React.Component {
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
        this.rule = [];
        this.state = {
            value: null,
            error: null
        }

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

    render() {
        let config = this.props;
        let errorMessage = this.state.error;
        let input =  <Input name={config.inputName} value={this.props.value} onChange={this.onChange}/>;
        if (config.layout == "row")
            input = <Col sm={config.options.col}>{input}</Col>;

        return <FormGroup row={config.layout == "row"}>
            {config.label && config.layout != "row" ?
                <Label htmlFor={config.id || config.inputName + "-form-field"}>{config.label}</Label> : ""}
            {config.label && config.layout == "row" ? <Label htmlFor={config.id || config.inputName + "-form-field"}
                                                             sm={config.options.labelCol}>{config.label}</Label> : ""}
            {input}
            {errorMessage ? <FormFeedback valid tooltip>{errorMessage}</FormFeedback> : void (0)}
            {config.text && config.text != "" ? <FormText>{config.text}</FormText> : void (0)}
        </FormGroup>;
    }
}

