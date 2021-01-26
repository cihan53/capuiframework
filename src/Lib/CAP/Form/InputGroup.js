/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {InputGroup as RInputGroup} from "reactstrap";

export default class InputGroup extends React.Component {
    render(){
        return <RInputGroup {...this.props}/>
    }
}