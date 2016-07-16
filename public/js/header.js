$(document).ready(function() {
	var elm = $('header > section > div + div');
	var clicked = false;

	elm.children('p').hover(function(){
		elm.children('div').slideDown('fast');
	});

	elm.children('p').click(function() { 
		clicked = clicked == false;
		if(clicked) $('#loginpin').show();
		else $('#loginpin').hide();
	});

	elm.mouseleave(function() {
		if(!clicked)
			elm.children('div').slideUp('fast'); 
	});

	$('#changeLogin').click(function(){
		if($(this).text() == 'Ej medlem?') {
			$(this).text('Logga in');
			$('.login').hide();
			$('.register').show();

			$(this).parent().parent().children('p').children('span').text('REGISTRERA');
		} else {
			$(this).text('Ej medlem?');
			$('.register').hide();
			$('.login').show();

			$(this).parent().parent().children('p').children('span').text('LOGGA IN');
		}
	});

});

function search() {
	var value = $('#search').val();
	if(value != '') {
		$.post('search', {
			value: value
		}, function(data){

		}).fail(function(err){

		});
	}
}