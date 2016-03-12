/*
* created by Mary Nyamor on 11.03.2016
*/

var app = angular.module('groceryListApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'views/groceryList.html',
            controller:'HomeCtrl'
        })
        .when('/addItem', {
            templateUrl:'views/addItem.html',
            controller:'GroceryListItemCtrl'
        })
        .when('/addItem/edit/:id', {
            templateUrl:'views/addItem.html',
            controller:'GroceryListItemCtrl'
        })
        .otherwise({
            redirectTo:'/'
        })
});

app.service('GroceryService', function(){
    //create an empty object
    var groceryService = {};

    //add items to our object
    groceryService.groceryItems = [
        { id:1, completed:true, itemName:'cookies', date:'2016-03-11'},
        { id:2, completed:true, itemName:'milk', date:'2016-03-04'},
        { id:3, completed:true, itemName:'bananas', date:'2016-03-08'},
        { id:4, completed:true, itemName:'apples', date:'2016-03-10'},
        { id:5, completed:true, itemName:'chocolate', date:'2016-03-02'}
    ];

    //Edit
    groceryService.findById = function(id){
    //pass in id, loop through every entry using a for each loop, and if match,return id
        for (var item in groceryService.groceryItems) {
            if (groceryService.groceryItems[item].id === id) {
                return groceryService.groceryItems[item];
            }
        }
    };

    //fetch
    groceryService.getNewId = function(){
        //if i have a variable named newid
        if(groceryService.newId) {
            //increase that new id by 1
            groceryService.newId++;
            //Then return it
            return groceryService.newId;
        } else {
            /* if i dont have that variable, i want you to create it
             Loop through the list, find the max id, then increment it to create next id*/
            var maxId = _.max(groceryService.groceryItems, function(entry) {
                return entry.id;
            });
            groceryService.newId = maxId.id + 1;
            return groceryService.newId;
        }
    };

    //save
    groceryService.save = function(entry){
        //update
        var updatedItem = groceryService.findById(entry.id);

        if (updatedItem) {
            updatedItem.completed = entry.completed;
            updatedItem.itemName = entry.itemName;
            updatedItem.date = entry.date;

        } else {
            entry.id = groceryService.getNewId();
            groceryService.groceryItems.push(entry);
        }

    };
    return groceryService;
});

app.controller('HomeCtrl', ['$scope', 'GroceryService', function($scope, GroceryService) {
    $scope.groceryItems = GroceryService.groceryItems;

}]);

app.controller('GroceryListItemCtrl', ['$scope','$routeParams','$location','GroceryService',
    function($scope, $routeParams,$location,GroceryService) {

        //add or edit entry
        //if route params not empty, we will create a new entry
        if (!$routeParams.id) {
            $scope.groceryItem = { id:0, completed:false, itemName:'', date:new Date()};
        } else {
            $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
        }
        //save item
        $scope.save = function (){
            GroceryService.save( $scope.groceryItem );
            $location.path('/');
        };

    }
]);

