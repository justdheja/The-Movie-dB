function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
        type: "get",
        url: "http://omdbapi.com",
        data: {
            "apikey": "85365964",
            "s": $('#search-input').val()
        },
        dataType: "json",
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                    <div class="card mb-3">
                    <img class="card-img-top" src=`+ data.Poster +` alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">`+ data.Title +`</h5>
                        <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                        <a href="#" class="card-link" data-toggle="modal" data-target="#exampleModal >See Details</a>
                    </div>
                    </div>
                    </div>
                    `);
                });

                $('#search-input').val('');

            } else {
                $('#movie-list').html('<h1 class="text-center">' + result.Error + '</h1>')
            }
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (tomb) {
    if(tomb.which === 13){
        searchMovie();
    }
})