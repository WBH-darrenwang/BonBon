if(text.includes('/open-saved:')){
	alert('contains');
}
chrome.storage.sync.get(['alarmName'], function(result){
	alert(result.alarmName);
});
console.log('works');