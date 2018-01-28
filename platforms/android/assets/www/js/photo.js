/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */




var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
    
    },
   
   
};

    var mouseEventTypes = {
    touchstart : "mousedown",
    touchmove : "mousemove",
    touchend : "mouseup"
    };

    for (originalType in mouseEventTypes) {
    document.addEventListener(originalType, function(originalEvent) {
        event = document.createEvent("MouseEvents");
        touch = originalEvent.changedTouches[0];
        event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
                window, 0, touch.screenX, touch.screenY, touch.clientX,
                touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
                touch.metaKey, 0, null);
        originalEvent.target.dispatchEvent(event);
    });
}
 function myDrag(){

    var circle = document.getElementById('divCircle');
    var divGrande = document.getElementById('divImagePhoto');
    divGrande.append(circle)
    circle.draggable();
 }

 function moveCircle(event , circle){
    
    circle.style.visibility = "visible";
    circle.position= "absolute";
    var pic = document.getElementById('myImage');
    var altezza = pic.height;
    var larghezza = pic.width;

    var x = event.clientX;
    var y = event.clientY;
    if(x>=(larghezza-50))
        var left = larghezza -50;
    else
        var left = x - 50;

    if(y>=(altezza-125))
        var top = altezza-125;
    else
        var top = y - 125;

    circle.style.left= left+"px";
    circle.style.top= top+"px";
    

    document.getElementById("debug").innerHTML = "x "+x+" ,y "+y;
}


function cameraTakePicture() { 
   navigator.camera.getPicture(onSuccess, onFail, { quality: 50,  destinationType: Camera.DestinationType.DATA_URI });  
   
   
    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
        dragElement(document.getElementById('divCircle'));
        letDrag();
    }
   
   function onFail(message) { 
      alert('Failed because: ' + message); 
   } 
}

    function letDrag(){
        console.log("did that letDrag");
        var drag = document.getElementById('divCircle');
        drag.draggable();
    }
    

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

app.initialize();
