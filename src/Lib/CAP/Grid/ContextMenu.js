import React from "react";
import Utils from "../Utils/Utils";

export default class ContextMenu extends React.Component {
    state = {
        visible: false
    };


    UNSAFE_componentDidMount() {
        // document.addEventListener("contextmenu", this._handleContextMenu);
        if (document.getElementById(this.props.container)) {
            document.getElementById(this.props.container).addEventListener("click", this._handleClick);
            document.getElementById(this.props.container).addEventListener("scroll", this._handleScroll);
        }
    };


    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (document.getElementById(this.props.container)) {
            document.getElementById(this.props.container).addEventListener("click", this._handleClick);
            document.getElementById(this.props.container).addEventListener("scroll", this._handleScroll);
        }
    }

    componentWillUnmount() {
        // document.removeEventListener("contextmenu", this._handleContextMenu);

        if (document.getElementById(this.props.container)) {
            document.getElementById(this.props.container).removeEventListener("click", this._handleClick);
            document.getElementById(this.props.container).removeEventListener("scroll", this._handleScroll);
            // this.root.remove();
        }
    }

    _handleContextMenu = (event, field = null, data = null) => {
        event.preventDefault();

        this.setState({visible: true, field: field, target: data});


        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;

        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;

        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }

        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }

        if (top) {
            this.root.style.top = `${clickY + 5}px`;
        }

        if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
        }
    };

    _handleClick = (event) => {
        const {visible} = this.state;
        const wasOutside = !(event.target.contains === this.root);

        if (wasOutside && visible) {
            this.setState({visible: false});
        }
    };

    _handleScroll = () => {
        const {visible} = this.state;

        if (visible) this.setState({visible: false});
    };

    show = (event, field, data) => {
        //this.setState({visible:visible});
        this._handleContextMenu(event, field, data);
    };

    clickItem(type, event) {
        this.props.clickItem(type, this.state);
        if (this.state.visible) this.setState({visible: false});
    }

    render() {
        const {visible} = this.state;

        let disabled = " contextMenu--option__disabled";
        if (!Utils.isEmpty(this.state.target)) {
            disabled = "";
        }

        return <React.Fragment>
            <div style={{"display": visible ? "block" : "none"}} ref={ref => {
                this.root = ref;
            }} className="contextMenu">
                <div className="contextMenu--label">
                    {Utils.__t("Filtre: ':data'", {data: this.state.target})}
                </div>
                <div className="contextMenu--separator"/>
                <div
                    className="contextMenu--option"
                    onClick={event => this.clickItem("eq", event)}
                >
                    {Utils.__t("Eşit (=':data')", {data: this.state.target})}
                </div>
                <div
                    className="contextMenu--option"
                    onClick={event => this.clickItem("noteq", event)}
                >
                    {Utils.__t("Eşit Değil (!=':data')", {data: this.state.target})}
                </div>
                <div
                    className="contextMenu--option"
                    onClick={event => this.clickItem("startWith", event)}
                >
                    {Utils.__t("Başlayan (like '%:data')", {data: this.state.target})}
                </div>
                <div
                    className="contextMenu--option"
                    onClick={event => this.clickItem("endWith", event)}
                >
                    {Utils.__t("Biten (like ':data%')", {data: this.state.target})}
                </div>
                <div
                    className="contextMenu--option"
                    onClick={event => this.clickItem("contains", event)}
                >
                    {Utils.__t("İçeren (like '%:data%')", {data: this.state.target})}
                </div>
                <div
                    className="contextMenu--option"
                    onClick={event => this.clickItem("not-contains", event)}
                >
                    {Utils.__t("İçermeyen (not like '%:data%')", {data: this.state.target})}
                </div>
                <div
                    className={"contextMenu--option" + disabled} onClick={event => this.clickItem("gt", event)}
                >
                    {Utils.__t("Büyük (> ':data')", {data: this.state.target})}
                </div>
                <div
                    className={"contextMenu--option" + disabled}
                    onClick={event => this.clickItem("gte", event)}
                >
                    {Utils.__t("Büyük Eşit (>= ':data')", {data: this.state.target})}
                </div>
                <div
                    className={"contextMenu--option" + disabled}
                    onClick={event => this.clickItem("lt", event)}
                >
                    {Utils.__t("Küçük (< ':data')", {data: this.state.target})}
                </div>
                <div
                    className={"contextMenu--option" + disabled}
                    onClick={event => this.clickItem("lte", event)}
                >
                    {Utils.__t("Küçük Eşit (<= ':data')", {data: this.state.target})}
                </div>
                {/*<div className="contextMenu--option contextMenu--option__disabled">View full version</div>*/}
                {/*<div className="contextMenu--option">About this app</div>*/}
            </div>
        </React.Fragment>;
    };
}