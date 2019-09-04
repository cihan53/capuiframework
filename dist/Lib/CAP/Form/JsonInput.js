function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _possibleConstructorReturn(a,b){return b&&("object"==typeof b||"function"==typeof b)?b:_assertThisInitialized(a)}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}import PropTypes from"prop-types";import JSONInput from"react-json-editor-ajrm";import locale from"react-json-editor-ajrm/locale/en";import React from"react";let JsonInput=function(a){function b(a){var c;return _classCallCheck(this,b),c=_possibleConstructorReturn(this,_getPrototypeOf(b).call(this,a)),c.placeholder={},c.state={placeholder:c.props.placeholder||{}},c.placeholder=c.props.placeholder||{},c.onChange=c.props.onChange||c.onChange.bind(_assertThisInitialized(c)),c.getValues=c.getValues.bind(_assertThisInitialized(c)),c}return _inherits(b,a),_createClass(b,[{key:"componentWillUpdate",value:function componentWillUpdate(a,b){this.state==b&&(this.placeholder=a.placeholder)}},{key:"onChange",value:function onChange(a){!1==a.error?(this.placeholder=a.jsObject,this.setState({placeholder:a.jsObject})):this.placeholder=null}},{key:"getValues",value:function getValues(){return this.placeholder}},{key:"render",value:function render(){return React.createElement(JSONInput,_extends({},this.props,{placeholder:this.placeholder,onChange:this.onChange}))}}]),b}(React.Component);export{JsonInput as default};JsonInput.propTypes={id:PropTypes.string.isRequired,onKeyPressUpdate:PropTypes.bool,waitAfterKeyPress:PropTypes.number,modifyErrorText:PropTypes.func,theme:PropTypes.string,colors:PropTypes.object,style:PropTypes.object,locale:PropTypes.object,reset:PropTypes.bool,viewOnly:PropTypes.bool,onChange:PropTypes.func,confirmGood:PropTypes.bool,width:PropTypes.string,height:PropTypes.string},JsonInput.defaultProps={id:"a_unique_id",colors:{},locale:locale};