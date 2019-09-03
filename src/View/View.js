/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import React from "react";

export default class View extends React.Component {

    constructor(props) {
        super(props);
        this.init();
    }

    init = function () {}
    beforeRender = function () {}
    afterRender = function () {}
    _cache = [];
    _view = "index";



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