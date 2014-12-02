
(function(){
     var app = angular.module('app',[]);
     app.controller('productsController',["$http","$scope", function($http, $scope){        
        $scope.products = [];
        $scope.init = function(){            
            $http.get("data/dataFunctions.php?act=all").success(function(data){
                $scope.products = data;
            });
        };
        $scope.init();
        $scope.changeStatus = function(pid){
           $http.get("data/dataFunctions.php?act=statusUpdate&pid="+pid).success(function(data){
               $scope.init();
            });
        };        
        $scope.modalShown = false;
        $scope.toggleModal = function() {      
           $scope.modalShown = !$scope.modalShown;
        };
        // Product Insertion
        $scope.errors = [{errors: "test"}, {errors: "test1"}];
        $scope.insertProduct = function(){ 
            $http({
                method: 'POST',
                url: "data/dataFunctions.php?act=insertProduct",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {productName: this.productName, productPrice: this.productPrice}
            }).success(function (data) {
                alert(data);
                $scope.errors = data;
            });
        };
    }]);
    app.directive('modalDialog', function() { 
        return {
        restrict: 'E',
        scope: {
          show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
          scope.dialogStyle = {};
          if (attrs.width)
            scope.dialogStyle.width = attrs.width;
          if (attrs.height)
            scope.dialogStyle.height = attrs.height;
          scope.hideModal = function() {
            scope.show = false;
          };
        },
        template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"    
        };
    });
  // Add product directive
    app.directive('addProducts', function(){
        return{
            restrict: 'E',
            templateUrl: "partials/addProduct.html"
        }
    });
  /*  var app = angular.module('app',[]);
    app.controller('productsController',["$http","$scope", function($http, $scope){        
        $scope.products = [];
        $scope.init = function(){            
            $http.get("data/dataFunctions.php?act=all").success(function(data){
                $scope.products = data;
            });
        };
        $scope.init();
        $scope.changeStatus = function(pid){
           $http.get("data/dataFunctions.php?act=statusUpdate&pid="+pid).success(function(data){
               $scope.init();
            });
        };      
        
    }]);  */
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
