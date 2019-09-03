import React from "react";
import {observer} from "mobx-react/index";
import PropTypes from "prop-types";
import {Card, CardHeader, CardTitle, CardBody, CardFooter} from "reactstrap";
import Utils from "../Utils/Utils";


@observer
export default class Panel extends React.Component {

    // key= Utils.ShortId.generate();
    static defaultProps = {
        config: {},
        options: {},
        optionsBody: {},
        optionsTitle: {},
        optionsHeader: {},
        optionsFooter: {},
        title: false,
        header: "Panel Title",
        footer: false,
        items: [],
        xtype: "panel",
    };

    constructor(props) {
        super(props);
        this.key = this.props._key || Utils.ShortId.generate();
        this.childRender = this.childRender.bind(this);
    }

    /**
     *
     * @param items
     * @returns {any}
     */
    childRender(items = []) {

        return Utils.isArray(items) ? items.map((E, i) => {

            //CAP.Log(this.key,E,i)
            //E.key = this.key + "-child-item-" + i;
            if (E.hasOwnProperty("xtype"))
                return Utils.createElement(E);

            if ((typeof  E.$$typeof) == "symbol")
                return <React.Fragment key={E.key}>{E}</React.Fragment>;

            return <E key={this.key + "-child-item-" + i}/>;
        }) : null;
    }

    /**
     *
     * @param children
     * @returns {*}
     */
    render(children = null) {
        children = children || this.props.items.length > 0 ? this.childRender(this.props.items) : null;
        children = children || this.props.children || null;

        const footer = this.props.footer || null;
        const title = this.props.config.title || this.props.title;
        let header = this.props.header;
        if (this.props.config.hasOwnProperty("header")) {
            header = this.props.config.header;
        }

        //items var ise
        // if (children == null && this.props.items && this.props.items.length > 0)
        // children = this.props.items.map((e, i) => {
        //     e.key = this.key + "-child-item-" + i;
        //     if (e.hasOwnProperty("xtype"))
        //         return Utils.createElement(e);
        //     return e;
        // });


        //config içinde items var ise
        // if (children == null &&  this.props.config && this.props.config.items && this.props.config.items.length > 0)
        // children = this.props.config.items.map((E, i) => {
        //     E.key = this.key + "-child-item-" + i;
        //     if (E.hasOwnProperty("xtype"))
        //         return Utils.createElement(E);
        //
        //     if ((typeof  E.$$typeof) == "symbol")
        //         return <React.Fragment key={E.key}>{E}</React.Fragment>;
        //
        //     return <E key={this.key + "-child-item-" + i}/>;
        // });

        let optionsHeader = this.props.options.optionsHeader || this.props.config.optionsHeader || {};
        let optionsTitle = this.props.options.optionsTitle || this.props.config.optionsTitle || {};
        let optionsBody = this.props.options.optionsBody || this.props.config.optionsBody || {};
        let optionsFooter = this.props.options.optionsFooter || this.props.config.optionsFooter || {};
        //
        // delete this.props.options.optionsHeader;
        // delete this.props.options.optionsTitle;
        delete this.props.options.optionsBody;
        // delete this.props.options.optionsFooter;


        return <Card key={this.key + "-card"} {...this.props.options}>
            {header ? <CardHeader key={this.key + "-card-header"} {...optionsHeader}>{header}</CardHeader> : ""}
            {title ? <CardTitle key={this.key + "-card-title"} {...optionsTitle}>{title}</CardTitle> : ""}
            <CardBody key={this.key + "-card-body"} {...optionsBody}>{children}</CardBody>
            {footer ? <CardFooter key={this.key + "-card-footer"} {...optionsFooter}>{footer}</CardFooter> : ""}
        </Card>;


    }
}


Panel.propTypes = {
    config: PropTypes.object.isRequired,
    title: PropTypes.any,
    header: PropTypes.any,
    // children: PropTypes.element,
    items: PropTypes.array,
    options: PropTypes.any
};