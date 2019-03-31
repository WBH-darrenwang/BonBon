chrome.alarms.getAll(function(result){
	if(result.length != 0){
		$('#list').html(getText(result));
	}	
});
//Load alarms

//Execute button task
$('#add_button').click(function(){
	//Get text, time, repeat interval, create, fire
	var text = $('#reminder1').val();
	var time = $('#time1').val();
	var repeat = $('#repeat1').val();
	var alarmInfo;

	if(text.length != 0 && (time.length != 0 || repeat.length != 0)){

		if(repeat.length == 0){
			alarmInfo = {
				when: Date.now() + (60000*time)
			};
		} else{
			alarmInfo = {
				periodInMinutes: 1 * repeat
			};
		}
		chrome.alarms.create(text, alarmInfo);

		var text = '';
		chrome.alarms.getAll(function(result){
			
			$('#list').html(getText(result));
			
		});
	}
	$('[id$="1"]').val('');
});

$('#del_but').click(function(){
	var name = $('#delete').val();
	chrome.alarms.clear(name,function(){
		chrome.alarms.getAll(function(result){
			$('#list').html(getText(result));
		});
	});
	$('#delete').val('');
});

setInterval(function(){
	chrome.alarms.getAll(function(result){
		if(result.length != 0){
			$('#list').html(getText(result));
		}	
	});
}, 1000);

function getText(result){
	var text = '';
	for(var i=0; i<result.length; i++){
		var time = Math.round((1*result[i].scheduledTime - Date.now())/1000);
		if(time != 0){
			text += '<p>'+result[i].name+' in ~'+time+'sec';
			if(result[i].periodInMinutes != null){
				text += ' every '+result[i].periodInMinutes + 'sec';
			}
			text += '</p>';
		}
	}
	return text;
}
