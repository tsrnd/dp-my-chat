$(document).ready(function () {
    $('#btn-login').click((event) => {
        event.preventDefault();
        $.post({
            url: '/login',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
            },
            success: resp => {
                window.location.reload();
            },
            error: resp => {
                if (resp.status == 400) {
                    let errors = resp.responseJSON.errors;
                    console.log(errors);
                    errors.forEach(element => {
                        $('#' + element.param + '-error')
                            .html(element.msg)
                            .show();
                    });
                } else if (resp.status == 404) {
                    $('#username-error').html(resp.responseJSON.errors).show();
                } else {
                    alert('Internal server error');
                }
            }
        });
    });
});