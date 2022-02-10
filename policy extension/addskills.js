
var final;
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.name="cross";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    console.log("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
final=li;
}

function done()
{
  var lis = document.getElementById("myUL").getElementsByTagName("li");
var lis_del=document.querySelectorAll("*[style]");
  n=lis.length;
  var skillsA=[];
  for (i = 0; i < n; i++) {
  skillsA.push(lis[i].innerText.replace('×', ''))
}

  n=lis_del.length;
  var skillsB=[];
  for (i = 2; i < n; i++) {
  skillsB.push(lis_del[i].innerText.replace('×', ''))
}

let skills = skillsA.filter(x => !skillsB.includes(x));

console.log("final skills",skills)
var userData;
chrome.storage.local.get("variable", function (data) {
          var getdata=data.variable;

token=getdata["token"];
var input="Bearer " +token;
var myHeaders = new Headers();
myHeaders.append("Authorization", input);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(skills);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.suitable.ai/account/skills", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
 
});
}

document.getElementById('new').addEventListener('click',newElement);
document.getElementById('done-btn').addEventListener('click',done);