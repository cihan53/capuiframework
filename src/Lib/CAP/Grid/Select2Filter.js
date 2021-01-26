import React, {Component} from "react";
import filterFactory, {textFilter, customFilter, Comparator} from 'react-bootstrap-table2-filter';
import PropTypes from "prop-types";
import Select2 from "../Form/Select2";

export default class Select2Filter extends Select2 {
    static propTypes = {
        column: PropTypes.object.isRequired,
        onFilter: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {value: []};
        this.filter = this.filter.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    getSelected() {
        return this.state.value;
    }

    handleChange = (newValue, actionMeta) => {
        this.setState({value: newValue});
    };

    getValue() {
        return this.state.value;
    }

    filter() {

        this.props.onFilter({
            number: this.getValue(),
            comparator: Comparator.EQ
        });
    }

    componentDidUpdate(prevProps, prevState){
        console.log(prevProps,prevState)
        this.filter()
    }
    render() {
        //return super.render();
        return <div style={{position: "relative", float: "right"}}
                    ref={node => this.select = node}> {super.itemRender(this.state.value)}</div>;
    }
}