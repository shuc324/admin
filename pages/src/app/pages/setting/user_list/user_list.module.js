/**
 * Created by shuc on 16/6/22.
 */
"use strict";

(function () {
    angular.module('BlurAdmin.pages.setting.user_list', [])
        .config(function ($stateProvider) {
            $stateProvider.state('setting.user_list', {
                url        : '/user_list',
                templateUrl: 'app/pages/setting/user_list/user_list.html',
                title      : '成员列表',
                sidebarMeta: {
                    order: 1
                }
            });
        });
})();