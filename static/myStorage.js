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
    this.saveCard = function (card) {
        myState.saveCard(card);
    };
    this.getCards = function(){
        return myState.getCards();
    };
};

var myLocalStorage = function () {
    this.saveBoard = function (board) {
        var oldBoards = [];
        oldBoards = JSON.parse(localStorage.getItem('Boards')) || [];
        oldBoards.push(board);
        localStorage.setItem('Boards', JSON.stringify(oldBoards));
    };
    this.getBoards = function () {
        return JSON.parse(localStorage.getItem('Boards')) || [];

    };
    this.saveCard = function (card) {
        var oldCards = [];
        oldCards = JSON.parse(localStorage.getItem('Cards')) || [];
        oldCards.push(card);
        localStorage.setItem('Cards', JSON.stringify(oldCards));

    };
    this.getCards = function () {
        return JSON.parse(localStorage.getItem('Cards')) || [];
    };
};

var myLocalStorageDatabase = function () {
    this.saveBoard = function (board) {
        $.ajax({
            type: "PUT",
            url: '/boards',
            data: JSON.stringify(board),
            contentType: 'application/json; charset=utf-8',
            success: function () {;
            },
            dataType: 'json'
        });
        this.getBoards();
    };
    this.getBoards = function () {
        $.ajax( {
            url: '/boards',
            async: false,
            dataType: 'json',
            success: function (json) {
                data = json;
                boards.boardLister(data)
            }
        });
    };

    this.saveCard = function (card) {
        $.ajax({
          type: "POST",
          url: 'http://192.168.160.115:5000/savecard',
          data: JSON.stringify(card),
          success: function () {
              console.log("success card")
          },
          dataType: 'json'
        });

    };

    this.getCards = function () {
        $.ajax( {
            url: 'http://192.168.160.115:5000/getcards',
            async: true,
            dataType: 'json',
            success: function (json) {
                data = json;
            }
        });
        return JSON.parse(data)
    };
};

