function Generate(layout){
	for(var i = 0; i < layout.length; i++){
		createField(layout[i]);
	}
}

function createField(field){
	var fieldelm = $('<div></div>').addClass('field ' + field.size);
	var box = $('<div></div>').addClass('hidden-xs');

	for(var i = 0; i < field.fields.length; i++){

		var div = $('<div></div>').addClass(field.fields[i].class);
		generateChildren(field.fields[i], div);
		
		box.append(div);
	}


	fieldelm.append(box);
	$('#content').append(fieldelm);
}

function generateChildren(field, div){
	var children = field.children;
	if(children){
		//it contains children
		for(var j = 0; j < children.length; j++) {
			var div2 = $('<div></div>').addClass(children[j].class);
			div.append(div2);

			generateChildren(children[j], div2);
			// div.append(createFieldContent(children[j], div2));

		}

		// box.append(div);
	} else {
		//its a body
		div.append(createFieldContent(field));
	}
}

function createFieldContent(field){
	var ahref = $('<a></a>').attr('href', field.link)
		.css({'display': 'block', 'background-color': field.color});


	ahref.append($('<img>').attr('src', field.image)
		.attr('arc', field.header));
	ahref.append($('<h3></h3>').text(field.header));
	ahref.append($('<p></p>').text(field.caption));

	return ahref;
}