var token = getCookie('token');
var socket = io.connect('/chat-room', {
    'query': 'token=' + token
});
socket.on("current-room", function (name) {
    document.getElementById("currentRoom").innerHTML = "Chat with " + name;
});
socket.on("update-rooms", function (data) {
    $("#addGroup").after("<li class='d-flex bd-highlight active'>\
        <div class ='img_cont'>\
            <img class ='rounded-circle user_img' src='/images/no-img.png'>\
            <span class='online_icon'></span>\
        </div>\
        <div class='user_info'>\
            <span>" + data + "</span>\
        </div>\
    </li>");
});
$(document).ready(function () {
    $('#createRoomForm').validate({
        rules: {
            'roomname': {
                required: true,
            },
            'users[]': {
                required: true,
            }
        },
        submitHandler: function (form) {
            var selected_value = new Array();
            $(".messageCheckbox:checked").each(function () {
                selected_value.push($(this).val());
            });
            socket.emit("create-room", {
                room: $("#txtRoomName").val(),
                members: selected_value
            });
            document.getElementById("createRoomForm").reset();
            $(".contacts-group>li.active").removeClass("active");
            $("#createRoomModal").modal("hide");
        }
    });
});

function showCustomers() {
    var str = document.getElementById("txtUsername").value;
    $.ajax({
        type: "GET",
        url: "users",
        data: 'q=' + str,
        success: function (result) {
            $("#checkbox").html("");
            result.forEach(function (entry) {
                $("#checkbox").append("<input type='checkbox' name='users[]' class ='messageCheckbox' value='" + entry._id + "'>" + entry.nickname + "(" + entry.username + ")<br/>");
            });
        }
    });
};

function myClick() {
    $.ajax({
        type: "GET",
        url: "users",
        data: 'q=',
        success: function (result) {
            $("#checkbox").html("");
            result.forEach(function (entry) {
                $("#checkbox").append("<input type='checkbox' name='users[]' class ='messageCheckbox' value='" + entry._id + "'>" + entry.nickname + "(" + entry.username + ")<br/>");
            });
        }
    });
};