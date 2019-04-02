$('[id^="a"]').click(function(){
	var page = 'html/' + $(this).attr('href');
	chrome.browserAction.setPopup({popup: page});
});
