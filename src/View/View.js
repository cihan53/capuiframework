/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";

export default class View extends React.Component {


    _cache = [];
    _view = "index";

    constructor(props) {
        super(props);
        this.init();
        this.Controller = this.props.Controller;
    }

    init = function () {
    }
    beforeRender = function () {
    }
    afterRender = function () {
    }

    /**
     * Public Method
     * @returns {*}
     */
    view() {
        return <p>View/Path</p>
    }


    /**
     * Procted Method
     * @returns {*}
     */
    render() {
        this.beforeRender();
        let renderer = this.view();
        this.afterRender()
        return renderer;
    }
}