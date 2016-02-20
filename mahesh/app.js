var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {

  $scope.updateTodo = function(value) {
    console.log('Saving title ' + value);
    alert('Saving title ' + value);
  };
  
  $scope.cancelEdit = function(value) {
    console.log('Canceled editing', value);
    alert('Canceled editing of ' + value);
  };
  
  $scope.todos = [
    {id:123, title: 'Lord of the things'},
    {id:321, title: 'Hoovering heights'},
    {id:231, title: 'Watership brown'}
  ];
});





// Inline edit directive
app.directive('inlineEdit', function($timeout) {
  return {
    scope: {
      model: '=inlineEdit',
      handleSave: '&onSave',
      handleCancel: '&onCancel'
    },
    link: function(scope, elm, attr) {
      var previousValue;
      
      scope.edit = function() {
        scope.editMode = true;
        previousValue = scope.model;
        
        $timeout(function() {
          elm.find('input')[0].focus();
        }, 0, false);
      };
      scope.save = function() {
        scope.editMode = false;
        scope.handleSave({value: scope.model});
      };
      scope.cancel = function() {
        scope.editMode = false;
        scope.model = previousValue;
        scope.handleCancel({value: scope.model});
      };
    },
    templateUrl: 'inline-edit.html'
  };
});


