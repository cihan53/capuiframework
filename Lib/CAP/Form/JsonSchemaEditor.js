/*
 * Copyright (c) 2018. CreyptTech Yazılım
 * Author : Cihan Ozturk
 *
 */

import React from "react";
import PropTypes from "prop-types";

const JsonEditor = require("@json-editor/json-editor");
// var GenerateSchema = require('generate-schema');

/*
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                           Option                                                                                                          |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ajax                     | If true, JSON Editor will load external URLs in $ref via ajax.                                                                                        | false         | Adam  | Robert | Paul  |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| compact                  | If true, the label will not be displayed/added.                                                                                                       |         false |  2:05 |   1:15 |  1:41 |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| disable_array_add        | If true, remove all "add row" buttons from arrays.                                                                                                    |         false | 14:10 |  15:45 | 16:00 |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| disable_array_delete     | If true, remove all "delete row" buttons from arrays.                                                                                                 |         false |   55% |    90% |   88% |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| disable_array_reorder    | If true, remove all "move up" and "move down" buttons from arrays.                                                                                    | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| enable_array_copy        | If true, add copy buttons to arrays.                                                                                                                  | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| disable_collapse         | If true, remove all collapse buttons from objects and arrays.                                                                                         | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| disable_edit_json        | If true, remove all Edit JSON buttons from objects.                                                                                                   | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| disable_properties       | If true, remove all Edit Properties buttons from objects.                                                                                             | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
|                          |                                                                                                                                                       |               |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| array_controls_top       | If true, array controls (add, delete etc) will be displayed at top of list.                                                                           | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| form_name_root           | The first part of the `name` attribute of form inputs in the editor. An full example name is `root[person][name]` where "root" is the form_name_root. | root          |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| iconlib                  | The icon library to use for the editor. See the CSS Integration section below for more info.                                                          | null          |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| no_additional_properties | If true, objects can only contain properties defined with the propertieskeyword.                                                                      | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| refs                     | An object containing schema definitions for URLs. Allows you to pre-define external schemas.                                                          | {}            |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| required_by_default      | If true, all schemas that don't explicitly set the required property will be required.                                                                | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| keep_oneof_values        | If true, makes oneOf copy properties over when switching.                                                                                             | true          |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| schema                   | A valid JSON Schema to use for the editor. Version 3 and Version 4 of the draft specification are supported.                                          | {}            |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| show_errors              | When to show validation errors in the UI. Valid values are interaction, change, always, and never.                                                    | "interaction" |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| startval                 | Seed the editor with an initial value. This should be valid against the editor's schema.                                                              | null          |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| template                 | The JS template engine to use. See the Templates and Variables section below for more info.                                                           | default       |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| theme                    | The CSS theme to use. See the CSS Integration section below for more info.                                                                            | html          |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| display_required_only    | If true, only required properties will be included by default.                                                                                        | false         |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
| prompt_before_delete     | If true, displays a dialog box with a confirmation message before node deletion.                                                                      | true          |       |        |       |
+--------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------+--------+-------+
 */

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


// Translation strings and default languages
JsonEditor.defaults.default_language = "tr";
JsonEditor.defaults.language = JsonEditor.defaults.default_language;
JsonEditor.defaults.languages.tr = {
  /**
   * When a property is not set
   */
  error_notset: "Property must be set",
  /**
   * When a string must not be empty
   */
  error_notempty: "Value required",
  /**
   * When a value is not one of the enumerated values
   */
  error_enum: "Value must be one of the enumerated values",
  /**
   * When a value doesn't validate any schema of a 'anyOf' combination
   */
  error_anyOf: "Value must validate against at least one of the provided schemas",
  /**
   * When a value doesn't validate
   * @variables This key takes one variable: The number of schemas the value does not validate
   */
  error_oneOf: "Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.",
  /**
   * When a value does not validate a 'not' schema
   */
  error_not: "Value must not validate against the provided schema",
  /**
   * When a value does not match any of the provided types
   */
  error_type_union: "Value must be one of the provided types",
  /**
   * When a value does not match the given type
   * @variables This key takes one variable: The type the value should be of
   */
  error_type: "Value must be of type {{0}}",
  /**
   *  When the value validates one of the disallowed types
   */
  error_disallow_union: "Value must not be one of the provided disallowed types",
  /**
   *  When the value validates a disallowed type
   * @variables This key takes one variable: The type the value should not be of
   */
  error_disallow: "Value must not be of type {{0}}",
  /**
   * When a value is not a multiple of or divisible by a given number
   * @variables This key takes one variable: The number mentioned above
   */
  error_multipleOf: "Value must be a multiple of {{0}}",
  /**
   * When a value is greater than it's supposed to be (exclusive)
   * @variables This key takes one variable: The maximum
   */
  error_maximum_excl: "Value must be less than {{0}}",
  /**
   * When a value is greater than it's supposed to be (inclusive
   * @variables This key takes one variable: The maximum
   */
  error_maximum_incl: "Value must be at most {{0}}",
  /**
   * When a value is lesser than it's supposed to be (exclusive)
   * @variables This key takes one variable: The minimum
   */
  error_minimum_excl: "Value must be greater than {{0}}",
  /**
   * When a value is lesser than it's supposed to be (inclusive)
   * @variables This key takes one variable: The minimum
   */
  error_minimum_incl: "Value must be at least {{0}}",
  /**
   * When a value have too many characters
   * @variables This key takes one variable: The maximum character count
   */
  error_maxLength: "Value must be at most {{0}} characters long",
  /**
   * When a value does not have enough characters
   * @variables This key takes one variable: The minimum character count
   */
  error_minLength: "Value must be at least {{0}} characters long",
  /**
   * When a value does not match a given pattern
   */
  error_pattern: "Value must match the pattern {{0}}",
  /**
   * When an array has additional items whereas it is not supposed to
   */
  error_additionalItems: "No additional items allowed in this array",
  /**
   * When there are to many items in an array
   * @variables This key takes one variable: The maximum item count
   */
  error_maxItems: "Value must have at most {{0}} items",
  /**
   * When there are not enough items in an array
   * @variables This key takes one variable: The minimum item count
   */
  error_minItems: "Value must have at least {{0}} items",
  /**
   * When an array is supposed to have unique items but has duplicates
   */
  error_uniqueItems: "Array must have unique items",
  /**
   * When there are too many properties in an object
   * @variables This key takes one variable: The maximum property count
   */
  error_maxProperties: "Object must have at most {{0}} properties",
  /**
   * When there are not enough properties in an object
   * @variables This key takes one variable: The minimum property count
   */
  error_minProperties: "Object must have at least {{0}} properties",
  /**
   * When a required property is not defined
   * @variables This key takes one variable: The name of the missing property
   */
  error_required: "Object is missing the required property '{{0}}'",
  /**
   * When there is an additional property is set whereas there should be none
   * @variables This key takes one variable: The name of the additional property
   */
  error_additional_properties: "No additional properties allowed, but property {{0}} is set",
  /**
   * When a dependency is not resolved
   * @variables This key takes one variable: The name of the missing property for the dependency
   */
  error_dependency: "Must have property {{0}}",
  /**
   * Text on Delete All buttons
   */
  button_delete_all: "Hepsi",
  /**
   * Title on Delete All buttons
   */
  button_delete_all_title: "Delete All",
  /**
   * Text on Delete Last buttons
   * @variable This key takes one variable: The title of object to delete
   */
  button_delete_last: "Sonraki {{0}}",
  /**
   * Title on Delete Last buttons
   * @variable This key takes one variable: The title of object to delete
   */
  button_delete_last_title: "Delete Last {{0}}",
  /**
   * Title on Add Row buttons
   * @variable This key takes one variable: The title of object to add
   */
  button_add_row_title: "Ekle {{0}}",
  /**
   * Title on Move Down buttons
   */
  button_move_down_title: "Aşağı",
  /**
   * Title on Move Up buttons
   */
  button_move_up_title: "Yukarı",
  /**
   * Title on Delete Row buttons
   * @variable This key takes one variable: The title of object to delete
   */
  button_delete_row_title: "Sil {{0}}",
  /**
   * Title on Delete Row buttons, short version (no parameter with the object title)
   */
  button_delete_row_title_short: "Sil",
  /**
   * Title on Collapse buttons
   */
  button_collapse: "Daralt",
  /**
   * Title on Expand buttons
   */
  button_expand: "Genişlet"
};


// var jsoneditor = null;
window.jsoneditor = {};

var schema = {
  schema: {
    type: "object",
    "$schema": "http://json-schema.org/draft-04/schema#",
    options: {
      disable_edit_json: true,
      form_name_root: "root"
    }
  }
};


export default class JsonSchemaEditor extends React.Component {
  constructor(props) {
    super(props);
    this.newEditor = this.newEditor.bind(this);
    this.containerelement = React.createRef();
    this.state = {
      // keyid :this.props.key,
      root: this.props.root

    };

    this.jsoneditor = null;
    if (this.props.editoroptions) {
      JsonEditor.defaults.editors.object.options = Object.assign(JsonEditor.defaults.editors.object.options, this.props.editoroptions);
    }


    schema.schema.options.form_name_root=this.props.root;

  }

  componentDidMount() {
    this.newEditor(this.props.schema, this.props.values);
  }

  shouldComponentUpdate(newProps, newState) {
    this.newEditor(newProps.schema, newProps.values);
    return true;
  }


  newEditor(newSchema, values = {}) {
    if (this.jsoneditor) this.jsoneditor.destroy();

    schema.schema = Object.assign(schema.schema, newSchema);
    schema.startval = values;


    this.jsoneditor = new JsonEditor(this.containerelement.current, schema);

    if(this.props.onChange){

      this.jsoneditor.on('change', this.props.onChange);
    }

    let o = {};
    o[this.props.root] = this.jsoneditor;
    window.jsoneditor = Object.assign(window.jsoneditor, o);
  }

  getValues() {
    return this.jsoneditor.getValue();
  }

  validate() {
    return this.jsoneditor.validate();
  }


  render() {
    return (
      <React.Fragment>
        <div>
          <div ref={this.containerelement}></div>
        </div>
      </React.Fragment>
    );
  }

}

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