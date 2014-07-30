
$(document).ready(function(){

	//Give focus to text field on load
	$('#taskTitle').focus();

	//Initially hide the instructions
	$('#instructions').toggle();
	
	//Adds item to task list based on selected priority
	function addTask(){
		//Grabs task title from taskTitle input
		var taskTitle = $('#taskTitle').val();
		taskTitle = taskTitle.replace(/>/g,'&gt;');
		taskTitle = taskTitle.replace(/</g,'&lt;');
		//Grabs task description from taskDescription input
		var taskDescription = $('#taskDescription').val();
		taskDescription = taskDescription.replace(/>/g,'&gt;');
		taskDescription = taskDescription.replace(/</g,'&lt;');
		//Ensures that text for task has been entered
		if (taskTitle !== ""){
			if ($('.item').length === 0){
				var status = 'top';
				restyle(status);
			}
			//Creates title and description paragraph elements around the data
			taskTitle = '<p class="itemTitle">' + taskTitle +'</p>';
			taskDescription = '<p class="itemDescription">' + taskDescription +'</p>';
			//Checks priority level and sets appropriate style
			if ($("input[value='low']").is(":checked")){
				$('#itemList').append("<div class='item' style='background-color: green'>" + taskTitle + taskDescription + "</div>");
			}else if($("input[value='medium']").is(':checked')){
				$('#itemList').append("<div class='item' style='background-color: orange'>" + taskTitle + taskDescription + "</div>");
			}else{
				$('#itemList').append("<div class='item' style='background-color: red'>" + taskTitle + taskDescription + "</div>");
			}
			//Gives focus back to Title Field
			$('#taskDescription').val('').blur();
			$('#taskTitle').val('').focus();
		}
	}

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
				var status = 'center';
				restyle(status);
			} 
		});
	});

	var stopSubmission;
	//Adds title to task list and gives focus to description
	$('#taskTitle').keydown(function(k){
		if (k.keyCode === 13){
			stopSubmission = true;
			$('#taskTitle').blur();
			$('#taskDescription').focus();
		}else{
			stopSubmission = false;
		}
	});

	//Adds description to task list for keyboard subbmission
	$('#taskDescription').keydown(function(k){
		if (k.keyCode === 13){
			stopSubmission = true;
			addTask();
		}else{
			stopSubmission = false;
		}
	});

	//Stops page refreshing based on 'enter' being pressed.
	$('#form1').submit(function(){
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
