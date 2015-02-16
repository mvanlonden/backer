'use strict';

angular.module('backing')
  .factory('StreamService', function ($http, $q) {
    var client = stream.connect('kp94f2dwack7', null, '2366');
    console.log('stream client', client);
    var $token;
    var user1;
    return {
      add: function (content) {
        console.log('adding activity');
        var activity = {"actor": "User:2", "verb": "says", "object": content, "target": "Board:1"};
        user1.addActivity(activity, function(){
          console.log('activity added');
        });
      },
      getUser: function() {
        var deferred = $q.defer();
        console.log('getting user');
        $http.get('http://localhost:8080/api/stream')
          .success(function (user) {
            $token = user.token;
            user1 = client.feed('user', '1', $token);
            deferred.resolve(user1);
          });
        return deferred.promise;
      }
    } 
    function failCallback(data) {
        alert('something went wrong, check the console logs');
        console.log(data);
    }
  });
