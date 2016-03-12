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
            { completed:true, itemName:'cookies', date:'2016-03-11'},
            { completed:true, itemName:'milk', date:'2016-03-04'},
            { completed:true, itemName:'bananas', date:'2016-03-08'},
            { completed:true, itemName:'apples', date:'2016-03-10'},
            { completed:true, itemName:'chocolate', date:'2016-03-02'}
        ];
        return groceryService;
    })
    .controller('HomeCtrl', ['$scope', function($scope){
        $scope.appTitle ='Grocery List';
    }])

    .controller('GroceryListItemCtrl', ['$scope','$routeParams','GroceryService',
        function($scope, $routeParams,GroceryService) {
        $scope.groceryItems = GroceryService.groceryItems;
        //get value
        $scope.rp = 'Route parameter value:' + ' ' +  $routeParams.id;
    }])

