'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({savedText: '', 
                           removeItem: '', 
                           timeJSON: '', 
                           timeNow: 0,
                           alarmName: '',
                           checkItem: '',
                           checkRemove: ''}, function() {
          console.log('Data set!');
        });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostContains : '.'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  chrome.commands.onCommand.addListener(function(){
    chrome.tabs.executeScript({ file: 'js/getWebText.js'});
  });
});

//Alarms
chrome.alarms.onAlarm.addListener(function(alarm){
  var text = alarm.name;
  if(text.includes('/open-saved:')){
    var index = text.substring(text.indexOf('/open-saved:')+12);
    chrome.storage.sync.get(['savedText'], function(result){
      var saved = result.savedText;
      var urls = saved.split(',');
      var url = urls[index];
      url = url.substring(0,url.indexOf('~'));
      window.open(url);
    });
  } else{
      alert(alarm.name);
  }
});

//Time spent on web
var secNow = 0;
chrome.tabs.onActivated.addListener(function(activeInfo) {
  if(secNow == 0) secNow = 0.1;
  var url;
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
    TimeMe.initialize({currentPageName: url, idleTimeoutInSeconds: 1000 });
    });        
});

//Not the most efficient but workable
setInterval(function(){
  var timeSpentReport = TimeMe.getTimeOnAllPagesInSeconds();
  chrome.storage.sync.set({'timeJSON': JSON.stringify(timeSpentReport)});

  if(secNow > 0) secNow+=5;
  chrome.storage.sync.set({'timeNow': secNow});
},5000)