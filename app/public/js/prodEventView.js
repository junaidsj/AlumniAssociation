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
        alert(document.getElementById('getetype').value);
        $http.post('/getprodEvent', getetype).success(function (gotEvent) {
            alert("Got Event Data");
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotEvent);
            p = JSON.parse(p);
            $scope.events = p;
        });
    }

   
});

