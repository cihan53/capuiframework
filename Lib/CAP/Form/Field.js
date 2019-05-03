import React from "react";
import PropTypes from "prop-types";
import { Col, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import Utils from "../Utils/Utils";

export default class Field extends React.Component {
  static defaultProps = {
    id: Utils.ShortId.generate(),
    inputName: "",
    label: "",
    defaultValue: "",
    placeholder: "",
    allowBlank: true,
    layout:"", // inline | row,
    options: {
      validateClass: "danger",
      col:"10",
      type: "input"
    },
    xtype: "xfield"
  };

  render() {

    let valid = false;
    let invalid = true;
    let config = this.props;
    let input = <Input addon={true} value={ config.defaultValue } invalid={invalid} type={config.options.type} default name={config.inputName} id={config.id} placeholder={config.placeholder}/>;

    if( config.layout=="row")
      input = <Col sm={config.options.col}>{input}</Col>

    return <FormGroup  row={config.layout=="row"}>
      {config.label ? <Label for={config.id}>{config.label}</Label> : ""}
      {input}
      <FormFeedback valid tooltip>
        This is some placeholder block-level help text for the above input.
        It's a bit lighter and easily wraps to a new line.
      </FormFeedback>
    </FormGroup>;
  }
}


Field.propTypes = {
  options: PropTypes.any,
  inputName: PropTypes.string.required
};