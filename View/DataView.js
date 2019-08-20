/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";

export default class DataView extends React.Component {

    init = function () {
    }
    _cache = [];
    _view = "index";

    constructor(props) {
        super(props);
        init()
    }

    beforeRender() {

    }

    afterRender() {

    }

    view(_view = "index", params = {}) {

    }

    render() {
        this.beforeRender();
        let renderer = this.view();
        this.afterRender()
        return renderer;
    }
}