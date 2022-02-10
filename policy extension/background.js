var tabURL = ""; 
chrome.runtime.onMessage.addListener(
function(message, sender, sendResponse) {

   chrome.tabs.query({active: true, currentWindow: true}, 
     function(arrayOfTabs) {
       var activeTab = arrayOfTabs[0];
       tabURL = activeTab.url;

     });
    }
  );

/*
var url;
chrome.tabs.query({currentWindow: true, active: true}, function(activeTab){
    //console.log(activeTab[0].url);
    url=activeTab[0].url;
});
chrome.browserAction.onClicked.addListener(function(activeTab)
{
var newURL = "https://www.linkedin.com/mynetwork/invite-connect/connections/";
alert(url)
if(url != newURL){
    chrome.tabs.create({ url: newURL });
}
else
{
alert("open")
}

});*/