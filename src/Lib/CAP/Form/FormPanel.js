import React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react/index";
import PropTypes from "prop-types";
import Utils from "../Utils/Utils";
import Panel from "../Panel/Panel";
import {Button, Form} from "reactstrap";

import Validator from "../Utils/Validator";
import {Xtypes} from "../../../Initialization";


@observer
export default class FormPanel extends React.Component{

    // key= Utils.ShortId.generate();
    static defaultProps = {
        name: "form-panel",
        onSubmit: (e) => {

        },
        config: {},
        options: {},
        optionsBody: {},
        optionsTitle: {},
        optionsHeader: {},
        optionsFooter: {},
        title: true,
        header: "Panel Title",
        footer: false,
        items: [],
        store: null,
        xtype: "formpanel",
        layout: null
    };

    constructor(props) {
        super(props);
        this.key = this.props.key || Utils.ShortId.generate();
        this.submit = this.submit.bind(this)
        this.getValues = this.getValues.bind(this)
        this.createItems = this.createItems.bind(this);

        if (Utils.isEmpty(this.props.config.footer)) {
            this.props.config.footer = [
                <Button type={"submit"} key={this.key + "-save-btn"} form={this.props.name}><i className="fa fa-dot-circle-o"/> {Utils.Translate("Save")}</Button>
            ];
        }

        this.formRef = React.createRef();
        this.children = null;
        this.Validator = Validator;

    }

    submit(event) {
        event.preventDefault();
        let values = this.getValues();
        this.props.onSubmit(values, this)
    }

    /**
     *
     */
    isValid() {
        let valid = true;
        let values = this.getValues();
        if (this.props.store != null) {
            valid = this.props.store.validate(values);
        } else {
            return this.validate(values);
        }

        return valid;
    }

    validate(data, scenario = "default") {
        this.validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {message: val.message});
    }

    /**
     * form values
     */
    getValues() {
        let values = {};
        if (this.props.store == null) {
            const formData = new FormData(ReactDOM.findDOMNode(this.formRef.current))
            for (let entry of formData.entries()) {
                values[entry[0]] = values[1]
            }
        } else {
            values = this.props.store.Attributes;
        }


        return values;
    }

    /**
     *
     */
    createItems() {
        this.children = this.props.items.map((e, i) => {
            e.id = this.props.name + "-child-item-" + i;
            e.key = this.key + "-child-item-" + i;
            e.store = this.props.store || null;
            e.layout = this.props.layout || null;
            if (e.hasOwnProperty("xtype")) {
                //return Utils.CreateComponent(e);
                const Cp = observer((message) => {
                    const Container = Xtypes[e.xtype]
                    return <Container {...message}/>
                })


                // const Cp = Observer(Xtypes[e.xtype]);
                return <Cp p={e}/>
            } else {
                return Utils.createElement(e);
            }
            // return Utils.CreateComponent(e);
            // return e;
        });
    }

    UNSAFE_componentWillMount() {
        this.createItems();
    }

    _renderItem(){
        const _Panel = new Panel(this.props);
        return _Panel.render(this.children);
    }

    render() {


        return <Form ref={this.formRef} id={this.props.name} name={this.props.name} onSubmit={e => this.submit(e)}>
            {this._renderItem()}
        </Form>;
    }

}


FormPanel.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    title: PropTypes.any,
    header: PropTypes.any,
    items: PropTypes.array,
    options: PropTypes.any,
    store: PropTypes.any
};