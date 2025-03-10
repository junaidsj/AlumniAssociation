var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

})


myApp.controller('MainCtrl', function ($scope, $http) {

    $scope.details = [];

    $scope.addDetails = [];


    $scope.getDetails = function () {
        var getetype = [];

        $scope.etype = [{
            etype: document.getElementById('getetype').value
        }];
        getetype = $scope.etype;
                $http.post('/getEvent', getetype).success(function (gotEvent) {
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotEvent);
            p = JSON.parse(p);
            $scope.events = p;
        });
    }


});

