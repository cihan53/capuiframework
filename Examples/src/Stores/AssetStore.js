/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import CAP,{BaseStore} from "../../../src";

class OptionStore extends BaseStore {
    baseUrl = "/data/asset/";
    Action = Object.assign(this.Action, {
        get: "get",
        read: "read.json",
        save: "save",
        update: "update",
        delete: "delete"
    });


    primaryKey = "id";




    constructor() {
        super();
        // this.init();
    }


}

export default new OptionStore();
