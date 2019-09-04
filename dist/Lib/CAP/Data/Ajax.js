function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import superagentPromise from "superagent-promise";
import _superagent from "superagent";
const superagent = superagentPromise(_superagent, global.Promise);

let Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);

    this.running = null;

    this.tokenPlugin = req => {};

    this.handleErrors = (err, res) => {};

    this.responseBody = res => {
      return res.body;
    };

    this.init = () => {};

    this.queues = {};
    this._running = {};

    this.queue = name => {
      this.queueName = name;
      return this;
    };

    this.unqueue = name => {};

    this.end = fn => {};

    this.abort = () => {
      this._running.abort();
    };

    this.get = (url, params = {}) => {
      var fullUrl = `${API_ROOT_URL}${url}`;

      if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
        fullUrl = url;
      }

      this._running = this.Request.get(fullUrl).query(params);
      return this._running.use(this.tokenPlugin).end(this.handleErrors).then(this.responseBody);
    };

    this.post = (url, body, type = 'post') => {
      if (type == 'multipart') {
        return this.postMultiPart(url, body);
      } else if (type == 'formdata') {
        return this.postForm(url, body);
      } else {
        return this.postJson(url, body);
      }
    };

    this.postJson = (url, body) => {
      var fullUrl = `${API_ROOT_URL}${url}`;

      if (url.startsWith("http://") && url.startsWith("https://")) {
        fullUrl = url;
      }

      this._running = this.Request.post(fullUrl, body);
      return this._running.use(this.tokenPlugin).on("error", this.handleErrors).end(this.handleErrors).then(this.responseBody);
    };

    this.postForm = (url, body) => {
      var fullUrl = `${API_ROOT_URL}${url}`;

      if (url.startsWith("http://") && url.startsWith("https://")) {
        fullUrl = url;
      }

      this._running = this.Request.post(fullUrl, body);
      return this._running.type("form").use(this.tokenPlugin).on("error", this.handleErrors).end(this.handleErrors).then(this.responseBody);
    };

    this.postMultiPart = (url, body) => {
      this._running = this.Request.post(`${API_ROOT_URL}${url}`);
      Object.keys(body).forEach(key => {
        if (body[key] instanceof File) {
          this._running.attach(key, body[key]);
        } else {
          this._running.field(key, body[key]);
        }
      });
      return this._running.use(this.tokenPlugin).retry(0).on("error", this.handleErrors).end(this.handleErrors).then(this.responseBody);
    };

    this._type = 'ajax';
    this._id = Ajax._uniqueIdGenerator();
    this._Request = superagent;
    this.oldEnd = superagent.prototype.end;
    this.init = this.init.bind(this);
  }

  _createClass(Ajax, [{
    key: "Request",
    get: function () {
      return this._Request;
    },
    set: function (value) {
      this._Request = value;
    }
  }, {
    key: "id",
    get: function () {
      return this._id;
    },
    set: function (value) {
      this._id = value;
    }
  }, {
    key: "running",
    get: function () {
      return this._running;
    },
    set: function (value) {
      this._running = value;
    }
  }]);

  return Ajax;
}();

Ajax.currentId = 0;

Ajax._uniqueIdGenerator = () => {
  return ++Ajax.currentId;
};

export { Ajax as default };