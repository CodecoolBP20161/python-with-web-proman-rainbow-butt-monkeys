/**
 * Created by makaimark on 2016.10.03..
 */
dragula([document.getElementById("table_for_cards"),
        document.getElementById("new"),
        document.getElementById("in-progress"),
        document.getElementById("review"),
        document.getElementById("done")], {
        });


var Boards = function () {
    var self = this;
    self.actualBoardId = 0;

    this.Board = function (name) {
        this.name = name;
        var date = new Date();
        this.board_id = date.getTime();
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
        var div = document.createElement("div");
        div.innerHTML = board.name;
        div.setAttribute('class', 'button button2');
        div.setAttribute('id', board.board_id);
        $("#boards").append(div);

    };

    this.boardLister = function (boards) {
        if (boards != null) {
            for (var i = 0; i < boards.length; i++) {
                self.displayBoard(boards[i]);
            }
        }
        $(".button-create").show();
        $('.button').on('click',function(event){
            self.clickOnBoardEventHandler(event.target.id)
        } );

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
        $("#table_for_cards").show();
        $(".container-fluid").show();
        mystorage.getCards();
    };
    this.backButtonListener = function () {
        $("#boards").html("");
        $(".button-card").hide();
        $(".back_button").hide();
        $("#table_for_cards").hide();
        $(".container-fluid").hide();
        $(".save_card_button").hide();
        mystorage.getBoards();
    };
};

var Cards = function (){
    var self = this;

    this.Card = function (name, board_id){
        this.name = name;
        this.board_id = board_id;
        this.status = "nothing";
        this.cardId = Date.now();

    };
    this.handleNewCardName = function () {
        $('#myModal_card').modal('toggle');
        var name = document.getElementById("new_card").value;
        if (name != "") {
            var new_card = new self.Card(name, boards.actualBoardId);
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
        console.log(new_card);
        self.displayCard(new_card);
    };
    this.cardLister = function (cards) {
        $("#table_for_cards").html("");
        //$(".cardClass").html("");
        $("#boards").html("");
        $(".back_button").click(boards.backButtonListener);
        if (cards != null) {
            for (var i = 0; i < cards.length; i++) {
                if (boards.actualBoardId == cards[i].board_id) {
                    self.displayCard(cards[i]);
                }
            }
        }
        $(".save_card_button").show();
        $(".save_card_button").click(self.clickOnSaveCardEventHandler);
    };
    this.displayCard = function (card) {
        var div = document.createElement("div");
        div.setAttribute("class", "cardClass");
        var tr = document.createElement("tr");
        tr.innerHTML = card.name;
        tr.setAttribute('class', 'card');
        tr.setAttribute('id', card.board_id);
        tr.setAttribute('card-id', card.cardId);
        div.appendChild(tr);
        tr.appendChild(addDeleteButton());
        if (card.status == "nothing"){
            $("#table_for_cards").append(div);
        } else if (card.status == "new"){
            $("#new").append(div);
        } else if (card.status == "in-progress"){
            $("#in-progress").append(div);
        }else if (card.status == "review"){
            $("#review").append(div);
        } else if (card.status == "done"){
            $("#done").append(div);
        }
    };
    this.clickOnSaveCardEventHandler = function(){
        for ( var i = 0; i < document.getElementsByClassName("card").length; i++){
            // cards.push(document.getElementsByClassName("card")[i]);
            var element = document.getElementsByClassName("card")[i].closest(".col-centered");
            var status = element.getAttribute("id");
            var cardName = document.getElementsByClassName("card")[i].innerHTML;
            var vars = {status:status, cardName:cardName};
            mystorage.saveCard(vars)
        }
    };

    this.deleteCardEventHandler = function (card) {
        deleteCard(card);
        mystorage.getCards()
    }
};

var localStorageClearer = function () {
    var answer = confirm("Press OK to delete the localStorage!");
    if (answer == true) {
        localStorage.clear();
        $("#boards").html("");
    } else {

    }
};

function addDeleteButton() {
    //Create an input type dynamically.
    var element = document.createElement("button");
    buttonText = document.createTextNode("X");
    element.appendChild(buttonText);
    element.type = "button";
    element.id = "delete-card-button";
    element.name = "button";
    return element
}


function deleteCard(cardId) {
    $.ajax({
    type: "POST",
    url: '/deletecard',
    data: JSON.stringify(cardId),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
    });
}

var boards = new Boards();
var mystorage = new myStorage( new myLocalStorageDatabase());
var cards = new Cards();

$(document).ready(function() {
    $("#table_for_cards").hide();
    $(".back_button").hide();
    $(".button-card").hide();
    $(".container-fluid").hide();
    $(".save_card_button").hide();
    mystorage.getBoards();
    $("#save_board_button").click(boards.saveBoardClickEventHandler);
    $("#save_card_button").click(cards.saveCardClickEventHandler);
    $(document).on('click', '#delete-card-button', function () {
        var parent = $(this).closest("tr");
        card = (parent).attr('card-id');
        cards.deleteCardEventHandler(card)
    });
    $(".button_delete").click(localStorageClearer);

});
