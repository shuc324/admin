/**
 * Created by shuc on 16/6/21.
 */
"use strict";

(function () {
    angular.module('BlurAdmin.pages.setting', [
        //'BlurAdmin.pages.setting.group',
        'BlurAdmin.pages.setting.user_list'
    ]).config(function ($stateProvider) {
        $stateProvider.state('setting', {
            url        : '/setting',
            template   : '<ui-view></ui-view>',
            abstract   : true,
            title      : '系统设置',
            sidebarMeta: {
                icon : 'ion-ios-people',
                order: 9000
            }
        });
    });
})();