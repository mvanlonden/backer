'use strict';

angular.module('backing')
  .controller('MainCtrl', function ($scope, Auth, FBURL, $firebaseAuth, StreamService, $http) {
    var ref = new Firebase(FBURL);
    var auth = $firebaseAuth(ref);
    Auth.$onAuth(function(authData) {
      console.log(authData);
      $scope.authData = authData;
      $http.get('http://graph.facebook.com/v2.2/me/links')
        .success(function (data) {
          console.log(data);
        });
    });

    $scope.loginWithFacebook = function() {
      auth.$authWithOAuthPopup('facebook', {
        scope: 'read_stream'
      })
    };

    $scope.stream = [{first: 'here'}];

    $scope.addToStream = function (content) {
      StreamService.add(content);
    }

    StreamService.getUser()
      .then(function (user) {
        user.subscribe(function (data) {
          console.log('data', data.new);
          angular.forEach(data.new, function (val) {
            console.log(val);
            $scope.stream.push(val);
          });
          console.log($scope.stream);
          $scope.$apply();
        });
      })
  });
