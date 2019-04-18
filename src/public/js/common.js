$(document).ready(function () {
    $('#logout-submit').click(function () {
        $('#logout-form').submit();
    });
    $("#editname").hide();
    $("#editnick").hide();

    $('.name').click(function () {
        $("#username").hide();
        $("#editname").show();
    })
    $('.nickname').click(function () {
        $("#nickname").hide();
        $("#editnick").show();
    })
    $(document).mouseup(function (e) {
        var container = $("#editnick");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $("#editnick").hide();
            $("#nickname").show();
        }
    });
    $(document).mouseup(function (e) {
        var container = $("#editname");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $("#editname").hide();
            $("#username").show();
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

$("#imgInp").change(function () {
    readURL(this);
});

function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
}