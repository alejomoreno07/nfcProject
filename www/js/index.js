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
        this.receivedEvent('deviceready');
        app.fillDate('fecha-content');

        $.getJSON('http://weisseamsel.altervista.org/nfcProject/getAnomaly.php',function(data){
            jQuery.each(data, function(i,val){
                console.log(JSON.stringify(val));
                app.fillRow(val);
            });
        });

    },
    fillDate:function(idElement){
        var today = new Date();
        var day   = today.getDate();
        var month = today.getMonth()+1;
        var year  = today.getFullYear();
        var fecha = document.getElementById(idElement);
        fecha.innerHTML= day+"-"+month+"-"+year;
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
    },
    fillRow: function(data){
        var container = document.getElementById('table_container');

        var row     = document.createElement("div");
        row.className   = "row";
        row.id      = "anomaly"+data["id"];
        
        var anomaly_code    = document.createElement("div");
        anomaly_code.className  = "col xl7 l7 m7 s7 table-cell center-align full-width no-margin no-padding table-col-1 cell truncate";
        anomaly_code.id     = "col_anomaly"+data["id"];
        anomaly_code.innerHTML = data["anomaly_code"];

        var priority   = document.createElement("div");
        priority.className = "col xl4 l4 m4 s4 table-cell center-align full-width no-margin no-padding table-col-2 cell";
        priority.id    = "col_priority"+data["id"];
        priority.innerHTML = data["priority"];

        var status     = document.createElement("div");
        status.className   = "col xl1 l1 m1 s1 table-cell center-align full-width no-margin no-padding table-col-3 cell";
        status.id      = "col_status"+data["id"]; 
        status.innerHTML = data["status"];

        row.appendChild(anomaly_code);
        row.appendChild(priority);
        row.appendChild(status);

        container.appendChild(row);
        console.log(data["priority"]);
    } 
   
};

app.initialize();