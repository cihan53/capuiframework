/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {AppSwitch} from "@coreui/react";
import PropTypes from "prop-types";
import Utils from "../Utils/Utils";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

const filterColors = (inputValue) => {
    return colourOptions.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});
const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterColors(inputValue));
    }, 1000);
};


const promiseOptions = inputValue =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterColors(inputValue));
        }, 1000);
    });

const components = {
    DropdownIndicator: null,
};

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

export default class Select2 extends React.Component {
    static defaultProps = {
        id: Utils.ShortId.generate(),
        defaultChecked: false,
        onChange: (e, v) => {
        },
        variant: "pill",
        className: "mx-1",
        color: "primary",
        label: {
            on: Utils.__t("On"),
            off: Utils.__t("Off")
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: options,
            value: undefined,
        };
    }

    handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    handleInputChange = (inputValue, actionMeta) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    handleCreate = (inputValue) => {
        this.setState({ isLoading: true });
        console.group('Option created');
        console.log('Wait a moment...');
        setTimeout(() => {
            const { options } = this.state;
            const newOption = createOption(inputValue);
            console.log(newOption);
            console.groupEnd();
            this.setState({
                isLoading: false,
                options: [...options, newOption],
                value: newOption,
            });
        }, 1000);
    };

    render() {
        const { isLoading, options, value } = this.state;
        return <Select isClearable
                       isDisabled={isLoading}
                       isLoading={isLoading}
                       loadOptions={promiseOptions}
                       onChange={this.handleChange}
                       onCreateOption={this.handleCreate}
                       options={options}
                       value={value}
        />
    }
}

Select2.propTypes = {
    onChange: PropTypes.func,
};
