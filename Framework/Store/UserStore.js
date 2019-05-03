/*
 * Copyright (c) 2018. CreyptTech Yazılım
 * Author : Cihan Ozturk
 *
 */
import {action, observable, reaction, computed, toJS} from "mobx";
import Utils from "../Lib/CAP/Utils/Utils";
import BaseStore from "../Lib/CAP/Store/BaseStore";
import Request from "../Lib/Request";

class UserStore extends BaseStore {

    @observable currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    @observable loadingUser;
    @observable userDetail;
    @observable updatingUser;
    @observable updatingUserErrors;

    baseUrl = "/securityService/";
    Action = Object.assign(this.Action, {
        get: "get",
        read: "read",
        save: "save",
        update: "updateProfil",
        delete: "delete"
    });


    primaryKey = "id";
    Rules = [
        {
            name: "usernamesurname",
            rule: "required|alpha_num_dash_space",
            msg: {alpha: Utils.__t("Sadece harflerden ve boşluk karakterinden oluşabilir."), required: Utils.__t("Zorunlu alan")}
        },
        {
            name: "customerId",
            rule: "required|integer",
            msg: {alpha: Utils.__t("Sadece rakamlardan oluşabilir"), required: Utils.__t("Zorunlu alan")}
        },
        {
            name: "userName",
            rule: "required|alpha_num",
            msg: {alpha: Utils.__t("Sadece harflerden ve rakamlardan oluşabilir"), required: Utils.__t("Zorunlu alan")}
        },
        {
            name: "gsmPhone",
            rule: "required|phone",
            msg: {integer: Utils.__t("Sayılardan oluşabilir."), required: Utils.__t("Zorunlu alan")}
        }, {
            name: "email1",
            rule: "required|email",
            msg: {integer: Utils.__t("Sayılardan oluşabilir.")}
        }, {
            name: "email2",
            rule: "email",
            msg: {integer: Utils.__t("E-mail adresi hatalı")}
        }

    ];


    constructor() {
        super();
        reaction(
            () => this.currentUser,
            currentUser => {
                if (currentUser) {
                    window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
                } else {
                    window.localStorage.removeItem("currentUser");
                }
            }
        );
        this.init();
    }

    @computed get detail() {
        return toJS(this.userDetail);
    }


    @action getProfile() {
        this.loadingUser = true;
        return Request.get("/securityService/getloginuserdetail")
            .then(action((res) => {
                this.userDetail = res[0];
                this.loadingUser = false;
                //return Promise.resolve( res[0] );
            }));
    }


    @action forgetUser() {
        this.currentUser = undefined;
    }

    @action setCurrentUser(user) {
        this.currentUser = user;
    }


}

export default new UserStore();
