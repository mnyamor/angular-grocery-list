/*
* created by Mary Nyamor on 11.03.2016
*/

var app = angular.module('groceryListApp', ['ngRoute'])

    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl:'views/groceryList.html',
                controller:'GroceryListItemCtrl'
            })
            .when('/addItem', {
                templateUrl:'views/addItem.html',
                controller:'GroceryListItemCtrl'
            })
            .when('/addItem/:id', {
                templateUrl:'views/addItem.html',
                controller:'GroceryListItemCtrl'
            })
            .otherwise({
                redirectTo:'/'
            })
        })

    .service('GroceryService', function(){
        var groceryService = [];
        groceryService.groceryItems = [
            { id:1, completed:true, itemName:'cookies', date:'2016-03-11'},
            { id:2, completed:true, itemName:'milk', date:'2016-03-04'},
            { id:3, completed:true, itemName:'bananas', date:'2016-03-08'},
            { id:4, completed:true, itemName:'apples', date:'2016-03-10'},
            { id:5, completed:true, itemName:'chocolate', date:'2016-03-02'}
        ];
        groceryService.save = function(entry){
            groceryService.groceryItem.push(entry);
        };
        return groceryService;
    })
    .controller('HomeCtrl', ['$scope', function($scope){
        $scope.appTitle ='Grocery List';
    }])

    .controller('GroceryListItemCtrl', ['$scope','$routeParams','$location','GroceryService',
        function($scope, $routeParams,$location,GroceryService) {
        $scope.groceryItems = GroceryService.groceryItems;
            //add item
            $scope.groceryItem = { id:6, completed:true, itemName:'cheese', date:new Date()};
            $scope.save = function (){
                GroceryService.save($scope.groceryItem);
                $location.path('/');
            };

                //get value
        $scope.rp = 'Route parameter value:' + ' ' +  $routeParams.id;
    }])

