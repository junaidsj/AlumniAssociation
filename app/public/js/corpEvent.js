var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

})


myApp.controller('MainCtrl', function ($scope, $http) {

    $scope.details = [];

    $scope.addDetails = [];

    $scope.storeDetails = function () {
        $scope.addDetails.push({
            'ecode': document.getElementById('ecode').value,
            'ename': document.getElementById('ename').value,
            'etype': document.getElementById('etype').value,
            'city': document.getElementById('city').value,
            'area': document.getElementById('area').value,
            'loc': document.getElementById('loc').value,
            'fee': document.getElementById('fee').value,
            'sdate': document.getElementById('sdate').value,
            'edate': document.getElementById('edate').value
        });
        
        var json = JSON.stringify($scope.addDetails, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });

        var det = [];
        det = JSON.parse(json);
        $http.post('/addcorpEventDetails', det).success(function (service) {
            //alert(books);
            alert("Event Details Stored");
        });

    }


    $scope.getDetails = function () {
        var getecode = [];

        $scope.getecode = [{
            ecode: document.getElementById('getecode').value
        }];
        getecode = $scope.getecode;
        $http.post('/getcorpEventDetails', getecode).success(function (gotService) {
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotService);
            p = JSON.parse(p);

            document.getElementById('ecode').value = p[0].ecode;
            document.getElementById('ename').value = p[0].ename;
            document.getElementById('etype').value = p[0].etype;
            document.getElementById('city').value = p[0].city;
            document.getElementById('area').value = p[0].area;
            document.getElementById('loc').value = p[0].loc;
            document.getElementById('fee').value = p[0].fee;
            document.getElementById('sdate').value = p[0].sdate;
            document.getElementById('edate').value = p[0].edate;
        });
        alert("got Details");
    }

    $scope.updateDetails = function () {
        //alert('submit Data for update');

        $scope.details = [{
            'ecode': document.getElementById('ecode').value,
            'ename': document.getElementById('ename').value,
            'etype': document.getElementById('etype').value,
            'city': document.getElementById('city').value,
            'area': document.getElementById('area').value,
            'loc': document.getElementById('loc').value,
            'fee': document.getElementById('fee').value,
            'sdate': document.getElementById('sdate').value,
            'edate': document.getElementById('edate').value

        }];

        var det = [];
        det = $scope.details;
        alert("Event to update");

        $http.post('/updatecorpEventDetails', det).success(function (det) {
            alert("Updated Data");
        });
    }



    $scope.deleteDetails = function () {
        var getecode = [];

        $scope.ecode = [{
            ecode: document.getElementById('getecode').value
        }];
        getecode = $scope.ecode;
        $http.post('/deletecorpEventDetails', getecode).success(function (gotAdd) {
            document.getElementById('ecode').value = "";
            document.getElementById('ename').value = "";
            document.getElementById('etype').value = "";
            document.getElementById('city').value = "";
            document.getElementById('area').value = "";
            document.getElementById('loc').value = "";
            document.getElementById('fee').value = "";
            document.getElementById('sdate').value = "";
            document.getElementById('edate').value = "";

            
        });
        alert("Event deleted");
    }

});

