/**
 * Created by shuc on 16/6/17.
 */
"use strict";

import express from "express";
import engines from "consolidate";

export default class route {
    static start(app) {
        // 定义路由

        route.asserts(app);

        app.post('/user');

        return app.start();
    }

    static asserts(app) {
        // 静态文件
        app.express.use('/', express.static("public"));
        // 404
        //app.express.use('*', (request, response) => {
        //    response.json({code: 404, message: 'not found', data: {}});
        //});
    }
}