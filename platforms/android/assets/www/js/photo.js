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
        app.fillDate('fecha-content');
        app.getInformation();
        app.setSubmit('send-btn-div');
    
    },
    fillDate:function(idElement){
        var today = new Date();
        var day   = today.getDate();
        var month = today.getMonth()+1;
        var year  = today.getFullYear();
        var fecha = document.getElementById(idElement);
        fecha.innerHTML= day+"-"+month+"-"+year;
    },
    getInformation:function(){
        var name  = localStorage.getItem("product_name");
        var pippo = localStorage.getItem("product_pippo");
        app.setData('product-name',name);
        app.setData('product-pippo',pippo);

    },
    setData:function(idElement, data){
        var element = document.getElementById(idElement);
        element.value = data;
        element.nextElementSibling.className ="active";
    },
    setSubmit:function(idElement){
        var element = document.getElementById(idElement);

        element.addEventListener('click',function(){
            
            if(app.fieldsValidation()){
                app.sendInformation();
                window.location.href='analisi.html';   
            }else{
                alert('All the fields must be filled in order to proceed.');
            }

        });
    },
    sendInformation:function(){
        // It must be implemented
    },
    fieldsValidation:function(){
       
        return true;

    },
   
   
   
};


 
function cameraTakePicture() { 
   navigator.camera.getPicture(onSuccess, onFail, { quality: 50, allowEdit:true, destinationType: Camera.DestinationType.DATA_URI });  
   
   
    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        //image.targetWidth=200px; 
        //image.targetHeight=200px;
        image.src = imageURI;
        var circle = document.getElementById("circleShape");
        circle.style="display:block;";
    }
   function onFail(message) { 
      alert('Failed because: ' + message); 
   }
}

$("#circleShape").draggable();

app.initialize();
