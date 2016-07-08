$(document).ready(function(){
	var list = $('.products');

	for(var i = 0; i < products.length; i++) {

		var li = $('<li></li>').addClass('col-md-3 col-md-4');
		var a = $('<a></a>').attr('href', '/product/'+products[i].id);
		var imgsrc = products[i].images.split(',')[0];

		a.append($('<h3></h3>').text(products[i].name));
		a.append($('<img>').attr('src', imgsrc).attr('alt', products[i].name + 0));

		li.append($('<button></button>')
			.addClass('btn heartBtn')
			.attr('type', 'button')
			.attr('index', products[i].id)
			.click(function(){
				heartItem($(this).attr('index'));
			}).append($('<i></i>').addClass('fa fa-heart')));

		li.append(a);
		list.append(li);
	}
});

function heartItem(id){
	// $.post()
	console.log(id);
}