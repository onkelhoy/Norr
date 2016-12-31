function addField(options){
  var field = document.createElement('div');
  var fieldObj = {
    children: [],
    images: null,
    link: 'javascript:void(0)',
    text: '',
    header: '',
    style: field.style,
    id: 0
  };
  field.className = 'field';

  var a = document.createElement("a");
  a.setAttribute('href', 'javascript:void(0)');

  field.style = options.style;
  field.setAttribute('fieldObj', fieldObj);
  field.appendChild(a);

  var clip = createButton('defualt fieldbuttons', '<i class="fa fa-scissors"></i>', function(){
    Cut(fieldObj);
  });

  var controlls = document.createElement('div');
  controlls.appendChild(clip);

  field.insertBefore(controlls, field.children[0]);
  field.setAttribute('id', fieldObj.id);
  addFieldBtn(index+1, field);

  if(options.parent != undefined){
    if(options.parent.children.length > 0) fieldObj.id = layout[layout.length-1].id+'.b';
    else fieldObj.id = options.parent.id + '.'+options.parent.children.length;

    field.setAttribute('id', fieldObj.id);
    options.parent.children.push(fieldObj);
    document.getElementById(options.parent.id).appendChild(field);
  }
  else { //no parent
    var index = Number(options.index);
    if(layout.length > 0) fieldObj.id = layout[layout.length-1].id+'.b';
    //else 0..
    layout.splice(index, 0, fieldObj);
    var content = document.getElementById('content');

    content.insertBefore(field, content.children[index]);

  }
}

function createButton(klass, text, func){
  var btn = document.createElement('button');
  btn.className = 'btn sharp btn-'+klass;
  btn.innerHTML = text;
  btn.addEventListener('click', func);
  return btn;
}

function addFieldBtn(index, field){
  var btn = document.createElement('button');
  btn.className = 'btn sharp btn-primary';
  btn.setAttribute('index', index);

  var i = document.createElement('i');
  i.className = 'fa fa-plus';

  btn.appendChild(i)
  btn.textContent = 'Nytt Fönster';
  btn.addEventListener('click', function(){
    addField({
      index: this.getAttribute('index'),
      style: 'position: relative; background-color: white;'
    });
  });

  field.appendChild(btn);
}

function Generate(layout, addBtn){
  var content = document.getElementById('content');
  if(addBtn) addFieldBtn(1, content);
  for(var i = 0; i < layout.length; i++){
    var field = layout[i];
    var hField = document.createElement('div'),
        a = document.createElement('a');

    a.setAttribute('href', 'javascript:void(0)');
    if(field.children.length > 0){
      for(var child in field.children){
        Generate(child);
      }
    }
    else {

    }

    hField.appendChild(a);
    if(addBtn) addFieldBtn(i+1, hField);
    content.appendChild(hField);
  }
}


function Cut(field){
  var horizontalBtn = document.createElement('button'), vertivcalBtn = document.createElement('button'), closeBtn = document.createElement('button');
  var arrowL = document.createElement('i'), arrowH = document.createElement('i'), closeIcon = document.createElement('i');
  arrowL.className = 'fa fa-arrows-v';
  arrowH.className = 'fa fa-arrows-h';
  closeIcon.className = 'fa fa-times';

  horizontalBtn.appendChild(arrowH);
  vertivcalBtn.appendChild(arrowL);
  closeBtn.appendChild(closeIcon);

  horizontalBtn.addEventListener('click', function(event){
    //change to horizontal mode
    var s = this.parentNode.parentNode.getElementsByClassName('selected')[0].children[0];
    s.style.top = 0;
    s.style.width = '3px';
    s.style.height = '100%';

    s.parentNode.setAttribute('mode', 'horizontal');
  });
  vertivcalBtn.addEventListener('click', function(event){
    //vhange to vertical mode
      //change to horizontal mode
      var s = this.parentNode.parentNode.getElementsByClassName('selected')[0].children[0];
      s.style.left = 0;
      s.style.width = '100%';
      s.style.height = '3px';

      s.parentNode.setAttribute('mode', 'vertical');
  });
  closeBtn.addEventListener('click', function(event){
    removeCut(event);
  });

  var cutControlles = document.createElement('div');
  cutControlles.className = 'controller';
  cutControlles.appendChild(horizontalBtn);
  cutControlles.appendChild(vertivcalBtn);
  cutControlles.appendChild(closeBtn);

  var over = document.createElement('div');
  over.className = 'selected';

  var span = document.createElement('span');
  span.className = 'split';
  over.appendChild(span);
  over.setAttribute('mode', 'horizontal');

  over.addEventListener('mousemove', function(event){
    if(event.target.className == 'selected') {
      // if(this.) //check if horizontal mode or vertical..
      if(this.getAttribute('mode') == 'horizontal'){
        var set = event.offsetX+'px';
        if(event.shiftKey && Math.abs(event.offsetX - event.target.clientWidth/2) <  event.target.clientWidth/6) set = event.target.clientWidth/2+'px';
        this.children[0].style.left = set;
      }
      else {
        var set = event.offsetY+'px';
        if(event.shiftKey && Math.abs(event.offsetY - event.target.clientHeight/2) < event.target.clientHeight/6) set = event.target.clientHeight/2+'px';
        this.children[0].style.top = set;
      }
    }
  });
  over.addEventListener('contextmenu', function(e){
    removeCut(e);
  });
  over.addEventListener('click', function(e){
      addField({
        parent: field,
        style: 'position: absolute; left: 0; top: 0;'
      });
      addField({
        parent: field,
        style: 'position: absolute; left: '+this.children[0].style.left+'; top: '+this.children[0].style.top+';'
      });
      removeCut(e);
  });
  function removeCut(e){
    e.preventDefault();
    cutControlles.parentNode.removeChild(cutControlles);
    over.parentNode.removeChild(over);
  }

  // console.log(field);
  document.getElementById(field.id).appendChild(cutControlles);
  document.getElementById(field.id).appendChild(over);
}

function Map(value, range_min, range_max, map_min, map_max){
  var d1 = range_max-range_min, d2 = map_max-map_min;
  var ratio = d2/(d1!=0?d1:1);

  return value * ratio + map_min;
}
