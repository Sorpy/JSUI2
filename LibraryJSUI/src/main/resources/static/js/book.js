$(document).ready(function () {

    var $book = $('#book-table');
    var $bookTemplate = $('#book-template').html();

    function addBook(book) {
        $book.append(Mustache.render($bookTemplate,book))
    }

    try{
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
    } catch (e) {
        alert("Could not find a token")
    }

    $.ajax({
        url: 'https://localhost:8081/Book/listAll',
        headers:{
            'Authorization' : token
        },

        type: 'GET',
        dataType:'json',
        data: "",
        success: function (books) {
            $.each(books,function (i,book) {
                if (book.active ===1) {
                    addBook(book);
                }
            });
        },
        error: function () {
            alert("could not load books");
        }
    });

    $(".dropdown-menu li").on("click", function() {
        $('.dropdown-toggle').text($(this).text());
        $('.dropdown-menu').removeClass('open');
    });

    $book.delegate('.add-cart','click',async function () {

        var cartItem ={
            userId: await getUserId(token),
            bookId: $(this).attr('data-id'),
            orderId: null
        };

        $.ajax({
            url: 'https://localhost:8081/Cart/create',
            headers:{
                'Authorization' : token
            },
            contentType: 'application/json',
            type: 'POST',
            crossDomain:true,
            crossOrigin:true,
            data: JSON.stringify(cartItem),
            success: function () {
            },
            error: function () {
                alert("an error has occurred");
            }
        });
    });

    $('#search-button').submit(function (event) {
        event.preventDefault();
        searchByParam(token)
    });

    $book.delegate('.delete','click',function () {
        var $tr = $(this).closest('tr');
        $.ajax({
            url: 'https://localhost:8081/Book/delete/' + $(this).attr('data-id'),
            headers:{
                'Authorization' : token
            },
            type: 'DELETE',
            crossDomain:true,
            crossOrigin:true,
            success: function () {
                $tr.fadeOut();
            },
            error: function () {
                alert("An error has occurred");
            }
        });
    });


    function searchByParam(token) {
        var $searchParam = $('#dropdownMenuButton').text();
        var $searchContent = $('#search-content').val();

        $searchParam = $searchParam.replace(/\s/g, '');

        switch ($searchParam) {
            case "FirstName" :
                $searchParam = "firstName";
                break;
            case "SecondName" :
                $searchParam = "secondName";
                break;
            case "LastName" :
                $searchParam = "lastName";
                break;
            default:
                break;
        }

        $.ajax({
            url: 'https://localhost:8081/Account/findByParameter',
            type: 'GET',
            headers: {
                'Authorization': token
            },
            crossDomain: true,
            crossOrigin: true,
            dataType: 'text',
            contentType: "application/json",
            data: {
                name: $searchParam,
                value: $searchContent
            },
            success: function (accounts) {
                $book.empty();
                $.each(JSON.parse(accounts), function (i, account) {
                    if (account.active === 1) {
                        addBook(account);
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);

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
