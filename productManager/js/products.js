(function(){
    var app = angular.module('store-products',[]);
    
    // get Product List
    app.directive("productsList", function(){
        return {
            restrict: 'E',
            templateUrl: 'products.html'
        };
    });
    
    // get sample Products Data
    app.directive('productTitle', function() {
        return {
            restrict: 'E', // element directive
            //restrict: 'A', // attribute directive
            templateUrl: 'productTitle.html'

        };
    });
    
    // get Product Full Details
    app.directive('productDetails', function() {
        return {
            restrict: 'E', // element directive
            //restrict: 'A', // attribute directive
            templateUrl: 'productDetails.html'

        };
    });
    
    // get Product Panels (Description, Specification and Reviews) Data
    app.directive('productPanels', function() {
        return {
            restrict: 'E', // element directive
            //restrict: 'A', // attribute directive
            templateUrl: 'productPanels.html',
            controller: function() {
                this.tab = 1;
                this.selectTab = function(setTab) {
                    this.tab = setTab;
                };
                this.isSelected = function(activeTab) {
                    return this.tab === activeTab;
                };
            },
            controllerAs: 'panels'
        };
    });    
})();