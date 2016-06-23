/**
 * Created by shuc on 16/6/22.
 */
"use strict";

(function () {
    angular.module('BlurAdmin.pages.setting.user_access', [])
        .config(function ($stateProvider) {
            $stateProvider.state('setting.user_access', {
                url        : '/user_access',
                templateUrl: 'app/pages/setting/user_access/user_access.html',
                controller : 'user_access',
                title      : '权限管理',
                sidebarMeta: {
                    order: 100
                }
            });
        })
        .config(function () {
            $.jstree.defaults.core.themes.url = true;
            $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes";
        });
})();