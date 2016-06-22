/**
 * Created by shuc on 16/6/22.
 */
"use strict";

(function () {
    angular.module('BlurAdmin.pages.user.list', [])
        .config(function ($stateProvider) {
            $stateProvider.state('user.list', {
                url        : 'user/list',
                template   : 'app/pages/user/list/list.html',
                title      : '管理员列表',
                sidebarMeta: {
                    order: 0
                }
            });
        });
})();