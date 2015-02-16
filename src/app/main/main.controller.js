'use strict';

angular.module('backing')
  .controller('MainCtrl', function ($scope, Auth, FBURL, $firebaseAuth) {
    var ref = new Firebase(FBURL);
    $scope.auth = $firebaseAuth(ref);
    Auth.$onAuth(function(authData) {
      console.log(authData);
       $scope.authData = authData;
    });
  });
