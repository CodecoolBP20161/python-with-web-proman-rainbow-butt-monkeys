/**
 * Created by makaimark on 2016.10.03..
 */



var Boards = function () {
    var self = this;

    this.Board = function (name) {
        this.name = name;
        var date = new Date();
        this.id = date.getTime();
    };
    this.handleNewBoardName = function () {
        $('#myModal').modal('toggle');
        var name = document.getElementById("new_board").value;
        var new_board = new self.Board(name);
        document.getElementById("new_board").value = '';
        return new_board;
    };
    this.displayBoard = function (board) {
        var div = document.createElement("button");
        div.innerHTML = "Hello new board: " + board.name + " " + board.id;
        div.setAttribute('class', 'button button2');
        div.setAttribute('id', board.id);
        $(".col-md-12").append(div);;
    };
    this.boardLister = function () {
        var boards = mystorage.getBoards();
        if (boards != null) {
            for (var i = 0; i < boards.length; i++) {
                self.displayBoard(boards[i]);
            }
        }
    };
    this.saveBoardClickEventHandler = function () {
        $(".col-md-12").html("");
        var new_board = self.handleNewBoardName();
        console.log(new_board);
        mystorage.saveBoard(new_board);
        self.boardLister();
    };
    this.clickOnBoardEventHandler = function () {
        var board_id = $(this).attr('id');
        console.log(board_id)
        $(".col-md-12").html("");
        $(this).css('background-color', 'grey');
    };
};


var boards = new Boards();
var mystorage = new myStorage( new myLocalStorage());

var Cards = function (){
    this.Card = function (name, board_id){
        this.name = name;
        this.id = board_id;
    };

};



$(document).ready(function() {
    boards.boardLister();
    $("#save_board_button").click(boards.saveBoardClickEventHandler);
    $(".button").click(boards.clickOnBoardEventHandler);

});