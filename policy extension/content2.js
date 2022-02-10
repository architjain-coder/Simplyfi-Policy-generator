alert("Just Scroll Up Once and Extension Will start Analyzing");

function unicodeToChar(text) {
	return text.replace(/\\u[\dA-F]{4}/gi, 
	      function (match) {
	           return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
	      });
}
function scrolldown() {
  setTimeout(
    function()
    {
      window.scrollTo(0,document.body.scrollHeight);
      scrolldown();
      //window.scrollTo(0,-document.body.scrollHeight/2);	
    }, 2000
  )
}

scrolldown()
// capture all text
var i;
//window.scrollTo(0,document.body.scrollHeight);

for (i = 0; i < 100; i++) {
 //setTimeout(() => {  window.scrollTo(0,document.body.scrollHeight);}, 5000);
 //window.scrollTo(0,-document.body.scrollHeight);
 //window.scrollTo(0,-document.body.scrollHeight);
 
}
