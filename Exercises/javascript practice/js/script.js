var tempElement = document.getElementById("text");
var myButton = document.getElementById("myButton");
var myText = document.getElementById("myText");
var c = document.getElementById("myCanvas");
var cont = 0;
var ctx = c.getContext("2d");
myButton.addEventListener('click', function () {
    if (myButton.innerText == "Go!") {
        myFunction();

    } else {
        myFunction2();
    }
});

buttonCanvas.addEventListener('click', function () {
    cont++;

    if (cont == 4) {
        ctx.beginPath();
        ctx.arc(95, 60, 15, 0, Math.PI);

        ctx.stroke();
        buttonCanvas.removeEventListener('click');
    } else if (cont == 1) {
        c.classList.remove('invisible')
        ctx.beginPath();

        ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();
    } else if (cont == 2) {
        ctx.beginPath();
        ctx.moveTo(70, 40);
        ctx.lineTo(85, 40);
        ctx.stroke();

    } else if (cont == 3) {
        ctx.beginPath();
        ctx.moveTo(100, 40);
        ctx.lineTo(115, 40);
        ctx.stroke();

    }
});

function myFunction() {

    myButton.innerText = "Back";
    tempElement.appendChild = myButton;

    myText.textContent = "Le diste click! :)";

}

function myFunction2() {

    myButton.innerText = "Go!";
    tempElement.appendChild = myButton;

    myText.textContent = "Click that button above";

}




