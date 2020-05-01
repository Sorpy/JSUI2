$(document).ready(function () {

    var $cart = $('#cart-table');
    var $cartTemplate = $('#cart-template').html();

    function addItem(cart) {
        $cart.append(Mustache.render($cartTemplate,cart))
    }

    try{
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
    } catch (e) {
        alert("Could not find a token")
    }

    $cart.delegate('.delete','click',function () {
        var $tr = $(this).closest('tr');
        $.ajax({
            url: 'https://localhost:8081/Cart/eraseById/' + $(this).attr('data-id'),
            headers:{
                'Authorization' : token
            },
            type: 'DELETE',
            crossDomain:true,
            crossOrigin:true,
            success: function () {
                $tr.fadeOut(function () {
                    $tr.remove();
                });
                var sum = 0;
                $(".price").each(function(){
                    sum += parseFloat($(this).text());
                });
                $("#buy-btn").html("Total cost"+ (sum.toFixed(2)));
            },
            error: function () {
                alert("could not load accounts");
            }
        });
    });

    $("#buy-btn").click( async function () {
        var order = {
            userId: await getUserId(token)
        };
        $.ajax({
            url: 'https://localhost:8081/Order/create',
            headers:{
                'Authorization' : token
            },
            contentType: 'application/json',
            type: 'POST',
            crossDomain:true,
            crossOrigin:true,
            data: JSON.stringify(order),
            success: function () {
                location.reload(true);
            },
            error: function () {
                alert("An error has occurred");
            }
        });
    });




    return $.ajax({
        url: 'https://localhost:8081/ApiSession/getUserId?token=' + token,
        headers: {
            'Authorization': token
        },
        crossDomain: true,
        crossOrigin: true,
        async:false,
        type: 'GET',
        dataType: 'text',
        success: function (result) {
           getUserCart(result)
        },
        error: function () {
            alert("could not load accounts");
        }
    });

    function getUserCart(userId) {
        $.ajax({
            url: 'https://localhost:8081/Cart/findByUserId',
            headers: {
                'Authorization': token
            },

            type: 'GET',
            dataType: 'text',
            data: {
                value: userId
            },
            success: function (items) {
                    var sum = 0;
                    $.each(JSON.parse(items), function (i, item) {
                        $(".cart-container").show();
                        if (item.active === 1) {
                            addItem(item);
                            sum += item.price;
                        }
                    });
                    $("#buy-btn").html("Total cost" + (sum.toFixed(2)));
            },
            error: function () {
                alert("could not load books");
            }
        });
    }

});
function getUserId(token) {

    return $.ajax({
        url: 'https://localhost:8081/ApiSession/getUserId?token=' + token,
        headers: {
            'Authorization': token
        },
        crossDomain: true,
        crossOrigin: true,
        async:false,
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
