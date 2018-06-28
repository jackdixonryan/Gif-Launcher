
$(document).ready(function() { 


    var searchTerm;


    $("#search").on("click", function() {

        var newButton = $("<button>")

        //populates our search term value
        searchTerm = $("#search-term").val();

        //creates a new button
        //gives that button a secondary class, a value equal to the user's input, and appends it to the button area.
        newButton.attr("class", "btn btn-secondary pusher");
        newButton.attr("value", searchTerm);
        newButton.text(searchTerm);
        $("#button-area").append(newButton);

        //the button secondary function only works within the scope of the search click function. But it works a little too much.
    });



    //Took me a long time to crack this one.
    $(document).on("click", ".pusher", function() { 
        //Defining the query URL

        var value = $(this).attr("value");
        console.log(value);

        var queryUrl="https://api.giphy.com/v1/gifs/search?api_key=BRtgW6NwhmKRFKjXzlFJq70APNvyzuUy&q=" + value;

        //Ajax Call
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {

            //Appending the gif to the gif-area container.
            for (var i = 0; i < 10; i++) {

                var stillUrl = response.data[i].images.original_still.url;
                console.log(stillUrl);

                var movingUrl = response.data[i].images.original.url;
                console.log(movingUrl);


                var gifDiv = $("<div>");
                $(gifDiv).addClass("card");

                var gifTitle = $("<h4>");
                $(gifTitle).addClass("card-title");
                $(gifTitle).text(response.data[i].title);
                $(gifDiv).append(gifTitle);

                //defining the gif and adding the proper attributes to ensure that the user can click to play the gifs.
                var gif = $("<img>");
                gif.addClass("gif");
                gif.attr("src", stillUrl);
                gif.attr("alt", "gif");
                gif.attr("data-still", stillUrl);
                gif.attr("data-moving", movingUrl);


                $(gifDiv).append(gif);

                var gifRating = $("<p>");
                $(gifRating).addClass("card-text");
                $(gifRating).html("<b>Rated:</b> " + response.data[i].rating);
                $(gifDiv).append(gifRating);


                $("#gif-area").append(gifDiv);

            }

            $(document).on("click", ".gif", function() { 
                console.log("clicked");
                var stillSrc = $(this).attr("data-still");
                var movingSrc = $(this).attr("data-moving");

                var currentState = $(this).attr("src");

                if (currentState === stillSrc) {
                    $(this).attr("src", movingSrc);
                } else if (currentState === movingSrc) {
                    $(this).attr("src", stillSrc);
                }
            });

        });

    });

});




