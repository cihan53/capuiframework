import DriverInterface from "./DriverInterface";

export default class LocalStorage  extends DriverInterface{
    get(key, db = "rgl-8") {
        let ls = {};
        if (global.localStorage) {
            try {
                ls = JSON.parse(global.localStorage.getItem(db)) || {};
            } catch (e) {
                /*Ignore*/
            }
        }
        return ls[key];
    }

    read(db = "rgl-8") {
        let ls = {};
        if (global.localStorage) {
            try {
                ls = JSON.parse(global.localStorage.getItem(db)) || {};
            } catch (e) {
                /*Ignore*/
            }
        }
        return ls;
    }

    save(key, value, db = "rgl-8") {
        if (global.localStorage) {
            global.localStorage.setItem(
                db,
                JSON.stringify({
                    [key]: value
                })
            );
        }
    }
}