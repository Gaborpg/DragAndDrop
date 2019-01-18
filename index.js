let picked;
let colorPick;
let toggleSwitch = false;
let elements = [...document.getElementById('target').children];
let shapes = [];
let myVar;
let square = {
    fillColor: "rgb(255, 56, 56)",
    setColor: "rgb(255, 242, 0)",
    originalFillColor: "rgb(255, 56, 56)",
};


let rectangle = {
    fillColor: "rgb(255, 56, 56)",
    setColor: "rgb(205, 132, 241)",
    originalFillColor: "rgb(255, 56, 56)",
};

let triangle = {
    fillColor: "rgb(255, 56, 56)",
    setColor: "rgb(24, 220, 255)",
    originalFillColor: "rgb(255, 56, 56)",
};


(function init() {
    shapes = [];
    for (let i = 0; i < elements.length; i++) {
        shapes.push(elements[i].id);
    }
    intervalSet();

})();


function intervalSet() {
    myVar = setInterval(blink, 2000);
}


async function blink() {
    for (let element of shapes) {
        await changeColor(element);
    }
}

function changeColor(element) {
    if (element === "triangle") {
        eval(element).fillColor = eval(element).setColor;
        document.getElementById("triangleSVG").style.fill = (eval(element).fillColor === document.getElementById("triangleSVG").style.fill) ? 'white' : eval(element).setColor;
    } else {
        eval(element).fillColor = eval(element).setColor;
        document.getElementById(element).style.backgroundColor = (eval(element).fillColor === document.getElementById(element).style.backgroundColor) ? 'white' : eval(element).setColor;
    }

};


function togglebtn() {
    if (toggleSwitch) {
        document.getElementById("btn-on").disabled = true;
        document.getElementById("btn-off").disabled = false;
        toggleSwitch = false;
        console.log('ON');
        intervalSet();

    } else {
        document.getElementById("btn-on").disabled = false;
        document.getElementById("btn-off").disabled = true;
        toggleSwitch = true;
        console.log('OFF');
        clearTimeout(myVar);

    }

}


function dragstart_handler(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    picked = ev.target.id;
    colorPick = document.getElementById(`${picked}`);

}

function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}

function drop_handler(ev) {
    ev.preventDefault();

    const style = getComputedStyle(colorPick);

    if (ev.target.nodeName === "polygon") {
        ev.target.parentElement.style.fill = style.backgroundColor;
        eval(ev.target.parentElement.parentElement.id).setColor = style.backgroundColor;
    } else {
        ev.target.style.backgroundColor = style.backgroundColor;
        eval(ev.target.className).setColor = style.backgroundColor;
    }

}


elements.forEach((element) => {
    element.onmousedown = function (event) {

        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;

        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        document.body.append(element);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        element.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        };

    };

    element.ondragstart = function () {
        return false;
    };
});



