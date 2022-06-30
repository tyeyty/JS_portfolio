$(function(){
	var selected_h = 0;

	$("dt.head").click(function(){
		$("dt.head").next().removeClass("selected");

		$(this).next().slideToggle(500).addClass("selected").queue(function(){

			$(this).dequeue();
		});

	});
});