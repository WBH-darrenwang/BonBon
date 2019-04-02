chrome.storage.sync.get(['savedText','removeItem'], function(result) {
	var text = result.savedText;
	var del = result.removeItem;
	var urls = text.split(',');

	if(del.length != 0){
		var unwanted = del.split(',');
		for(var i=0; i<unwanted.length-1; i++){
			urls[unwanted[i]] = null;
		}
		chrome.storage.sync.set({'removeItem': ''});
	}
	
	var final_urls = '';

	for (var i=0; i<urls.length-1; i++){
		if(urls[i] != null){
			var index = urls[i].indexOf('~');
			
			var snip = urls[i].substring(0,index);
			var remain = urls[i].substring(index+1);
			final_urls += urls[i] + ',';
			$('#text_space').append(
				'<button id="'+'b'+i+'" class="del_but">-</button>'+
				'<a id="'+'t'+i+'" href="'+snip+'" target="_blank" class="p'+remain+'">'+snip+'</a><br><br>');
		}
	}
	chrome.storage.sync.set({'savedText': final_urls});
});
	
setTimeout(function(){
	$('body').on('click','button[id^="b"]',function(){
		var id = $(this).attr('id');	
		chrome.storage.sync.get(['removeItem'], function(result){
			id = id.substring(1);
			var get = result.removeItem;
			get += id + ',';
			chrome.storage.sync.set({'removeItem': get});
		});
		$('#t'+id.substring(1)).hide();
		$(this).hide();
	});
		
	$('a[class^="p"]').click(function(){
		var pos = $(this).attr('class');
		pos = pos.substring(1);
		alert(pos);
	});
});

$('#back').click(function(){
	chrome.browserAction.setPopup({popup: 'html/popup.html'});
});
