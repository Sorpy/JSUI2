$(document).ready(function () {

    var $accounts = $('#accounts');
    var $tableContent = $('#table-content');
    var accountTemplate = $('#account-template').html();

    function addAccount(account) {
        $accounts.append(Mustache.render(accountTemplate,account))
    }

    try{
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
    } catch (e) {
        alert("Could not find a token")
    }

    $.ajax({
        url: 'https://localhost:8081/Account/listAll',
        headers:{
            'Authorization' : token
        },

        type: 'GET',
        dataType:'json',
        data: "",
        success: function (accounts) {
            $.each(accounts,function (i,account) {
                if (account.active ===1) {
                    addAccount(account);
                }
            });
        },
        error: function () {
            alert("could not load accounts");
        }
    });

    $accounts.delegate('.delete','click',function () {
        var $tr = $(this).closest('tr');
        $.ajax({
            url: 'https://localhost:8081/Account/delete/' + $(this).attr('data-id'),
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
                alert("could not load accounts");
            }
        });
    });

    $accounts.delegate('.edit','click',function () {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('token');
        var url = "/account-edit/" + $(this).attr('data-id') + "?token=" + myParam;
        return window.location = url;

    });

    $(".dropdown-menu li").on("click", function() {
        $('.dropdown-toggle').text($(this).text());
        $('.dropdown-menu').removeClass('open');
    });



    $('#search-button').submit(function (event) {
        event.preventDefault();

        searchByParam(token)
    });
    //
    // function searchByParam(token) {
    //
    //
    //     var $searchParam = $('#dropdownMenuButton').text();
    //     var $searchContent = $('#search-content').val();
    //
    //     $searchParam = $searchParam.replace(/\s/g, '');
    //
    //     switch ($searchParam) {
    //         case "FirstName" :
    //             $searchParam = "firstName";
    //             break;
    //         case "SecondName" :
    //             $searchParam = "secondName";
    //             break;
    //         case "LastName" :
    //             $searchParam = "lastName";
    //             break;
    //         default:
    //             break;
    //     }
    //
    //     $.ajax({
    //         url: 'http://localhost:8081/Account/findByParameter',
    //         type: 'GET',
    //         headers: {
    //             'Authorization': token
    //         },
    //         crossDomain: true,
    //         crossOrigin: true,
    //         dataType: 'text',
    //         contentType: "application/json",
    //         data: {
    //             name: $searchParam,
    //             value: $searchContent
    //         },
    //         success: function (accounts) {
    //             $accounts.find("tr:not(:first)").remove();
    //             $.each(JSON.parse(accounts), function (i, account) {
    //                 if (account.active === 1) {
    //                     addAccount(account);
    //                 }
    //             });
    //         },
    //         error: function (xhr, ajaxOptions, thrownError) {
    //             alert(xhr.responseText);
    //
    //         }
    //     });
    // }
    $("#search-content").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#accounts tr:not(:first)").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

