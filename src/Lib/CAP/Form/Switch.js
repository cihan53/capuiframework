/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {AppSwitch} from "@coreui/react";
import Utils from "../Utils/Utils";

export default class SwitchField extends React.Component {
    static defaultProps = {
        id: Utils.ShortId.generate(),
        defaultChecked: false,
        onChange: (e, v) => {
        },
        variant: "pill",
        className: "mx-1",
        color: "primary",
    };

    render() {
        return <AppSwitch defaultChecked={this.props.defaultChecked} onChange={this.props.onChange}
                          className={this.props.className} variant={this.props.variant} color={this.props.color}/>
    }
}

SwitchField.propTypes = {
    onChange: PropTypes.fn,
};
