/**
 * Created by shuc on 16/6/21.
 */
"use strict";

(function () {
    angular.module("BlurAdmin.pages.user.sign_in", [])
        .config(function ($stateProvider) {
            $stateProvider.state('user.sign_in', {
                url        : '/sign_in',
                templateUrl: 'app/pages/user/sign_in/sign_in.html',
                controller : 'sign_in_ctrl',
                title      : '登录',
                sidebarMeta: {
                    order: 0
                }
            });
        });
})();