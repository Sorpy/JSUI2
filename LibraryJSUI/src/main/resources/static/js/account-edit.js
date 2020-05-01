$(document).ready(function () {


    try {
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
    } catch (e) {
        alert("Could not find a token")
    }

    var pathArray = window.location.pathname.split('/');
    var accountId = pathArray[pathArray.length-1];

    $.ajax({
        url: 'https://localhost:8081/Account/findByPK/'+accountId,
        headers: {
            'Authorization': token
        },

        type: 'GET',
        dataType: 'json',
        data: "",
        success: function (account) {
            $('#firstName').val(account.firstName);
            $('#secondName').val(account.secondName);
            $('#lastName').val(account.lastName);
            $('#address').val(account.address);
            $('#city').val(account.city);
            $('#country').val(account.country);
            $('#phone').val(account.phone);
            $('#email').val(account.email);
            $('#userId').val(account.userId);
            $('#accountStatusId').val(account.accountStatusId);
            $('#accountTypeId').val(account.accountTypeId);
            $('#active').val(account.active);
            $('#code').val(account.code);
            $('#name').val(account.name);
            $('#description').val(account.description);

        },
        error: function () {
            alert("could not load account");
        }
    });

    $('#edit-form').submit(function (event) {
        event.preventDefault();

        sendEditRequest(accountId,token)
    });
});
function sendEditRequest(accountId,token) {

    var $firstName = $('#firstName').val();
    var $secondName = $('#secondName').val();
    var $lastName = $('#lastName').val();
    var $address = $('#address').val();
    var $city = $('#city').val();
    var $country = $('#country').val();
    var $phone = $('#phone').val();
    var $email = $('#email').val();
    var $userId = $('#userId').val();
    var $accountStatusId = $('#accountStatusId').val();
    var $accountTypeId = $('#accountTypeId').val();
    var $active = $('#active').val();
    var $code = $('#code').val();
    var $name = $('#name').val();
    var $description = $('#description').val();


    var account = {
        id:accountId,
        firstName: $firstName,
        secondName: $secondName,
        lastName: $lastName,
        address: $address,
        city: $city,
        country: $country,
        phone: $phone,
        email: $email,
        userId: $userId,
        accountStatusId: $accountStatusId,
        accountTypeId: $accountTypeId,
        active: $active,
        code: $code,
        name: $name,
        description: $description
    };

    $.ajax({
        url: 'http://localhost:8081/Account/update/' + accountId,
        type: 'PUT',
        headers:{
            'Authorization' : token
        },
        crossDomain:true,
        crossOrigin:true,
        dataType:'text',
        contentType: "application/json",
        data: JSON.stringify(account),
        success: function (data) {
            alert("braoue")
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });
}