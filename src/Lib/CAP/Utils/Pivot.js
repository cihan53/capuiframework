const FastPivot = (arr, valuefield) => {
    "use strict";
    var obj = {};
    if (typeof arr != "string" && arr.length > 0) {

        //get columns
        var thekeys = Object.keys(arr[0]);

        var temp = {};

        //loop through columns
        thekeys.forEach(function (f) {
            temp[f] = {};
            temp[f]["_labels"] = [];
            temp[f]["_labelsdata"] = [];
            temp[f]["_data"] = {};
        });

        //loop all rows and for each column, store values
        arr.forEach(function (f, i) {
            thekeys.forEach(function (a) {
                var value = f[a];
                // temp[a]["_data"][value] = (temp[a]["_data"][value] || 0) + 1;
                temp[a]["_data"][value] = (temp[a]["_data"][value] || 0) + f[valuefield];
                temp[a]["_labels"][value] = null;
            });
        });

        //now reloop the columns to store unique values
        thekeys.forEach(function (f) {
            for (var i in temp[f]["_data"]) {
                temp[f]["_labelsdata"].push(temp[f]["_data"][i]);
            }
            temp[f]["_labels"] = Object.keys(temp[f]["_labels"]);
        });

        obj = temp;
    }
    return obj;
}
const PivotArray = (dataArray, rowIndex, colIndex, dataIndex) => {
    //Code from https://techbrij.com
    var result = {}, ret = [];
    var newCols = [];
    for (var i = 0; i < dataArray.length; i++) {

        if (!result[dataArray[i][rowIndex]]) {
            result[dataArray[i][rowIndex]] = {};
        }
        result[dataArray[i][rowIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];

        //To get column names
        if (newCols.indexOf(dataArray[i][colIndex]) == -1) {
            newCols.push(dataArray[i][colIndex]);
        }
    }

    newCols.sort();
    var item = [];

    //Add Header Row
    item.push('Item');
    item.push.apply(item, newCols);
    ret.push(item);

    //Add content
    for (var key in result) {
        item = [];
        item.push(key);
        for (var i = 0; i < newCols.length; i++) {
            item.push(result[key][newCols[i]] || "");
        }
        ret.push(item);
    }
    return ret;
}
export default {
    FastPivot,
    PivotArray
}