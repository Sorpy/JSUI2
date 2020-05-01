export function getUserId(token) {
    $.ajax({
        url: 'https://localhost:8081/ApiSession/getUserId?token=' + token,
        headers: {
            'Authorization': token
        },
        crossDomain: true,
        crossOrigin: true,
        type: 'GET',
        dataType: 'text',
        success: function (result) {
            return result;
        },
        error: function () {
            alert("could not load accounts");
        }
    });
}