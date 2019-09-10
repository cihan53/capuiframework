function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let LocalStorage =
/*#__PURE__*/
function () {
  function LocalStorage() {
    _classCallCheck(this, LocalStorage);
  }

  _createClass(LocalStorage, [{
    key: "get",
    value: function get(key, db = "rgl-8") {
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
  }, {
    key: "read",
    value: function read(db = "rgl-8") {
      let ls = {};

      if (global.localStorage) {
        try {
          ls = JSON.parse(global.localStorage.getItem(key)) || {};
        } catch (e) {
          /*Ignore*/
        }
      }

      return ls;
    }
  }, {
    key: "save",
    value: function save(key, value, db = "rgl-8") {
      if (global.localStorage) {
        global.localStorage.setItem("rgl-8", JSON.stringify({
          [key]: value
        }));
      }
    }
  }]);

  return LocalStorage;
}();

export { LocalStorage as default };