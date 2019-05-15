/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import Utils from "./Utils";
import SimpleReactValidator from "simple-react-validator";

let customValid = {
    className: "text-danger",
    validators: {
        empty: { // name the rule
            message: "The :attribute must be a valid value.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val, options) {
                return !Utils.isEmpty(val);
            }
        },
        each: { // name the rule
            message: "The :attribute must be a valid value.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val, options) {

                if (val.length == 0) return true;

                let v = val.filter(function (r) {
                    return eval(options[0] + "(" + r + ")");
                });
                return v.length > 0;
            }
        },
        date: { // name the rule
            message: "The :attribute must be a valid value.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val, params) {

                let date = Date.parse(val);
                return !isNaN(date) ? new Date(date) : null;
            }
        },

        alpha_num_dash_space: { // name the rule
            message: "The :attribute must be a valid value.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val, params, validator) {
                return validator.helpers.testRegex(val, /^[A-Z0-9_\-\s.,]*$/i);
            }
        },
        string: { // name the rule
            message: "The :attribute must be a valid value.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val, params, validator) {
                return validator.helpers.testRegex(val, /^[\w'\-_,.0-9][^!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
            }
        },
        password: { // name the rule
            message: "The :attribute must be a valid value.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val, params, validator) {

                if (val == "") return true;
                //if( this.fields )
                return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/);
            }
        },
        boolean: { // name the rule
            message: "The :attribute must be a valid value.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val) {
                return (["true", "false", "1", "0"].indexOf(val.toString()) >= 0);
            }
        },
        ip: { // name the rule
            message: "The :attribute must be a valid IP address.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val, options, validator) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                // check that it is a valid IP address and is not blacklisted
                return validator.helpers.testRegex(val, /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && options.indexOf(val) === -1;
            }
        },
        ip2: { // name the rule
            message: "The :attribute must be a valid IP address.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function (val, options, validator) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                // check that it is a valid IP address and is not blacklisted
                var validate = require("ip-subnet-calculator");

                if (val == "") return true;

                return validate.isIp(val);  // validator.helpers.testRegex(val,/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) && options.indexOf(val) === -1
            }
        },

        confrim: { // name the rule
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