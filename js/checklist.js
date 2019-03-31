//Load all of the unchecked items
chrome.storage.sync.get(['checkItem','checkRemove'],function(result){
	var saved = result.checkItem;
	var arr = saved.split(',');

	var unwanted = result.checkRemove;
	var checked = unwanted.split(',');
	if(unwanted.length != 0){
		for(var i=0; i<checked.length-1; i++){
			arr[checked[i]] = null;
		}
		chrome.storage.sync.set({'checkRemove': ''});
	}
	
	var final_items = '';

	for(var i=0; i<arr.length-1; i++){
		if(arr[i] != null){
			final_items += arr[i] + ',';
			$('#list').append('<input id="c'+i+'" type="checkbox"><a id="t'+i+'">'+arr[i]+'</a><br>');
		}
	}
	chrome.storage.sync.set({'checkItem': final_items});
});

//Adding checklist items
$('#add_but').click(function(){
	chrome.storage.sync.get(['checkItem'],function(result){
		var str = $('#input').val();
		var saved = result.checkItem;
		var length = saved.length/2; 
		if(str.length != 0){
			saved = saved + str + ',';
			chrome.storage.sync.set({'checkItem':saved});
			$('#list').append('<input id="c'+length+'" type="checkbox"><a id="t'+length+'">'+str+'</a><br>');
		}
		$('#input').val('');
	});
});

$('body').on('change',':checkbox',function(){
	var id = $(this).attr('id');
	chrome.storage.sync.get(['checkRemove'],function(result){
		id = id.substring(1);
		var get = result.checkRemove;
		get += id + ',';
		chrome.storage.sync.set({'checkRemove':get});
	});
	$('#t'+id.substring(1)).hide();
	$(this).hide();  
}); 

