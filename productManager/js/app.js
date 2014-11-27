
(function(){
    var app = angular.module('app',[]);
    app.controller('productsController',["$http", function($http, $scope){        
        $scope = this;
        $http.get("data/dataFunctions.php?rec=all").success(function(data){
            $scope.products = data;
        });
    }]);  
    // product list directive
    app.directive('productsList', function(){
        return{
            restrict: 'E',
            templateUrl: "partials/productsList.html"
        }
    });
    
    // search directive
    app.directive('searchFilter', function(){
        return {
            restrict: 'E',
            templateUrl: "partials/searchProducts.html"
        }
    })
})();
