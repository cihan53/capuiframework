/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";
import {ButtonToolbar  as RButtonToolbar} from "reactstrap";

class ButtonToolbar extends React.Component {


    render() {
        return <RButtonToolbar {...this.props}/>
    }
}


export default ButtonToolbar;
