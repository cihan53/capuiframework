/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import { observer } from "mobx-react/index";
import { withRouter } from "react-router-dom";
import CapController from "../Lib/CapController";
import StoreManager from "../Lib/StoreManager";

@withRouter
@observer
export default class DefaultController extends CapController {



  /**
   *
   * @returns {*}
   */
  actionIndex() {
    if (!StoreManager.get('AuthStore').isLogin()) {
      window.location = "/#/login";
      window.location.reload();
    }

    return this.renderView("Index");
  }

  /**
   *
   * @returns {*}
   */
  actionLogin() {

    let submit = (data) => {
        StoreManager.get("AuthStore").login(data).then((e) => {
        if (e)
          window.location = "/";
      }).catch(e => {

      }).finally(e => {

      });
    };
    return this.renderView("Login", { submit: submit });
  }
}

