$(document).ready(function () {
    $('#btn-register').click((event) => {
        event.preventDefault();
        $.post({
            url: '/register',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
                nickname: $('#nickname').val(),
            },
            success: resp => {
                window.location = '/login';
            },
            error: resp => {
                if (resp.status == 400) {
                    $('.modal-title').text("Validation Error");
                    $('.modal-body p').text(resp.responseJSON.errors);
                    $('#myModal').modal();
                } else {
                    $('.modal-title').text("Internal sever error. Please try again later!");
                    $('#myModal').modal();
                }
            }
        });
    });
});