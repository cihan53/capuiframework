/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import { observer } from "mobx-react/index";
import { AppBreadcrumb } from "@coreui/react";
import Utils from "./Utils";
import StoreManager from "../../StoreManager";


@observer
export default class BreadCrumb extends React.Component {
  render() {
    let p =   StoreManager.get("BreadCrumbStore").BreadCrumb  ;
    return (<AppBreadcrumb key={Utils.ShortId.generate()} appRoutes={p}/>);
  }
}