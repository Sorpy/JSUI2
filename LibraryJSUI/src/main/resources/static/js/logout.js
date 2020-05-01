$(document).ready(function () {

    try{
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
    } catch (e) {
        alert("Could not find a token")
    }
    $('#logout').click(function(){
        $.ajax({
            url: 'https://localhost:8081/menu/logout',
            headers:{
                'Authorization' : token
            },
            crossDomain:true,
            crossOrigin:true,
            type: 'DELETE',
            dataType:'text',
            data: "",
            success: function () {
                return window.location = '/login';
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("kurec")
            }
        })
    })
});