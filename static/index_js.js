/**
 * Created by makaimark on 2016.10.03..
 */

function Board(name){
    this.name = name;
}

// var myStorage = function () {};
//
// //noinspection JSAnnotator
// myStorage.saveBoard() = {};
// //noinspection JSAnnotator
// myStorage.getBoard() = {};
// //noinspection JSAnnotator
// myStorage.implement() = {};

var Boards = [];

var myLocalStorage = function () {};

myLocalStorage.saveToLocal = function (board){
    var oldItems = [];
    oldItems = JSON.parse(localStorage.getItem('Boards')) || [];
    oldItems.push(board);
    localStorage.setItem('Boards', JSON.stringify(oldItems));
};

myLocalStorage.retrieve = function () {
    return JSON.parse(localStorage.getItem("Boards"));
};

function handleNewBoardName() {
    $('#myModal').modal('toggle');

    var name = document.getElementById("new_board").value;
    var new_board = new Board(name);
    document.getElementById("new_board").value = '';
    return new_board;
}

function displayBoard(board) {

    var div = document.createElement("div");
    div.innerHTML = "Hello new board: " + board.name;
    div.setAttribute('class', 'board');

    $(".container-custom").append(div);

}

function boardLister() {
    var boards = myLocalStorage.retrieve();
    if ( boards !== null ) {
        for (var i = 0; i < boards.length; i++) {
            displayBoard(boards[i]);
        }
    }
}


function eventHandler(){
    $(".container-custom").html("");
    var new_board = handleNewBoardName();
    myLocalStorage.saveToLocal(new_board);
    boardLister();
}

$(document).ready(function() {
    boardLister();
    $("#save_board_button").click(eventHandler);
});