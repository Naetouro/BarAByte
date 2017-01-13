'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

  phonecatControllers.controller('ContactCtrl', ['$scope', '$http',
        function($scope, $http) {
          $scope.clickbutton = function() {
            var mail_from = $scope.mail_from;
            var mail_to = $scope.mail_to;
            var message = $scope.message;
            var url = "https://api.mailgun.net/v3/sandbox53533d25728b4dfa8adb3aab3f9a806a.mailgun.org/messages";
            var dataJSON = {
              from: mail_from,
              to: mail_to,
              subject: "Test envoie mail",
              text: message
            };
            var req = {
              method : 'POST',
              url: url,
              headers : {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic YXBpOmtleS1jYzc4NDBjZDA3ODllNzFjZDQ2MDMzMjIzMTBmNmVkMA=='
            },
            transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
            },
            data: dataJSON
            }
            $http(req)
            .then(function(){
            alert('Envoie du mail : OK')
            console.log(req);
            },
            function(){
              alert('Envoie du mail : KO')
              console.log(req);
            });
          };
          $scope.chercherville=function(){
            var ville=$scope.ville;
            var url="https://maps.googleapis.com/maps/api/geocode/json?address="+ville+"&key=AIzaSyDuGUpivzKQuuz-7NqnziW2yLdbwZdn1qk";
            var req = {
              method : 'GET',
              url: url
            };
            $http(req).then(function(reponse){
              console.log(reponse);
              $scope.reponse=reponse;
            })
          }
          }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
