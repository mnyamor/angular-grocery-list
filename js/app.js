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

app.service('GroceryService', function($http){
    //create an empty object
    var groceryService = {};

    //add items to our object
    groceryService.groceryItems = [];

     $http.get('js/mockup-data/data.json')
         .success(function(data){
             groceryService.groceryItems = data;
             for (var item in  groceryService.groceryItems) {
                 groceryService.groceryItems[item].date = new Date(groceryService.groceryItems[item].date);
             }
         })
         .error(function(data, status){
             alert('things went wrong');
         })

        // $http.get('/someUrl', config).then(successCallback, errorCallback);

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

    groceryService.removeItem = function(entry){
        var index = groceryService.groceryItems.indexOf(entry);
        groceryService.groceryItems.splice(index,1);
    };

    groceryService.markCompleted = function(entry){
        entry.completed = !entry.completed;
    };

    //save
    groceryService.save = function(entry){
        //update
        var updatedItem = groceryService.findById(entry.id);

        if (updatedItem) {
            $http.post('js/mockup-data/updatedItem.json', entry)
                .success(function (data) {
                    if(data.status == 1) {
                        updatedItem.completed = entry.completed;
                        updatedItem.itemName = entry.itemName;
                        updatedItem.date = entry.date;
                    }
                })
                .error(function(data, status){

                });


            /*updatedItem.completed = entry.completed;
            updatedItem.itemName = entry.itemName;
            updatedItem.date = entry.date;*/

        } else {
            $http.post('js/mockup-data/addedItem.json',entry)
                .success(function(data){
                    entry.id = data.newId;
                })
                .error(function(data, status){

                });


            //entry.id = groceryService.getNewId();
            groceryService.groceryItems.push(entry);
        }

    };


    return groceryService;
});
app.directive('mnGroceryItem', function(){
    return {
        restrict:'E',
        templateUrl:'views/groceryItem.html'
    };
});
app.controller('HomeCtrl', ['$scope', 'GroceryService', function($scope, GroceryService) {
    $scope.groceryItems = GroceryService.groceryItems;

    $scope.removeItem = function(entry){
        GroceryService.removeItem(entry);
    };
    $scope.markCompleted = function(entry) {
        GroceryService.markCompleted(entry);
    };

    $scope.$watch(
        function(){
            return GroceryService.groceryItems;
        },
        function(groceryItem){
            $scope.groceryItems = groceryItem;
        }
    )
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

