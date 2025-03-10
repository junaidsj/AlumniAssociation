  var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {
    $rootScope.prodsToAdd = [];
})


myApp.controller('MainCtrl', function ($scope, $http) {

    $scope.imageName = "";

    $scope.add = function (prodsToAdd) {
        alert('Submit Employee Data');
    }



    $scope.submitData = function () {
        alert('Submit Candidate Data');
        $scope.employee = [{
            eid: document.getElementById('eid').value,
            ename: document.getElementById('ename').value,
            eaddress: document.getElementById('eaddress').value,
            edesignation: document.getElementById('edesignation').value,
            eexperience: document.getElementById('eexperience').value,
            dob: document.getElementById('dob').value,
            esalary: document.getElementById('esalary').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            eCategory: document.getElementById('eCategory').value
        }];

        var employee = [];
        employee = $scope.employee;
        $http.post('/addcandidate', employee).success(function (employee) {
            alert("Submitted Data Successfully");
        });
    }

    $scope.getemployee = function () {
        var geteid = [];


        $scope.employeeeid = [{
            eid: document.getElementById('geteid').value
        }];
        geteid = $scope.employeeeid;
        $http.post('/getcandidate', geteid).success(function (gotemployee) {
            alert("Got Employee Data");
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotemployee);
            p = JSON.parse(p);

            document.getElementById('eid').value = p[0].eid;
            document.getElementById('ename').value = p[0].ename;
            document.getElementById('eaddress').value = p[0].eaddress;
            document.getElementById('edesignation').value = p[0].edesignation;
            document.getElementById('eexperience').value = p[0].eexperience;
            document.getElementById('dob').value = p[0].dob;
            document.getElementById('esalary').value = p[0].esalary;
            document.getElementById('phone').value = p[0].phone;
            document.getElementById('email').valu = p[0].email;

            document.getElementById('eCategory').value = p[0].eCategory;
            //  $scope.imageName = p[0].pImage;
        });
    }

    $scope.updateemployee = function () {
        alert("Submiting Data for Update");

        $scope.employee = [{
            eid: document.getElementById('eid').value,
            ename: document.getElementById('ename').value,
            eaddress: document.getElementById('eaddress').value,
            edesignation: document.getElementById('edesignation').value,
            eexperience: document.getElementById('eexperience').value,
            dob: document.getElementById('dob').value,
            esalary: document.getElementById('esalary').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,

            eCategory: document.getElementById('eCategory').value
        }];

        var employee = [];
        employee = $scope.employee;

        $http.post('/updatecandidate', employee).success(function (employee) {
            alert(employee)
            alert("Updated Data Successfully");
        });
    }


    $scope.deleteemployee = function () {
        var geteid = [];

        $scope.employeeeid = [{
            eid: document.getElementById('geteid').value
        }];
        geteid = $scope.employeeeid;
        $http.post('/deletecandidate', geteid).success(function (gotemployee) {
            alert(gotemployee);
            document.getElementById('eid').value = "";
            document.getElementById('ename').value = "";
            document.getElementById('eaddress').value = "";
            document.getElementById('edesignation').value = "";
            document.getElementById('eexperience').value = "";
            document.getElementById('dob').value = "";
            document.getElementById('esalary').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('email').valu = "";
            document.getElementById('eCategory').value = "";
        });
    }

});