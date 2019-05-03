/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import {action} from "mobx";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
import Utils from "../Lib/CAP/Utils/Utils";
import BaseStore from "../Lib/CAP/Store/BaseStore";
import {Request} from "../Index";

class AuthStore extends BaseStore {

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

    constructor() {
        super();
        this.init();

    }


    @action login(params) {

        let url = this.baseUrl;
        return Request.post(url, params, "formdata")
            .then(action((user) => {
                if (user) {
                    CommonStore.setToken(user.accessToken || null);
                    UserStore.setCurrentUser(user);
                    return user;
                }
                return false;
            }))
            // / .then(() => UserStore.pullUser() )
            .catch(action((err) => {
                this.ErrorText = err.response && err.response.body && err.response.body.errors;
                throw err;
            }));

    }


    @action logout() {
        CommonStore.setToken(undefined);
        UserStore.forgetUser();
        console.log("User Logout 1");
        return Promise.resolve();
    }

    @action isLogin() {
        if (CommonStore.getToken() == null) {
            return false;
        } else {
            return true;
        }
    }

}

export default new AuthStore();
