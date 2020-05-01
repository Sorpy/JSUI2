$(document).ready(function () {

    var $genre= $('#genre-combo');
    var $genreTemplate = $('#genre-template').html();
    var $genreList = $('#genre-table');
    var $genreListTemplate = $('#genre-list-template').html();

    var $department = $('#department-combo');
    var $departmentTemplate = $('#department-template').html();
    var $departmentList = $('#department-table');
    var $departmentListTemplate = $('#department-list-template').html();

    var $author = $('#author-combo');
    var $authorTemplate = $('#author-template').html();
    var $authorList = $('#author-table');
    var $authorListTemplate = $('#author-list-template').html();

    function addGenre(genre) {
        $genre.append(Mustache.render($genreTemplate,genre))
    }

    function addDepartment(department) {
        $department.append(Mustache.render($departmentTemplate,department))
    }

    function addAuthor(author) {
        $author.append(Mustache.render($authorTemplate,author))
    }

    function addGenreList(genre) {
       $genreList.append(Mustache.render($genreListTemplate,genre))
    }

    function addAuthorList(book) {
        $authorList.append(Mustache.render($authorListTemplate,book))
    }

    function addBookList(book) {
        $('#book-table').append(Mustache.render($('#book-template').html(),book))
    }

    function addDepartmentList(book) {
        $departmentList.append(Mustache.render($departmentListTemplate,book))
    }

    try{
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
    } catch (e) {
        alert("Could not find a token")
    }


    $.ajax({
        url: 'https://localhost:8081/Genre/listAll',
        headers:{
            'Authorization' : token
        },

        type: 'GET',
        dataType:'json',
        data: "",
        success: function (genres) {
            $genre.append("<option value=other >Other</option>");
            $.each(genres,function (i,genre) {
                if (genre.active ===1) {
                    addGenre(genre);
                }
            });

        },
        error: function () {
            alert("could not load books");
        }
    });

    $.ajax({
        url: 'https://localhost:8081/Department/listAll',
        headers:{
            'Authorization' : token
        },

        type: 'GET',
        dataType:'json',
        data: "",
        success: function (departments) {
            $department.append("<option value=other >Other</option>");
            $.each(departments,function (i,department) {
                if (department.active ===1) {
                    addDepartment(department);
                }
            });

        },
        error: function () {
            alert("could not load books");
        }
    });

    $.ajax({
        url: 'https://localhost:8081/Author/listAll',
        headers:{
            'Authorization' : token
        },

        type: 'GET',
        dataType:'json',
        data: "",
        success: function (authors) {
            $author.append("<option value=other >Other</option>");
            $.each(authors,function (i,author) {
                if (author.active ===1) {
                    addAuthor(author);

                }
            });

        },
        error: function () {
            alert("could not load books");
        }
    });



    $author.change(function () {
        if ($author.val()==="other"){
            $('#author-input-box').fadeIn();
        }
        else{
            $('#author-input-box').fadeOut();
        }
    });

    $department.change(function () {
        if ($department.val()==="other"){
            $('#department-input-box').fadeIn();
        }
        else{
            $('#department-input-box').fadeOut();
        }
    });

    $genre.change(function () {
        if ($genre.val()==="other"){
            $('#genre-input-box').fadeIn();
        }
        else{
            $('#genre-input-box').fadeOut();
        }
    });

    $('#genre-input-box').delegate('.add-new','click',function () {
        var newGenre = {
            name: $('#genre-input').val(),
            code: "KK"
        };
        $.ajax({
            url: 'https://localhost:8081/Genre/create',
            headers:{
                'Authorization' : token
            },
            contentType: "application/json",
            type: 'POST',
            crossDomain:true,
            crossOrigin:true,
            data:JSON.stringify(newGenre),
            success: function (genre) {
                addGenre(genre);
                addGenreList(genre);
                $('#genre-input-box').fadeOut();
            },
            error: function () {
                alert("An error has occurred");
            }
        });
    });

    $('#department-input-box').delegate('.add-new','click',function () {
        var newDepartment = {
            name: $('#department-input').val(),

        };
        $.ajax({
            url: 'https://localhost:8081/Department/create',
            headers:{
                'Authorization' : token
            },
            contentType: "application/json",
            type: 'POST',
            crossDomain:true,
            crossOrigin:true,
            data:JSON.stringify(newDepartment),
            success: function (department) {
                addDepartment(department);
                addDepartmentList(department);
                $('#department-input-box').fadeOut();
            },
            error: function () {
                alert("An error has occurred");
            }
        });
    });

    $('#author-input-box').delegate('.add-new','click',function () {
        var newAuthor = {
            authorName: $('#author-input').val(),

        };
        $.ajax({
            url: 'https://localhost:8081/Author/create',
            headers:{
                'Authorization' : token
            },
            contentType: "application/json",
            type: 'POST',
            crossDomain:true,
            crossOrigin:true,
            data:JSON.stringify(newAuthor),
            success: function (author) {
                addAuthor(author);
                addAuthorList(author);
                $('#author-input-box').fadeOut();

            },
            error: function () {
                alert("An error has occurred");
            }
        });
    });
    $.ajax({
        url: 'https://localhost:8081/Genre/listAll',
        headers:{
            'Authorization' : token
        },

        type: 'GET',
        dataType:'json',
        data: "",
        success: function (genres) {
            $.each(genres,function (i,genre) {
                    addGenreList(genre);
            });
        },
        error: function () {
            alert("could not load books");
        }
    });

    $.ajax({
        url: 'https://localhost:8081/Department/listAll',
        headers:{
            'Authorization' : token
        },

        type: 'GET',
        dataType:'json',
        data: "",
        success: function (departments) {
            $.each(departments,function (i,department) {
                    addDepartmentList(department);
            });
        },
        error: function () {
            alert("could not load books");
        }
    });

    $.ajax({
        url: 'https://localhost:8081/Author/listAll',
        headers:{
            'Authorization' : token
        },

        type: 'GET',
        dataType:'json',
        data: "",
        success: function (authors) {
            $.each(authors,function (i,author) {
                    addAuthorList(author);
            });
        },
        error: function () {
            alert("could not load books");
        }
    });


    $('.entity-nav').delegate('.list-option','click', function(){
        $('.list-entity').hide();
        $(this.getAttribute('href')).show()
    });

    $('.add-book').delegate('#add-book-btn','click',function () {
        var $title = $('#title').val();
        var $author = $('#author-combo').val();
        var $department = $('#department-combo').val();
        var $genre = $('#genre-combo').val();
        var $price = $('#price').val();
        var $year = $('#year').val();
        var newBook={
            title: $title,
            authorId:$author,
            departmentId:$department,
            genreId:$genre,
            price:$price,
            year:$year,
            bookStatusId:"2"
        };
        $.ajax({
            url: 'https://localhost:8081/Book/create',
            headers:{
                'Authorization' : token
            },
            contentType: "application/json",
            type: 'POST',
            crossDomain:true,
            crossOrigin:true,
            data:JSON.stringify(newBook),
            success: function (author) {
                addBookList(author);
                $('#author-input-box').fadeOut();

            },
            error: function () {
                alert("An error has occurred");
            }
        });
    });
    $genreList.delegate('.delete','click',function () {
        var $tr = $(this).closest('tr');
        $.ajax({
            url: 'https://localhost:8081/Genre/delete/' + $(this).attr('data-id'),
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
    $departmentList.delegate('.delete','click',function () {
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
    $('#book-table').delegate('.delete','click',function () {
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
                alert("could not load accounts");
            }
        });
    });
    $authorList.delegate('.delete','click',function () {
        var $tr = $(this).closest('tr');
        $.ajax({
            url: 'https://localhost:8081/Author/delete/' + $(this).attr('data-id'),
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
});