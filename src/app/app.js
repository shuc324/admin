'use strict';

// todo 登录验证
var access = function ($http) {
    var data = {
        time       : 1465887338,
        mac_address: '3c:46:d8:8a:50:cd'
    };
    $http.post("/ajax/access", data).success(function (res) {
        console.log(res);
    });
};

angular.module('RD', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'angular-progress-button-styles',

    'BlurAdmin.theme',
    'BlurAdmin.pages'
]);