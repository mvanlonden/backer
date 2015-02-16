'use strict';

angular.module('backing')
  .factory('Auth', function (FBURL, $firebaseAuth) {
    var ref = new Firebase(FBURL);
    return $firebaseAuth(ref);
  });
