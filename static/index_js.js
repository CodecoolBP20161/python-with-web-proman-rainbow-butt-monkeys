/**
 * Created by makaimark on 2016.10.03..
 */

var Boards = function () {
    var self = this;
    self.actualBoardId = 0;

    this.Board = function (name) {
        this.name = name;
        var date = new Date();
        this.id = date.getTime();
    };

    this.handleNewBoardName = function () {
        $('#myModal').modal('toggle');
        var name = document.getElementById("new_board").value;
        if (name != "") {
            var new_board = new self.Board(name);
            document.getElementById("new_board").value = '';
            return new_board;
        }else{
            alert("Please write a name for your new board");
        }

    };
    this.displayBoard = function (board) {
        var div = document.createElement("button");
        div.innerHTML = board.name;
        div.setAttribute('class', 'button button2');
        div.setAttribute('id', board.id);
        $("#boards").append(div);
    };

    this.boardLister = function () {
        var boards = mystorage.getBoards();
        console.log(boards);
        if (boards != null) {
            for (var i = 0; i < boards.length; i++) {
                self.displayBoard(boards[i]);
            }
        }
        $(".button-create").show();
        $('.button').on('click',function(event){self.clickOnBoardEventHandler(event.target.id)} );

    };
    this.saveBoardClickEventHandler = function () {
        $("#boards").html("");
        var new_board = self.handleNewBoardName();
        if (new_board != null) {
            mystorage.saveBoard(new_board);
        }
        self.boardLister();

    };
    this.clickOnBoardEventHandler = function (targetid) {
        self.actualBoardId = targetid;
        $(this).css('background-color', 'grey');
        $(".button-create").hide();
        $(".button-card").show();
        $(".back_button").show();
        $("#pina").show();
        cards.cardLister(self.actualBoardId);
    };
    this.backButtonListener = function () {
        $("#boards").html("");
        $(".button-card").hide();
        $(".back_button").hide();
        $("#pina").hide();
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
        if (name != "") {
            var new_card = new self.Card(name, boards.actualBoardId);
            console.log(boards.actualBoardId);
            document.getElementById("new_card").value = '';
            return new_card;
        }else{
            alert("Please write a name for your new board");
        }
    };
    this.saveCardClickEventHandler = function () {
        var new_card = self.handleNewCardName();
        if (new_board != null) {
            mystorage.saveCard(new_card);
        }
        self.cardLister(boards.actualBoardId);
    };
    this.cardLister = function (board_id) {
        $("#pina").html("");
        $("#boards").html("");
        var cards = mystorage.getCards();
        if (cards != null) {
            for (var i = 0; i < cards.length; i++) {
                if (board_id == cards[i].id)
                self.displayCard(cards[i]);
            }
        }
    };
    this.displayCard = function (card) {
        var div = document.createElement("tr");
        var table = document.getElementById("pina");
        div.innerHTML = "+ " + card.name;
        div.setAttribute('class', 'card');
        div.setAttribute('id', card.id);
        $("#pina").append(div);
    };
};

var localStorageClearer = function () {
    var answer = confirm("Press OK to delete the localStorage!");
    if (answer == true) {
        localStorage.clear();
        $("#boards").html("");
    } else {

    }


};

var boards = new Boards();
var mystorage = new myStorage( new myLocalStorageDatabase());
var cards = new Cards();



$(document).ready(function() {
    $("#pina").hide();
    $(".back_button").hide();
    $(".button-card").hide();
    boards.boardLister();
    $("#save_board_button").click(boards.saveBoardClickEventHandler);
    //$(".button").click(boards.clickOnBoardEventHandler);
    $("#save_card_button").click(cards.saveCardClickEventHandler);
    $(".back_button").click(boards.backButtonListener);
    $(".button_delete").click(localStorageClearer);

});
