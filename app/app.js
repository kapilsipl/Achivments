//Define an angular module for our app
var app = angular.module('todoApp', ['toaster','ngDraggable','angularUtils.directives.dirPagination']);

app.controller('todoController', function($scope, $filter, $http,toaster) {
	
  // Load all task 
  getItem(); 
  function getItem(){  
	 
  $http.post("ajax/item.php", {action : 'getAll'}).success(function(data){
        $scope.items = data;
        $scope.onDropComplete = function (index, obj, evt) {
                    var otherObj = $scope.items[index];
                    var otherIndex = $scope.items.indexOf(obj);
                    $scope.items[index] = obj;
                    $scope.items[otherIndex] = otherObj;
                }
                
                
       });
  };
  
  // Add new task
  $scope.addItem = function () {
	if($scope.itemInput!=undefined){
	 $http.post("ajax/item.php", {action : 'addItem', item: $scope.itemInput }).success(function(data){
        getItem();
        toaster.pop('success', "Record added succesfully");
        $scope.itemInput = "";
      });
  }
  
  
  
  };
  
  // Delete task
  $scope.deleteItem = function (item) {
    if(confirm("Are you sure to delete this item?")){
    $http.post("ajax/item.php", {action: 'deleteItem',itemID:item}).success(function(data){
		 toaster.pop('success', "Record deleted succesfully");
        getItem();
      });
    }
  };
 
 // Edit task
 $scope.editItem = function(item){
	 $scope.addtodo=true;
	 $scope.eidttodo=true;
	 $scope.editid = item.id;
	 $scope.itemInput = item.tasks;	 	 	 
	 }	 
	 
	 $scope.updateTodo= function(item){
		$http.post("ajax/item.php",{action: 'updateItem','itemID':$scope.editid,'status':$scope.itemInput}).success(function(data){
       getItem();
        toaster.pop('success', "Record updated succesfully");
        $scope.itemInput = "";
         $scope.addtodo=false;
	    $scope.eidttodo=false;
      });
  }
	 
// Change task         
 
});
