// creating a module called "store" with empty dependencies
(function() {
    var app = angular.module('store', ['store-products']);

    // Creation of new controller
    app.controller('StoreController', function() {
        // calling sample data
        //this.products = gem;
        //this.currentDate = new Date();
        this.products = [{
            name: 'Iphone',
            price: 10000,
            description: 'iPhone is a line of smartphones designed and marketed by Apple Inc. It runs Apple\'s iOS mobile operating system.[13] The first generation iPhone was released on June 29, 2007; the most recent iPhone models are the iPhone 6 and iPhone 6 Plus, which were unveiled at a special event on September 9',
            canpurchase: true,
            soldout: true,
            images:[
                {
                    fullImage:'images/iphone.jpg',
                    thumbImage: 'images/thumbs/iphone-thumb.jpg'       
                }
            ],
            reviews:[
                {
                    stars:5,
                    body:"Awe Some product",
                    author:"aaa@example.com"                    
                },
                {
                    stars:2,
                    body:"good product",
                    author:"bbb@example.com"                    
                }
            ]
        },
        {
            name: 'Lemon',
            price: 9000,
            description: 'Dual Sim ( 3G+GSM), 1GB RAM with Dual core processor, 13.46 cm ( 5.3 inch ) Display, QHD resolution ( 960x 540), OGS Display (Zero Air Gap)',
            canpurchase: false,
            soldout: false,
            images:[
                {
                    fullImage:'images/lemon.jpg',
                    thumbImage: 'images/thumbs/lemon-thumb.jpg'       
                }
            ],
            reviews:[
                {
                    stars:3,
                    body:"Good product",
                    author:"aaa@example.com"                    
                },
                {
                    stars:4,
                    body:"Fine product",
                    author:"bbb@example.com"                    
                }
            ]
        }
    ]
    }); // controller End

    // Some sample single Data
    /*var gem = {
     name: 'Product1',
     price: 5,
     description: 'Product1 Description',
     canpurchase: true,
     soldout: true
     }*/

    // Some sample multiple Data
    
    
    app.controller("ReviewController", function(){        
        this.addReview = function(product){
            product.reviews.push(this.review);
        };
        this.review={};
    });
    
    
})(); // Main Function End
