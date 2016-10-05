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
    this.displayBoard = function (board){
        var div = document.createElement("div");
        div.innerHTML = "Hello new board: " + board.name + " " + board.id;
        div.setAttribute('class', 'board');
        $(".container-custom").append(div);
    };
    this.boardLister = function () {
        var boards = mystorage.getBoards();
        if ( boards != null ) {
            for (var i = 0; i < boards.length; i++) {
                self.displayBoard(boards[i]);
            }
        }
    };
    this.saveBoardClickEventHandler = function () {
         $(".container-custom").html("");
        var new_board = self.handleNewBoardName();
        console.log(new_board);
        mystorage.saveBoard(new_board);
        self.boardLister();
    }
};

var boards = new Boards();
var mystorage = new myStorage( new myLocalStorage());


function Card(name, board_id){
    this.name = name;
    this.id = board_id;
}

$(document).ready(function() {
    boards.boardLister();
    $("#save_board_button").click(boards.saveBoardClickEventHandler);
});