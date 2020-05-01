$(document).ready(function () {

    $('#register-form').submit(function (event) {
        event.preventDefault();

        sendRegisterRequest()
    });
});
function sendRegisterRequest() {


    var $firstName = $('#firstName').val();
    var $secondName = $('#secondName').val();
    var $lastName = $('#lastName').val();
    var $address = $('#address').val();
    var $city = $('#city').val();
    var $country = $('#country').val();
    var $phone = $('#phone').val();
    var $email = $('#email').val();

    var account = {
        firstName: $firstName,
        secondName: $secondName,
        lastName: $lastName,
        address: $address,
        city: $city,
        country: $country,
        phone: $phone,
        email: $email
    };

    $.ajax({
        url: 'https://localhost:8081/menu/register',
        type: 'POST',
        headers:{
            'Registration' : btoa($username + ':' + $password)
        },
        crossDomain:true,
        crossOrigin:true,
        dataType:'text',
        contentType: "application/json",
        data: JSON.stringify(account),
        success: function (data) {
            return window.location = "/login";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#validation-message").html("<p>Username already taken! </p>")

        }
    });
}