import React from "react";
import {observer} from "mobx-react/index";
import PropTypes from "prop-types";
import {Card, CardHeader, CardTitle, CardBody, CardFooter, ButtonGroup} from "reactstrap";
import Utils from "../Utils/Utils";
import {ClassNames} from "capuiframework";


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
        title: null,
        header: null,
        footer: null,
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

            if ((typeof E.$$typeof) == "symbol")
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

        let _porps = Object.assign({}, this.props);
        let options = _porps.options;



        let optionsHeader = options.optionsHeader
            ? options.optionsHeader  : _porps.config.optionsHeader
                ? _porps.config.optionsHeader : _porps.optionsHeader
                    ? _porps.optionsHeader : {};

        let optionsTitle = options.optionsTitle
            ? options.optionsTitle  : _porps.config.optionsTitle
                ? _porps.config.optionsTitle : _porps.optionsTitle
                    ? _porps.optionsTitle : {};


        let optionsBody = options.optionsBody
            ? options.optionsBody  : _porps.config.optionsBody
                ? _porps.config.optionsBody : _porps.optionsBody
                ? _porps.optionsBody : {};

        let optionsFooter = options.optionsFooter
            ? options.optionsFooter  : _porps.config.optionsFooter
                ? _porps.config.optionsFooter : _porps.optionsFooter
                    ? _porps.optionsFooter : {};


        let header = options.header
            ? options.header  : _porps.config.header
                ? _porps.config.header : _porps.header
                    ? _porps.header : null;


        let title = options.title
            ? options.title  : _porps.config.title
                ? _porps.config.title : _porps.title
                    ? _porps.title : null;

        let footer = options.footer
            ? options.footer  : _porps.config.footer
                ? _porps.config.footer : _porps.footer
                    ? _porps.footer : null;


        let tools = options.tools
            ? options.tools  : _porps.config.tools
                ? _porps.config.tools : _porps.tools
                    ? _porps.tools : null;

        let className = ClassNames("card", _porps.className);
        let TitleClassName = ClassNames(optionsTitle.className || {});
        let HeaderClassName = ClassNames(optionsHeader.className || {});
        let BodyClassName = optionsBody ? ClassNames(optionsBody.className || {}) : {} ;


        children = children || _porps.items.length > 0 ? this.childRender(_porps.items) : null;
        children = children || _porps.children || null;

        // let header = _porps.header;
        // if (_porps.config.hasOwnProperty("header")) {
        //     header = _porps.config.header;
        // }

        //
        _porps.options = null;
        _porps.config = null;
        _porps.optionsBody = null;
        _porps.optionsTitle = null;
        _porps.optionsHeader = null;
        _porps.optionsFooter = null;
        _porps.xtype = null;
        _porps.items = null;
        _porps.title = null;
        _porps.header = null;
        _porps.footer = null;

        delete _porps.options;
        delete _porps.tools;
        delete _porps.config;
        delete _porps.optionsBody;
        delete _porps.optionsTitle;
        delete _porps.optionsHeader;
        delete _porps.optionsFooter;
        delete _porps.xtype;
        delete _porps.items;
        delete _porps.title;
        delete optionsBody.className;


        return <Card key={this.key + "-card"} className={className} {..._porps}>
            {header ?
                <CardHeader key={this.key + "-card-header"} className={HeaderClassName}><span>{header}</span>
                    {tools? <ButtonGroup size="sm" className={"pull-right"}>{tools}</ButtonGroup>:""}
                </CardHeader> : ""}
            {title ? <CardTitle key={this.key + "-card-title"} className={TitleClassName}>{title}</CardTitle> : ""}
            {_porps.body ? children :
                <CardBody key={this.key + "-card-body"} className={BodyClassName} {...optionsBody}>{children}</CardBody>
            }
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