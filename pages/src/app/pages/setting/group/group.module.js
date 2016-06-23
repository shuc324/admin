/**
 * Created by shuc on 16/6/22.
 */
"use strict";

(function () {
    angular.module('BlurAdmin.pages.setting.group', [])
        .config(function ($stateProvider) {
            $stateProvider.state('setting.group', {
                url        : '/group',
                templateUrl: 'app/pages/setting/group/group.html',
                controller : 'group',
                title      : '权限管理',
                sidebarMeta: {
                    order: 0
                }
            });
        })
        .config(function () {
            $.jstree.defaults.core.themes.url = true;
            $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes";
        });
})();