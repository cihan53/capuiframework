import Utils from "./Utils";
import SimpleReactValidator from "simple-react-validator";
let customValid = {
  className: "text-danger",
  validators: {
    empty: {
      message: "The :attribute must be a valid value.",
      rule: function (val, options) {
        return !Utils.isEmpty(val);
      }
    },
    each: {
      message: "The :attribute must be a valid value.",
      rule: function (val, options) {
        if (val.length == 0) return true;
        let v = val.filter(function (r) {
          return eval(options[0] + "(" + window.CAP.Utils.toJSON(r) + ")");
        });
        return v.length > 0;
      }
    },
    date: {
      message: "The :attribute must be a valid value.",
      rule: function (val, params) {
        let date = Date.parse(val);
        return !isNaN(date) ? new Date(date) : null;
      }
    },
    alpha_num: {
      message: "The :attribute may only contain letters and numbers.",
      rule: function (val, params, validator) {
        return validator.helpers.testRegex(val, /^[A-Za-z0-9]*$/);
      }
    },
    password: {
      message: "The :attribute must be a valid value.",
      rule: function (val, params, validator) {
        if (val == "") return true;
        return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/);
      }
    },
    boolean: {
      message: "The :attribute must be a valid value.",
      rule: function (val) {
        return ["true", "false", "1", "0"].indexOf(val.toString()) >= 0;
      }
    },
    ip: {
      message: "The :attribute must be a valid IP address.",
      rule: function (val, options, validator) {
        return validator.helpers.testRegex(val, /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && options.indexOf(val) === -1;
      }
    },
    ip2: {
      message: "The :attribute must be a valid IP address.",
      rule: function (val, options, validator) {
        var validate = require("ip-subnet-calculator");

        if (val == "") return true;
        return validate.isIp(val);
      }
    },
    confrim: {
      message: ":attribute veriler eşleşmiyor. ",
      rule: function (val, options, validator) {
        let confrimVal = document.querySelector("[name='" + options[0] + "']").value;
        return confrimVal == val;
      }
    }
  }
};
const Validator = new SimpleReactValidator(customValid);
export default Validator;