$(document).ready(function () {

    $('#login-form').submit(function (event) {
        event.preventDefault();

        sendLoginRequest()
    });
});

function sendLoginRequest() {

    var $username = $('#username').val();
    var $password = $('#password').val();
    $.ajax({
        url: 'https://localhost:8081/menu/login',
        headers:{
            'Authorization' : 'Basic ' + btoa($username + ':' + $password)
        },
        crossDomain:true,
        crossOrigin:true,
        type: 'GET',
        dataType:'text',
        data: "",
        success: function (authToken) {
            var url = "index?token=" + authToken;
            return window.location = url;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#validation-message").html("<p>Wrong username or password! </p>")
        }
    });
}