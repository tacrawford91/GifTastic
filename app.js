//inital vars 

var authKey = "S9Gzk2GLWTqOauR5oOG3So9Ykhl1Z37a";
var animals = ["dog", "bear", "lion", "cat"];
var searchTerm;
var newAnimal;

//Begin App

//Create Intial Buttons - 

function renderButtons() {
    for (var i = 0; i < animals.length; i++) {
        var newButton = $("<button>").attr('data-animal', animals[i]);
        newButton.text(animals[i]);
        newButton.addClass("btn btn-lg animalBtn")
        $(".buttons").append(newButton);
    }
}

renderButtons();

// listen for button click
function displayAnimal(){
        searchTerm = $(this).attr("data-animal");
        console.log("the serach term is " + searchTerm)

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
        var stillImage = results[j].images.fixed_width_still.url;
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

$(document).on("click", ".animalBtn", displayAnimal);




//playing- pausing gifs
function gifState() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        console.log("clicked animal div");
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        console.log("clicked animal div");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}
$(document).on("click", ".animalImg", gifState)

