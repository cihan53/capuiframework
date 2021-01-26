/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
import CAP,{BaseStore} from "../../../src";

class OptionStore extends BaseStore {
    baseUrl = "/data/options/";
    Action = Object.assign(this.Action, {
        get: "get",
        read: "read.json",
        save: "save",
        update: "update",
        delete: "delete"
    });


    primaryKey = "id";


    Rules = [
        {
            name: 'countryname',
            rule: 'required|alpha_num_dash_space',
            msg: {
                alpha_num_dash_space: CAP.__t('Sadece harflerden ve boşluk karakterinden oluşabilir.'),
                required: CAP.__t("Zorunlu alan")
            }
        }
    ];


    constructor() {
        super();
        // this.init();
    }


}

export default new OptionStore();
