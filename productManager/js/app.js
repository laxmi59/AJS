
(function(){
     var app = angular.module('app',[]);
     app.controller('productsController',["$http","$scope", function($http, $scope){ 
        // Get all Products     
        $scope.products = [];
        $scope.init = function(){            
            $http.get("data/dataFunctions.php?act=showAllProducts").success(function(data){
                $scope.products = data;
            });
        };
        $scope.init();    
        $scope.formFields =[]
        $scope.emptyFormFields = [{"id": null,"name": null,"description": null, "price": null,"stock": null,"packing": null}];
        
        // Add or Edit Popup
        $scope.modalShown = false;
        $scope.toggleModal = function(id) {               
            if(id != "0"){                
                $http.get("data/dataFunctions.php?act=getSingleProduct&id="+id).success(function(data){
                    //alert(data[0]["id"]);
                    $scope.formFields = data[0];                    
                });
            }else{
                $scope.formFields = $scope.emptyFormFields;
            } 
            $scope.modalShown = !$scope.modalShown;
        };
        // Product Insertion        
        $scope.addorEditProduct = function(){              
            if(isNaN($scope.formFields.id))
                url = "data/dataFunctions.php?act=addProduct";
            else
                url = "data/dataFunctions.php?act=updateProduct";
            $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.formFields
            }).success(function (data) {
                alert(data);

                document.getElementById("addProductForm").reset();
                $scope.modalShown = false; 
                $scope.init();
            });
        };
        $scope.hideModalCancel = function(){
            document.getElementById("addProductForm").reset();
            $scope.modalShown = false;
        }  
        // change status
        $scope.changeStatus = function(id){
           $http.get("data/dataFunctions.php?act=statusUpdate&id="+id).success(function(data){
               $scope.init();
            });
        };  
        // Delete Product
        $scope.deleteProduct = function(id){
           $http.get("data/dataFunctions.php?act=deleteProduct&id="+id).success(function(data){
               alert(data);
               $scope.init();
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
