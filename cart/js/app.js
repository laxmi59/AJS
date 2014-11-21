// creating a module called "store" with empty dependencies
(function() {
    var app = angular.module('store', ['store-products']);
    
    // Store Controller
    app.controller('StoreController', ["$http", function($http) {
        var store = this;
        store.products = [];
        $http.get("data/productsData.json").success(function(data) {
            store.products = data;
        });
    }]);

    // Reviews Controller
    app.controller("ReviewController", function() {
        this.addReview = function(product) {
            product.reviews.push(this.review);
        };
        this.review = {};
    });
})(); // Main Function End
