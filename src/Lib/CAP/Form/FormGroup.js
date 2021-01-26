/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {FormGroup as RFormGroup} from "reactstrap";

export default class FormGroup extends React.Component {
    render(){
        return <RFormGroup {...this.props}/>
    }
}