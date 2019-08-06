import React from "react";
import Field from "./Field";
import PropTypes from "prop-types";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

export default class DatePicker extends Field {


    render() {
        return <DateRangePicker {...this.props}></DateRangePicker>
    }

}


DatePicker.propTypes = {

    store: PropTypes.any
};