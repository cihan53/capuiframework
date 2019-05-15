/*
 * Copyright (c) 2018. CreyptTech Yazılım
 * Author : Cihan Ozturk
 *
 */

import { action, observable,computed,toJS } from "mobx";
import Utils from "../Lib/CAP/Utils/Utils";

class BreadCrumbStore {
  @observable root = [
    { path: "/", exact: true, name: Utils.__t("Ana Sayfa"), component: null }
  ];

  @action addItem(item) {
    this.root.push(...item);
  }

  @action setItem(item) {
    let r = [
      { path: "/", exact: true, name: Utils.__t("Ana Sayfa"), component: null }
    ];
    r.push(...item);
    this.root.clear();
    this.root.push(...r);
  }

  @computed get BreadCrumb() {
    return toJS(this.root);
  }

  @action clear() {
    // this.root.clear();
    this.root = [
      { path: "/", exact: true, name: Utils.__t("Ana Sayfa"), component: null }
    ];
  }
}

export default new BreadCrumbStore();
export {BreadCrumbStore}
