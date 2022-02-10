
var userData;

chrome.storage.local.get("variable", function (data) {
          var getdata=data.variable;

name=getdata["user"];
password=getdata["pass"];

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



var raw = JSON.stringify({"email":name,"password":password});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

function check(result)
{
res=JSON.parse(result);
skills=res["user"]["skills"];
console.log("skills:  "+skills)
document.getElementById("myUL").innerHTML = "";
  for (var I = 0; I < skills.length; I++)
  {
       
       add(skills[I])
  }

}


fetch("https://api.suitable.ai/auth/extension", requestOptions)
  .then(response => response.text())
  .then(result => check(result))
  .catch(error => console.log('error', error));


// chrome.storage.local.remove("variable");
});

var final;
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
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




function add(skill) {
  var li = document.createElement("li");
  var inputValue = skill;
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
}



