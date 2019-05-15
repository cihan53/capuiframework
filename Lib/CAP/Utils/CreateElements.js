/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */


import React from "react";
import {Xtypes} from "../../../Initialization";
import Utils from "./Utils";


const createElement = (def) => {
    let props = def;
    props.key=Utils.ShortId.generate();
    return React.createElement(Xtypes[def.xtype],props,((props || {}).children || []).map(c => createElement(c))
    );
}

export default createElement;