
//To later be value of user input & param in search function;

//just for the record
var searchTerm;

$("#search").click(function() {

    //populates our search term value
    searchTerm = $("#search-term").val();

    //creates a new button
    var newButton = $("<button>");

    //gives that button a secondary class, a value equal to the user's input, and appends it to the button area.
    newButton.attr("class", "btn btn-secondary");
    newButton.attr("value", searchTerm);
    newButton.text(searchTerm);
    $("#button-area").append(newButton);

    //the button secondary function only works within the scope of the search click function. But it works a little too much.
    $(".btn-secondary").on("click", function() { 

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
                for (var i = 0; i < 5; i++) {
                    var imageUrl = response.data[i].images.fixed_height_downsampled.url;
    
                    var gif = $("<img>");
                    gif.attr("src", imageUrl);
                    gif.attr("alt", "gif");
    
                    $("#gif-area").prepend(gif);
                }
            });
    });

});





