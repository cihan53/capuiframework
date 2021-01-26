/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */


import React, {Component} from "react";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import CAP, {Button, Col, FormField, FormPanel, Panel, Row, SwitchField, Grid} from "../../src/";
import './App.scss'
import OptionStore from "./Stores/OptionStore";
import AssetStore from "./Stores/AssetStore";

CAP.Stores.add("AssetStore", AssetStore);
CAP.Stores.add("OptionStore", OptionStore);

@withRouter
@observer
class App extends Component {
    columns = [{
        dataField: "id",
        text: CAP.__t("Id"),
        hidden: true
    }, {
        dataField: "ip",
        text: CAP.__t("ip"),
    }, {
        dataField: "username",
        text: CAP.__t("Kullanıcı adı"),

    }, {
        dataField: "typename",
        text: CAP.__t("typename"),
        // filter: {
        //     name: "select2",
        //     type: "NUMBER",
        //     props: {
        //         autoload: false,
        //         isClearable: false,
        //         isMulti: true,
        //         store: "OptionStore",
        //         inputName: "typenameSelect",
        //         displayField: "name",
        //         valueField: "id",
        //         styles: {
        //             container: (provided, state) => ({
        //                 width: 400,
        //                 float:"right"
        //             })
        //         }
        //     }
        // }
    }, {
        dataField: "hostname",
        text: CAP.__t("hostname"),
    },
    ];

    constructor(props) {
        super(props)
        this.rule = [];
        this.state = {
            textField: null,
            error: null,
            keyword:[]
        }
        this.grid=React.createRef();
        this.onChange = this.onChange.bind(this);
        OptionStore.load();
    }



    onChange(e, obj) {
        let s = this.state;
        s[e.target.name] = e.target.value;
        this.setState(s)
    }

    render() {
        return (
            <div className="app">
                <div className="app-body">
                    <div className="main">
                        <Row>
                            <Col lg={10}>
                                <p>Form Examples</p>
                                <FormPanel>
                                    <FormField.Text label={"Test TextField"} inputName={"textField"}
                                                    onChange={(e, obj) => this.onChange(e, obj)}/>
                                    <FormField.ComboBox

                                        label={"Test ComoboBox"}
                                        onChange={(e, obj) => this.onChange(e, obj)}
                                        valueField={"value"}
                                        displayField={"name"}
                                        inputName={"test"}
                                        items={[{value: "safa", name: "safdasdf"}]}
                                    />
                                    <SwitchField onChange={(e, v) => {
                                        alert(e)
                                    }}/>


                                    <FormField.Select2
                                        autoload={false}
                                        name={"select2"}
                                        displayField={"name"}
                                        valueField={"id"}
                                        label={"Select 2"}
                                        text={"Burası açıklama"}
                                        isMulti
                                        store={"OptionStore"}
                                        onChange={(e, meta) => {
                                            console.log("cihan", e, meta)
                                        }}

                                    >
                                    </FormField.Select2>
                                </FormPanel>
                            </Col>
                            <Col lg={10}>
                                <p>Grid Examples</p>
                                <Panel>
                                    <FormField.Select2
                                        autoload={false}
                                        name={"select3"}
                                        displayField={"name"}
                                        valueField={"id"}
                                        label={"Grid Filter"}
                                        text={"Burası açıklama"}
                                        isMulti
                                        store={"OptionStore"}
                                        onChange={(e, meta) => {
                                            this.grid.current.store.setParameters({filter:{"cihan":"asdf"}});
                                            this.grid.current.store.load()
                                            console.log("Store parametresi güncellendi")
                                        }}

                                    >
                                    </FormField.Select2>
                                    <Grid
                                        ref={this.grid}
                                        {...{
                                            keyField: "id",
                                            store: "AssetStore",
                                            panelOptions: {
                                                header: CAP.__t("Tablo Örnek")
                                            },
                                            autoload: true,
                                            pagination: true,
                                            defaultSortDirection: "desc",
                                            columns: this.columns,
                                            // expandRow: expandRow,
                                            onBeforeRender: (grid) => {
                                                //CAP.Log("Grid onBeforeRender", grid);
                                            }

                                        }}
                                    ></Grid>
                                </Panel>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;