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
        div.innerHTML = board.name + " " + board.id;
        div.setAttribute('class', 'button button2');
        div.setAttribute('id', board.id);
        $(".col-md-12").append(div);
    };
    this.boardLister = function () {
        var boards = mystorage.getBoards();
        if (boards != null) {
            for (var i = 0; i < boards.length; i++) {
                self.displayBoard(boards[i]);
            }
        }
        $(".button-create").show();
    };
    this.saveBoardClickEventHandler = function () {
        $(".col-md-12").html("");
        var new_board = self.handleNewBoardName();
        mystorage.saveBoard(new_board);
        self.boardLister();
    };
    this.clickOnBoardEventHandler = function () {
        var board_id = $(this).attr('id');
        console.log(board_id);

        $(this).css('background-color', 'grey');
        $(".button-create").hide();
        $(".button-card").show();
        $(".back_button").show();
        cards.cardLister();
    };
    this.backButtonListener = function () {
        $(".col-md-12").html("");
        $(".button-card").hide();
        $(".back_button").hide();
        self.boardLister();
    };
};

var Cards = function (){
    var self = this;

    this.Card = function (name, board_id){
        this.name = name;
        this.id = board_id;
    };
    this.handleNewCardName = function () {
        $('#myModal_card').modal('toggle');
        var name = document.getElementById("new_card").value;
        var new_card = new self.Card(name, "idekellberakniaboardidt");
        document.getElementById("new_card").value = '';
        return new_card;
    };
    this.saveCardClickEventHandler = function () {
        var new_card = self.handleNewCardName();
        mystorage.saveCard(new_card);
        self.cardLister();
    };
    this.cardLister = function () {
        $(".col-md-12").html("");
        var cards = mystorage.getCards();
        console.log(cards);
        if (cards != null) {
            for (var i = 0; i < cards.length; i++) {
                self.displayCard(cards[i]);
            }
        }
    };
    this.displayCard = function (card) {
        var div = document.createElement("button");
        div.innerHTML = card.name + " " + card.id;
        div.setAttribute('class', 'button button2');
        div.setAttribute('id', card.id);
        $(".col-md-12").append(div);
    };
};

var boards = new Boards();
var mystorage = new myStorage( new myLocalStorage());
var cards = new Cards();



$(document).ready(function() {
    $(".back_button").hide();
    $(".button-card").hide();
    boards.boardLister();
    $("#save_board_button").click(boards.saveBoardClickEventHandler);
    $(".button").click(boards.clickOnBoardEventHandler);
    $("#save_card_button").click(cards.saveCardClickEventHandler);
    $(".back_button").click(boards.backButtonListener);

});
$('.button').live('click',boards.clickOnBoardEventHandler);