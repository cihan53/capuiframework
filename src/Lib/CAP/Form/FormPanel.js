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
export default class FormPanel extends React.Component {

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
        this.getValues = this.getValues.bind(this)
        this.createItems = this.createItems.bind(this);


        if (Utils.isBoolean(this.props.footer) && this.props.footer != false && Utils.isEmpty(this.props.footer)) {
            this.props.config.footer = [
                <Button type={"submit"} key={this.key + "-save-btn"} form={this.props.name}><i
                    className="fa fa-dot-circle-o"/> {Utils.__t("Kayıt")}</Button>
            ];
        }

        this.formRef = React.createRef();
        this.children = null;
        this.Validator = Validator;



        this.createItems();

    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (prevProps != this.props)
    //         this.createItems();
    //     return true;
    // }


    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     if (prevProps != this.props)
    //         this.createItems();
    // }



    /**
     *
     * @param event
     * @returns {boolean}
     */
    submit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let values = this.getValues();
        this.props.onSubmit(values, this, event);
        return false;
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
        // this.Rules.forEach(function (val) {
        this.children.forEach(val => {
            this.Validator.message(val.name, data[val.name] !== undefined ? data[val.name] : "", val.rule, {message: val.message || ""});
        })
    }

    /**
     * form values
     */
    getValues() {
        let values = {};
        if (this.props.store == null) {
            const formData = new FormData(ReactDOM.findDOMNode(this.formRef.current))
            for (let entry of formData.entries()) {
                values[entry[0]] = entry[1]
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
        return  this.props.children || this.props.items.map((e, i) => {
            e.id = this.props.name + "-child-item-" + i;
            e.key = this.key + "-child-item-" + i;
            e.store = this.props.store || null;
            e.layout = this.props.layout || null;
            if (e.hasOwnProperty("xtype")) {
                //return Utils.CreateComponent(e);
                const Cp = observer((message) => {
                    const Container = Xtypes[e.xtype]
                    return <Container {...message}/>
                });
                return <Cp p={e}/>
            } else {
                return Utils.createElement(e);
            }
            // return Utils.CreateComponent(e);
            // return e;
        });
    }


    _renderItem() {
        return <Panel {...this.props}>{this.children}</Panel>
    }

    render() {

        let children = this.createItems();

        return <Panel {...this.props}>
            <Form ref={this.formRef} id={this.props.name} name={this.props.name} onSubmit={e => this.submit(e)}>
                {children}
            </Form>
        </Panel>


    }

}


FormPanel.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    config: PropTypes.any,
    title: PropTypes.any,
    header: PropTypes.any,
    footer: PropTypes.any,

    items: PropTypes.array,
    options: PropTypes.any,
    store: PropTypes.any
};