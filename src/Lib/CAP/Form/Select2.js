/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import Field from "./Field";
import PropTypes from "prop-types";
import Utils from "../Utils/Utils";
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {observer} from "mobx-react";
import StoreManager from "../../StoreManager";

// export const colourOptions = [
//     {value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true},
//     {value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true},
//     {value: 'purple', label: 'Purple', color: '#5243AA'},
//     {value: 'red', label: 'Red', color: '#FF5630', isFixed: true},
//     {value: 'orange', label: 'Orange', color: '#FF8B00'},
//     {value: 'yellow', label: 'Yellow', color: '#FFC400'},
//     {value: 'green', label: 'Green', color: '#36B37E'},
//     {value: 'forest', label: 'Forest', color: '#00875A'},
//     {value: 'slate', label: 'Slate', color: '#253858'},
//     {value: 'silver', label: 'Silver', color: '#666666'},
// ];


// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }


// const filterColors = (inputValue) => {
//     return colourOptions.filter(i =>
//         i.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
// };


// const components = {
//     DropdownIndicator: null,
// };

// const options = [
//     {value: 'chocolate', label: 'Chocolate'},
//     {value: 'strawberry', label: 'Strawberry'},
//     {value: 'vanilla', label: 'Vanilla'}
// ];


/**
 * guncelle
 * @type {*[]}
 */


@observer
export default class Select2 extends Field {

    static defaultProps = {
        id: Utils.ShortId.generate(),
        inputName: "combobox-" ,
        label: Utils.__t("Combobox"),
        defaultValue: "",
        placeholder: Utils.__t("Lütfen seçiniz"),
        displayField:"label",
        valueField:"value",
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
        super(props);
        this.state = {
            isLoading: this.props.isLoading || false,
            options: this.props.defaultOptions || [],
            value: this.props.value || undefined,
        };

        // this.loadOptions = this.loadOptions.bind(this);
        // this.loadOptions = this.loadOptions.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.init();


    }

    init() {
        if (this.props.store) {
            if (typeof this.props.store == "string") {
                this.store = StoreManager.get(this.props.store) || null;
            } else {
                let storeName = this.props.store.name;
                let baseParams = this.props.store.baseParams || null;
                let defaultSort = this.props.store.defaultSort || null;
                this.store = StoreManager.get(storeName) || null;
                if (this.store && baseParams)
                    this.store.setParameters(baseParams);

                if (this.store && defaultSort) {
                    this.store.setDefaultSortDir(defaultSort.dir, defaultSort.sort);
                }
            }


            if (!this.store)
                throw new Error(Utils.__t("Data stores Tanımsız"));


            this.autoload = this.props.hasOwnProperty('autoload') ? this.props.autoload : true;
        }

    }

    UNSAFE_componentWillMount() {
        const currentIndex = 0;
        if (this.store && this.autoload)
            this.load()
    }

    /**
     *
     * @returns {void|any}
     */
    load() {
        return this.props.store.load ? this.props.store.load(this) : this.store.load();
    }


    generateItems(data) {

        // if (this.store) {
        //     return data.map((opt, index) => {
        //         return {label: opt[this.props.displayField], value: opt[this.props.valueField]}
        //     })
        // }

        return data.map((opt, index) => {
            return {label: opt[this.props.displayField], value: opt[this.props.valueField]}
        })
        //
        // return data;
    }


    // loadOptions = (inputValue, callback) => {
    //     if (this.props.hasOwnProperty("loadOptions"))
    //         this.props.loadOptions(inputValue, callback)
    // }

    handleChange = (newValue, actionMeta) => {
        if (this.props.hasOwnProperty("handleChange"))
            this.props.handleChange(newValue, actionMeta)
    };

    handleInputChange = (inputValue, actionMeta) => {
        if (this.props.hasOwnProperty("handleInputChange"))
            this.props.handleInputChange(inputValue, actionMeta)
    };

    handleCreate = (inputValue) => {
        if (this.props.hasOwnProperty("handleCreate"))
            this.props.handleCreate(inputValue)
    };
    /**
     * Seilen değeri getirir
     * @returns {*}
     */
    getSelected(){
        return this.state.value;
    }

    /**
     * getSelected ile şekilde seçilen değeri getirir.
     * @returns {*}
     */
    getValue(){
        return this.state.value;
    }

    itemRender(values=[]) {
        const {isLoading, options} = this.state;
        let config = this.props;
        const value = this.getSelected();
        let optionItems = this.generateItems(this.store ? this.store.data : config.items);
        return <React.Fragment>
            {this.props.isClearable || !this.props.hasOwnProperty('isClearable') ?
                <AsyncCreatableSelect
                    isLoading={isLoading}
                    options={options}
                    value={value}
                    defaultOptions={optionItems}
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                    onCreate={this.handleCreate}
                    {...this.props}
                    isClearable={this.props.isClearable || true}
                />
                : <AsyncSelect
                    isLoading={isLoading}
                    options={options}
                    value={value}
                    defaultOptions={optionItems}
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                    {...this.props}
                    isClearable={this.props.isClearable || true}
                />
            }

        </React.Fragment>
    }

    render() {
        return super.render();
    }
}

/**
 * isClearable

 isMulti
 isDisabled={isLoading}
 isLoading={isLoading}
 loadOptions={promiseOptions}
 onChange={this.handleChange}
 onCreateOption={this.handleCreate}
 options={options}
 value={value}
 * @type {{isMulti: *, isLoading: *, getValue: *, onCreateOption: *, emotion: *, onChange: *, selectProps: *, options: *, hasValue: *, isDisabled: *, loadOptions: *}}
 */

Select2.propTypes = {
    defaultOptions: PropTypes.array,
    getValue: PropTypes.func,
    hasValue: PropTypes.bool,
    isMulti: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    options: PropTypes.any,
    selectProps: PropTypes.any,
    emotion: PropTypes.any,
    loadOptions: PropTypes.any,
    onChange: PropTypes.func,
    onCreateOption: PropTypes.func,
    displayField: PropTypes.string,
    valueField: PropTypes.string,
};
