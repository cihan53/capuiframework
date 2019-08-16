import React from "react";
import {observer} from "mobx-react/index";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from 'react-bootstrap-table2-overlay';
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import StoreManager from "../../StoreManager";
import LoadingSpinner from "../../LoadingSpinner";
import Panel from "../Panel/Panel";
import Utils from "../Utils/Utils";
import ContextMenu from "./ContextMenu";


const defaultSorted = [{
    dataField: "name",
    order: "desc"
}];


const EmptyTableDataIndication = () => (
    <div>
        <p>{Utils.__t("Kayıt yok")}</p>
    </div>
);


const Table = ({key,_ref, data, columns, page, sizePerPage, onTableChange,tableContextMenuRef, otherprops, cellEdit = null, totalSize, keyField = "id"}) => {

    const customTotal = (from, to, size) => (
        <span
            className="react-bootstrap-table-pagination-total"> {Utils.__t("Toplam Kayıt: :size", {size: size})}</span>
    );

    let props = {
        tabIndexCell: true,
        remote: true,
        keyField: keyField,
        data: data,
        columns: columns,
        defaultSorted: defaultSorted,
        filter: filterFactory(),
        onTableChange: onTableChange,
        // overlay: overlayFactory(<LoadingSpinner key={Utils.ShortId.generate()}/>),
        overlay: overlayFactory({spinner: true, background: 'rgba(192,192,192,0.3)'}),
        noDataIndication: () => <EmptyTableDataIndication/>
    };

    //cell edit
    if (cellEdit != null) {
        props.cellEdit = cellEditFactory(cellEdit);
    }

    let showTotal = true;
    let pageStartIndex = 1;
    let paginationSize = 10;
    if (otherprops.pagination)
        props.pagination = paginationFactory({
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
        });

    delete otherprops.pagination;


    // const ContextMenu = onContextMenu;


    return <React.Fragment>
        <BootstrapTable ref={_ref}  {...props} {...otherprops}  />
        <ContextMenu container={otherprops.id || key + "-t"} ref={tableContextMenuRef}
                     clickItem={otherprops.onContextMenuClickItem || void (0)}/>
    </React.Fragment>

};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    onTableChange: PropTypes.func.isRequired
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

        this.configSet();
        this.init();


    }

    init(action = "") {


        if (this.props.config.store) {
            if (typeof this.props.config.store == "string") {
                this._store = StoreManager.get(this.props.config.store) || null;

            } else {
                let storeName = this.props.config.store.name;
                let baseParams = this.props.config.store.baseParams || null;
                let defaultSort = this.props.config.store.defaultSort || null;
                this._store = StoreManager.get(storeName) || null;
                if (this.store && baseParams)
                    this.store.setParameters(baseParams);

                if (this.store && defaultSort) {
                    this.store.setDefaultSortDir(defaultSort.dir, defaultSort.sort);
                }
            }

            if (!this.store)
                throw new Error("Undefined Store");

            this.autoload = this.props.config.hasOwnProperty('autoload') ? this.props.config.autoload : true;


            //this.store.load();
        } else if (this.props.config.data) {
            this.data = this.props.config.data || [];
            this.autoload = false;
        } else {
            throw new Error("Undefined Store");
        }

        //columns setting


    }

    configSet() {
        this.config = Object.assign(this.config, this.props.config);
        this.columns = this.props.config.columns || [];
    }


    get store() {
        return this._store;
    }

    set store(value) {
        this._store = value;
    }

    shouldComponentUpdate(newProps, newState) {
        if (this.props != newProps) this.init("propsChange");
        return this.props != newProps
    }

    //render before
    componentWillMount() {
        if (this.props.config.hasOwnProperty('onBeforeRender')) {
            this.props.config.onBeforeRender(this);
        }
    }


    componentWillUpdate() {

        if (this.props.config.hasOwnProperty('onBeforeRender')) {
            this.props.config.onBeforeRender(this);
        }
    }

    componentDidCatch(error, info) {
        // Hatanızı bir hata bildirimi servisine de yollayabilirsiniz.
        //logErrorToMyService(error, info)

    }

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
            let currentIndex = (page - 1) * sizePerPage;
            currentIndex = currentIndex < 0 ? 0 : currentIndex

            this.store.load({
                page: page,
                start: currentIndex,
                size: sizePerPage,
                sortField: sortField,
                sortOrder: sortOrder,
                filters: filters
            });
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

    componentWillMount() {
        const currentIndex = 0;
        if (this.autoload)
            this.store.load({page: 0, start: currentIndex, size: this.limit});
    }

    render() {

        const {totalCount = 0, limit = this.limit, currentPage = 0} = this.store || {
            totalCount: 0,
            limit: this.limit,
            page: 0
        };
        const data = this.store ? this.store.data : this.data;


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
        const props = ["store", "keyField", "data", "currentPage", "sizePerPage", "columns", "totalSize", "onTableChange", "panelOptions", "xtype", "cellEdit","tableContextMenuRef"];
        const keys = Object.keys(this.props.config);
        for (const keyIndex in keys) {
            const key = keys[keyIndex];
            if (props.indexOf(key) == -1) {
                otherProps[key] = this.props.config[key];
            }
        }


        let contextMenu = null;
        let T = <Table
            _ref={this.xgrid}
            key={this.key + "-gridtable"}
            keyField={keyField}
            data={data}
            page={currentPage}
            sizePerPage={limit}
            columns={this.columns}
            totalSize={totalCount}
            otherprops={otherProps}
            onTableChange={this.handleTableChange}
            cellEdit={cellEdit}
            tableContextMenuRef={this.tableContextMenu}
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
    config: {
        xtype: "grid",
    },
    columns: [],
    data: null
}


