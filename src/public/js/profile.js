$(document).ready(function () {
    $('input').keyup(function(e){
        if(e.keyCode == 13)
        {
            var data = {
                nickname: $("#editnick").val()
            };
            updateEvent(data);
        }
    });
})
function updateEvent(data) {
    var a= {
        "nickname": data.nickname
    }
    $.ajax({
        url: "user",
        method: "PUT",
        data: JSON.stringify(a),
        contentType: "application/json",
        success: function (result) {
            $("#editnick").hide();
            document.getElementById("nickname").innerHTML = "("+result.nickname+")";
            document.getElementById("nick").innerHTML = "("+result.nickname+")";
            $("#nickname").show();
            console.log(result);
        },
    })
}