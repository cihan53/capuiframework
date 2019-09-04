var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { observer } from "mobx-react/index";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from 'react-bootstrap-table2-overlay';
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
import StoreManager from "../../StoreManager";
import Panel from "../Panel/Panel";
import Utils from "../Utils/Utils";
import ContextMenu from "./ContextMenu";
import { ExportCSVButton } from "./ToolKit";
const defaultSorted = [{
  dataField: "name",
  order: "desc"
}];

const EmptyTableDataIndication = () => React.createElement("div", null, React.createElement("p", null, Utils.__t("Kayıt yok")));

const Table = ({
  _ref,
  store,
  data,
  columns,
  page,
  sizePerPage,
  onTableChange,
  tableContextMenuRef,
  otherprops,
  cellEdit = null,
  totalSize,
  keyField = "id"
}) => {
  const customTotal = (from, to, size) => React.createElement("span", {
    className: "react-bootstrap-table-pagination-total"
  }, " ", Utils.__t("Toplam Kayıt: :size", {
    size: size
  }));

  let props = {
    tabIndexCell: true,
    remote: true,
    keyField: keyField,
    data: data,
    columns: columns,
    defaultSorted: defaultSorted,
    filter: filterFactory(),
    onTableChange: onTableChange,
    overlay: overlayFactory({
      spinner: true,
      background: 'rgba(192,192,192,0.3)'
    }),
    noDataIndication: () => React.createElement(EmptyTableDataIndication, null)
  };

  if (cellEdit != null) {
    props.cellEdit = cellEditFactory(cellEdit);
  }

  let showTotal = true;
  let pageStartIndex = 1;
  let paginationSize = 10;
  if (otherprops.pagination) props.pagination = paginationFactory({
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
  return React.createElement(React.Fragment, null, otherprops.hasOwnProperty('buttons') ? React.createElement(ExportCSVButton, {
    data: store.data,
    columns: columns
  }) : void 0, React.createElement(BootstrapTable, _extends({
    ref: _ref
  }, props.baseProps, props, otherprops)), React.createElement(ContextMenu, {
    container: otherprops.id,
    ref: tableContextMenuRef,
    clickItem: otherprops.onContextMenuClickItem || void 0
  }));
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

let Grid = observer(_class = (_temp = function (_React$Component) {
  _inherits(Grid, _React$Component);

  function Grid(props) {
    var _this;

    _classCallCheck(this, Grid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Grid).call(this, props));
    _this.store = null;
    _this.data = null;
    _this.limit = 50;
    _this.autoload = true;
    _this.columns = [];
    _this.config = {
      xtype: "grid"
    };

    _this.handleTableChange = (type, {
      page,
      sizePerPage,
      sortField,
      sortOrder,
      filters,
      data,
      cellEdit
    }) => {
      if (type != "cellEdit") {
        let currentIndex = (page - 1) * sizePerPage;
        currentIndex = currentIndex < 0 ? 0 : currentIndex;

        _this.store.load({
          page: page,
          start: currentIndex,
          size: sizePerPage,
          sortField: sortField,
          sortOrder: sortOrder,
          filters: filters
        });
      } else {
        if (_this.props.config.hasOwnProperty("cellEdit")) {
          if (_this.props.config.cellEdit.hasOwnProperty("afterSaveCell")) {
            _this.props.config.cellEdit.afterSaveCell(data, cellEdit);
          }
        }
      }
    };

    _this._store = null;
    _this.handleTableChange = _this.handleTableChange.bind(_assertThisInitialized(_this));
    _this.init = _this.init.bind(_assertThisInitialized(_this));
    _this.configSet = _this.configSet.bind(_assertThisInitialized(_this));
    _this.key = Utils.ShortId.generate();
    _this.xgrid = React.createRef();
    _this.tableContextMenu = React.createRef();

    _this.configSet();

    _this.init();

    return _this;
  }

  _createClass(Grid, [{
    key: "init",
    value: function init(action = "") {
      if (this.props.config.store) {
        if (typeof this.props.config.store == "string") {
          this._store = StoreManager.get(this.props.config.store) || null;
        } else {
          let storeName = this.props.config.store.name;
          let baseParams = this.props.config.store.baseParams || null;
          let defaultSort = this.props.config.store.defaultSort || null;
          this._store = StoreManager.get(storeName) || null;
          if (this.store && baseParams) this.store.setParameters(baseParams);

          if (this.store && defaultSort) {
            this.store.setDefaultSortDir(defaultSort.dir, defaultSort.sort);
          }
        }

        if (!this.store) throw new Error("Undefined Store");
        this.autoload = this.props.config.hasOwnProperty('autoload') ? this.props.config.autoload : true;
      } else if (this.props.config.data) {
        this.data = this.props.config.data || [];
        this.autoload = false;
      } else {
        throw new Error("Undefined Store");
      }
    }
  }, {
    key: "configSet",
    value: function configSet() {
      this.config = Object.assign(this.config, this.props.config);
      this.columns = this.props.config.columns || [];
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(newProps, newState) {
      if (this.props != newProps) this.init("propsChange");
      return this.props != newProps;
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      if (this.props.config.hasOwnProperty('onBeforeRender')) {
        this.props.config.onBeforeRender(this);
      }

      const currentIndex = 0;
      if (this.autoload) this.store.load({
        page: 0,
        start: currentIndex,
        size: this.limit
      });
    }
  }, {
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate() {
      if (this.props.config.hasOwnProperty('onBeforeRender')) {
        this.props.config.onBeforeRender(this);
      }
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {}
  }, {
    key: "render",
    value: function render() {
      const {
        totalCount = 0,
        limit = this.limit,
        currentPage = 0
      } = this.store || {
        totalCount: 0,
        limit: this.limit,
        page: 0
      };
      const data = this.store ? this.store.data : this.data;
      let otherProps = {};
      let keyField = this.store ? this.store.keyField : "id";
      if (this.props.config.hasOwnProperty("keyField")) keyField = this.props.config.keyField;
      let cellEdit = null;

      if (this.props.config.hasOwnProperty("cellEdit")) {
        cellEdit = this.props.config.cellEdit;
      }

      const props = ["store", "keyField", "data", "currentPage", "sizePerPage", "columns", "totalSize", "onTableChange", "panelOptions", "xtype", "cellEdit", "tableContextMenuRef"];
      const keys = Object.keys(this.props.config);

      for (const keyIndex in keys) {
        const key = keys[keyIndex];

        if (props.indexOf(key) == -1) {
          otherProps[key] = this.props.config[key];
        }
      }

      let contextMenu = null;
      let T = React.createElement(Table, {
        _ref: this.xgrid,
        key: this.key + "-gridtable",
        keyField: keyField,
        data: data,
        page: currentPage,
        sizePerPage: limit,
        columns: this.columns,
        totalSize: totalCount,
        otherprops: otherProps,
        onTableChange: this.handleTableChange,
        cellEdit: cellEdit,
        tableContextMenuRef: this.tableContextMenu,
        store: this.store
      });

      if (this.config.xtype.toLocaleLowerCase() == "gridpanel") {
        return React.createElement(Panel, {
          _key: this.key + "-gridPanel",
          items: [T],
          config: this.props.config.panelOptions
        });
      }

      return React.createElement(React.Fragment, null, T);
    }
  }, {
    key: "store",
    get: function () {
      return this._store;
    },
    set: function (value) {
      this._store = value;
    }
  }]);

  return Grid;
}(React.Component), _temp)) || _class;

export { Grid as default };
Grid.propTypes = {
  keyField: PropTypes.string.isRequired,
  config: PropTypes.any.isRequired,
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  store: PropTypes.any
};
Grid.defaultProps = {
  config: {
    xtype: "grid"
  },
  columns: [],
  data: null
};