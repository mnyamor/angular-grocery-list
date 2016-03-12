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
            .when('/addItem/edit/:id', {
                templateUrl:'views/addItem.html',
                controller:'GroceryListItemCtrl'
            })
            .otherwise({
                redirectTo:'/'
            })
        })

    //service

    .service('GroceryService', function(){

        var groceryService = [];

        //array list
         groceryService.groceryItems = [
            { id:1, completed:true, itemName:'cookies', date:'2016-03-11'},
            { id:2, completed:true, itemName:'milk', date:'2016-03-04'},
            { id:3, completed:true, itemName:'bananas', date:'2016-03-08'},
            { id:4, completed:true, itemName:'apples', date:'2016-03-10'},
            { id:5, completed:true, itemName:'chocolate', date:'2016-03-02'}
        ];

        //fetch
        groceryService.getNewId = function(){
            //if i have a variable named newid
            if(groceryService.newId) {
                //increase that new id by 1
                groceryService.newId++;
                //Then return it
                return groceryService.newId;
            } else {
                //if i dont have that variable, i want you to create it
                    //Loop through the list, find the max id, then increment it to create next id
                var maxId = _.max(groceryService.groceryItems, function(entry) {
                    return entry.id;
                });
                groceryService.newId = maxId.id + 1;
                return groceryService.newId;
            }

        };

        //Edit
        groceryService.findById = function(id){
            //pass in id, loop through every entry using a for each loop, and if match,return id
            for (var item in groceryService.groceryItems) {
                if (groceryService.groceryItems[item].id === id) {
                    return groceryService.groceryItems[item];
                }
            }

        };
        console.log(groceryService.findById(4));
        //save
        groceryService.save = function(entry){
            entry.id = groceryService.getNewId();
            groceryService.groceryItems.push(entry);
        };

        return groceryService;
    })

    //home controller

    .controller('HomeCtrl', ['$scope', function($scope){
        $scope.appTitle ='Grocery List';
    }])


    //Grocery list controller

    .controller('GroceryListItemCtrl', ['$scope','$routeParams','$location','GroceryService',
        function($scope, $routeParams,$location,GroceryService) {

            $scope.groceryItems = GroceryService.groceryItems;

            //add item
            $scope.groceryItem = { id:6, completed:true, itemName:'cheese', date:new Date()};

            //save item
            $scope.save = function (){
                GroceryService.save( $scope.groceryItem );
                $location.path('/');
            };

                //get value
        $scope.rp = 'Route parameter value:' + ' ' +  $routeParams.id;
            console.log($scope.groceryItems);
    }]);

