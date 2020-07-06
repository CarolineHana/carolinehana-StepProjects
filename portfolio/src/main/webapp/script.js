 
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

