  $(document).ready(function(){
    $('#logout-submit').click(function(){
      $('#logout-form').submit();
    });
    $("#editname").hide();
    $("#editnick").hide();

    $('.nickname').click(function(){
      $("#nickname").hide();
      $("#editnick").show();
    })
    $(document).mouseup(function(e){
      var container = $("#editnick");
      if(!container.is(e.target) && container.has(e.target).length === 0){
        $("#editnick").hide();
        $("#nickname").show();
      }
    });
  });
  function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function(){
      readURL(this);
  });
