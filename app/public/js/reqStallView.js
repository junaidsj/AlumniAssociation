var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

})


myApp.controller('MainCtrl', function ($scope, $http) {

    $scope.details = [];

    $scope.addDetails = [];


    $scope.getDetails = function () {
        var getecode = [];

        $scope.ecode = [{
            ecode: document.getElementById('getecode').value
        }];
        getecode = $scope.ecode;
        $http.post('/getreqStall', getecode).success(function (gotEvent) {
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotEvent);
            p = JSON.parse(p);
            $scope.events = p;
        });
    }
});

