$(document).ready(function(){
  $.ajax({
    method: 'get',
    url: '/heart',
    success: function(list){
        if(list){
          var products = $('.product');
          for(var i = 0; i < products.length; i++){
            var n = products.eq(i).attr('productid');

            for(var j = 0; j < list.length; j++){
              if(list[j] == n){
                products.children().eq(i).children().eq(1).children().eq(0).removeClass('fa-heart-o').addClass('fa-heart');
                break;
              }
            }
          }
        }
    }
  });
})

function heartItem(elm){
  var i = elm.children().eq(0);
  var state = 'post';
  if(i.hasClass('fa-heart')){
    state = 'delete';
    i.removeClass('fa-heart');
    i.addClass('fa-heart-o');
  } else {
    i.removeClass('fa-heart-o');
    i.addClass('fa-heart');
  }

  $.ajax({
    method: state,
    url: '/heart/'+elm.parent().parent().attr('productid'),

    success: function(status){

    },
    error: function(err){

    }
  });
}
