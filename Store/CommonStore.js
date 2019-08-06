/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

import {action, computed, observable, reaction, toJS} from "mobx";

import Loadable from "react-loadable";
import LoadingSpinner from "../Lib/LoadingSpinner";
import Utils from "../Lib/CAP/Utils/Utils";
import StoreManager from "../Lib/StoreManager";
import Requests from "../Lib/Request";
import {Logger} from "../index";



class CommonStore {

    _breadCrumbRoutes = [{path: "/", exact: true, name: Utils.__t("Ana sayfa"), component: null}];
    @observable appName = "DavutPasha";
    @observable appTheme = "Default";
    @observable loadPercent = 0;
    @observable loadAutoIncrement = false;
    @observable loadIntervalTime = 200;
    @observable accessToken = window.localStorage.getItem("accessToken");
    @observable appLoaded = false;

    @observable AllComponents = [];
    @observable components = [];

    @observable _routes = [];
    @observable menus = [];
    @observable componentsObject = {};
    @observable isLoadingComponent = false;
    @observable isLoadingConfig = false;
    @observable isInitComponent = false;
    @observable menus = {mainmenu: [], topmenu: [], footermenu: []};

    constructor() {

        this.addComponent = this.addComponent.bind(this);
        this.addRoute = this.addRoute.bind(this);
        this.addMenu = this.addMenu.bind(this);
        reaction(
            () => this.accessToken,
            accessToken => {
                if (accessToken) {
                    window.localStorage.setItem("accessToken", accessToken);
                } else {
                    window.localStorage.removeItem("accessToken");
                    window.localStorage.removeItem("currentUser");
                }
            }
        );

    }

    @action loadComponents() {
        this.isLoadingComponent = true;

        return Requests.get(`/securityService/getComponentTree?moduleTypeName=0`)
            .then((components) => {
                this.AllComponents = components;
                this.isLoadingComponent = false;
                this.initComponent();
            });

    }


    @action
    initComponent() {
        this.isInitComponent = true;
        // let componentsObject = {};
        // let routes = this._routes;
        // let menus = this.menus;


        /**
         * Lisans Türlerini yükle
         */
        StoreManager.get("LicenceStore").load();


        if (this.AllComponents && this.AllComponents.length > 0) {


            let re = function (modul, parentobje) {
                //CAP.Log("Load Module:", modul.name);

                this.moduleToComponent(modul, parentobje);

                if (modul.modules.length > 0)
                    modul.modules.forEach(e => {
                        e.level = modul.level + 1;
                        re(e, modul);
                    });
            }.bind(this);


            this.AllComponents.forEach(function (modul) {
                //eğer modul türü webUI değil ise ve alt odulü yok ise

                modul.level = 0;
                re(modul, null);


            });


            Logger.info("Component Load Success");
            // this.componentsObject = componentsObject;
        } else {
            alert("Yetkilendirme hatası. Lütfen yöneticinize başvurunuz.");
        }


        StoreManager.get("MenuStore").clear();
        StoreManager.get("MenuStore").addMenu(this.menus);


        this._routes = Utils.orderBy(this._routes, function (item) {
            return item.level;
        }, ["desc"]);


        this.setAppLoaded();

    }

    /**
     * webUI component
     * @param component
     */
    addComponent(component) {
        this.components.push(component);
    }


    /**
     * modulleri react componente çevir
     * @param modul
     * @param parentobje
     * @returns {*}
     */
    moduleToComponent = function (modul, parentobje) {


        /**
         * Package Json Config
         */
        let config = null;


        let modulePath = modul.objectKeyName;
        if (parentobje != null) {
            modulePath = parentobje.objectKeyName + "/" + modulePath;

            //eger modul content yok ise
            console.debug("Parent Object Check Modul Config has defaultConfig:", modul.content.hasOwnProperty("defaultConfig"), " Parent DefaultConfig:", parentobje.content.hasOwnProperty("defaultConfig"), modulePath);

            if (!modul.content.hasOwnProperty("defaultConfig")) {
                if (parentobje.content.hasOwnProperty("defaultConfig"))
                    config = toJS(parentobje.content);
                else
                    config = {
                        defaultConfig: {
                            icon: "",
                            menuposition: "mainmenu"
                        }
                    };
            } else {
                config = toJS(modul.content);
            }


        } else {
            console.debug("Check Module Config has defaultConfig", modul.content.hasOwnProperty("defaultConfig"), modulePath);
            if (modul.content.hasOwnProperty("defaultConfig"))
                config = toJS(modul.content);
            else
                config = {
                    defaultConfig: {
                        icon: "",
                        menuposition: "mainmenu"
                    }
                };
        }


        //eğer alt modül değil ise

        try {
            config = require(`@Components/${modulePath}/package.json`);
        } catch (e) {
            console.error(`@Components/${modulePath}/package.json not found`);

        }


        let cp = Loadable({
            loader: () => import(`@Components/${modulePath}/Controller`),
            loading: LoadingSpinner,
            delay: 500 // 0.3 seconds,
        });


        /**
         * Sisteme yüklenecek compnent oluştur
         * @type {{}}
         */

        let path = modul.hasOwnProperty("path") ? modul.path : "";
        let url = modul.hasOwnProperty("url") ? modul.url : "";

        if (parentobje != null) {
            if (path == "") {
                path += "/" + parentobje.objectKeyName + "/:controller(" + modul.objectKeyName + ")/";
                url += "/" + parentobje.objectKeyName + "/" + modul.objectKeyName + "/";
            }
        }


        if (path == "") {
            path = "/:controller(" + modul.objectKeyName + ")/";
            url = "/" + modul.objectKeyName + "/";
        }


        if (!Utils.includes(path, "/:action?/")) {
            path = Utils.trimEnd(path, "/") + "/:action?/";
        }


        let elements = [];
        let elementPaths = [];
        if (modul.moduleelements)
            modul.moduleelements.forEach(function (element) {
                elements.push(this.elementToComponent(element));

            }.bind(this));


        console.debug("Dynamic Load Component wait,module,path,url :", 500, `${modul.objectKeyName}/Controller`, path, url);

        let component = {
            level: modul.level,
            icon: config.defaultConfig.hasOwnProperty("icon") ? config.defaultConfig.icon : "",
            menuposition: config.defaultConfig.hasOwnProperty("menuposition") ? config.defaultConfig.menuposition : "mainmenu",
            title: modul.title || modul.name,
            objectKeyName: modul.objectKeyName,
            jsonConfig: config,
            cp: cp,
            menuItems: config.hasOwnProperty("menuItems") ? config.menuItems : [],
            moduleelements: elements,
            route: {
                path: modul.hasOwnProperty("path") ? modul.path : path,
                exact: modul.hasOwnProperty("exact") ? modul.exact : false,
                strict: modul.hasOwnProperty("strict") ? modul.strict : false
            }
        };


        this.addComponent(component);

        /**
         * Route ekle
         */
        this.addRoute(Object.assign({cp: component.cp, level: component.level, ...component.route}));


        /**
         * menu
         */

        let menu = {
            key: component.objectKeyName,
            name: component.title,
            url: url,
            icon: component.icon || "fa fa-cube fa-lg"
        };


        if (component.menuposition) {
            if (parentobje != null) {
                this.addMenu(component.menuposition, menu, parentobje.objectKeyName, component);
            } else {
                this.addMenu(component.menuposition, menu, null, component);
            }


            /** menuItem varise */
            if (component.menuItems) {
                component.menuItems.forEach(submenu => {
                    this.addSubmenu(component.menuposition, modul.objectKeyName, submenu);
                });
            }

        }


        return component;
    };

    /**
     * element react componente çevirir
     * @param element
     * @returns {*}
     */
    elementToComponent = function (element) {


        // let modulePath = element.objectKeyName;
        //
        // let cp = Loadable({
        //   loader: () => import(`@Components/${modulePath}/Controller`),
        //   loading: LoadingSpinner,
        //   delay: 500 // 0.3 seconds,
        // });
        //
        // let component = {
        //   objectKeyName: element.objectKeyName,
        //   cp: cp,
        //   menuItems: config.hasOwnProperty("menuItems") ? config.menuItems : [],
        //   moduleelements: elements,
        //   route: {
        //     path: modul.hasOwnProperty("path") ? modul.path : path,
        //     exact: modul.hasOwnProperty("exact") ? modul.exact : true,
        //     strict: modul.hasOwnProperty("strict") ? modul.strict : false
        //   }
        // };


        return element;
    };

    /**
     * Komponent içindeki item lar gezilerek ayarlar set edilecek.
     * @type {*}
     */

    addMenu = function (menu, item, parentItem, component) {


        let m = Object.assign([], this.menus[menu]);

        if (!Utils.isEmpty(m) && parentItem != null) {
            m.map(e => {
                if (e.key == parentItem && e.children) {
                    e.children.push(item);
                } else if (e.key == parentItem) {
                    e.children == undefined ? e.children = [item] : e.children.push(item);
                }
                return e;
            });
            this.menus[menu] = m;
        } else
            this.menus[menu].push(item);
    };

    addSubmenu = function (position, mainitem, item) {

        let m = Object.assign([], this.menus[position]);
        m.map(e => {
            if (e.key == mainitem) {
                e.children == undefined ? e.children = [item] : e.children.push(item);
            }

            return e;
        });
        this.menus[position] = m;
    };

    addRoute = function (route) {
        this._routes.push(route);
    };

    @computed get breadCrumbRoutes() {
        return toJS(this._breadCrumbRoutes);
    }

    @computed get routes() {
        return this._routes;
    }

    @action getRoutes() {
        return this._routes;
    }

    @action setToken(accessToken) {
        this.accessToken = accessToken;
    }

    @action getToken() {
        return this.accessToken;
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }

    /*
    @observable loadPercent =0 ;
    @observable loadAutoIncrement =true ;
    @observable loadIntervalTime =200 ;
     */
    @action setLoadPercent(percent) {
        this.loadPercent = percent;
    }

    @action setLoadAutoIncrement(val) {
        this.loadAutoIncrement = val;
    }

    @action setLoadIntervalTime(time) {
        this.loadIntervalTime = time;
    }


    @action getComponent(key) {
        return this.components.find(e => {
            return e.objectKeyName == key;
        });
    }


}

export default new CommonStore();

