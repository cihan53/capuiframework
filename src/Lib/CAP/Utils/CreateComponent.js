/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */


import React from "react";
import {observer} from "mobx-react/index";
import {Xtypes} from "../../../Initialization";
import Utils from "./Utils";



const CreateComponent = observer((def) => {
    let props = def;
    props.key = Utils.ShortId.generate();
    const Cp = Xtypes[def.xtype];
    return <Cp  {...props}/>


    //return React.createElement(Xtypes[def.xtype],props,((props || {}).children || []).map(c => createElement(c)));
})

export default CreateComponent;