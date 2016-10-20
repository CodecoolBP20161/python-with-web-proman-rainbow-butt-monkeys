/**
 * Created by svindler on 20.10.2016.
 */

function addDeleteButton() {
    //Create an input type dynamically.   
    var element = document.createElement("button");
    //Assign different attributes to the element. 
    element.type = "button";
    element.value = "Delete"; // Really? You want the default value to be the type string?
    element.name = "button";
    return element
    
}// And the name too?