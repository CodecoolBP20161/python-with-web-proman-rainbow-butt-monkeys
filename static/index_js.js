/**
 * Created by makaimark on 2016.10.03..
 */

function handle_new_board_name() {
    var x = document.getElementById("new_board").value;
    window.alert(x);
    document.getElementById("new_board").value = '';
}

function new_board(name){
    this.name = name;
}

$(document).ready(function() {
    $("#save_board_button").click(handle_new_board_name)

});