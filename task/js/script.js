
$(document).ready(function(){

	//Give focus to text field on load
	$('#taskField').focus();

	//Initially hide the instructions
	$('#instructions').toggle();
	
	//Adds item to task list based on selected priority
	function addTask(){
		var task = $('#taskField').val();
		task = task.replace(/>/g,'&gt;');
		task = task.replace(/</g,'&lt;');
		//Ensures that text for task has been entered
		if (task !== ""){
			if ($('.item').length === 0){
				var status = 'top'
				restyle(status);
			} 
			//Checks priority level and sets appropriate style
			if ($("input[value='low']").is(':checked')){
				$('#itemList').append("<p class='item' style='background-color: green'>" + task + "</p>")
			}else if($("input[value='medium']").is(':checked')){
				$('#itemList').append("<p class='item' style='background-color: orange'>" + task + "</p>")
			}else{
				$('#itemList').append("<p class='item' style='background-color: red'>" + task + "</p>")
			}
			$('#taskField').val('');	
		}
	};

	//Adds item to task list for submit button
	$('#submit').click(function(){
		addTask();
	});

	//Removes items from task list
	$(document).on('click','.item',function(){
		$(this).css({
			'text-decoration': 'line-through'
		}).animate({
			opacity: 0
		}, 500, function(){
			$(this).remove();
			if ($('.item').length === 0){
				var status = 'center'
				restyle(status);
			} 
		});
	});

	//Adds itme to task list for keyboard subbmission
	$("#taskField").keydown(function(k){
		if (k.keyCode === 13){
			stopSubmission = true;
			addTask();
		}else{
			stopSubmission = false;
		}
	});

	//Stops page refreshing based on 'enter' being pressed.
	$("#form1").submit(function(){
		if (stopSubmission){
			return false;
		}
	});

	//Enables reordering of list items
	$('#itemList').sortable();

	//Move form div and restyle based on list having items
	function restyle(status){
		//Toggles instructions to show appropriate set
		$('#instructions').toggle();
		$('#start').toggle();
		//Changes style based on current status (name of style to change to)
		if (status === 'top'){
			$('#formContainer').removeClass('formContainerCenter').addClass('formContainerTop');
		}else{
			$('#formContainer').removeClass('formContainerTop').addClass('formContainerCenter');
		}	
	}


});
