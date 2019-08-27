/**
 * Module dependencies.
 */

import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);


/**
 * Extends the built-in dependency.
 */

export default class Ajax {

    static currentId = 0;
    running = null;
    tokenPlugin = (req) => {

    }

    handleErrors = (err, res) => {

    }

    responseBody = (res) => {
        return res.body;
    }

    constructor() {
        this._type = 'ajax';
        this._id = Ajax._uniqueIdGenerator();
        this._Request = superagent;
        this.oldEnd = superagent.prototype.end;
        this.init = this.init.bind(this);

    }

     static _uniqueIdGenerator=()=>{
        return ++this.currentId;
    }

    get Request() {
        return this._Request;
    }

    set Request(value) {
        this._Request = value;
    }

    init = () => {

    };

    /**
     * Queues.
     */
    queues = {};
    _running = {};


    queue = (name) => {
        this.queueName = name;
        return this;
    };


    unqueue = (name) => {

    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }


    get running() {
        return this._running;
    }

    set running(value) {
        this._running = value;
    }

    end = (fn) => {

    };
    /**
     * işlemi kes
     */
    abort = () => {
        this._running.abort();
    }


    get = (url, params = {}) => {
        var fullUrl = `${API_ROOT_URL}${url}`;
        if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
            fullUrl = url;
        }
        this._running = this.Request.get(url).query(params);
        return this._running
            .use(this.tokenPlugin)
            .end(this.handleErrors)
            .then(this.responseBody);

    }

    post = (url, body, type = 'post') => {
        if (type == 'multipart') {
            return this.postMultiPart(url, body);
        } else if (type == 'formdata') {
            return this.postForm(url, body);
        } else {
            return this.postJson(url, body);
        }
    }

    postJson = (url, body) => {
        var fullUrl = `${API_ROOT_URL}${url}`;
        if (url.startsWith("http://") && url.startsWith("https://")) {
            fullUrl = url;
        }
        this._running = this.Request.post(fullUrl, body);

        return this._running
            .use(this.tokenPlugin)
            .on("error", this.handleErrors)
            .end(this.handleErrors)
            .then(this.responseBody);
    }

    postForm = (url, body) => {

        var fullUrl = `${API_ROOT_URL}${url}`;
        if (url.startsWith("http://") && url.startsWith("https://")) {
            fullUrl = url;
        }

        this._running = this.Request.post(fullUrl, body);
        return this._running
            .use(this.tokenPlugin)
            .on("error", this.handleErrors)
            .end(this.handleErrors)
            .then(this.responseBody);
    }

    postMultiPart = (url, body) => {
        this._running = this.Request.post(`${API_ROOT_URL}${url}`);

        Object.keys(body).forEach((key)=>{
            if ((body[key] instanceof File)) {
                this._running.attach(key, body[key]);
            } else {
                this._running.field(key, body[key]);
            }

        });

        return this._running.use(this.tokenPlugin)
            .retry(0)
            .on("error", this.handleErrors)
            .end(this.handleErrors)
            .then(this.responseBody);

    }

}