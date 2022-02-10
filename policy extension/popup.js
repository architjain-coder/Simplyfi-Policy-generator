

chrome.storage.local.get("logindetails", function (loginData) {
  var getdata=loginData.logindetails;
    if(getdata["name"]==null)
    {
      let root2 = document.documentElement;
      root2.style.setProperty('--mouse-x3', "block");
     // alert("here1")
      //return;
    }
    else{
    window.scrollTo(0, 0);
    document.body.scrollHeight = 0;
    let root2 = document.documentElement;
    root2.style.setProperty('--mouse-x3', "none");
    document.getElementById("clickme").innerHTML = "Next"
    }
});

// window.onload=function(){
// var url;
// chrome.tabs.query({currentWindow: true, active: true}, function(activeTab){
//     //console.log(activeTab[0].url);
//     url=activeTab[0].url;
// var newURL = "https://www.linkedin.com/mynetwork/invite-connect/connections/";
// if(url != newURL){
//     chrome.tabs.create({ url: newURL });
// }
// });

// }

function summarize(userData) {
console.log("in summerize");
// console.log(userData["id"]);
// chrome.tabs.executeScript(null, { file: "jquery-2.2.js" }, function() {

var data=userData;
chrome.storage.local.set({
    variable: data
});
chrome.tabs.executeScript({
  file: "content.js"
});
//  function () {
// chrome.tabs.executeScript({
//         file: "content.js"
//     });
// });

// 	});
}

function validateform(){
  chrome.tabs.query({currentWindow: true, active: true}, function(activeTab){
  console.log(activeTab[0].url);
  url=activeTab[0].url;
  summarize(url)
  });
}


document.getElementById('clickme').addEventListener('click',validateform);
document.getElementById('done-btn').addEventListener('click', dashboard);


// function validateform(){


// chrome.storage.local.get("logindetails", function (loginData) {



// var getdata=loginData.logindetails;
// var element = document.getElementById("extension-section");
// element.classList.add("hide");
// var element = document.getElementById("extension-main-section");
// element.classList.add("visible");

// var name
// var password
// try{
// name=String(getdata["name"]);
// password=String(getdata["password"]);

// // alert(name)
// }
// catch(err){
//   var name=document.myform.name.value;
//   var password=document.myform.password.value;
// }


// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");



// var raw = JSON.stringify({"email":name,"password":password});
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// function check(result,name,password)
// {
// res=JSON.parse(result);
// //console.log(res);

// try{

// id=res["user"]["_id"];
// token=res["accessToken"];
// skills=res["user"]["skills"];
// var userData={
// "id":id,
// "token":token,
// "skills":skills,
// "user":name,
// "pass":password
// };
// document.getElementById("myUL").innerHTML = "";
//   for (var I = 0; I < skills.length; I++)
//   {

//        add(skills[I])
//   }



// var loginState={"name":name,
// "password":password
// };
// chrome.storage.local.set({
//     logindetails: loginState
// },
// function () {
// console.log("login datasaved")
// });


// //console.log(userData);
//  summarize(userData);
// }
// catch(e){
// message=res["message"];
// alert(message+"\nPlease click the icon again");
// throw new Error(message);
// }
// }


// fetch("https://api.suitable.ai/auth/extension", requestOptions)
//   .then(response => response.text())
//   .then(result => check(result,name,password))
//   .catch(error => console.log('error', error));

// /*
// var k=[];
// fetch("https://api.suitable.qa2.xencov.net/auth/extension", requestOptions)
//   .then(response => response.text())
//   .then(result => k.push(result)  )
//   .catch(error => console.log('error', error));
// */

// });





// }






// function dashboard() {
//   var element = document.getElementById("extension-main-section");
//    element.classList.add("done");
// }

// function login() {
//   var element = document.getElementById("extension-section");
//    element.classList.add("active");
// }


//document.getElementById('clickme2').addEventListener('click', login);
//document.getElementById('clickme').addEventListener('click', summarize);

// document.getElementById('clickme').addEventListener('click',validateform);
// document.getElementById('done-btn').addEventListener('click', dashboard);


// function add(skill) {
//   var li = document.createElement("li");
//   var inputValue = skill;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     console.log("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }



// var final;
// // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }

// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// // Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     console.log("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// final=li;
// }

