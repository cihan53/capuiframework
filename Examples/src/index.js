/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */






window.CUSTOMER_LOGO    = process.env.REACT_APP_CUSTOMER_LOGO;
window.CUSTOMER_NAME    = process.env.REACT_APP_CUSTOMER_NAME;
window.API_ROOT_URL     = process.env.REACT_APP_API_ROOT_URL;
window.ROOT_URL         = process.env.REACT_APP_ROOT_URL;
window.APP_TYPE         = process.env.REACT_APP_APP_TYPE;
window.APP_LANGUAGE     = process.env.REACT_APP_LANGUAGE;

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import App from "./App";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<HashRouter>
    <App/>
</HashRouter>, document.getElementById('root'));

serviceWorker.unregister();