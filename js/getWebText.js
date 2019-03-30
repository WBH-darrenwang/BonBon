chrome.storage.sync.get(['savedText'], function(result) {
	var text = result.savedText;
	var height = (window.pageYOffset/document.body.scrollHeight)*100;
	text += document.location.href + '~' + (height) + ',';
	chrome.storage.sync.set({'savedText': text});
});





	