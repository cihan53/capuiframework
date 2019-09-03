/*
 *  Copyright (c) 2019. Crypttech Yazılım
 *  Author: Cihan Öztürk
 *  Email: cihanozturk@crypttech.com
 *
 *
 */


let command = "";

const args = require('yargs').argv;
var fs = require('fs');
var mkdirp = require('mkdirp');


if (!args.command) {
  console.error("Error: Parametre eksik . exp yarn command --command createmodule --modulename AssetManager --objectkeyname assetManager --moduletitle \"Kaynak yönetimi\"");
  process.exit(1);
}


command = args.command

switch (command.toLocaleLowerCase()) {
  case "createmodule":
    /**
     * Module adını al
     */

    if (!args.modulename) {

      console.error("Error: ModuleName parametresi eksik . exp yarn command --command createmodule --modulename AssetManager --objectkeyname assetManager --moduletitle  \"Kaynak yönetimi\"")
      process.exit(1);
    }

    if (!args.objectkeyname) {

      console.error("Error: objectkeyname parametresi eksik . exp yarn command --command createmodule --modulename AssetManager --objectkeyname assetManager --moduletitle \"Kaynak yönetimi\"")
      process.exit(1);
    }
    if (!args.moduletitle) {

      console.error("Error: moduletitle parametresi eksik . exp yarn command --command createmodule --modulename AssetManager --objectkeyname assetManager --moduletitle  \"Kaynak yönetimi\" ")
      process.exit(1);
    }


    let moduleName = args.modulename;
    let moduleTitle = args.moduletitle;
    let objectKeyName = args.objectkeyname;

    /**
     * Klasör Oluştur
     */

    let dir = "src/Components/" + objectKeyName;


    let data = "/*\n" +
      " * Copyright (c) 2018. CreyptTech Yazılım\n" +
      " * Author : Cihan Ozturk\n" +
      " *\n" +
      " */\n" +
      "import {observer} from \"mobx-react/index\";\n" +
      "import {withRouter} from \"react-router-dom\";\n" +
      "import CAP, {BaseController} from \"capuiframework\";" +
      "\n" +
      "@withRouter\n" +
      "@observer\n" +
      "export default class Controller extends BaseController {\n" +
      "    constructor(props) {\n" +
      "        super(props);\n" +
      "        this.state = {\n" +
      "            loadData: false\n" +
      "        }\n" +
      "        this.BreadCrumb= [\n" +
      "            { path: \"/"+objectKeyName+"/\", exact: true, name: CAP.__t(\""+moduleTitle+"\"), component: null },\n" +
      "        ];\n"  +
      "    }\n" +
      "\n" +
      "    /**\n" +
      "     *\n" +
      "     * @returns {*}\n" +
      "     */\n" +
      "    actionIndex() {\n" +
      "        return this.renderView(\"index\");\n" +
      "    }\n" +
      "}";

    mkdirp(dir, function (err) {
      if (err) {
        console.error(err)
        process.exit(1);
      }
      else {

        fs.writeFile(dir + "/Controller.js", data, (error) => {
          if (error)
            console.error("Dosya oluşturulurken hata oluştu ", error);
        });


      }
    });


    /**
     * View Oluştur
     */

    let data1 = "/*\n" +
      " * Copyright (c) 2018. CreyptTech Yazılım\n" +
      " * Author : Cihan Ozturk\n" +
      " *\n" +
      " */\n" +
      "import React from \"react\";\n" +
      "import {observer} from \"mobx-react/index\";\n" +
      "import {Col, Row} from \"reactstrap\";\n" +
      "\n" +
      "\n" +
      "@observer\n" +
      "export default class index extends React.Component {\n" +
      "\n" +
      "    constructor(props) {\n" +
      "        super(props);\n" +
      "        this.state = {\n" +
      "            activeTab: '1'\n" +
      "        }\n" +
      "    }\n" +
      "\n" +
      "    componentWillMount() {\n" +
      "\n" +
      "\n" +
      "    }\n" +
      "\n" +
      "    render() {\n" +
      "        return (\n" +
      "            <React.Fragment>\n" +
      "                <div className=\"animated fadeIn\">\n" +
      "                    <Row>\n" +
      "                        <Col lg={12}>\n" +
      "                            <p>Merhaba Dunya</p>\n" +
      "                        </Col>\n" +
      "                    </Row>\n" +
      "                </div>\n" +
      "            </React.Fragment>\n" +
      "        )\n" +
      "    }\n" +
      "\n" +
      "}";

    let dir1 = "src/Themes/Default/Views/" + objectKeyName;
    mkdirp(dir1, function (err) {
      if (err) {
        console.error(err)
        process.exit(1);
      }
      else {

        fs.writeFile(dir1 + "/index.js", data1, (error) => {
          if (error)
            console.error("Dosya oluşturulurken hata oluştu ", error);
        });


      }
    });


    let data2 = "{\n" +
      "  \"name\": \"" + moduleName + "\",\n" +
      "  \"version\": \"0.0.1\",\n" +
      "  \"private\": true,\n" +
      "  \"main\": \"./" + moduleName + ".js\",\n" +
      "  \"defaultConfig\": {\n" +
      "    \"controllerSupport\": true,\n" +
      "    \"icon\": \"fa fa-cube fa-lg\",\n" +
      "    \"topmenu\": true,\n" +
      "    \"excludeMenu\": true,\n" +
      "    \"exact\": false,\n" +
      "    \"strict\": false,\n" +
      "    \"sensitive\": true,\n" +
      "    \"path\": \"/:controller(" + objectKeyName + ")/:action?/:id?\"\n" +
      "  },\n" +
      "  \"dependencies\": [],\n" +
      "  \"items\": [\n" +
      "    {\n" +
      "      \"name\": \"Gösterge\",\n" +
      "      \"icon\": \"fa fa-dashboard  fa-lg \",\n" +
      "      \"objectKeyName\": \"" + objectKeyName + "\",\n" +
      "      \"topmenu\": false,\n" +
      "      \"path\": \"/\"\n" +
      "    } \n" +
      "  ]\n" +
      "}"


    console.info("Created ", dir + "/package.json");
    fs.writeFile(dir + "/package.json", data2, (error) => {
      if (error)
        console.error("Dosya oluşturulurken hata oluştu ", error);
    });


    /**
     * veri tabanına ekle
     *
     */


    break;
}
