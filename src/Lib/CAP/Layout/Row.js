/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {Row as RRow} from "reactstrap";

export default class Row extends React.Component {
    render(){
        return <RRow {...this.props}/>
    }
}