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
	//Set inputs to empty
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
}, 3000);

function getText(result){
	var text = '';
	for(var i=0; i<result.length; i++){
		text += '<p>'+result[i].name +
					' in ~' + (Math.round((1*result[i].scheduledTime - Date.now())/1000)) +
					'sec';
		if(result[i].periodInMinutes != null){
			text += ' every '+result[i].periodInMinutes + 'sec';
		}
		text += '</p>'
	}
	return text;
}

/* Now just do the same with the url removing feature
   https://developer.chrome.com/extensions/alarms
   ^ use the getarray (no need to storage)
   ^ use clear to stop the alarm
   load the current alarms in a div!
   and ur done!!! */

   /*
   [{"name":"first","scheduledTime":1553959426099},
   {"name":"second","periodInMinutes":1,"scheduledTime":1553959432263.008}]
   */