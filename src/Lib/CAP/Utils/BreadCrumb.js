/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";
import {observer} from "mobx-react/index";
import PropTypes  from "prop-types";
import {AppBreadcrumb} from "@coreui/react";
import Utils from "./Utils";
import Field from "../Form/Field";


@observer
export default class BreadCrumb extends React.Component {
    store = null;
    route = [
        {path: "/", exact: true, name: Utils.__t("Ana Sayfa"), component: null}
    ]

    constructor(props) {
        super(props);
        this.route = this.props.route;
    }

    render() {
        return (<AppBreadcrumb key={Utils.ShortId.generate()} appRoutes={this.route}/>);
    }
}
Field.propTypes = {
  route: PropTypes.any.isRequired,
};