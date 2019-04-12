$(document).ready(function() {
    $("#login-form").validate({
        rules: {
            username: {
                required: true,
                minlength: 4,
            },
            password: {
                required: true,
                minlength: 4,
            },
        },
        messages: {
            username: {
                required: "Please input your username",
                minlength: "Usernam has more than 4 characters"
            },
            password: {
                required: "Please input your password",
                minlength: "Password has more than 4 characters"
            },
        }
    });
});