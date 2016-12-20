var CATEGORIES = null;
$(document).ready(function(){
  var list = $('#categoriesList'), parentList = $('#parent');
  $.ajax({
    method: 'get',
    url: 'c',
    success: function(data){
      CATEGORIES = data;
      data.forEach(function(category){
        appendCategory(category, list, parentList);
      });
    },
    error: function(err){
      showError(err.responseText);
    }
  });


});



function addCategory(){
  var name = $('#name').val(), parent = $('#parent').val(), superparent;

  if(name != ""){
    if(parent != -1){
      var current = getParent(parent);
      if(current) {
        if(current.superParent) superparent = current.superParent;
        else superparent = parent;
      }
      else superparent = parent;
    } else superparent = parent = "";

    $.ajax({
      method: 'POST',
      url: '/admin/categories/',
      data: {
        data: {
          name: name,
          parent: parent,
          superparent: superparent
        }
      },

      success: function(row){
        appendCategory({name: name, id: row.insertId}, $('#categoriesList'), $('#parent'));
        showSuccess('Kategori tillagd');
      },
      error: function(err){
        showError(err.responseText);
      }
    })
  } else showError('Du måste välja ett kategorinamn');
}

function getParent(parent){
  for(var i = 0; i < CATEGORIES.length; i++){
    if(CATEGORIES[i].name == parent) return CATEGORIES[i];
  }

  return null;
}



function appendCategory(category, list, parentList){
  var li = $('<li>'), remove = $('<button>'), name = $('<p>'), update = $('<button>'), option = $('<option>');
  option.text(category.name);

  parentList.append(option);

  remove.text('TA BORT');
  update.text('SPARA');
  name.text(category.name);

  name.attr('contenteditable', 'true');

  li.attr('id', category.id);
  li.attr('name', category.name);
  li.addClass('row');

  remove.addClass('btn left btn-danger col-xs-3 col-md-2');
  update.addClass('btn right btn-primary col-xs-3 col-md-2');
  name.addClass('col-xs-6 col-md-8');

  remove.click(function(){
    var elm = $(this).parent();
    var id = elm.attr('id'), name = elm.attr('name');
    $.ajax({
      method: 'delete',
      url: '/admin/categories/',
      data: {id: id, name: name},
      success: function(msg){
        showSuccess(msg);
        elm.remove();
      },
      error: function(err){
        if(err.status == 405){
          $('#forceDeleteMSG').html(err.responseText + "<br>You can force delete the category and all the products bolonging to this category will be deleted as well. <br>Enter the name of the category to confirm");
          $('#forceConfirm').click(function(){
            if($('#forceDelete').val() == name){
              $.ajax({
                url: '/admin/categories/force',
                method: 'delete',
                data: {id: id},
                success: function(msg){
                  elm.remove();
                  showSuccess(msg);
                },
                error: function(err){
                  showError(err.responseText);
                }
              })
            }
            else showError('was not the same name');
          });
          showPopup(0);
        }
        else showError(err.responseText);
      }
    })
  });

  update.click(function(){
    if(name.text() != li.attr('name')){
      $.ajax({
        url: '/admin/categories/',
        method: 'put',
        data: {
          data: {name: name.text(), id: li.attr('id'), old: li.attr('name')}
        },

        success: function(msg){
          showSuccess(msg);
          li.attr('name', name.text());
          option.text(name.text());
        },
        error: function(err){
          showError(err.responseText);
        }
      })
    }
  });

  li.append(remove, name, update);

  list.append(li);
}
