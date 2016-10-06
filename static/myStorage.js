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
    // this.deleteBoard = function(board){
    //     myState.deleteBoard(board);
    // };
    this.getBoards = function(){
        return myState.getBoards();
    };
    this.saveCard = function (card) {
        myState.saveCard(card);
    };
    this.getCards = function(){
        return myState.getCards();
    };
    // this.deleteCard = function(card){
    //     myState.deleteCard(card);
    // };
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
    // this.deleteCard = function (card){
    //
    // };
    // this.deleteBoard = function (board) {
    //     var oldBoards = [];
    //     oldBoards = JSON.parse(localStorage.getItem('Boards')) || [];
    //     var oldCards = [];
    //     oldCards = JSON.parse(localStorage.getItem('Cards')) || [];
    //     for ( var i = 0; i < oldCards.length; i++){
    //         if ( oldCards[i].id == board.id) {
    //             oldCards.splice(oldCards[i], 1)
    //         }
    //     }
    //     localStorage.setItem('Cards', JSON.stringify(oldCards));
    //     for ( var j = 0; j < oldBoards.length; j++){
    //         if ( oldBoards[j].id == board.id) {
    //             oldBoards.splice(oldBoards[j], 1)
    //         }
    //     }
    //     localStorage.setItem('Boards', JSON.stringify(oldBoards));
    // };
};



