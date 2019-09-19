/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {Col as RCol} from "reactstrap";

export default class Col extends React.Component {
    render(){
        return <RCol {...this.props}/>
    }
}