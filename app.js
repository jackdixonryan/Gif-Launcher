
$(document).ready(function() { 

    //An array of predefined topics
    var topics = ["World Cup", "Gullfoss", "Iceland", "Galaxy", "Sorting Algorithm"];

    //Quick for loop to render these items as buttons.
    for (var j = 0; j < topics.length; j++) {
        pageLoadButton = $("<button>");

        pageLoadButton.attr("class", "btn btn-secondary pusher");
        $(pageLoadButton).css("margin", "10px");
        pageLoadButton.attr("value", topics[j]);
        pageLoadButton.text(topics[j]);
        $("#button-area").append(pageLoadButton);
    }

    //Defining the search term variable.
    var searchTerm;

    //An onclick for the large search button.
    $("#search").on("click", function() {

        var newButton = $("<button>")

        //populates our search term value
        searchTerm = $("#search-term").val();
        console.log(searchTerm);


        //creates a new button
        //gives that button a secondary class, a value equal to the user's input, and appends it to the button area.
        newButton.attr("class", "btn btn-secondary pusher");

        //Just a bit of fun. If the user fails to enter any kind of value, some stuff happens.
        if ($("#search-term").val() === "") {
            $(newButton).attr("value", "ERROR");
            $(newButton).attr("class", "btn btn-warning pusher");
            $(newButton).text("!?!?");
        ///Now we can proceed normally by populating each button with their value.
         } else {
            $(newButton).attr("value", searchTerm);
            newButton.text(searchTerm);
        }
        $("#button-area").append(newButton);
        
        //Empties the search field when the user presses the button.
        $("#search-term").val("");
        
    });

    //A click function written for items created in the js file above.
    $(document).on("click", ".pusher", function() { 
        
        //Using the value from the buttons created above...
        var value = $(this).attr("value");

        //To create a search term for the API, replete with key and needing only the value of the button to function.
        var queryUrl="https://api.giphy.com/v1/gifs/search?api_key=BRtgW6NwhmKRFKjXzlFJq70APNvyzuUy&q=" + value;

        //Ajax Call
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {

            //Adding an area for the gifs.
            var gifArea = $("<div>");
            $(gifArea).addClass("container-fluid");

            //To limit the number of search results, using a generic for loop.
            for (var i = 0; i < 10; i++) {

                //Defining both our still and moving urls so users can play and pause gifs.
                var stillUrl = response.data[i].images.original_still.url;

                var movingUrl = response.data[i].images.original.url;

                //Preparing to nest the gif in a Bootstrap card.
                var gifDiv = $("<div>");
                $(gifDiv).addClass("card");

                //Building the card.
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

                //Finishing the card
                var gifRating = $("<p>");
                $(gifRating).addClass("card-text");
                $(gifRating).html("<b>Rated:</b> " + response.data[i].rating);
                $(gifDiv).append(gifRating);

                //Adding a download button.
                var gifDownload = $("<a>");
                $(gifDownload).attr("href", movingUrl);
                $(gifDownload).attr("download", response.data[i].title);
                $(gifDownload).addClass("btn btn-success");

                //Adding a download symbol to the download button.
                var downloadSymbol = $("<i>");
                $(downloadSymbol).addClass("fa fa-arrow-down");
                $(gifDownload).append(downloadSymbol);
                $(gifDiv).append(gifDownload);

                //And, at long last, appending the entire card to the div section of the DOM. 
                $(gifArea).append(gifDiv);
                $("#main-container").html(gifArea);

            }

        });

    });

    //This final click function allows users to click the gifs and play or pause them.
    $(document).on("click", ".gif", function() { 
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




