import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import {TextEncoder} from "text-encoding";
import Utils from "./CAP/Utils/Utils";
import AuthStore from "../Store/AuthStore";


const superagent = superagentPromise(_superagent, global.Promise);


var base64js = require("base64-js");


function Base64Encode(str, encoding = "utf-8") {
    var bytes = new (TextEncoder)(encoding).encode(str);
    return base64js.fromByteArray(bytes);
}


/**
 *
 * @param err
 * @returns {*}
 */
const handleErrors = (err, res) => {


    // console.debug("Request Result",res )
    // console.debug("Request Error", err )


    let errorText = "";
    let errorStatus = null;
    if (err) {
        errorText = err.message;
        errorStatus = err.status;
        if (err.response.body && err.response.body.message) {
            errorText += " İstek Sonucu :" + err.response.body.message;
        }

        if (err.response.error.message) {
            errorText += " Sistem Mesajı :" + err.response.error.message;
        }

    }


    /**
     * Yetkisiz giriş hatası
     */

    if (
        (res && res.status != 200) //status 200 değil se
        &&
        (
            (res && res.status === 401)  //response dönmüş ve kodu 401 ise
            ||
            (err && err.status == 401) //bir hata dönmüş ve kodu 401 ise
        )

    ) {
        AuthStore.logout()
            .then(() => {
                    window.location = "/#/login";
                    //window.location.reload();
                }
            );
    }


    /**
     * Endpoint bulunamadı
     */
    if (res && res.status === 404) {
        Utils.Alert({
            position: "tc",
            title: Utils.Translate("İstek gerçekleştirilemedi"),
            message: Utils.Translate(res.statusText),
            level: "error",
            autoDismiss: 5
        });
    }


    /**
     * Servis tarafında bir hata oluştur
     */
    if (errorStatus == null && res && res.status === 500) {
        Utils.Alert({
            position: "tc",
            title: Utils.Translate("Hata oluştu"),
            message: Utils.Translate("Gerekli moduller yüklenemedi. Lütfen tekrar deneyiniz. :errorText", {errorText: errorText}),
            level: "error",
            autoDismiss: 5
        });
    }


    /**
     * İstek sırasında bir hata oluştu
     */

    if (err) {

        Utils.Alert({
            position: "tc",
            title: Utils.Translate("Hata oluştu"),
            message: Utils.Translate("İşlem sırasında hata oluştu. Lütfen tekrar deneyiniz.:errorText", {errorText: errorText}),
            level: "error",
            autoDismiss: 5
        });
    }

    if (res && res.status === 502) {
        Utils.Alert({
            position: "tc",
            title: Utils.Translate("Hata oluştu"),
            message: Utils.Translate("Gerekli moduller yüklenemedi. Lütfen tekrar deneyiniz."),
            level: "error",
            autoDismiss: 5
        });
    }

    if (res && res.status === 504) {
        Utils.Alert({
            position: "tc",
            title: Utils.Translate("Hata oluştu"),
            message: Utils.Translate(res.statusText),
            level: "error"

        });
    }

    return err;
};
/**
 *
 * @param res
 * @returns {*}
 */
const responseBody = res => {
    return res.body;
};
/**
 *
 * @param req
 */
const tokenPlugin = req => {

    req.set("Access-Control-Allow-Origin", "*");
    if (window.localStorage.getItem("accessToken")) {
        var basic = Base64Encode(window.localStorage.getItem("accessToken") + ":");
        //req.set('authorization', `Token ${CommonStore.token}`);
        req.set("Authorization", `Basic ${basic}`);
    }
};


const Request = {
    timeout: 30000,
    deadline: 60000,
    del: url =>
        superagent
            .del(`${API_ROOT_URL}${url}`)
            .use(tokenPlugin)
            .on("error", handleErrors)
            .end(handleErrors)
            .then(responseBody),
    get: (url, params = {}) => {

        var fullUrl = `${API_ROOT_URL}${url}`;
        if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
            fullUrl = url;
        }


        return superagent
            .get(`${fullUrl}`)
            .query(params)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody);
    },
    put: (url, body) =>
        superagent
            .put(`${API_ROOT_URL}${url}`, body)
            .use(tokenPlugin)
            .on("error", handleErrors)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body, type = 'post') => {


        if (type == 'multipart') {
            return Request.postMultiPart(url, body);
        } else if (type == 'formdata') {
            return Request.postForm(url, body);
        } else {
            return Request.postJson(url, body);
        }

    },

    postJson: (url, body) => {
        var fullUrl = `${API_ROOT_URL}${url}`;
        if (url.startsWith("http://") && url.startsWith("https://")) {
            fullUrl = url;
        }


        return superagent.post(fullUrl, body)
            .use(tokenPlugin)
            .on("error", handleErrors)
            .end(handleErrors)
            .then(responseBody);
    },
    postForm: (url, body) => {

        var fullUrl = `${API_ROOT_URL}${url}`;
        if (url.startsWith("http://") && url.startsWith("https://")) {
            fullUrl = url;
        }

        return superagent.post(fullUrl, body)
            .type("form")
            .use(tokenPlugin)
            .on("error", handleErrors)
            .end(handleErrors)
            .then(responseBody);


    },

    postMultiPart: (url, body) => {
        var r = superagent.post(`${API_ROOT_URL}${url}`);

        Object.keys(body).forEach(function (key) {
            if ((body[key] instanceof File)) {
                r.attach(key, body[key]);
                console.debug("Attach file", body[key])
            } else {
                r.field(key, body[key]);
            }

        });
        //r.withCredentials();
        r.retry(0); // or:
        r.use(tokenPlugin);
        r.on("error", handleErrors);
        return r.then(responseBody);

    }
};

export default Request
