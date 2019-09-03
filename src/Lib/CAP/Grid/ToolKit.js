import React from "react";
import {Utils} from "../../../index";
import {CSVLink} from "react-csv";
import {Document, Page, PDFDownloadLink, StyleSheet, Text, View} from '@react-pdf/renderer';
import {plainToFlattenObject} from "../Utils/_Array";


const ExportCSVButton = (props) => {
    let DATA = props.data;
    let headers = Object.keys(plainToFlattenObject(DATA[0]))
    return (
        <div>
            <CSVLink className={"btn btn-success"} data={DATA} headers={headers}>
                {Utils.__t("Csv indir")}
            </CSVLink>
        </div>
    );
};


// Create styles
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

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>
);

const ExportPdfButton = (props) => {
    return (
        <PDFDownloadLink document={<MyDocument/>} fileName="export.pdf">
            {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
    );
};


export {ExportCSVButton, ExportPdfButton};
