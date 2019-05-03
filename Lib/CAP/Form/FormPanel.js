import React from "react";
import PropTypes from "prop-types";
import Utils from "../Utils/Utils";
import Panel from "../Panel/Panel";
import { Form, Button } from "reactstrap";
import { action } from "mobx/lib/mobx";


export default class FormPanel extends Panel {

  // key= Utils.ShortId.generate();
  static defaultProps = {
    name: "form-panel",
    onSubmit: (e) => {

    },
    config: {},
    options: {},
    optionsBody: {},
    optionsTitle: {},
    optionsHeader: {},
    optionsFooter: {},
    title: true,
    header: "Panel Title",
    footer: false,
    items: [],
    xtype: "formpanel"
  };

  constructor(props) {
    super(props);
    this.key = this.props.key || Utils.ShortId.generate();


    if (Utils.isEmpty(this.props.config.footer)) {

      this.props.config.footer = [
        <Button type={"submit"} key={this.key + "-save-btn"}  form={this.props.name}><i className="fa fa-dot-circle-o"/> {Utils.Translate("Save")}</Button>
      ];
    }

  }

  render() {
    return <Form id={this.props.name} onSubmit={action(e => this.props.onSubmit(e))} >
      {super.render()}
    </Form>;
  }

}


FormPanel.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  title: PropTypes.any,
  header: PropTypes.any,
  items: PropTypes.array,
  options: PropTypes.any
};