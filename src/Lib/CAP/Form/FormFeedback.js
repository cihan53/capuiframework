/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {FormFeedback as RFormFeedback} from "reactstrap";

export default class FormFeedback extends React.Component {
    render() {
        return <RFormFeedback {...this.props}/>
    }
}