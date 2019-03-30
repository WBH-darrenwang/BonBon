//Doesn't work when you go back to a previous tab but this is a prototype
//Case doesn't work with one tab clicked

$(document).ready(function(){
	chrome.storage.sync.get(['timeJSON'],function(result){
		var arr = JSON.parse(result.timeJSON);
		var time = [];
		for(var i=0; i<arr.length-1; i++){
			time.push(Math.round(arr[i].timeOnPage - arr[i+1].timeOnPage));
		}
		chrome.storage.sync.get(['timeNow'], function(result){
			time.push(Math.round(result.timeNow - time[time.length-1]));
			for(var i=0; i<time.length; i++){
				$('#data').append('<a1>'+ arr[i].pageName.substring(8,16) +' '+time[i]+'</a1><br><br>');
			}
		});
	});
});	

$('#but').click(function(){
	var url = $('#reduce').val();
	chrome.storage.sync.set({'reducedSite': url});
	$('#reduce').val('');
});



/*
	Time API:
	[{"pageName":"url","timeOnPage":seconds},
	{"pageName":"url","timeOnPage":seconds}]
*/
