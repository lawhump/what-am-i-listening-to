'use strict';

/**
 * @ngdoc function
 * @name wailtnewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wailtnewApp
 */

var BASE_URL = "http://ws.audioscrobbler.com/2.0/?api_key=3d386c221b36c1442b384aa1d853bc8c&format=json";

angular.module('wailtnewApp')
  
    .controller('MainCtrl', ['$scope', '$http', 
        function ($scope, $http) {
            $scope.obj = [{name:'Death Grips'}, {name:'Wiz Khalifa'}, {name:'Earl Sweatshirt'}, {name:'Tyler, the Creator'}, {name:'King Krule'}, {name:'Kendrick Lamar'}, {name:'Bibio'}];
            
            $scope.period = '';
    
            $http.get(BASE_URL+'&method=user.getRecentTracks&user=guapo15')
            .then(function(response) {
                var mostRecentTrack = response.data.recenttracks.track[0];
                var imgObj = mostRecentTrack.image[3];
                var imgUrl = imgObj['#text'];
                
                $scope.MRTname = mostRecentTrack.name;
                $scope.MRTartist = mostRecentTrack.artist['#text'];
                $scope.url = imgUrl;
                    
                $scope.arr = response.data.recenttracks.track;
                
                console.log(response);
                console.log($scope.MRTname);
                console.log($scope.MRTartist);
            });
            
            $http.get(BASE_URL+'&method=user.gettoptracks&user=guapo15&limit=10&period='+$scope.period)
            .then(function(response) {
                console.log(response);
                $scope.topTracks = response.data.toptracks.track;
            });
            
            $scope.setPeriod = function(p) {
                $scope.period = p;
                update();
            };
            
            
            var update = function() {
                $http.get(BASE_URL+'&method=user.gettoptracks&user=guapo15&limit=10&period='+$scope.period)
                .then(function(response) {
                    console.log(response);
                    $scope.topTracks = response.data.toptracks.track;
                });
            };
    }]);
