/**
 * Created by shuc on 16/6/24.
 */
"use strict";

(function () {
    angular.module('BlurAdmin.pages.setting.user_list')
        .controller('user_list', function ($scope, $http, $filter) {
            $scope.users = [];
            $scope.groups = [];
            $scope.statuses = [
                {
                    value: 1,
                    text : '未审核'
                },
                {
                    value: 2,
                    text : '已审核'
                }
            ];

            $http.post('/user/list', {
                start: 0,
                limit: 15
            }).then(function (response) {
                if (response.status == 200 && response.data.code == 200) {
                    $scope.users = response.data.data.list;
                }
            }).catch(function (err) {
                console.log(err);
                $scope.users = [
                    {
                        "_id"        : "576b999a2492da8c6ff7b3dc",
                        "username"   : "645904877@qq.com",
                        "avatar"     : "assets/img/app/profile/Nasta.png",
                        "full_name"  : "舒超",
                        "group"      : {
                            "name": ""
                        },
                        "auth_status": 1
                    },
                    {
                        "_id"        : "576b99502492da8c6ff7b3db",
                        "username"   : "shuc324@163.com",
                        "avatar"     : "assets/img/app/profile/Nasta.png",
                        "full_name"  : "舒超",
                        "group"      : {
                            "name": ""
                        },
                        "auth_status": 1
                    },
                    {
                        "_id"        : "576b98c8514d1b716f080cfe",
                        "username"   : "shuchao@163.com",
                        "avatar"     : "assets/img/app/profile/Nasta.png",
                        "full_name"  : "舒超",
                        "group"      : {
                            "name": ""
                        },
                        "auth_status": 2
                    },
                    {
                        "_id"        : "576b8386fb3cc93f6eeeb197",
                        "username"   : "shuchao@qq.com",
                        "avatar"     : "assets/img/app/profile/Nasta.png",
                        "full_name"  : "舒超",
                        "group"      : {
                            "name": ""
                        },
                        "auth_status": 2
                    },
                    {
                        "_id"        : "576b856dfb3cc93f6eeeb198",
                        "username"   : "shuc324@gmail.com",
                        "avatar"     : "assets/img/app/profile/Nasta.png",
                        "full_name"  : "舒超",
                        "group"      : {
                            "name": ""
                        },
                        "auth_status": 1
                    }
                ];
            });

            // todo ... get groups

            $scope.showGroup = function (group) {
                if (group && $scope.groups.length) {
                    var selected = $filter('filter')($scope.groups, {_id: group._id});
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return 'Not set';
                }
            };

            $scope.showStatus = function (user) {
                if (user.auth_status > 0) {
                    var selected = $filter('filter')($scope.statuses, {value: user.auth_status});
                    console.log(selected);
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return 'Not set';
                }
            };
        });
})();