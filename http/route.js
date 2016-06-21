/**
 * Created by shuc on 16/6/17.
 */
"use strict";

import express from "express";

export default class route {
    static start(app) {
        // 定义路由
        app.post('/user');

        route.asserts(app);
        return app.start();
    }

    static asserts(app) {
        // 静态文件
        app.express.use('/', (request, response) => {
            response.sendFile(app.app_path + "/public/index.html");
        });
        app.express.use('/sign_up.html', (request, response) => {
            response.sendFile(app.app_path + "/public/reg.html");
        });
        app.express.use('/sign_in.html', (request, response) => {
            response.sendFile(app.app_path + "/public/auth.html");
        });
        app.express.use('/404.html', (request, response) => {
            response.sendFile(app.app_path + "/public/404.html");
        });

        app.express.use('/maps/*', express.static(app.app_path + "/public/maps"));
        app.express.use('/fonts/*', express.static(app.app_path + "/public/fonts"));
        app.express.use('/assets/*', express.static(app.app_path + "/public/assets"));
        app.express.use('/styles/*', express.static(app.app_path + "/public/styles"));
        app.express.use('/scripts/*', express.static(app.app_path + "/public/scripts"));
        // 404
        app.express.use('*', (request, response) => {
            response.json({code: 404, message: 'not found', data: {}});
        });
    }
}