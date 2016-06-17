/**
 * Created by shuc on 16/6/17.
 */
"use strict";

import express from "express";

export default class route {
    static start(app) {
        // 定义路由
        app.use('/test_service');


        route.asserts(app);
        return app.start();
    }

    static asserts(app) {
        // 静态文件
        app.express.use('/index.html', express.static(app.app_path + "/public"));
        app.express.use('/auth.html', express.static(app.app_path + "/public"));
        app.express.use('/404.html', express.static(app.app_path + "/public"));
        app.express.use('/reg.html', express.static(app.app_path + "/public"));
        app.express.use('/assets/*', express.static(app.app_path + "/public/assets"));
        app.express.use('/fonts/*', express.static(app.app_path + "/public/fonts"));
        app.express.use('/maps/*', express.static(app.app_path + "/public/maps"));
        app.express.use('/scripts/*', express.static(app.app_path + "/public/scripts"));
        app.express.use('/styles/*', express.static(app.app_path + "/public/styles"));

        // 404
        app.express.use('*', (request, response) => {
            response.json({
                code   : 404,
                message: 'not found',
                data   : {}
            });
        });
    }
}