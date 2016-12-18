$(document).ready(function(){
  var list = $('#categoriesList');
  $.ajax({
    method: 'get',
    url: 'c',
    success: function(data){
      data.forEach(function(category){
        var li = $('<li>'), remove = $('<button>'), name = $('<span>'), update = $('<button>');

        remove.text('TA BORT');
        update.text('SPARA');
        name.text(category.name);

        li.attr('id', category.id);
        li.attr('name', category.name);
        li.addClass('col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2');

        remove.addClass('btn left btn-danger');
        update.addClass('btn right btn-primary');

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

        li.append(remove, name, update);

        list.append(li);
      });
    },
    error: function(err){
      console.log(err.responseText);
    }
  });


});
