import React from "react";
import {action} from "mobx";
import {observer} from "mobx-react/index";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from 'react-bootstrap-table2-overlay';
import filterFactory, {customFilter, FILTER_TYPES, textFilter, selectFilter, multiSelectFilter, numberFilter, dateFilter} from 'react-bootstrap-table2-filter';
import cellEditFactory from "react-bootstrap-table2-editor";

import StoreManager from "../../StoreManager";
import Panel from "../Panel/Panel";
import Utils from "../Utils/Utils";
import ContextMenu from "./ContextMenu";
import {ExportCSVButton} from "./ToolKit";
import GridColumnFilter from "./GridColumnFilter";
import LoadingSpinner from "../../LoadingSpinner";


const defaultSorted = [{
    dataField: "name",
    order: "desc"
}];


const EmptyTableDataIndication = () => (
    <div>
        <p>{Utils.__t("Kayıt yok")}</p>
    </div>
);

const NoDataIndication = () => (
    <div className="spinner">
        <div className="rect1"/>
        <div className="rect2"/>
        <div className="rect3"/>
        <div className="rect4"/>
        <div className="rect5"/>
    </div>
);


export class Table2 extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {selected: []};
    }

    handleOnSelect = (row, isSelect) => {
        console.log(row)
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row.id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row.id)
            }));
        }
    }

    handleOnSelectAll = (isSelect, rows) => {

        const ids = rows.map(r => r.id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: []
            }));
        }
    }


    render() {
        let selectRow = {};
        let _props = {
            tabIndexCell: true,
            remote: true,
            loading: this.props.loading,
            keyField: this.props.keyField,
            data: this.props.data,
            columns: this.props.columns,
            defaultSorted: this.props.defaultSorted || null,
            filter: filterFactory(),
            onTableChange: this.props.onTableChange,
            // overlay: overlayFactory(<LoadingSpinner key={Utils.ShortId.generate()}/>),
            overlay: overlayFactory({spinner: true, background: "rgba(0, 0, 0, 0.2)"}),
            noDataIndication: () => <EmptyTableDataIndication/>
        };
        let props = this.props;
        let otherprops = props.otherprops;


        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total"> {Utils.__t("Toplam Kayıt: :size", {size: size})}</span>
        );

        //cell edit
        if (props.cellEdit != null) {
            _props.cellEdit = cellEditFactory(props.cellEdit);
        }

        //selectRow
        if (otherprops.hasOwnProperty("selectRow")) {
            otherprops.selectRow = Object.assign({
                mode: 'checkbox',
                clickToSelect: true,
                onSelect: this.handleOnSelect,
                onSelectAll: this.handleOnSelectAll
            }, otherprops.selectRow);

            otherprops.selectRow.selected = this.state.selected;
        }

        let showTotal = true;
        let pageStartIndex = 1;
        let paginationSize = 10;

        let defaultPaginationOptions = {
            hideSizePerPage: true,
            withFirstAndLast: true,
            page: props.page,
            sizePerPage: props.sizePerPage,
            totalSize: props.totalSize,
            showTotal: showTotal,
            pageStartIndex: pageStartIndex,
            paginationSize: paginationSize,
            firstPageText: Utils.__t("İlk Sayfa"),
            prePageText: Utils.__t("Önceki Sayfa"),
            nextPageText: Utils.__t("Sonraki Sayfa"),
            lastPageText: Utils.__t("Son Sayfa"),
            firstPageTitle: Utils.__t("İlk Sayfa"),
            prePageTitle: Utils.__t("Önceki Sayfa"),
            nextPageTitle: Utils.__t("Sonraki Sayfa"),
            lastPageTitle: Utils.__t("Son Sayfa"),
            paginationTotalRenderer: customTotal
        };

        if (otherprops.pagination) {
            if ((typeof otherprops.pagination) == "object") {
                _props.pagination = paginationFactory(Object.assign(defaultPaginationOptions, otherprops.pagination));
            } else {
                _props.pagination = paginationFactory(defaultPaginationOptions);
            }
        }

        delete otherprops.pagination;

        _props = Object.assign(_props, otherprops);


        return <React.Fragment>
            {otherprops.hasOwnProperty('buttons') ? <ExportCSVButton data={props.store.data} columns={props.columns}/> : void (0)}
            <BootstrapTable
                ref={props._ref}
                {..._props.baseProps}
                {..._props}

                noDataIndication={() => <EmptyTableDataIndication/>}
            />
            <ContextMenu container={otherprops.id}
                         ref={props.tableContextMenuRef}
                         clickItem={otherprops.onContextMenuClickItem || void (0)}/>
        </React.Fragment>

    }
}

const Table = ({_ref, store, loading, data, columns, page, sizePerPage, onTableChange, tableContextMenuRef, otherprops, cellEdit = null, totalSize, keyField = "id"}) => {

    const customTotal = (from, to, size) => (
        <span
            className="react-bootstrap-table-pagination-total"> {Utils.__t("Toplam Kayıt: :size", {size: size})}</span>
    );

    let _props = {
        tabIndexCell: true,
        remote: true,
        loading: loading,
        keyField: keyField,
        data: data,
        columns: columns,
        defaultSorted: defaultSorted,
        filter: filterFactory(),
        onTableChange: onTableChange,
        // overlay: overlayFactory(<LoadingSpinner key={Utils.ShortId.generate()}/>),
        overlay: overlayFactory({spinner: true, background: rgba(0, 0, 0, 0.2)}),
        noDataIndication: () => <EmptyTableDataIndication/>
    };


    //cell edit
    if (cellEdit != null) {
        _props.cellEdit = cellEditFactory(cellEdit);
    }

    let showTotal = true;
    let pageStartIndex = 1;
    let paginationSize = 10;
    let selected = [];


    let defaultPaginationOptions = {
        hideSizePerPage: true,
        withFirstAndLast: true,
        page: page,
        sizePerPage: sizePerPage,
        totalSize: totalSize,
        showTotal: showTotal,
        pageStartIndex: pageStartIndex,
        paginationSize: paginationSize,
        firstPageText: Utils.__t("İlk Sayfa"),
        prePageText: Utils.__t("Önceki Sayfa"),
        nextPageText: Utils.__t("Sonraki Sayfa"),
        lastPageText: Utils.__t("Son Sayfa"),
        firstPageTitle: Utils.__t("İlk Sayfa"),
        prePageTitle: Utils.__t("Önceki Sayfa"),
        nextPageTitle: Utils.__t("Sonraki Sayfa"),
        lastPageTitle: Utils.__t("Son Sayfa"),
        paginationTotalRenderer: customTotal
    };


    if (otherprops.pagination) {
        if ((typeof otherprops.pagination) == "object") {
            _props.pagination = paginationFactory(Object.assign(defaultPaginationOptions, otherprops.pagination));
        } else {
            _props.pagination = paginationFactory(defaultPaginationOptions);
        }
    }

    delete otherprops.pagination;


    //merge
    _props = Object.assign(_props, otherprops);


    return <React.Fragment>

        {/*<ExportPdfButton data={data} />*/}
        {/*<CSVDownload data={data} target="_blank"/>;*/}
        {otherprops.hasOwnProperty('buttons') ? <ExportCSVButton data={store.data} columns={columns}/> : void (0)}
        <BootstrapTable ref={_ref} {..._props.baseProps} {..._props} {...otherprops} noDataIndication={() => <EmptyTableDataIndication/>}/>
        <ContextMenu container={otherprops.id} ref={tableContextMenuRef} clickItem={otherprops.onContextMenuClickItem || void (0)}/>
    </React.Fragment>

};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    onTableChange: PropTypes.func
};

/**
 * eğer sutun filitreleme açık ise
 * autoload false yapılmalı.
 *
 *
 */
@observer
export default class Grid extends React.Component {

    store = null;
    data = null;
    limit = 50;
    totalCount = 0;
    autoload = true;
    columns = [];
    /**
     * Bu alan yeni eklendi ve buna göre diğer tüm değişiklikler sırası geldiğinde yapılamlı
     * tüm ayarlar config nesnesinde toplanmalı
     * @type {{xtype: string}}
     */
    config = {
        xtype: "grid"
    }


    constructor(props) {
        super(props);
        this._store = null;

        this.handleTableChange = this.handleTableChange.bind(this);
        this.init = this.init.bind(this);
        this.configSet = this.configSet.bind(this);

        this.key = Utils.ShortId.generate();
        this.xgrid = React.createRef();
        this.tableContextMenu = React.createRef();
        this.table2Ref = React.createRef();

        this.configSet();
        this.init();


    }

    @action
    init(action = "", newProps = null) {

        let props = newProps || this.props;
        let _action = "load";

        if (props.config.store) {
            if (typeof props.config.store == "string") {
                this._store = StoreManager.get(props.config.store) || null;

            } else {
                let storeName = props.config.store.name;
                _action = props.config.store.action || "load";
                let baseParams = props.config.store.baseParams || null;
                let defaultSort = props.config.store.defaultSort || null;
                this._store = StoreManager.get(storeName) || null;
                if (this.store && baseParams)
                    this.store.setParameters(baseParams);

                if (this.store && defaultSort) {
                    this.store.setDefaultSortDir(defaultSort.dir, defaultSort.sort);
                }


                this._store = Object.assign(this._store, props.config.store || {});
            }

            if (!this.store)
                throw new Error("Undefined stores");

            this.autoload = props.config.hasOwnProperty('autoload') ? props.config.autoload : true;


            //limit
            // this.limit =
            //     props.limit ? props.limit :
            //         props.config.limit ? props.config.limit :
            //             props.config.store.size ? props.config.store.size : this.limit;


            if (props.pagination || props.config.pagination)
                this.limit =
                    props.config.pagination.sizePerPage
                        ? props.config.pagination.sizePerPage : props.config.store.size
                        ? props.config.store.size : this.limit;
            else
                this.limit = props.config.store.size ? props.config.store.size : this.limit;


            this.totalCount =
                props.totalCount ? props.totalCount :
                    props.config.totalCount ? props.config.totalCount : 0;

            // const currentIndex = 0;
            if (this.autoload) {
                let methods = Utils.getMethods(this.store);
                if (methods.filter(e => e == _action).length > 0) {
                    this.store[_action]({page: 0, start: 0, size: this.limit});
                } else {
                    this.store.load({page: 0, start: 0, size: this.limit});
                }
            }


            //this.store.load();
        } else if (props.data || props.config.data) {
            this.data = props.data ? props.data : props.config.data || [];
            this.autoload = false;
            this.totalCount = this.data.size
        } else {
            throw new Error("Undefined stores");
        }

        //columns setting


        CAP.Logger.debug("Grid Change Action", action, props)
    }

    @action
    configSet() {
        this.config = Object.assign(this.config, this.props.config);
        this.columns = this.props.config.columns || [];
        this.columns = this.columns.map(c => {
            let filter = c.filter || null;
            let filterName = "";
            let filterType = FILTER_TYPES.TEXT;
            let filterProps = null;
            //filitre nedir
            if (filter) {
                let _filter = null;

                if (filter.hasOwnProperty("name")) {
                    filterName = filter.name;
                }
                if (filter.hasOwnProperty("type")) {
                    filterType = filter.type;
                }
                if (filter.hasOwnProperty("props")) {
                    filterProps = filter.props;
                }


                switch (filterType) {
                    case 'select':
                        c.filter = selectFilter(filterProps)
                        break;
                    case 'text':
                        c.filter = textFilter(filterProps)
                        break;
                    case 'data':
                        c.filter = dateFilter(filterProps)
                        break;
                    case 'select2':
                        c.filter = customFilter({
                            type: filterType // ask react-bootstrap-table to filter data as number
                        });
                        break;
                    default:
                        c.filter = textFilter()
                }

                // if (filterType == "select2") {
                //     c.filterRenderer = (onFilter, column) => {
                //         return <GridColumnFilter filterType={filterType}
                //                                  filterName={filterName}
                //                                  onFilter={onFilter}
                //                                  column={column} {...filterProps}/>
                //     }
                // }

            }


            return c;
        })

    }

    getSelectRow() {
        return this.table2Ref.current.state.selected
    }


    get store() {
        return this._store;
    }

    set store(value) {
        this._store = value;
    }

    shouldComponentUpdate(newProps, newState) {
        if (this.props != newProps) this.init("propsChange", newProps);
        return this.props != newProps
    }

    //render before
    UNSAFE_componentWillMount() {
        if (this.props.config.hasOwnProperty('onBeforeRender')) {
            this.props.config.onBeforeRender(this);
        }
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps != this.props) {
    //         this.data = this.props.data ? this.props.data : this.props.config.data || [];
    //     }
    // }

    // bilesen güncellenmeden önce
    UNSAFE_componentWillUpdate() {
        if (this.props.config.hasOwnProperty('onBeforeRender')) {
            this.props.config.onBeforeRender(this);
        }
    }

    // componentDidCatch(error, info) {
    //     // Hatanızı bir hata bildirimi servisine de yollayabilirsiniz.
    //     //logErrorToMyService(error, info)
    //
    // }

    handleTableChange = (type, {
        page,  // newest page
        sizePerPage,  // newest sizePerPage
        sortField,  // newest sort field
        sortOrder,  // newest sort order
        filters, // an object which have current filter status per column
        data, // when you enable remote sort, you may need to base on data to sort if data is filtered/searched
        cellEdit
    }) => {
        if (type != "cellEdit") {
            // let currentIndex = (page - 1) * sizePerPage;
            // currentIndex = currentIndex < 0 ? 0 : currentIndex

            // let baseParams = this.store.baseParams;
            sortField = sortField == null ? this.store._defaultConfig.baseParams.dir : sortField;
            sortOrder = sortOrder == null ? this.store._defaultConfig.baseParams.desc : sortOrder;


            // page: 0
            // size: 50
            // dir: id
            // desc: asc
            // filters: {"agenttypeobjectkeyname":"ManagementAgent"}

            // console.log("Table Change", this.store.parameters)
            // console.log("Table Change filters", filters)
            // console.log("Table Change sortField ", sortField)
            // console.log("Table Change sortOrder ", sortOrder)

            let params = Object.assign(this.store.parameters, {
                page: page < 1 ? 0 : page - 1,
                size: this.limit,
                filters: filters
            });
            // this.store.load(params);

            let methods = Utils.getMethods(this.store);
            if (methods.filter(e => e == _action).length > 0) {
                this.store[_action](params);
            } else {
                this.store.load(params);
            }


        } else {
            if (this.props.config.hasOwnProperty("cellEdit")) {
                if (this.props.config.cellEdit.hasOwnProperty("afterSaveCell")) {

                    /**
                     * cellEdit
                     *    { rowId,   dataField,  newValue }
                     */
                    this.props.config.cellEdit.afterSaveCell(data, cellEdit);
                }
            }
        }

        // CAP.Log(type,this )
    };


    render() {


        const {totalCount = 0, currentPage = 1} = this.store
        || {
            totalCount: this.totalCount || 0,
            page: this.props.page || 0,
            currentPage: 1
        };
        const data = this.store ? this.store.data : this.data;
        let loading = false;

        if (this.store && this.store.hasOwnProperty("actionStatus")) {
            loading = this.store.actionStatus.get("load");
            CAP.Logger.debug("Grid store Loading Status", this.store ? this.store.getActionStatus("load") : true);
        }




        const limit = this.limit;

        //other props
        let otherProps = {};

        //keyfield
        let keyField = this.store ? this.store.keyField : "id";
        if (this.props.config.hasOwnProperty("keyField"))
            keyField = this.props.config.keyField;

        //cell Editor
        let cellEdit = null;
        if (this.props.config.hasOwnProperty("cellEdit")) {
            cellEdit = this.props.config.cellEdit;
        }


        //bunlar varsayılan props'lar bunlar haricindeki tüm prop'lar otherprops eklenecek
        const props = ["store", "keyField", "data", "currentPage", "sizePerPage", "columns", "totalSize", "onTableChange", "panelOptions", "xtype", "cellEdit", "tableContextMenuRef"];
        const keys = Object.keys(this.props.config);
        for (const keyIndex in keys) {
            const key = keys[keyIndex];
            if (props.indexOf(key) == -1) {
                otherProps[key] = this.props.config[key];
            }
        }


        let contextMenu = null;
        let T = <Table2
            ref={this.table2Ref}
            _ref={this.xgrid}
            key={this.key + "-gridtable"}
            keyField={keyField}
            data={data}
            page={currentPage}
            sizePerPage={limit}
            columns={this.columns}
            totalSize={totalCount}
            otherprops={otherProps}
            loading={loading}
            onTableChange={this.handleTableChange}
            cellEdit={cellEdit}
            tableContextMenuRef={this.tableContextMenu}
            store={this.store}
        />;


        if (this.config.xtype.toLocaleLowerCase() == "gridpanel") {

            return <Panel _key={this.key + "-gridPanel"} items={[T]} config={this.props.config.panelOptions}/>;
        }


        return <React.Fragment>{T}</React.Fragment>;
    }
}

Grid.propTypes = {
    keyField: PropTypes.string.isRequired,
    config: PropTypes.any.isRequired,
    data: PropTypes.array,
    columns: PropTypes.array.isRequired,
    store: PropTypes.any
};

Grid.defaultProps = {
    keyField: "id",
    config: {
        xtype: "grid",
    },
    columns: [],
    data: null
}


