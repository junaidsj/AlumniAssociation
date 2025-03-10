var myApp = angular.module('myApp', []);



myApp.run(function ($rootScope) {

    $rootScope.prodsToAdd = [{
        pCode: '',
        pCost: '',
        pName: '',
        pImage: '',
        pDisc: ''
    }];

    $rootScope.prodToAdd = [{
        pCode: '',
        pCost: '',
        pName: '',
        pImage: '',
        pDisc: ''
    }];

    $rootScope.prodsSold = [{
        pCode: '',
        pCost: '',
        pName: '',
        pImage: '',
        pDisc: '',
        pQuantity: '',
        billNo:''
    }];
    $rootScope.totalAmount = 0;
})


myApp.controller('MainCtrl', function($scope) {

    $scope.add = function(prodToAdd) {

        /*
                var index = $scope.prodsToAdd.indexOf(prodToAdd);
                $scope.prodsToAdd.splice(index, 1);
                $scope.prods.push(angular.copy(prodToAdd))

        */
        $scope.prodsToAdd.push(angular.copy(prodToAdd));
    }


    $scope.getData = function () {

        var prodStr = document.getElementById('text').value;

        try {
            prodArr = JSON.parse(prodStr);

        }
        catch (e) {
            alert(e.message);
        }

        $scope.prodsToAdd = prodArr;    
        $scope.prodsSold = prodArr;
        angular.forEach($scope.prodsSold, function (item) { item.pQuantity = 1; item.billNo=1001 });

    }

    $scope.del = function (index) {
        $scope.prodsSold.splice(index, 1);
    }


    $scope.showBill = function () {
        $scope.totalAmount = 0;
        angular.forEach($scope.prodsSold, function (item) {
            $scope.totalAmount = $scope.totalAmount + item.pQuantity * item.pCost;
        });
        
    }


    $scope.payment = function () {
        
        var prodString = "something";
        prodString = JSON.stringify($scope.prodsSold);
        document.getElementById('products').value = prodString;
        /*
        var prodString="something";
        //prodString=angular.toJSON($scope.prodsToAdd);

        var json = JSON.stringify( $scope.prodsToAdd, function( key, value ) {
            if( key === "$$hashKey" ) {
                return undefined;
            }
            return value;
        });

        document.getElementById('prods').value=json;
        */

    }


    /*
    $scope.saveData= function() {
        var prodStr=document.getElementById('prods').value;
        var prodArr=[];
        prodArr=JSON.parse(prodStr);
        $scope.prodsToAdd=prodArr;
        var myData = new User(prodArr);
        myData.save(function (err) {

            if (err) return handleError(err);

            alert("Data Saved")
            //str=req.body.firstName;
            //res.send("My Name"  + req.body.firstName);
            // res.send("item saved to database");
            //res.send(req.body);
            // saved!
        })

    }
*/

});

