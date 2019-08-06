/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";
import {Button} from "reactstrap";
import PropTypes from "prop-types";
import Field from "./Field";

class CButton extends Field {
    render() {
        return <Button {...this.props}/>
    }
}

CButton.propTypes = {
    icon: PropTypes.oneOf(['News', 'Photos']),
};

export default CButton;
