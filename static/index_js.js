/**
 * Created by makaimark on 2016.10.03..
 */

function handle_new_board_name() {
    $('#myModal').modal('toggle');

    var x = document.getElementById("new_board").value;
    document.getElementById("new_board").value = '';

    var div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.background = "red";
    div.style.color = "white";
    div.innerHTML = "Hello new board: " + x;
    div.setAttribute('id', 'draggable');
    document.body.appendChild(div);
}
function new_board(name){
    this.name = name;
}

$(document).ready(function() {
    $("#save_board_button").click(handle_new_board_name);
    $("#draggable").draggable();
});