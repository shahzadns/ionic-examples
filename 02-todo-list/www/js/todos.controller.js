(function () {
    'use strict';

    angular
        .module('starter')
        .controller('TodosCtrl', TodosCtrl);

    TodosCtrl.$inject = ['$scope', '$ionicListDelegate'];

    function TodosCtrl($scope, $ionicListDelegate) {

        /*VM Functions */
        $scope.addTodo = addTodo;
        $scope.editTodo = editTodo;
        $scope.onInputKeyUp = onInputKeyUp;
        $scope.deleteTodo = deleteTodo;
        $scope.reorderTodo = reorderTodo;


        /*VM Properties */

        //states info for todo list 
        $scope.statesObj = {
            showReorder: false,
            showDelete: false,
            editMode: false,
            recentEditIndex: undefined
        };

        //todo for input form
        $scope.currentTodo = {
            text: '',
            checked: false
        };

        //todos list 
        $scope.todos = [{
            text: 'Qualify for Toronto',
            checked: false
        }, {
            text: 'Achieve as much as possible',
            checked: false
        }, {
            text: 'Get drunk of coding',
            checked: false
        }, {
            text: 'Live the day',
            checked: false
        }];


        /*Functions declarations */

        //Adds or updates todo into the todos list
        function addTodo() {

            //check for edit mode 
            if ($scope.statesObj.editMode) {

                //update the todo
                $scope.todos[$scope.statesObj.recentEditIndex].text = $scope.currentTodo.text;

                //exit the edit mode
                $scope.statesObj.editMode = false;

            } else {

                //add a new todo into the list
                $scope.todos.push(angular.copy($scope.currentTodo));
            }

            //clear input field
            $scope.currentTodo.text = '';
        }

        //activates the edit mode for the selected todo.
        function editTodo(todo, todoIndex) {

            //keep the todo item's index
            $scope.statesObj.recentEditIndex = todoIndex;

            //activates edit mode
            $scope.statesObj.editMode = true;

            //copy text to input field
            $scope.currentTodo.text = todo.text;

            //swipe back the item
            $ionicListDelegate.closeOptionButtons();
        }

        //activates last edit or deactivates edit mode
        function onInputKeyUp($event) {

            //if key Esc is an Arrow up key, and edit mode is active
            if ($event.keyCode === 27 && $scope.statesObj.editMode === true) {

                //exit the edit mode
                $scope.statesObj.editMode = false;
                $scope.currentTodo.text = '';

                return;

            //if key pressed is an Arrow up key, and input is empty and todos list is not empty
            } else if ($event.keyCode === 38 && $scope.currentTodo.text === '' && $scope.todos.length) {

                //activate the last todo for edit mode
                 editTodo($scope.todos[$scope.todos.length - 1], $scope.todos.length - 1);
            }
        }

        //Deletes selected todo from the todos list
        function deleteTodo(todo, todoIndex) {
            $scope.todos.splice(todoIndex, 1);
        }

        //Reorders the todo as users interacted
        function reorderTodo(todo, fromIndex, toIndex) {
            $scope.todos.splice(fromIndex, 1);
            $scope.todos.splice(toIndex, 0, todo);
        };
    }
})();