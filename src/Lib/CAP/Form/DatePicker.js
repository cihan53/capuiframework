import React from "react";
import Field from "./Field";
import PropTypes from "prop-types";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import Utils from "../Utils/Utils";

export default class DatePicker extends Field {


    render() {
        return <DateRangePicker locale={
            {
                applyLabel: Utils.__t("Uygula"),
                cancelLabel: Utils.__t("Vazgeç"),
                customRangeLabel: Utils.__t("Diğer"),
                weekLabel: Utils.__t("H")
            }
        } {...this.props}/>
    }

}


DatePicker.propTypes = {

    store: PropTypes.any
};