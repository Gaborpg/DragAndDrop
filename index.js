let picked;
let colorPick;
let toggleSwitch = false;
let elements = [...document.getElementById('target').getElementsByTagName('div')];
let shapes = [];



let square = {
    startX: 20,
    startY: 20,
    drawX: 0,
    drawY: 0,
    width: 40,
    height: 40,
    fillColor: "#FF0000",
    originalFillColor: "#FF0000",
    isMoving: false
};


let regtangle = {
    startX: 20,
    startY: 20,
    drawX: 0,
    drawY: 0,
    width: 40,
    height: 40,
    fillColor: "#FF0000",
    originalFillColor: "#FF0000",
    isMoving: false
};

function togglebtn() {
    if (toggleSwitch){
        document.getElementById("btn-on").disabled = true;
        document.getElementById("btn-off").disabled = false;
        toggleSwitch = false;
        console.log('ON');
    } else {
        document.getElementById("btn-on").disabled = false;
        document.getElementById("btn-off").disabled = true;
        toggleSwitch = true;
        console.log('OFF');

    }

}

(function blink() {
    if (!toggleSwitch){

        for (let i= 0; i < elements.length; i++){
            shapes.push(elements[i].className);

        }
        setInterval(()=>{}


        ,2000);
        console.log(shapes);
    }
})();





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
        ev.target.style.backgroundColor = style.backgroundColor;

        ev.target.className.fillColor = style.backgroundColor;
}


elements.forEach((element)=> {element.onmousedown = function (event) {

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
    };});



