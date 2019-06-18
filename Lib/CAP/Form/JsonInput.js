/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import PropTypes from "prop-types";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import React from "react";


export default class JsonInput extends React.Component {
    placeholder = {}

    constructor(props) {
        super(props);
        this.state = {
            placeholder: this.props.placeholder || {}
        }
        this.placeholder = this.props.placeholder || {};
        this.onChange = this.props.onChange || this.onChange.bind(this);
        this.getValues = this.getValues.bind(this);

    }

    componentWillUpdate(nextProps, nextState) {
        console.log(this.state,nextState)
        if (this.state == nextState)
            this.placeholder = nextProps.placeholder;
    }

    onChange(v) {
        if (v.error == false) {
            this.placeholder = v.jsObject;
            this.setState({placeholder: v.jsObject});
        } else {
            this.placeholder = null;
        }
    }


    /**
     *
     */
    getValues() {
        return this.placeholder;
    }

    render() {
        return <JSONInput {...this.props} placeholder={this.placeholder} onChange={this.onChange}/>
    }
}

JsonInput.propTypes = {
    id: PropTypes.string.isRequired,
    onKeyPressUpdate: PropTypes.bool,
    waitAfterKeyPress: PropTypes.number,
    modifyErrorText: PropTypes.func,
    theme: PropTypes.string,
    colors: PropTypes.object,
    style: PropTypes.object,
    locale: PropTypes.object,
    reset: PropTypes.bool,
    viewOnly: PropTypes.bool,
    onChange: PropTypes.func,
    confirmGood: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string
};

JsonInput.defaultProps = {
    id: "a_unique_id",
    colors: {},
    locale: locale
};