/**
 * Created by makaimark on 2016.10.03..
 */

function Board(name){
    this.name = name;
}

var myStorage = function (){
    this.boards = [];
};

//noinspection JSAnnotator
myStorage.saveBoard() = {};
//noinspection JSAnnotator
myStorage.getBoard() = {};
//noinspection JSAnnotator
myStorage.implement() = {};


myLocalStorage.saveBoard = function() {

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
    var header = document.createElement('h3');
    div.innerHTML = "Hello new board: " + board.name;
    div.setAttribute('class', 'board');

    $(".container-custom").append(div);

}

function eventHandler(){
    var new_board = handleNewBoardName();
    displayBoard(new_board);
}

//var boards = [];

//JSON.parse(json_str);

//JSON.stringify(value[, replacer[, space]]);

$(document).ready(function() {
    $("#save_board_button").click(eventHandler);
});