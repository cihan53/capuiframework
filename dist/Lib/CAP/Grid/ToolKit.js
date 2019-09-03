import React from "react";
import { Utils } from "../../../index";
import { CSVLink } from "react-csv";
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';
import { plainToFlattenObject } from "../Utils/_Array";

const ExportCSVButton = props => {
  let DATA = props.data;
  let headers = Object.keys(plainToFlattenObject(DATA[0]));
  return React.createElement("div", null, React.createElement(CSVLink, {
    className: "btn btn-success",
    data: DATA,
    headers: headers
  }, Utils.__t("Csv indir")));
}; // Create styles


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const MyDocument = () => React.createElement(Document, null, React.createElement(Page, {
  size: "A4",
  style: styles.page
}, React.createElement(View, {
  style: styles.section
}, React.createElement(Text, null, "Section #1")), React.createElement(View, {
  style: styles.section
}, React.createElement(Text, null, "Section #2"))));

const ExportPdfButton = props => {
  return React.createElement(PDFDownloadLink, {
    document: React.createElement(MyDocument, null),
    fileName: "export.pdf"
  }, ({
    blob,
    url,
    loading,
    error
  }) => loading ? 'Loading document...' : 'Download now!');
};

export { ExportCSVButton, ExportPdfButton };