  $(document).ready(function(){
    $('#logout-submit').click(function(){
      $('#logout-form').submit();
    });
    $('.name').click(function(){
      document.getElementById("username").innerHTML = "<input type='text'/>";
    })
    $('.nickname').click(function(){
      document.getElementById("nickname").innerHTML = "<input type='text'/>";
    })
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
