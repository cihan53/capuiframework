/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import { observer } from "mobx-react/index";
import { AppBreadcrumb } from "@coreui/react";
import BreadCrumbStore from "../../CapController";
import Utils from "./Utils";


@observer
export default class BreadCrumb extends React.Component {
  // componentWillReact( ) {
  //   console.log("Güncellendi");
  //
  // }
  //
  // componentDidUpdate() {
  //   console.log("bread guncellendi")
  // }

  render() {
    let p =   BreadCrumbStore.BreadCrumb  ;
    return (<AppBreadcrumb key={Utils.ShortId.generate()} appRoutes={p}/>);
  }
}