/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import PropTypes from "prop-types";
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import React from "react";




export default class JsonInput extends React.Component {
    constructor(props) {
        super(props);

    }
    render(){
        return <JSONInput {...this.props}/>
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
    onChange: PropTypes.object,
    confirmGood: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string
};

JsonInput.defaultProps = {
    id: "a_unique_id",
    colors: {},
    locale: locale
};