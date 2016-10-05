/**
 * Created by makaimark on 2016.10.05..
 */

var myStorage = function (myState) {

    this.changeState = function(state) {
        myState = state;
    };
    this.saveBoard = function(board){
        myState.saveBoard(board);
    };
    this.getBoards = function(){
        return myState.getBoards();
    };
};

var myLocalStorage = function () {
    this.saveBoard = function (board){
        var oldItems = [];
        oldItems = JSON.parse(localStorage.getItem('Boards')) || [];
        oldItems.push(board);
        console.log(oldItems);
        localStorage.setItem('Boards', JSON.stringify(oldItems));
    };
    this.getBoards = function () {
        return JSON.parse(localStorage.getItem('Boards'))|| [];
    };
};




