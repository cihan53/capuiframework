/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {observer} from "mobx-react/index";
import PropTypes from "prop-types";
import {Col, FormFeedback, FormGroup, Input, Label,FormText} from "reactstrap";
import Field from "./Field";
import Utils from "../Utils/Utils";


@observer
export default class ComboBox extends Field {

    onChange(event) {

        console.log(event.target.name)
        if (this.store.Attributes.hasOwnProperty(event.target.name)) {
            console.log("Field Valid",this.isValid(event.target.name, event.target.value))
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
        let optionItems = config.items.map((opt) => {
                return <option key={opt.value}>{opt.name}</option>
            }
        );


        let input = null;
        if (config.store == null) {
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
            input = <Input defaultValue={config.defaultValue}
                           valid={valid}
                           invalid={invalid}
                           type={"select"}
                           default
                           name={config.inputName}
                           id={config.id}
                           value={this.props.store.Attributes[config.defaultValue]}
                           placeholder={config.placeholder}
                           onChange={this.onChange}
            >{optionItems}</Input>
        }


        if (config.layout == "row")
            input = <Col sm={config.options.col}>{input}</Col>

        return <FormGroup row={config.layout == "row"}>
            {config.label && config.layout != "row"? <Label htmlFor={config.id} >{config.label}</Label> : ""}
            {config.label && config.layout == "row"? <Label htmlFor={config.id}  sm={  config.options.labelCol }>{config.label}</Label> : ""}
            {input}
            <FormFeedback valid tooltip>{errorMessage}</FormFeedback>
            {config.text && config.text!=""?<FormText>{config.text}</FormText>:""}
        </FormGroup>;
    }
}


Field.propTypes = {
    options: PropTypes.any,
    // data: PropTypes.any.required,
};