/*
 *  Copyright (c) 2019. Crypttech Yazılım
 *  Author: Cihan Öztürk
 *  Email: cihanozturk@crypttech.com
 *
 *
 */

import {action, observable, reaction} from "mobx";
import Utils from "../Lib/CAP/Utils/Utils";
import BaseStore from "../Lib/CAP/Store/BaseStore";
import {Logger} from "../index";

export class CapAuthStore extends BaseStore {
    @observable accessToken = window.localStorage.getItem("accessToken");
    baseUrl = "/login/";

    Rules = [
        {
            name: "password",
            rule: "required",
            msg: {required: Utils.__t("Zorunlu alan")}
        },
        {
            name: "userName",
            rule: "required|alpha_num",
            msg: {alpha: Utils.__t("Sadece harflerden oluşabilir"), required: Utils.__t("Zorunlu alan")}
        }
    ];

    constructor(props) {
        super(props);

        reaction(
            () => this.accessToken,
            accessToken => {
                Logger.debug("CapAuthStore Token", accessToken)
                if (accessToken) {
                    this.accessToken = accessToken;
                }
            }
        );
    }


    @action login(params) {

    }


    @action logout() {

    }

    @action isLogin() {
        if (this.accessToken == null) {
            return false;
        } else {
            return true;
        }
    }

}

export default CapAuthStore;

