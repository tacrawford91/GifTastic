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
        searchTerm + "&api_key=" + authKey + "&limit=10";

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
        var gifImage =  $("<img>").attr("src", results[j].images.fixed_width.url)
            $(".results").append(gifImage);
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
//User input and create new button


