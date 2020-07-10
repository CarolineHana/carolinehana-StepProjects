 
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


// fetchs json array list and makes into list 
function getComments(value) {
    var value = document.getElementById("showAmount").value;
    const commentsListElement = document.getElementById('comments-container');
    commentsListElement.innerHTML = '';
    fetch('/data?showAmount='+ value).then(response => response.json()).then((comments) => {
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

/* Tells the server to delete a comment. */
function deleteComments() {
  fetch('/delete-comment', {method: 'POST'});
  const list = document.getElementById('comments-container'); 
  list.removeChild(list.childNodes[0]);
}

var map;
let editMarker;

function CreateMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 11
  });
    addMarkers();

    // When the user clicks in the map, show a marker with a text box the user can
  // edit.
  map.addListener('click', (event) => {
    createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
  });

  fetchMarkers();
}

function addMarkers(){
 var iconBase =
        'http://maps.google.com/mapfiles/kml/shapes/';

    const whitneyMarker = new google.maps.Marker({
    position: {lat: 40.7396, lng: -74.0089},
    map: map,
    icon:  iconBase + 'camera.png',
    title: 'Whitney Museum'
  });

  const romeoMarker = new google.maps.Marker({
    position: {lat: 40.729162, lng: -73.780713},
    map: map,
    icon: iconBase + 'dining.png',
    title: 'Romeos Pizzeria'
  });

  const maxMarker = new google.maps.Marker({
    position: {lat: 40.734346, lng: -73.991225},
    map: map,
    icon: iconBase + 'dining.png',
    title:  'Max Brenners'
  });

 const coffeeMarker = new google.maps.Marker({
    position: {lat: 40.725877, lng: -73.989867},
    map: map,
    icon:  iconBase + 'coffee.png',
    title:  'Kona Coffee'
  });  

  const coneyMarker = new google.maps.Marker({
    position: {lat: 40.574563, lng: -73.978551},
    map: map,
    icon:  iconBase + 'camera.png',
    title: 'Coney Island'
  }); 

   const bushwickMarker = new google.maps.Marker({
    position: {lat: 40.707529, lng: -73.922186},
    map: map,
    icon:  iconBase + 'camera.png',
    title: 'Bushwick Collective'
  });   

  const whitneyInfoWindow =
      new google.maps.InfoWindow({content: '<h2> Whitney Museum</h2>' +
    '<p> This is one of my favorite art museums in the city' +
   ' that focuses on American Art and is very unique. </p>'});
  whitneyMarker.addListener('click', () => {
  whitneyInfoWindow.open(map, whitneyMarker);
  });

   const romeoInfoWindow =
      new google.maps.InfoWindow({content: '<h2> Romeos Pizzeria</h2>' +
    '<p> Every New Yorker has their favorite pizza shop' +
    ' and this is mine. Share yours! </p>'});
   romeoMarker.addListener('click', () => {
  romeoInfoWindow.open(map, romeoMarker);
  });

    const maxInfoWindow =
      new google.maps.InfoWindow({content: '<h2> Max Brenners </h2>' +
    '<p> Max Brenners is really popular for all its chocolate desserts.' +
    'There are tons of great bakeries and dessert sites in NYC' +
    ' but I reccomend this one because... chocolate! </p>'});
  maxMarker.addListener('click', () => {
  maxInfoWindow.open(map, maxMarker);
  });

  const coffeeInfoWindow =
      new google.maps.InfoWindow({content: '<h2> Kona Coffee and Company </h2>' +
    '<p> Coffee! Admittedly I dislike coffee a lot, but this one is pretty good'+
    ' so that must mean something. </p>'});
  coffeeMarker.addListener('click', () => {
  coffeeInfoWindow.open(map, coffeeMarker);
  });

   const coneyInfoWindow =
      new google.maps.InfoWindow({content: '<h2> Coney Island </h2>' +
    '<p> Every year as a kid I would go to Coney Island beach and'+
    ' had the best time at the Luna amusement park and beach. Fun Stuff! </p>'});
  coneyMarker.addListener('click', () => {
  coneyInfoWindow.open(map, coneyMarker);
  });

  const bushwickInfoWindow =
      new google.maps.InfoWindow({content: '<h2> Bushwick Collective </h2>' +
    '<p> The Bushwick collective is a display of amazing colorful '+
    ' street art that goes on for blocks and by several artists.' +
    'The area is also really good for shopping.</p>'});
  bushwickMarker.addListener('click', () => {
  bushwickInfoWindow.open(map, bushwickMarker);
  });
}


/** Fetches markers from the backend and adds them to the map. */
function fetchMarkers() {
  fetch('/markers').then(response => response.json()).then((markers) => {
    markers.forEach(
        (marker) => {
            createMarkerForDisplay(marker.lat, marker.lng, marker.content)});
  });
}

/** Creates a marker that shows a read-only info window when clicked. */
function createMarkerForDisplay(lat, lng, content) {
  const marker =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});

  const infoWindow = new google.maps.InfoWindow({content: content});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

/** Sends a marker to the backend for saving. */
function postMarker(lat, lng, content) {
  const params = new URLSearchParams();
  params.append('lat', lat);
  params.append('lng', lng);
  params.append('content', content);

  fetch('/markers', {method: 'POST', body: params});
}

/** Creates a marker that shows a textbox the user can edit. */
function createMarkerForEdit(lat, lng) {
  // If we're already showing an editable marker, then remove it.
  if (editMarker) {
    editMarker.setMap(null);
  }

  editMarker =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});

  const infoWindow =
      new google.maps.InfoWindow({content: buildInfoWindowInput(lat, lng)});

  // When the user closes the editable info window, remove the marker.
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editMarker.setMap(null);
  });

  infoWindow.open(map, editMarker);
}

/**
 * Builds and returns HTML elements that show an editable textbox and a submit
 * button.
 */
function buildInfoWindowInput(lat, lng) {

  const name = document.createElement('h2');
  name.appendChild(document.createTextNode('Name:'));
  const titleBox = document.createElement('textarea');

  const description = document.createElement('p');
  description.appendChild(document.createTextNode('Description:'));
  const descriptionBox = document.createElement('textarea');


  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Submit'));


  button.onclick = () => {
    const name = document.createElement('h2');
    name.appendChild(document.createTextNode(titleBox.value));
    const description = document.createElement('p');
    description.appendChild(document.createTextNode(descriptionBox.value));

    const content = document.createElement('textarea');
    content.value= titleBox.value + descriptionBox.value
    const contentBox = document.createElement('span');
    contentBox.appendChild(name);
    contentBox.appendChild(description);

    postMarker(lat, lng, content.value);
    createMarkerForDisplay(lat, lng, contentBox);
    editMarker.setMap(null);
  };

  const containerDiv = document.createElement('div');
  containerDiv.appendChild(name);
  containerDiv.appendChild(titleBox);
  containerDiv.appendChild(description);
  containerDiv.appendChild(descriptionBox);
  containerDiv.appendChild(document.createElement('br'));
  containerDiv.appendChild(button);

  return containerDiv;
}

// checks login status before allowing user comment section to be disabled //
async function checkLogin() {
  const response = await fetch('/login');
  const result = await response.json();
  loginContainer = document.getElementById('login');
  loginContainer.href = result.logLink;
  commentContainer = document.getElementById('leave-comment');

  if (result.logCheck == 'true'){ 
    loginContainer.innerText = 'LOGOUT';
    if (commentContainer) {
      commentContainer.disabled = false;
      commentContainer.classList.remove('disabled');
    }
  } else {
    loginContainer.innerText = 'LOGIN';
    if (commentContainer) {
      commentContainer.disabled = true;
      commentContainer.classList.add('disabled');
    }
  }
}

