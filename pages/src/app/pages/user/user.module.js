/**
 * Created by shuc on 16/6/21.
 */
"use strict";

(function () {
    angular.module('BlurAdmin.pages.user', [
        'BlurAdmin.pages.user.list',
        'BlurAdmin.pages.user.sign_in'
    ]).config(function ($stateProvider) {
        $stateProvider.state('user', {
            url        : '/user',
            template   : '<ui-view></ui-view>',
            abstract   : true,
            title      : '成员管理',
            sidebarMeta: {
                icon : 'ion-ios-people',
                order: 9000
            }
        });
    });
})();