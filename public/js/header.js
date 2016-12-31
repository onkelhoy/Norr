$(document).ready(function() {
	var elm = $('header > section > div + div');
	var clicked = false;

	$.ajax({
		method: 'get',
		url: '/heart',
		success: function(list){
			if(list && list.length > 0) {
				var a = $('header > section > div:first-child > a');
				a.attr('href', '/category/HEARTs');
				a.children('i').removeClass('fa-heart-o');
				a.children('i').addClass('fa-heart');
			}
		}
	})
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
		$.ajax({
			method: 'post',
			url: '/search',
			data: {value:value},
			success: function(products){
				$('#custom-search-input').css('border', '0.571429px solid rgb(228, 228, 228)');
				var searchRes = $('#searchResult');
				searchRes.html('');
				for(var i = 0; i < products.length; i++){
					searchRes.append($('<li>').addClass('list-group-item')
					.append($('<a>').attr('href', '/product/'+products[i].id).text(products[i].name)));
				}
			},
			error: function(err){
				$('#custom-search-input').css('border', '1.5px solid red');
			}
		})
	} else {
		$('#custom-search-input').css('border', '0.571429px solid rgb(228, 228, 228)');
		$('#searchResult').html('');
	}
}
