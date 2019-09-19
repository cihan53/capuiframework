/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */


const webpack = require('webpack')
const rewireAliases = require('react-app-rewire-aliases');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
// const rewireProvidePlugin = require('react-app-rewire-provide-plugin')
const {prepareProxy} = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('react-scripts/config/paths');
const path = require("path");
const {
    override,
    addWebpackAlias,
    addWebpackResolve,
    disableEsLint,
    addDecoratorsLegacy,
    addBabelPlugins,
    addBabelPresets,

    fixBabelImports,
    addLessLoader,
    watchAll,
    overrideDevServer,
    removeModuleScopePlugin,
    getBabelLoader,
    babelInclude,
    addBundleVisualizer
} = require("customize-cra");


/**
 * global değişken tanımlamak için
 * @param providePluginOptions
 * @returns {function(*, *): *}
 */
const rewireProvidePlugin = (providePluginOptions) => (config, env) => {
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin(providePluginOptions)
    ]);
    return config;
};

/**
 * watch Ignore
 * @returns {function(*): *}
 */
const watchIgnore = () => config => {
    config.watchOptions = {
        ignored: ignoredFiles(paths.appSrc),
    };
    config.performance = {
        hints: false
    };

    return config;
};


/**
 * alias ları al
 * @type {any}
 */
const packagejs = require(paths.appPackageJson);
let alias = {}
if (packagejs.resolve && packagejs.resolve.alias) {
    Object.entries(packagejs.resolve.alias).forEach(([key, value]) => {
 // "a 5", "b 7", "c 9"
        alias[key] = path.resolve(__dirname, value);
    });

}



/**
 *
 * @type {{devServer: (function(*): function(*=, *=): *), webpack: *}}
 */
module.exports = {
    webpack: override(

        removeModuleScopePlugin(),
        addWebpackAlias(alias),
        addWebpackResolve({symlinks: false, cacheWithContext: false}),
        watchIgnore(),

        // usual webpack plugin
        disableEsLint(),
        // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
        process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

        addDecoratorsLegacy(),
        babelInclude([paths.appSrc, path.resolve(__dirname, "../src")]),
        // babelInclude([paths.appSrc ]),
        ...addBabelPlugins(
            "babel-plugin-styled-components",
            "@babel/plugin-syntax-dynamic-import"
        ),

        fixBabelImports("react-app-rewire-mobx", {
            libraryDirectory: "",
            camel2DashComponentName: false
        }),
        addLessLoader()

    ),
    devServer: function (configFunction) {

        configFunction.stats = "errors-only";
        configFunction.overlay = false;
        configFunction.compress = true;
        configFunction.quiet = true;

        return function (proxy, allowedHost) {
            const proxySetting = require(paths.appPackageJson).proxy;
            proxy = prepareProxy(proxySetting, paths.appPublic);
            const config = configFunction(proxy, allowedHost);

            return config;
        }
    }
};


