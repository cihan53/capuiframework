import React from "react";
import { observer } from "mobx-react/index";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import StoreManager from "../../StoreManager";
import LoadingSpinner from "../../LoadingSpinner";
import Panel from "../Panel/Panel";
import Utils from "../Utils/Utils";


const shortid = require("shortid");


const defaultSorted = [{
  dataField: "name",
  order: "desc"
}];


const Table = ({ _ref, data, columns, page, sizePerPage, onTableChange, otherprops, cellEdit = null, totalSize, keyField = "id" }) => {


  let props = {
    remote: true,
    keyField: keyField,
    data: data,
    columns: columns,
    defaultSorted: defaultSorted,
    filter: filterFactory(),
    onTableChange: onTableChange,

    noDataIndication: () => <LoadingSpinner key={shortid.generate()}/>
  };

  //cell edit
  if (cellEdit != null) {
    props.cellEdit = cellEditFactory(cellEdit);
  }

  let showTotal=true;
  let pageStartIndex=1;
  let paginationSize=10;

  if (otherprops.pagination)
    props.pagination = paginationFactory({ page, sizePerPage, totalSize ,showTotal,pageStartIndex,paginationSize});

  delete otherprops.pagination;

  return <BootstrapTable ref={_ref}  {...props} {...otherprops} />;

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

  data = null;
  limit = 50;
  autoload = true;


  constructor(props) {
    super(props);
    this.store = null;
    // this.state = {
    //   page: 1,
    //   data: [],
    //   totalSize: 0,
    //   sizePerPage: 10
    // };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.init = this.init.bind(this);
    this.key = Utils.ShortId.generate();
    this.xgrid = React.createRef();

    this.init();

  }

  init() {

    if (this.props.config.store) {
      if (typeof  this.props.config.store == "string") {
        this.store = StoreManager.get(this.props.config.store) || null;

      } else {
        let storeName = this.props.config.store.name;
        let baseParams = this.props.config.store.baseParams || null;
        let defaultSort = this.props.config.store.defaultSort || null;
        this.store = StoreManager.get(storeName) || null;
        if (baseParams)
          this.store.setParameters(baseParams);

        if (defaultSort) {
          this.store.setDefaultSortDir(defaultSort.dir, defaultSort.sort);
        }
      }

      if (!this.store)
        throw new Error("Undefined Store");


      this.autoload = this.props.config.autoload || true;


      //this.store.load();
    } else if (this.props.config.data) {
      this.data = this.props.config.data || [];
      this.autoload = false;
    } else {
      throw new Error("Undefined Store");
    }
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
      const currentIndex = ( page - 1) * sizePerPage;
      this.store.load({ page: page, start: currentIndex, size: sizePerPage ,sortField:sortField,sortOrder:sortOrder,filters:filters});
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

    // console.log(type,this )
  };

  componentWillMount() {
    const currentIndex = 0;
    if (this.autoload)
      this.store.load({ page: 0, start: currentIndex, size: this.limit });
  }

  render() {

    const { totalCount = 0, limit = this.limit, currentPage = 0 } = this.store || { totalCount: 0, limit: this.limit, page: 0 };
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
    const props = ["store", "keyField", "data", "currentPage", "sizePerPage", "columns", "totalSize", "onTableChange", "panelOptions", "xtype", "cellEdit"];
    const keys = Object.keys(this.props.config);
    for (const keyIndex in keys) {
      const key = keys[keyIndex];
      if (props.indexOf(key) == -1) {
        otherProps[key] = this.props.config[key];
      }
    }

    let T = <Table
      _ref={this.xgrid}
      key={this.key}
      keyField={keyField}
      data={data}
      page={currentPage}
      sizePerPage={limit}
      columns={this.props.config.columns}
      totalSize={totalCount}
      otherprops={otherProps}
      onTableChange={this.handleTableChange}
      cellEdit={cellEdit}
    />;


    if (this.props.config.xtype == "gridPanel") {
      return <Panel items={[T]} config={this.props.config.panelOptions}/>;
    }

    return (T);
  }
}




