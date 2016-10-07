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



