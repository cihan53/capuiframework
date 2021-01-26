import React from "react";
import Select2Filter from "./Select2Filter";
import {Utils} from "../../../index";
import PropTypes from "prop-types";
import {Comparator} from "react-bootstrap-table2-filter";
import {Input} from "reactstrap";

export default class GridColumnFilter extends React.Component {
    static propTypes = {
        filterType: PropTypes.string.isRequired,
        filterName: PropTypes.string.isRequired,
        filterProps: PropTypes.object,
        column: PropTypes.object.isRequired,
        onFilter: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.field = React.createRef();
        this.filter = this.filter.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.state = {
            value: ''
        }
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    filter() {
        this.props.onFilter({
            value: this.getValue()
        })
    }

    getValue() {
        return this.state.value;
    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state != prevState) {
    //
    //     }
    // }

    render() {
        switch (this.props.filterType) {
            case "text":
                return <input
                    key="input"
                    ref={node => this.field = node}
                    type="text"
                    className={"form-control"}

                />
            case "select2":
                return <Select2Filter {...this.props}  />
                break;
            case "select":
                return <input
                    // value={this.state.value}
                    // onChange={this.onChange}
                    ref={node => this.field = node}
                    type={"select"}

                    className={"form-control"}
                    key={"select-grid-column-filter"}

                >
                    <option value={""}>{Utils.__t("Seçiniz")}</option>
                    {this.props.data.map(e => {
                        return <option key={"select-grid-column-filter-value-" + e.value}
                                       value={e.value}>{e.label}
                        </option>
                    })}

                </input>
                break;
        }
        return <p>{Utils.__t("Desteklenmiyor.")}</p>
    }
}