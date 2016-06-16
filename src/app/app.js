'use strict';

var server = "http://121.40.190.5:8082";

// todo 登录验证
var access = function ($http) {
    var form_data = {
        time       : 1465887338,
        mac_address: '3c:46:d8:8a:50:cd'
    };
    $http.post(server + "/groups_encrypt/services/rest/statu/bindMac/json?user_id=5705b6c4e58a3a0a2e8b459f&token=3852c90", form_data).success(function (res) {
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