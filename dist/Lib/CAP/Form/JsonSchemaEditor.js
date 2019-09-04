function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from "react";
import PropTypes from "prop-types";

const JsonEditor = require("@json-editor/json-editor");

JsonEditor.plugins.selectize.enable = false;
JsonEditor.defaults.options.theme = "bootstrap4";
JsonEditor.defaults.options.no_additional_properties = false;
JsonEditor.defaults.options.disable_collapse = true;
JsonEditor.defaults.options.object_layout = "normal";
JsonEditor.defaults.options.disable_edit_json = true;
JsonEditor.defaults.options.disable_properties = true;
JsonEditor.defaults.options.array_controls_top = true;
JsonEditor.defaults.options.disable_collapse = true;
JsonEditor.defaults.editors.object.options.collapsed = false;
JsonEditor.defaults.editors.object.options.disable_collapse = true;
JsonEditor.defaults.editors.object.options.disable_array_add = true;
JsonEditor.defaults.editors.object.options.disable_array_delete = true;
JsonEditor.defaults.editors.object.options.disable_array_delete_all_rows = true;
JsonEditor.defaults.editors.object.options.disable_array_delete_last_row = true;
JsonEditor.defaults.editors.object.options.disable_array_reorder = true;
JsonEditor.defaults.editors.object.options.disable_edit_json = true;
JsonEditor.defaults.editors.object.options.disable_properties = true;
JsonEditor.defaults.options.iconlib = "fontawesome4";
JsonEditor.defaults.options["required_by_default"] = true;
JsonEditor.defaults.iconlibs.fontawesome4 = JsonEditor.AbstractIconLib.extend({
  mapping: {
    collapse: "minus",
    expand: "plus",
    "delete": "times",
    edit: "pencil",
    add: "plus",
    cancel: "ban",
    save: "save",
    moveup: "arrow-up",
    movedown: "arrow-down",
    copy: "files-o"
  },
  icon_prefix: "fa fa-"
});
JsonEditor.defaults.default_language = "tr";
JsonEditor.defaults.language = JsonEditor.defaults.default_language;
JsonEditor.defaults.languages.tr = {
  error_notset: "Property must be set",
  error_notempty: "Value required",
  error_enum: "Value must be one of the enumerated values",
  error_anyOf: "Value must validate against at least one of the provided schemas",
  error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.",
  error_not: "Value must not validate against the provided schema",
  error_type_union: "Value must be one of the provided types",
  error_type: "Value must be of type {{0}}",
  error_disallow_union: "Value must not be one of the provided disallowed types",
  error_disallow: "Value must not be of type {{0}}",
  error_multipleOf: "Value must be a multiple of {{0}}",
  error_maximum_excl: "Value must be less than {{0}}",
  error_maximum_incl: "Value must be at most {{0}}",
  error_minimum_excl: "Value must be greater than {{0}}",
  error_minimum_incl: "Value must be at least {{0}}",
  error_maxLength: "Value must be at most {{0}} characters long",
  error_minLength: "Value must be at least {{0}} characters long",
  error_pattern: "Value must match the pattern {{0}}",
  error_additionalItems: "No additional items allowed in this array",
  error_maxItems: "Value must have at most {{0}} items",
  error_minItems: "Value must have at least {{0}} items",
  error_uniqueItems: "Array must have unique items",
  error_maxProperties: "Object must have at most {{0}} properties",
  error_minProperties: "Object must have at least {{0}} properties",
  error_required: "Object is missing the required property '{{0}}'",
  error_additional_properties: "No additional properties allowed, but property {{0}} is set",
  error_dependency: "Must have property {{0}}",
  button_delete_all: "Hepsi",
  button_delete_all_title: "Delete All",
  button_delete_last: "Sonraki {{0}}",
  button_delete_last_title: "Delete Last {{0}}",
  button_add_row_title: "Ekle {{0}}",
  button_move_down_title: "Aşağı",
  button_move_up_title: "Yukarı",
  button_delete_row_title: "Sil {{0}}",
  button_delete_row_title_short: "Sil",
  button_collapse: "Daralt",
  button_expand: "Genişlet"
};
window.jsoneditor = {};

let JsonSchemaEditor = function (_React$Component) {
  _inherits(JsonSchemaEditor, _React$Component);

  function JsonSchemaEditor(props) {
    var _this;

    _classCallCheck(this, JsonSchemaEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JsonSchemaEditor).call(this, props));
    _this.schema = {
      schema: {
        type: "object",
        "$schema": "http://json-schema.org/draft-04/schema#",
        options: {
          disable_edit_json: true,
          disable_properties: true,
          form_name_root: "root"
        }
      }
    };
    _this.newEditor = _this.newEditor.bind(_assertThisInitialized(_this));
    _this.containerelement = React.createRef();
    _this.state = {
      root: _this.props.root
    };
    _this.jsoneditor = null;

    if (_this.props.editoroptions) {
      JsonEditor.defaults.editors.object.options = Object.assign(JsonEditor.defaults.editors.object.options, _this.props.editoroptions);
    }

    _this.schema.schema.options.form_name_root = _this.props.root;
    return _this;
  }

  _createClass(JsonSchemaEditor, [{
    key: "UNSAFE_componentDidMount",
    value: function UNSAFE_componentDidMount() {
      this.newEditor(this.props.schema, this.props.values);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps, newState) {
      this.newEditor(newProps.schema, newProps.values);
      return true;
    }
  }, {
    key: "newEditor",
    value: function newEditor(newSchema, values = {}) {
      if (this.jsoneditor) this.jsoneditor.destroy();
      this.schema.schema = Object.assign(this.schema.schema, newSchema);
      this.schema.startval = values;
      this.jsoneditor = new JsonEditor(this.containerelement.current, this.schema);

      if (this.props.onChange) {
        this.jsoneditor.on('change', this.props.onChange);
      }

      let o = {};
      o[this.props.root] = this.jsoneditor;
      window.jsoneditor = Object.assign(window.jsoneditor, o);
    }
  }, {
    key: "getValues",
    value: function getValues() {
      return this.jsoneditor.getValue();
    }
  }, {
    key: "validate",
    value: function validate() {
      return this.jsoneditor.validate();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, React.createElement("div", null, React.createElement("div", {
        ref: this.containerelement
      })));
    }
  }]);

  return JsonSchemaEditor;
}(React.Component);

export { JsonSchemaEditor as default };
JsonSchemaEditor.propTypes = {
  root: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired
};
JsonSchemaEditor.defaultProps = {
  root: "root",
  values: {},
  editoroptions: {},
  schema: {}
};