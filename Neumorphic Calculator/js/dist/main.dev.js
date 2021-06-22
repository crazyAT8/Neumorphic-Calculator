"use strict";

//need to target our input
var $input = document.querySelector("input"); //now we are going to loop through all the number keys and put an event listener on them

document.querySelectorAll(".num__key").forEach( //arrow function
function (el) {
  //element on click--another arrow function
  el.onclick = function () {
    return $input.value = //this is another way to write an if statement
    $input.value !== "0" //if the current input value is not equal to zero
    ? $input.value + el.innerText : //we want the value to be the number or inner text of the element, to concatinate with another inner text
    el.innerText;
  }; //if the element is zero then we want to replace it with the elements number or inner text
  //take note that we are dealing with text not actual numbers

}); //need to set up a buffer
//keep an empty array to keep track of the numbers that have been entered along with the operations performed

var buffer = []; //this is the specific call back

var opCallback = function opCallback(opName) {
  return function () {
    var currentVal = parseFloat($input.value); //this converts the text to a number

    if (opName === "percent") {
      //this is distinguishing which operator
      currentVal *= 0.01; //this is the conversion for geting a percentage

      $input.value = currentVal; //this is taking what was entered and operated on as the new value being displayed
    } else {
      //if its not a percentage then we are going to add it to the buffer
      if (buffer && buffer.length) {
        //if there is a value and operation in the buffer
        buffer.push({
          value: currentVal
        }); //enter another value to the buffer

        var result = evaluate(buffer); //performs the operation of any number of entries

        buffer.push({
          value: result
        }); //displays the result of the last entry

        buffer.push({
          value: opName
        }); //enter the next operation to be taken, if any

        $input.value = ""; //clears the input display
      } else {
        buffer.push({
          value: currentVal
        }); //puts whatever is in the buffer with the operation

        buffer.push({
          value: opName
        }); //takes the operation selected

        $input.value = ""; //clears the input display
      }
    }
  };
}; //remember that "pop" pulls the last value out of an array


var evaluate = function evaluate(buffer) {
  var secondOperand = buffer.pop().value;
  var operator = buffer.pop().value;
  var firstOperand = buffer.pop().value;

  switch (operator) {
    case "add":
      return firstOperand + secondOperand;
      break;

    case "subtract":
      return firstOperand - secondOperand;
      break;

    case "multiply":
      return firstOperand * secondOperand;
      break;

    case "divide":
      return firstOperand / secondOperand;
      break;

    default:
      return secondOperand;
  }
};

for (var _i = 0, _arr = ["add", "subract", "multiply", "divide", "percent"]; _i < _arr.length; _i++) {
  var opName = _arr[_i];
  //we are looping through the array of operations
  document.querySelector('.op__key[op=${opName}]') //selecting an operations key with the corrisponding name to be used
  .onclick = opCallback(opName); //onclick event listener, so every click is a call back, and whatever was clicked will be the specific name of the operation
} //Equals button 


document.querySelector(".eq__key").onclick = function () {
  if (buffer && buffer.length) {
    buffer.push({
      value: parseFloat($input.value)
    });
    $input.value = evaluate(buffer);
  }
}; //clear button


document.querySelector(".op__key[op=clear]").onclick = function () {
  $input.value = 0;
  buffer.length = 0; //when you set the length of an array to zero, you are basically erasing it
};