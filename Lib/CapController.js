/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */


import React from "react";
import {matchPath} from "react-router";
import Utils from "./CAP/Utils/Utils";
import StoreManager from "./StoreManager";
import {Loadable, Spinner, Log, Raise, Logger} from "../index";


// const queryString = require("query-string");


/**
 * Kontroler Framework içerisinde sıkça kullanılan methodları tek bir yerde toplamak
 * ve kolay kullanım için geliştirilmiştir.
 *
 * Aslında react için bir kontroller sistemi yoktur  (01-10-2018)
 *
 * Geliştirilmesi gereken bir kaç yer var
 *
 * Component Güncelleme mekanizması kontrol altına alınmalı
 * Component unmount olduğunda yapılması gereken bir dizi işlem var , storeların temizlenmesi ramdaki gereksiz alanları temizlenmes vb..
 *
 *
 * ......
 */
export default class CapController extends React.Component {

    _BreadCrumb = [];

    /**
     * Sistem genelinde kullanılabilmesi için Kontroller üzerinde tutuluyor.
     *
     * @SecurityProvider
     *    local
     *    ldap
     *    activedirectory
     *    radius
     * @type {{}}
     * @private
     */
    _SecurityProvider = 0;
    /**
     * Sistemde kullanılacak componenetleri listesi
     * @type {{}}
     * @private
     */
    _components = {};
    /**
     * Sistemde kullanılacak tema'yı belirliyor
     * Tema aynı zamanda layout içerdiğinden tüm yapı düzen değişebilir.
     * @comment
     *    Tema oluşturulurken aşağıdaki hiyerarşi oluşturulmalı
     *      /Themes
     *        /Default
     *          /Views
     *            /{Component}/
     *            /{Component2}/
     *            ..
     *            MainView.js
     *            LoginView.js
     *            ForgetPassword.js
     *          /Widget
     * @type {string}
     * @private
     */
    _urlMap = []; //TODO burası kullanılacak
    _theme = "Default";
    _layout = "Layout";//TODO bu kaldırılabilir kontrol dilmesi gerekiyor
    _view = "index";  //TODO bu aktif olarak kullanılmıyor gerekli ayarlar yapılırsa render işleminde view parametresi verilmeden kullanmak için
    _controllerName = this.constructor.name;
    /**
     * Her kontroller içinde olması gereken aksiyon
     * Aksiyon isimlendirme
     *  @comment
     *  Action lar 'action' ile başlamalı sonrasında gelen ilk karkater büyük harf olmalı
     *    actionList
     *    actionDelete
     *    actionIndex
     *    ...
     *
     *    Şimdilik alt level bir aksiyon islemi yapılmak isteniyorsa leveller arasına "-" konmali
     *
     *    Örnek : http://local/Manager/Customer-Order-List şeklinde bir url miz var bunu parçalarsak
     *
     *    Manager => Kontroller
     *    Customer-Order-List => Aksiyon ( Customer/Order/List şeklinde'de ifade edebiliriz)
     *
     *    Bu controler şu şekilde olmalı
     *
     *    export default Manager extent CapController{
   *
   *      actionCustomerOrderList(){
   *        ....
   *      }
   *
   *      ....
   *    }
     *
     *
     *  <p>Her aksiyon içinde kesinlikle return olmalı</p>
     *
     * @type {string}
     * @private
     */
    _action = "actionIndex";
    /**
     * Tema path belirleme için kullanılıyor,
     *
     * _theme değeri kullanılıyor, ancak bu değer Envoriment ile değiştirilebilir.
     *
     * @type {string}
     * @private
     */
    _viewPath = null;
    /**
     * Kontroller işlenirken oluşan hataları depolayacak.
     * @type {Array}
     * @private
     */
    _errors = [];

    constructor(props) {
        super(props);
        this.init();

    }


    getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function');
    loading = (params) => {
        if (params.error) {
            Log("Loading Error:", params.error);
            return <React.Fragment>
                <div className="text-white bg-danger text-center">
                    <div className={"cart card-error p-4"}>
                        <blockquote className="card-bodyquote">
                            <p>{params.error.toString()}</p>
                        </blockquote>
                    </div>
                </div>
            </React.Fragment>;
        } else if (params.pastDelay) {
            return <Spinner/>;
        } else {
            return null;
        }
    };

    init() {


        // let type = this.props.location.pathname.split('/'); //this is the name of the route
        let c = this.props.match.params.controller || "Default";
        // let m = this.props.match.params.module || null ;
        let a1 = (this.props.match.params.action || "Index").capitalizeFirstLetter().split("-");
        let a = "";
        a1.forEach(e => {
            a += e.capitalizeFirstLetter();
        });

        // CAP.Log(this.props.match.params)


        this._action = a;
        this._controllerName = c;
        this._components = StoreManager.get("CommonStore").getComponent(c);
        // let match = null;
        if (!Utils.isEmpty(this.urlMap)) {

            //
            //   match = matchPath(this.urlMap, {
            //     path: this._urlMap,
            //     exact: true,
            //     strict: false
            //   });
            //
            //
        }


        // if (this.viewPath == null)
        //   this.viewPath = this._theme + "/Views/" + this._controllerName + "/";


    }


    get BreadCrumb() {
        return this._BreadCrumb;
    }

    set BreadCrumb(value) {
        this._BreadCrumb = value;
    }

    get SecurityProvider() {
        return this._SecurityProvider;
    }

    set SecurityProvider(value) {
        this._SecurityProvider = value;
    }

    get theme() {
        return this._theme;
    }

    set theme(value) {
        this._theme = value;
    }


    get view() {
        return this._view;
    }

    set view(value) {
        this._view = value;
    }

    get controllerName() {
        return this._controllerName;
    }

    set controllerName(value) {
        this._controllerName = value;
    }


    get action() {
        return this._action;
    }

    set action(value) {
        this._action = value;
    }


    get urlMap() {
        return this._urlMap;
    }

    set urlMap(value) {
        this._urlMap = value;
    }

    get viewPath() {
        return this._viewPath;
    }

    set viewPath(value) {
        this._viewPath = value;
    }


    get layout() {
        return this._layout;
    }

    set layout(value) {
        this._layout = value;
    }


    /**
     * İlgili komponent
     * @returns {{}}
     */
    get components() {
        return this._components;
    }

    set components(value) {
        this._components = value;
    }


    /**
     * kontroller da oluşan hatalar
     * @returns {Array}
     */
    get errors() {
        return this._errors;
    }

    set errors(value) {
        this._errors.push(value);
    }


    componentWillMount() {
        //TODO mount olunca neler yapılmalı bunlar belilenmeli
        //BreadCrumb
        StoreManager.get("BreadCrumbStore").setItem(this.BreadCrumb);


        //console.log(this.getMethods(this));


    }

    componentDidMount() {

    }

    // componentWillUpdate(nextProps, nextState) {
    //     // Logger.debug("Controller Update NextProps ", nextProps, this.props)
    //     return nextProps != this.props;
    // }

    componentDidUpdate() {

    }

    componentWillReceiveProps(nextProps) {

    }


    componentDidCatch(error, info) {
        Logger.error("MyCatch", error, info)
    }


    /**
     *
     ### About `shouldComponentUpdate`

     When using `@observer` on a component, don't implement `shouldComponentUpdate`, as it will override the default implementation that MobX provides.
     When using mobx-react, you should in general not need to write an `sCU` (in our entire Mendix code base we have none). If you really need to implement `sCU`, split the component into two, a reactive and non-reactive (with the `sCU`) part, or use `<Observer>` sections instead of `observer` on the entire component.

     Similarly, `PureComponent` should not be combined with `observer`. As pure components are supposed to be dumb and never update themselves automatically, but only by getting passed in new props from the parent. `observer` is the opposite, it makes components smart and dependency aware, allowing them to update without the parents even needing to be aware of the change.

     ### `componentWillReact` (lifecycle hook)

     React components usually render on a fresh stack, so that makes it often hard to figure out what _caused_ a component to re-render.
     When using `mobx-react` you can define a new life cycle hook, `componentWillReact` (pun intended) that will be triggered when a component is scheduled to be re-rendered because
     data it observes has changed. This makes it easy to trace renders back to the action that caused the rendering.

     ```javascript
     import { observer } from "mobx-react"

     @observer
     class TodoView extends React.Component {
      componentWillReact() {
          console.info("I will re-render, since the todo has changed!")
      }

      render() {
          return <div>{this.props.todo.title}</div>
      }
  }
     ```

     *   `componentWillReact` doesn't take arguments
     *   `componentWillReact` won't fire before the initial render (use `componentDidMount` or `constructor` instead)
     *
     * @returns {boolean}
     */

    componentWillReact() {
        Logger.debug("Store Change")
    }


    /**
     *
     * @param view
     * @param data
     * @returns {*}
     */

    renderView = (view, data = {}, loadmask = false, controller = this.controllerName) => {
        //
        // let viewPath = this.viewPath;
        // let theme = this.theme;
        // let layout = this.layout;


        Logger.debug(`@ThemeViewsPath/${controller}/${view}`);
        if (!loadmask) {

            let View = Loadable({
                loader: () => import(
                    /* webpackMode: "lazy" */
                    `@ThemeViewsPath/${controller}/${view}`),
                loading: this.loading

            });

            Logger.debug(`@ThemeViewsPath/${controller}/${view}`);

            return (<View {...data} {...this.props} Controller={this}/>);
        } else {
            return <Spinner/>;
        }
    }

    /**
     * Ajax ile gelen view render edebilmek için
     *
     * @comment
     * Dinamik şekilde oluşturulan component'ler için ReactDOMServer kullanılmalı
     *
     *
     *
     * @Kaynak https://reactjs.org/docs/react-dom-server.html
     * @example https://github.com/mhart/react-server-example
     * @example https://camjackson.net/post/server-side-rendering-with-react
     * @example https://hackernoon.com/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67
     *
     * server.js
     * -------------------------------
     *   const React = require('react');
     **   const ReactDomServer = require('react-dom/server');
     *   const PostComponent = require('./components/PostComponent');

     *   app.get('/post/:slug', (req, res) => {
   *    const relevantPost = getPostFromDatabase(req.params.slug);
   *    const html = ReactDOMServer.renderToStaticMarkup(<PostComponent post={relevantPost}/>);
   *    res.send(html);
   *  });
     *
     *  postcomponent.js
     *  -------------------------------
     *   const React = require('react');
     *   const moment = require('moment');
     *   const Page = require('./page');

     *   const PostComponent = (props) => (
     *     <Page>
     *     <article className="container post">
     *     <h1>{props.post.title}</h1>
     *     <time pubdate className="pull-right">
     *     <em>{moment(props.post.posted).format('Do MMMM YYYY')}</em>
     *     </time>
     *     <hr/>
     *     <div>{props.post.text}</div>
     *     </article>
     *     </Page>
     *   );
     *   module.exports = PostComponent;
     *
     *  app.js
     *  -------------------------------------
     *   const React = require('react');
     *   const Head = require('./head');
     *   const NavBar = require('./navBar');
     *   const Footer = require('./footer');

     *   const Page = (props) => (
     *   <html>
     *     <Head/>
     *       <body>
     *       <div id="container">
     *       <NavBar/>
     *       <main>
     *          {props.children}
     *       </main>
     *       <Footer/>
     *       </div>
     *     </body>
     *   </html>
     *   );
     *   module.exports = Page;
     *
     * @param view
     * @param data
     * @param loadmask
     * @param controller
     */
    renderAjax = (view, data = {}, loadmask = false, controller = this.controllerName) => {

        /*var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.url, true);
        xhr.onload = function() {
          var response = JSON.parse(xhr.responseText);

          this.setState({ data: response.result });
        }.bind(this);
        xhr.send();*/

    }

    /**
     *
     * @returns {*}
     */
    render = () => {

        let methods = this.getMethods(this);
        Logger.debug("Controller Find action", this.controllerName + "/" + this.action)
        let method = methods.filter(f => f.toLocaleLowerCase() == "action" + this.action.toLocaleLowerCase());
        if (method.length > 0) {
            return this[method[0]]({...this.getUrlParams()});
        } else {
            return this.renderView("Page404", {action: this.action}, false, "Default");
        }

    }


    addError = (error) => {
        this._errors.push(error);
        console.error(error);
        return this;
    }

    /**
     *
     * @param errorCode
     * @param errorText
     * @returns {*}
     */
    actionError = (params) => {


        return <React.Fragment>
            <div className="text-white bg-danger text-center">
                <div className={"cart card-error p-4"}>
                    <blockquote className="card-bodyquote">
                        {params.errors ? <p>{params.errors}</p> : ""}
                        <p>{this.errors.map(e => {
                            return e;
                        })}</p>
                    </blockquote>
                </div>
            </div>
        </React.Fragment>;

    }

    /**
     * get all url parameters
     * @returns {*}
     */
    getUrlParams = (paramString = ":id?") => {

        const match = matchPath(this.props.location.pathname, {
            path: this.props.match.path + paramString,
            exact: true,
            strict: false
        }) || {};

        // let params = this.props.match.params || {};
        let params = match.params || {};
        return Object.assign(params, Utils.queryString.parse(this.props.location.search));
    }


    /**
     *
     * @param actionName
     * @param params
     * @returns {string}
     */

    createUrl = (actionName, params = {}, hash = true) => {


        // return <Link
        //     to={{
        //         pathname: actionName,
        //         search:  params,
        //         // hash: "#the-hash"
        //     }}
        // />;
        let queryStringParams = "";
        if (!Utils.isEmpty(params)) {
            if (Utils.has(params, "id") && !Utils.isEmpty(params.id)) {
                queryStringParams = params.id;
                delete params.id;
            }
        }

        if (!Utils.isEmpty(params))
            queryStringParams = queryStringParams + "/?" + Utils.queryString.stringify(params);

        let controller = "/" + this.controllerName + "/" + actionName;

        if (Utils.startsWith(actionName, "/")) controller = actionName;

        if (hash)
            return "/#" + Utils.trimEnd(controller, "/") + "/" + queryStringParams;
        else
            return Utils.trimEnd(controller, "/") + (Utils.startsWith(queryStringParams, "/") ? queryStringParams : "/" + queryStringParams);
    }

    /**
     *
     * @param actionName
     * @param params
     * @returns {*}
     */
    toUrl = (actionName, params = {}) => {
        return window.location = this.createUrl(actionName, params);
    }

    /**
     *
     * @param actionName
     * @param params
     * @returns {*}
     */
    toChange = (actionName, params = {}) => {
        return this.props.history.push(this.createUrl(actionName, params, false));
    }
}