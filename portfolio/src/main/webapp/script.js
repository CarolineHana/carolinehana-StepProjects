 
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

/**
 * Adds a random greeting to the page.
 */
function addRandomFunFacts() {
  const FunFacts =
      [, 'My zodiac sign is a Leo', 'I was in a PBS documentary', 'Ive audtioned for jeporady',
      'My friends and I made own langauge', 'I remember song lyrics more than my own life',
      'Im terrible at spelling', 'I can sleep while standing', 
      'I can put my foot behind my head', 'I can touch my nose with my tongue'];

  // Pick a random greeting.
  const facts = FunFacts[Math.floor(Math.random() * FunFacts.length)];

  // Add it to the page.
  const factsContainer = document.getElementById('facts-container');
  factsContainer.innerText = facts;
}

// adds a collapsible button 
function ReadMore() {
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readmorebtn");

   if (moreText.style.display === "inline") {
    btnText.innerHTML = "+ READ MORE"; 
    moreText.style.display = "none";
  } else {
    btnText.innerHTML = "- READ LESS";
    moreText.style.display = "inline";
    
  }
}

function ReadMore1() {
  var moreText = document.getElementById("more1");
  var btnText = document.getElementById("readmorebtn1");

   if (moreText.style.display === "inline") {
    btnText.innerHTML = "+ READ MORE"; 
    moreText.style.display = "none";
  } else {
    btnText.innerHTML = "- READ LESS";
    moreText.style.display = "inline";
    
  }
}

function ReadMore2() {
  var moreText = document.getElementById("more2");
  var btnText = document.getElementById("readmorebtn2");

   if (moreText.style.display === "inline") {
    btnText.innerHTML = "+ READ MORE"; 
    moreText.style.display = "none";
  } else {
    btnText.innerHTML = "- READ LESS";
    moreText.style.display = "inline";
    
  }
}
  

function ReadMore3() {
  var moreText = document.getElementById("more3");
  var btnText = document.getElementById("readmorebtn3");

   if (moreText.style.display === "inline") {
    btnText.innerHTML = "+ READ MORE"; 
    moreText.style.display = "none";
  } else {
    btnText.innerHTML = "- READ LESS";
    moreText.style.display = "inline";
    
  }
}