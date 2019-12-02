var weather, temP, humiditY, winD, viS, r, g, b, a, rgba, siz, len, tex;
var api = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&APPID=d9e40004dfa7e1f572ca81f1d08a5109";
var units = "&unit=metric";
var counter = -1;
var counter2 = -1;
var save = [];
var counter3 = -1;
var myFont1,myFont2,myFont3,myFont4,myFont5,myFont6,myFont7,myFont;

function preload(){
    myFont = loadFont('mabry.ttf');
    myFont2 = loadFont('NinjaStrike.otf');
    myFont5 = loadFont('Italianno.otf');
    myFont3 = loadFont('PermanentMarker.otf');
    myFont6 = loadFont('cao.ttf');
    myFont4 = loadFont('orbitron.otf');
    myFont7 = loadFont('Grand Hotel.otf');
}

function setup(){

    createCanvas(windowWidth,580);

    var button = select("#submit");
    button.mousePressed(weatherAsk);

    input = select("#city");
    fill(0);
    siz = 10;
}

function weatherAsk(){
        document.querySelector("#welcomeline0").style.display = "none";
        document.querySelector("#welcomeline1").style.display = "none";
        document.querySelector("#welcomeline2").style.display = "none";
        document.querySelector("#welcomeline3").style.display = "none";
        document.querySelector("#welcomeline4").style.display = "none";
        document.querySelector("#welcomehead").style.display = "none";
        document.querySelector("#arrow0").style.display = "none";
        document.querySelector("#arrow1").style.display = "none";
        document.querySelector("#arrow2").style.display = "none";
        document.querySelector("#arrow3").style.display = "none";
        document.querySelector("#arrow4").style.display = "none";
        document.querySelector("#arrow5").style.display = "none";
        document.querySelector("#next").style.display = "none";
    if (input.value() === ""){
        background(255);
        document.getElementById("error").innerHTML = "Ooops. You have entered an no name city."
        document.getElementById("error").style.display = "inline";
    }
    else{
        counter = counter + 1;
        len = input.value().length;

        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont("Mabry");
        tex = input.value();
        text(tex, width/2, height/2+80);

        var url = api + input.value() + apiKey + units;

        var http = new XMLHttpRequest();
        http.open("GET",url,false);
        http.send();
        if(http.status != 404){
            loadJSON(url, gotData);
            var appendColor = document.createElement("div");
            appendColor.setAttribute("class", "option");
            appendColor.setAttribute("onclick", "colorFunction()");
            appendColor.setAttribute("id","colorOption" + counter);
            document.getElementById('colorOptions').appendChild(appendColor);
            
            var appendStroke = document.createElement("div");
            appendStroke.setAttribute("class", "option1");
            appendStroke.setAttribute("onclick", "strokeFunction()");
            appendStroke.setAttribute("id","strokeOption" + counter);
            document.getElementById('strokeOptions').appendChild(appendStroke);
            document.getElementById("error").style.display = "none";
            myAudio2.play();
        }
        else{
            background(255);
            tex = "";
            text(tex, width/2, height/2+80);
            document.getElementById("error").innerHTML = "Ooops. The city you typed is not on Earth."
            document.getElementById("error").style.display = "inline";
            myAudio1.play();
        }
        input.value("");
    }
}

function gotData(data){
    weather = data;
}

function draw(){
    // if (mouseX > 74 * windowWidth/100 && mouseY < 6 * windowHeight/100 && keyCode == "13"){
    //     console.log("aaa");
    //     weatherAsk();
    // }

    if (weather){
        temP = weather.main.temp;
        humiditY = weather.main.humidity;
        winD = weather.wind.speed;
        viS = weather.visibility;
        if (temP > 300){
            temP = 300;
        }
        if(temP < 284){
            temP = 284;
        }
        if (humiditY > 90){
            humiditY = 90;
        }
        if(humiditY < 20){
            humiditY = 20;
        }
        if (winD > 3.5){
            winD = 3.5;
        }
        if(winD < 1){
            winD = 1;
        }
        r = map(temP, 284, 300, 0, 255);
        g = map(humiditY, 20,90,0,255);
        b = map(winD, 1,3.5,0,255);
        a = map(viS, 0, 30000,0,255);
        rgba = "("+ r + "," + g + "," + b +")";
        // + "," + a
        var selectColor = select("#colorOption" + counter);
        selectColor.style("background-color", "rgb" + rgba);
        document.getElementById("strokeOption" + counter).style.width = "3vw";
        document.getElementById("strokeOption" + counter).style.height = len/3 + "vw";
        weather = false;
    }
    if (mouseIsPressed){
        // document.getElementById("colorOptions").style.top = "-16vw";
        // document.getElementById("fontOptions").style.top = "-16vw";
        // document.getElementById("strokeOptions").style.top = "-16vw";
        // document.getElementById("search").style.top = "-3vw";
        stroke(r,g,b);
            // noStroke();
        strokeWeight(siz);
        line(mouseX, mouseY, pmouseX, pmouseY);;
            // ellipse(mouseX, mouseY, siz, siz);
    }
}

function colorFunction(){
    var colorString = event.target.style.backgroundColor;
    var colorString1 = colorString.replace(")","");
    var colorString2 = colorString1.replace("rgb(","");
    var lines = colorString2.split(",");
    r = lines[0];
    g = lines[1];
    b = lines[2];
}

function strokeFunction(){
    var height = event.target.style.height;
    siz = height.replace("vw","")*8;
}

function saveFunction(){
    save('myMasterPiece.jpg');
    myAudio3.play();
}

function eraseFunction(){
    r = 255;
    b = 255;
    g = 255;
}

function fontFunction(){
        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont(myFont);
        text(tex, width/2, height/2+80);
}

function fontFunction1(){
        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont('Times');
        text(tex, width/2, height/2+80);
}
function fontFunction2(){
        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont(myFont3);
        text(tex, width/2, height/2+80);
}

function fontFunction3(){
        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont(myFont2);
        text(tex, width/2, height/2+80);
}
function fontFunction4(){
        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont(myFont4);
        text(tex, width/2, height/2+80);
}
function fontFunction5(){
        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont(myFont5);
        text(tex, width/2, height/2+80);
}
function fontFunction6(){
        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont(myFont6);
        text(tex, width/2, height/2+80);
}
function fontFunction7(){
        background(255);
        fill(0);
        noStroke();
        textSize(1360/len);
        textAlign(CENTER);
        textFont(myFont7);
        text(tex, width/2, height/2+80);
}

var i;
var txt;
var speed = 80;

function nextFunction(){
    i = 0;
    counter2 ++;
    if (counter2 == 0){
        txt = "Here are some tips before you start your masterpiece ----";
        typeWriter0();
        document.getElementById("arrow0").style.display = "none";
        document.getElementById("arrow1").style.display = "none";
        document.getElementById("arrow2").style.display = "none";
        document.getElementById("arrow3").style.display = "none";
        document.getElementById("arrow4").style.display = "none";
        document.getElementById("arrow5").style.display = "none";
    }
    if(counter2 == 1){
        txt = "A COLOR option and a pen tool WEIGHT option will be generated, once a correct CITY NAME is entered.";
        typeWriter1();
        document.getElementById("arrow0").style.display = "inline";
        document.getElementById("arrow1").style.display = "inline";
        document.getElementById("arrow2").style.display = "none";
        document.getElementById("arrow3").style.display = "none";
        document.getElementById("arrow4").style.display = "none";
        document.getElementById("arrow5").style.display = "inline";
    }
    if (counter2 == 2){
        txt = "Eight selected FONT styles are loaded here.";
        typeWriter2();
        document.getElementById("arrow0").style.display = "none";
        document.getElementById("arrow1").style.display = "none";
        document.getElementById("arrow2").style.display = "inline";
        document.getElementById("arrow3").style.display = "none";
        document.getElementById("arrow4").style.display = "none";
        document.getElementById("arrow5").style.display = "none";
    }
    if(counter2 == 3){
        txt = "You can use the ERASER tool to clean up, and a SAVE tool is provided to save your masterpiece as a JPG.";
        typeWriter3();
        document.getElementById("arrow0").style.display = "none";
        document.getElementById("arrow1").style.display = "none";
        document.getElementById("arrow2").style.display = "none";
        document.getElementById("arrow3").style.display = "inline";
        document.getElementById("arrow4").style.display = "inline";
        document.getElementById("arrow5").style.display = "none";
    }
    if(counter2 == 4){
        txt = "Great, you are now ready to have some fun! Try type in your favorite city to start!";
        typeWriter4();
        document.getElementById("arrow0").style.display = "none";
        document.getElementById("arrow1").style.display = "none";
        document.getElementById("arrow2").style.display = "none";
        document.getElementById("arrow3").style.display = "none";
        document.getElementById("arrow4").style.display = "none";
        document.getElementById("arrow5").style.display = "inline";
    }
    if (counter2 > 4){
        document.getElementById("arrow0").style.display = "none";
        document.getElementById("arrow1").style.display = "none";
        document.getElementById("arrow2").style.display = "none";
        document.getElementById("arrow3").style.display = "none";
        document.getElementById("arrow4").style.display = "none";
        document.getElementById("arrow5").style.display = "none";
        document.querySelector("#welcomeline0").style.display = "none";
        document.querySelector("#welcomeline1").style.display = "none";
        document.querySelector("#welcomeline2").style.display = "none";
        document.querySelector("#welcomeline3").style.display = "none";
        document.querySelector("#welcomeline4").style.display = "none";
        document.querySelector("#welcomehead").style.display = "none";
        document.querySelector("#next").style.display = "none";
    }
    document.getElementById("welcomeline0").style.display = "none";
    document.getElementById("welcomeline1").style.display = "none";
    document.getElementById("welcomeline2").style.display = "none";
    document.getElementById("welcomeline3").style.display = "none";
    document.getElementById("welcomeline4").style.display = "none";
    document.getElementById("welcomeline" + counter2).style.display = "inline";
}

function typeWriter0() {
  if (i < txt.length) {
    document.getElementById("welcomeline" + counter2).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter0, speed);
  }
}

function typeWriter1() {
  if (i < txt.length) {
    document.getElementById("welcomeline" + counter2).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter1, speed);
  }
}
function typeWriter2() {
  if (i < txt.length) {
    document.getElementById("welcomeline" + counter2).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter2, speed);
  }
}
function typeWriter3() {
  if (i < txt.length) {
    document.getElementById("welcomeline" + counter2).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter3, speed);
  }
}
function typeWriter4() {
  if (i < txt.length) {
    document.getElementById("welcomeline" + counter2).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter4, speed);
  }
}

// function positionFunction1(){
//     document.getElementById("colorOptions").style.top = "0";
//     document.getElementById("fontOptions").style.top = "-16vw";
//     document.getElementById("strokeOptions").style.top = "-16vw";
//     document.getElementById("search").style.top = "-3vw";
// }
// function positionFunction2(){
//     document.getElementById("strokeOptions").style.top = "0";
//     document.getElementById("colorOptions").style.top = "-16vw";
//     document.getElementById("fontOptions").style.top = "-16vw";
//     // document.getElementById("strokeOptions").style.top = "-16vw";
//     document.getElementById("search").style.top = "-3vw";
// }
// function positionFunction3(){
//     document.getElementById("fontOptions").style.top = "0";
//     document.getElementById("colorOptions").style.top = "-16vw";
//     // document.getElementById("fontOptions").style.top = "-16vw";
//     document.getElementById("strokeOptions").style.top = "-16vw";
//     document.getElementById("search").style.top = "-3vw";
// }
// function positionFunction4(){
//     document.getElementById("search").style.top = "0";
//     document.getElementById("colorOptions").style.top = "-16vw";
//     document.getElementById("fontOptions").style.top = "-16vw";
//     document.getElementById("strokeOptions").style.top = "-16vw";
//     // document.getElementById("search").style.top = "-3vw";
// }