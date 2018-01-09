//inital vars 

var authKey = "S9Gzk2GLWTqOauR5oOG3So9Ykhl1Z37a";
var animals = ["dog", "bear", "lion", "cat"];
var searchTerm;
var newAnimal;



//--------------------------------------functions  -
// create buttons 
function renderButtons() {
    for (var i = 0; i < animals.length; i++) {
        //adding attr to button
        var newButton = $("<button>").attr('data-animal', animals[i]);
        //show button text
        newButton.text(animals[i]);
        newButton.addClass("btn btn-lg animalBtn")
        $(".buttons").append(newButton);
    }
}

//playing-pausing function 
function gifState() {
    var state = $(this).attr("data-state");
    //check state
    if (state === "still") {
        // if still, animate
        $(this).attr("src", $(this).attr("data-animate"));
        //update state
        $(this).attr("data-state", "animate");
      } else {
        // if animated, still image
        $(this).attr("src", $(this).attr("data-still"));
        //update state
        $(this).attr("data-state", "still");
      }
}
// Ajax function 
function displayAnimal(){
        searchTerm = $(this).attr("data-animal");

    //set up query url
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=" + authKey + "&limit=12";

    //make api call
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .done(function(response){
        //generate image for each response
        var results = response.data;
        //empty results area
        $(".results").html("");
        for(var j = 0; j < results.length; j++) {
        //get still image for paused image
        var stillImage = results[j].images.fixed_width_still.url;
        //get gif for animated
        var animate = results[j].images.fixed_width.url;
        var gifImage =  $("<img>").attr("src", results[j].images.fixed_width_still.url, "data-state", "still").addClass("animalImg");
            gifImage.attr("data-state", "still");
            gifImage.attr("data-animate", animate);
            gifImage.attr("data-still", stillImage);

        var animalDiv = $("<div>").append(gifImage).addClass("col-sm-6 col-md-6 col-lg-4");
            animalDiv.append($("<p>").text(`Gif Rating: ${results[j].rating.toUpperCase()}`).addClass("rating"));
            $(".results").append(animalDiv);
        }

    })
}
//Begin App
renderButtons();

//listen for create button
$("#add-animal").on("click", function(){
    //retrieve user input
    newAnimal = $("#search-term").val().trim();
    //add to array
    animals.push(newAnimal)
    //remove original buttons
    $(".buttons").empty();
    //generate buttons
    renderButtons();
    //empty text field
    $("#search-term").val("");
})

//dynamic listen for click on .animalBTN for button rendering and api calling
$(document).on("click", ".animalBtn", displayAnimal);
//dynamic listen for click on .animalIMG for pause/play functionallity 
$(document).on("click", ".animalImg", gifState)

