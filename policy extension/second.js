document.addEventListener('DOMContentLoaded', function () {
setInterval(function () {
var userData;
chrome.storage.local.get("variable1", function (data1) {
          var getdata=data1.variable1;
if (isNaN(getdata)==true)
{
getdata=0
}
document.getElementById("demo").innerHTML =Math.floor(getdata);
deg=getdata*180/100;
if (getdata>99)
{
let root1 = document.documentElement;
//root1.addEventListener("mousemove", e => {
//root1.style.setProperty('--mouse-x1', "8");});

root1.style.setProperty('--mouse-x1', "8");
}
else
{
let root1 = document.documentElement;
//root1.addEventListener("mousemove", e => {
//root1.style.setProperty('--mouse-x1', "0");});

root1.style.setProperty('--mouse-x1', "0");
}


let root = document.documentElement;
//root.addEventListener("mousemove", e => {
//root.style.setProperty('--mouse-x', deg + "deg");});
root.style.setProperty('--mouse-x', deg + "deg");
 });

    }, 1000); 
chrome.storage.local.remove("variable1");

}, false);
