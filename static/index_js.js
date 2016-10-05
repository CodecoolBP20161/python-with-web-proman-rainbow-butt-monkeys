/**
 * Created by makaimark on 2016.10.03..
 */

function Board(name){
    this.name = name;
    var d = new Date();
    this.id = d.getTime();
}

var mystorage = new myStorage( new myLocalStorage());

function handleNewBoardName() {
    $('#myModal').modal('toggle');

    var name = document.getElementById("new_board").value;
    var new_board = new Board(name);
    document.getElementById("new_board").value = '';
    return new_board;
}

function displayBoard(board) {

    var div = document.createElement("div");
    div.innerHTML = "Hello new board: " + board.name + " " + board.id;
    div.setAttribute('class', 'board');

    $(".container-custom").append(div);

}

function boardLister() {
    var boards = mystorage.getBoards();
    console.log(boards);
    if ( boards != null ) {
        for (var i = 0; i < boards.length; i++) {
            displayBoard(boards[i]);
        }
    }
}


function saveBoardClickEventHandler(){
    $(".container-custom").html("");
    var new_board = handleNewBoardName();
    console.log(new_board);
    mystorage.saveBoard(new_board);
    boardLister();
}

$(document).ready(function() {
    boardLister();
    $("#save_board_button").click(saveBoardClickEventHandler);
});