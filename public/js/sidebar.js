$(document).ready(function(){
	var elements = [];
	var position = [];

	loop();
	


	function add(pos, text, arr, current) {
		if(current == pos.length - 1) {
			var index = arr[pos[current]].arr.length;

			arr[pos[current]].arr.push({text: text, arr: []});
			var a = [];

			for(var i = 0; i < pos.length; i++){
				a.push(pos[i]);
			}
			a.push(index);
			position[text] = a;
		}
		else {
			current++;
			add(pos, text, arr[pos[current]].arr, current);
		}
		
	} 

	function loop() {
		for(var i = 0; i < categories.length; i++) {

			if(categories[i].parent == null) {
				//superParent
				// li.addClass()
				var index = elements.length;
				elements.push({text: categories[i].name, arr: []});
				position[categories[i].name] = [index];

				categories.splice(i, 1);
			}
			else if(position[categories[i].parent] !== undefined){
				//sub sub child

				add(position[categories[i].parent], categories[i].name, elements, 0);
				categories.splice(i, 1);
			}
		}

		if(categories.length > 0) loop();
		else addElements();
	}

	function addElements(){
		var ul = $('<ul></ul>');
		printout(ul, elements);

		$('.sidebar-wrapper').append(ul);
	}

	function printout(ul, arr) {
		for(var i = 0; i < arr.length; i++){
			var li = $('<li></li>');
			li.append($('<a></a>').attr('href', '/home/' + arr[i].text).text(arr[i].text));

			if(arr[i].arr.length > 0) {
				li.append(printout($('<ul></ul>'), arr[i].arr));
			}

			ul.append(li);
		}

		return ul;
	}
});