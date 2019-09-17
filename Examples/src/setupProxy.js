/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */

const proxy = require('http-proxy-middleware')

module.exports = function (app) {


    var options = {
        target: 'http://localhost:8092', // target host
        secure: false,
        changeOrigin: true,
        ws: false,
        router: {

            /*
            "/api/agentManagementService": "http://172.17.7.231:8090",
            "/api/config": "http://172.17.7.231:8092",
            "/api/securityService": "http://172.17.7.231:8096",
            "/api/assetService": "http://172.17.7.231:8089",
            "/api/taskService": "http://172.17.7.231:8088",
            "/api/configurationService": "http://172.17.7.231:8092",
            "/api/configurationService/Manager": "http://172.17.7.231:8092",
            "/api/components": "http://172.17.7.231:8096",
            "/api/login": "http://172.17.7.231:8096",
            "/api/integrationService": "http://172.17.7.233:8097",
            "/api/elasticReportingService": "http://172.17.7.233:8098",
            "/api/graph": "http://172.17.7.233:8098",
            "/api/streamingService": "http://172.17.7.231:8099",
            "/api/classificationService": "http://172.17.7.233:8099",
            "/api/siemService": "http://172.17.7.233:8086",
            "/api/notificationService": "http://172.17.7.231:8085"
            */


        /*
            "/api/agentManagementService": "http://172.17.7.80:8090",
            "/api/config": "http://172.17.7.80:8092",
            "/api/securityService": "http://172.17.7.80:8096",
            "/api/assetService": "http://172.17.7.80:8089",
            "/api/taskService": "http://172.17.7.231:8088",
            "/api/configurationService": "http://172.17.7.80:8092",
            "/api/configurationService/Manager": "http://172.17.7.80:8092",
            "/api/components": "http://172.17.7.80:8096",
            "/api/login": "http://172.17.7.80:8096",
            "/api/integrationService": "http://172.17.7.81:8097",
            "/api/elasticReportingService": "http://172.17.7.81:8098",
            "/api/graph": "http://172.17.7.81:8098",
            "/api/streamingService": "http://172.17.7.80:8099",
            "/api/classificationService": "http://172.17.7.81:8099",
            "/api/siemService": "http://172.17.7.81:8086",
            "/api/notificationService": "http://172.17.7.81:8085"
            */




            "/api/agentManagementService": "http://localhost:8090",
            "/api/config": "http://localhost:8092",
            "/api/securityService": "http://localhost:8096",
            "/api/assetService": "http://localhost:8089",
            "/api/taskService": "http://localhost:8088",
            "/api/configurationService": "http://localhost:8092",
            "/api/configurationService/Manager": "http://localhost:8092",
            "/api/components": "http://localhost:8096",
            "/api/login": "http://localhost:8096",
            "/api/integrationService": "http://localhost:8097",
            "/api/elasticReportingService": "http://localhost:8098",
            "/api/graph": "http://localhost:8098",
            "/api/streamingService": "http://localhost:8099",
            "/api/classificationService": "http://localhost:8099",
            "/api/siemService": "http://localhost:8086",
            "/api/notificationService": "http://localhost:8085"


        },
        pathRewrite: {
            "^/api/components": "/securityService/getComponentTree",
            "^/api/login": "/securityService/validateUser",
            "^/api/securityService": "securityService",
            "^/api/assetService": "assetService",
            "^/api/taskService": "taskService",
            "^/api/configurationService/Manager": "configurationService/Manager",
            "^/api/configurationService": "configurationService",
            "^/api/config": "configurationService",
            "^/api/agentManagementService": "agentManagementService",
            "^/api/graph": "elasticReportingService",
            "^/api/integrationService": "integrationService",
            "^/api/elasticReportingService": "elasticReportingService",
            "^/api/streamingService": "streamingService",
            "^/api/classificationService": "classificationService",
            "^/api/siemService": "siemService",
            "^/api/notificationService": "notificationService"
        }
    };
    var exampleProxy = proxy(options);
    app.use('/api', exampleProxy);

    //
    // app.use(proxy('/api/agentManagementService', {
    //     target: 'http://localhost:8090',
    //     secure: false,
    //     changeOrigin: true,
    //     ws: true,
    // }));
    // app.use(proxy('/api/config', {target: 'http://localhost:8092'}));
    // app.use(proxy('/api/securityService', {target: 'http://localhost:8096'}));
    // app.use(proxy('/api/assetService', {target: 'http://localhost:8089'}));
    //
    // app.use(proxy("/api/taskService", {target: "http://localhost:8088"}));
    // app.use(proxy("/api/configurationService", {target: "http://localhost:8092"}));
    // app.use(proxy("/api/configurationService/Manager", {target: "http://localhost:8092"}));
    // app.use(proxy("/api/components", {target: "http://localhost:8096"}));
    // app.use(proxy("/api/login", {target: "http://localhost:8096"}));
    // app.use(proxy("/api/integrationService", {target: "http://localhost:8097"}));
    // app.use(proxy("/api/elasticReportingService", {target: "http://localhost:8098"}));
    // app.use(proxy("/api/graph", {target: "http://localhost:8098"}));
    // app.use(proxy("/api/streamingService", {target: "http://172.17.6.165:8099"}));
    // app.use(proxy("/api/classificationService", {target: "http://localhost:8099"}))
}