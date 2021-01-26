/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(erro) {
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true, info: info, error: error});
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);

    }


    render() {

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div><h1>I listened to your problems, now listen to mine:</h1>
                <p>{this.state}</p></div>;
        }
        return this.props.children;
    }
}