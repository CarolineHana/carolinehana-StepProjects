 
// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// adds a collapsible button for each blog post
// shows and hides blog text based on user action 
function ReadMore(moreId, readmorebtnId) {
  var moreText = document.getElementById(moreId);
  var buttonText = document.getElementById(readmorebtnId);

   if (moreText.style.display === "inline") {
    buttonText.innerHTML = "+ READ MORE"; 
    moreText.style.display = "none";
  } else {
    buttonText.innerHTML = "- READ LESS";
    moreText.style.display = "inline";
    
  }
}

function getComments(){
 document.getElementById('showAmt').onchange = function() {
        localStorage.setItem('selectedtem', document.getElementById('showAmt').value);
    };
    if (localStorage.getItem('selectedtem')) {
        document.getElementById('showAmt_'+localStorage.getItem('selectedtem')).selected = true;
        return localStorage.getItem('selectedtem');
    } 
    else {
       return 0;
    }
}
// fetchs json array list and makes into list 
function getJSON(value) {
    var value = getComments();
    const commentsListElement = document.getElementById('comments-container')
    fetch('/data?showAmt='+ value).then(response => response.json()).then((comments) => {
    comments.forEach((comment) => { 
    commentsListElement.appendChild(createCommentElement(comment));
     })
    });
    if (commentsListElement == null) {
    document.getElementById('comments-container').innerHTML = "No comments at this time";
    }
}


function createCommentElement(comment) {
  const commentsListElement = document.createElement('li');
    commentsListElement.className = 'comment';

    const textElement = document.createElement('span');
    textElement.innerText = comment.text + "\n";

    const UserInfoElement = document.createElement('span');
    UserInfoElement.innerText = comment.username + "\t" + comment.time + "\n";
    
    commentsListElement.appendChild(UserInfoElement);
    commentsListElement.appendChild(textElement);
    return commentsListElement;
  
}

/* Tells the server to delete the comment. */
function deleteComments() {
  fetch('/delete-comment', {method: 'POST'}).then(response => response.json()).then((deleted) => {
     document.getElementById('comments-container').classList.remove();
  });
}

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 11
  });

var iconBase =
        'http://maps.google.com/mapfiles/kml/shapes/';

    addLandmark(
      map, 40.7396, -74.0089, iconBase + 'camera.png', 'Whitney Museum',
    '<h2> Whitney Museum</h2>' +
    '<p> This is one of my favorite art museums in the city' +
   ' that focuses on American Art and is very unique. </p>');


 addLandmark(
      map, 40.729162, -73.780713, iconBase + 'dining.png', 'Romeos Pizzeria',
    '<h2> Romeos Pizzeria</h2>' +
    '<p> Every New Yorker has their favorite pizza shop' +
    ' and this is mine. Share yours! </p>');


   addLandmark(
      map, 40.734346, -73.991225, iconBase + 'dining.png', 'Max Brenners',
    '<h2> Max Brenners </h2>' +
    '<p> Max Brenners is really popular for all its chocolate desserts.' +
    'There are tons of great bakeries and dessert sites in NYC' +
    ' but I reccomend this one because... chocolate! </p>');

    addLandmark(
      map, 40.725877, -73.989867, iconBase + 'coffee.png', 'Kona Coffee',
    '<h2> Kona Coffee and Company </h2>' +
    '<p> Coffee! Admittedly I dislike coffee a lot, but this one is pretty good'+
    ' so that must mean something. </p>');

    addLandmark(
      map, 40.574563, -73.978551, iconBase + 'camera.png', 'Coney Island',
    '<h2> Coney Island </h2>' +
    '<p> Every year as a kid I would go to Coney Island beach and'+
    ' had the best time at the Luna amusement park and beach. Fun Stuff! </p>');

    addLandmark(
      map, 40.707529, -73.922186, iconBase + 'camera.png', 'Bushwick Collective',
    '<h2> Bushwick Collective </h2>' +
    '<p> The Bushwick collective is a display of amazing colorful '+
    ' street art that goes on for blocks and by several artists.' +
    'The area is also really good for shopping.</p>');
}

/** Adds a marker that shows an info window when clicked. */
function addLandmark(map, lat, lng, icon, title, description) {
  const marker = new google.maps.Marker(
      {position: {lat: lat, lng: lng}, map: map, icon: icon, title: title});

  const infoWindow = new google.maps.InfoWindow({content: description});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });

} 