let picked;
let colorPick;
let toggleSwitch = false;
let elements = [...document.getElementById('target').children];
let shapes = [];
let myVar;
let moving;
let element;
let i = 0;

let cordinates = {
    x: 0,
    y: 0

}


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

let intervalSet = () => {
    myVar = setInterval(blink, 2000);
};

async function blink() {
    for (let element of shapes) {
        await changeColor(element);
    }
}

let changeColor = (element) => {
    if (element === "triangle") {
        eval(element).fillColor = eval(element).setColor;
        document.getElementById("triangleSVG").style.fill = (eval(element).fillColor === document.getElementById("triangleSVG").style.fill) ? 'white' : eval(element).setColor;
    } else {
        eval(element).fillColor = eval(element).setColor;
        document.getElementById(element).style.backgroundColor = (eval(element).fillColor === document.getElementById(element).style.backgroundColor) ? 'white' : eval(element).setColor;
    }

};

let togglebtn = () => {
    if (toggleSwitch) {
        document.getElementById("btn-on").disabled = true;
        document.getElementById("btn-off").disabled = false;
        toggleSwitch = false;
        intervalSet();

    } else {
        document.getElementById("btn-on").disabled = false;
        document.getElementById("btn-off").disabled = true;
        toggleSwitch = true;
        clearTimeout(myVar);

    }

};

let dragStartHandler = (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    picked = ev.target.id;
    colorPick = document.getElementById(`${picked}`);

};

let dragOverHandler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy"
};

let dropHandler = (ev) => {
    ev.preventDefault();

    if (colorPick) {
        const style = getComputedStyle(colorPick);

        if (ev.target.nodeName === "polygon") {
            ev.target.parentElement.style.fill = style.backgroundColor;
            eval(ev.target.parentElement.parentElement.id).setColor = style.backgroundColor;
            colorPick = undefined;
        } else {
            ev.target.style.backgroundColor = style.backgroundColor;
            eval(ev.target.className).setColor = style.backgroundColor;
            colorPick = undefined;

        }
    }

};


/*
elements.forEach((element) => {
    element.addEventListener('mousedown',
        (event) => {
            let shiftX = event.clientX - element.getBoundingClientRect().left;
            let shiftY = event.clientY - element.getBoundingClientRect().top;


            let moveAt = (pageX, pageY) => {
                element.style.left = pageX - shiftX + 'px';
                element.style.top = pageY - shiftY + 'px';
            }
            element.style.position = 'absolute';
            element.style.zIndex = 10;
            document.body.append(element);

            moveAt(event.pageX, event.pageY);


            /!*let onMouseMove = (event) => {
                moveAt(event.pageX, event.pageY);
            }*!/

            let onMouseMove = (event) => {
                moveAt(event.pageX, event.pageY);

            }

            document.addEventListener('mousemove', onMouseMove);

            element.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
                element.onmouseup = null;

            })

        });
    element.ondragstart = function () {
        return false;
    };
});
*/


let dragShapeStart = (event) => {
    moving = event.target.id;
    element = document.getElementById(moving);


};

let dragEndShapeHandler = (event) => {

    let moveTo = (x, y) => {
        event.target.parentElement.style.position = 'relative';
        event.target.style.position = 'absolute';
        event.target.style.zIndex = 10 + i;
        i++;
        event.target.style.left = cordinates.x + 'px';
        event.target.style.top = cordinates.y + 'px';

    };
    moveTo(cordinates.x, cordinates.y);
};

let dragOverShapeHandler = (event) => {
    let shapeWidth = parseInt(window.getComputedStyle(element).getPropertyValue('width'), 10);
    let shapeHeight = parseInt(window.getComputedStyle(element).getPropertyValue('height'), 10);
    let getTargetShape = document.getElementById('target');
    let targetShapeWidth = parseInt(window.getComputedStyle(getTargetShape).getPropertyValue('width'), 10);
    let targetShapeHeight = parseInt(window.getComputedStyle(getTargetShape).getPropertyValue('width'), 10);

if (event.target.id === 'target'){
    cordinates.x = event.offsetX >= targetShapeWidth - shapeWidth ? targetShapeWidth - shapeWidth : event.offsetX;
    cordinates.y = event.offsetY >= targetShapeHeight - shapeHeight ? targetShapeHeight - shapeHeight : event.offsetY;

} else {
    console.log(event);

}


};


(init = () => {
    shapes = [];
    for (let i = 0; i < elements.length; i++) {
        shapes.push(elements[i].id);
    }
    intervalSet();

})();

