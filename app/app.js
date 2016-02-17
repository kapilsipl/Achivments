//Define an angular module for our app
var app = angular.module('todoApp', []);

app.controller('todoController', function($scope, $filter, $http) {
	
  // Load all items 
  getItem(); 
  function getItem(){  
  $http.post("ajax/item.php").success(function(data){
        $scope.items = data;
       });
  };
  
  // Add Item
  $scope.addItem = function (item) {
    $http.post("ajax/item.php?action=addItem&item="+item).success(function(data){
        getItem();
        $scope.itemInput = "";
      });
  };
  
  // Delete Item
  $scope.deleteItem = function (item) {
    if(confirm("Are you sure to delete this item?")){
    $http.post("ajax/item.php?action=deleteItem&itemID="+item).success(function(data){
        getItem();
      });
    }
  };
 
  // Clear Item
  $scope.clearItem = function () {
    if(confirm("Delete all checked items?")){
    $http.post("ajax/item.php?action=clearItem").success(function(data){
        getItem();
      });
    }
  };  

  // Update item
  $scope.changeStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("ajax/item.php?action=updateItem&itemID="+item+"&status="+status).success(function(data){
        getItem();
      });
  };

});
