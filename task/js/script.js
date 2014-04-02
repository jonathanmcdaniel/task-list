$(document).ready(function(){
	$('#submit').click(function(){
		var task = $('#taskField').val();
		if (task !== ""){
			if ($("input[value='low']").is(':checked')){
				$('#itemList').append("<p class='item' style='background-color: green'>" + task + "</p>")
			}else if($("input[value='medium']").is(':checked')){
				$('#itemList').append("<p class='item' style='background-color: orange'>" + task + "</p>")
			}else{
				$('#itemList').append("<p class='item' style='background-color: red'>" + task + "</p>")
			}	
		}
	});
	$(document).on('click','.item',function(){
		$(this).remove();
	});
	$('#itemList').sortable();
});