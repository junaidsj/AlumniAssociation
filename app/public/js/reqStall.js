var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

})


myApp.controller('MainCtrl', function ($scope, $http) {

    $scope.details = [];

    $scope.addDetails = [];

    $scope.storeDetails = function () {
        alert("req");
        $scope.addDetails.push({
            'ecode': document.getElementById('ecode').value,
            'cname': document.getElementById('cname').value,
            'email': document.getElementById('email').value,
            'compname': document.getElementById('compname').value,
            'phone': document.getElementById('phone').value
        });

        var json = JSON.stringify($scope.addDetails, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });

        var det = [];
        det = JSON.parse(json);
        $http.post('/addreqEventDetails', det).success(function (service) {
            //alert(books);
            alert("Request Details Stored");
        });

    }


});

