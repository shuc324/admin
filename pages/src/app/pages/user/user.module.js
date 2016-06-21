/**
 * Created by shuc on 16/6/21.
 */
"use strict";

(function () {
    angular.module('BlurAdmin.pages.user', [
        'BlurAdmin.pages.user.sign_in'
    ]).config(function ($stateProvider) {
        $stateProvider.state('user', {
            url        : '/user',
            template   : '<ui-view></ui-view>',
            abstract   : true,
            title      : 'user',
            sidebarMeta: {
                icon : 'ion-android-laptop',
                order: 200
            }
        });
    });
})();