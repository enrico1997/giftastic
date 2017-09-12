// Initial array of Harry Potter objects
var harryObjects = ["Harry Potter", "Chocolate Frog", "Azkaban", "Hermione Granger", "Draco Malfoy", "Ginny Weasley", "Slytherin", "Platform 9 3/4"];

// displayGiphyInfo function re-renders the HTML to display the appropriate content
function displayGiphyInfo() {
  var giphy = $(this).attr("data-name");
  // queryURL for Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=914b704852054f13af2d496c8de8b17e&q=" + giphy + "&limit=10&offset=0&rating=PG-13&lang=en";
  console.log("queryURL: " + queryURL);

  // Creating an AJAX call for the specific button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);

    for (var i = 0; i < 10; i++) {
      // Creating a div to hold the giphys
      var giphyDiv = $("<div class='giphy'>");

      // Storing the rating data
      var rating = response.data[i].rating.toUpperCase();

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      giphyDiv.append(pOne);

      // Retrieving the still and animated URLs for the image
      var stillImgURL = response.data[i].images.fixed_width_still.url;
      var animatedImgURL = response.data[i].images.fixed_width.url;

      // Creating an element to hold the image
      var stillImage = $("<img>").attr("src", stillImgURL).attr("id", "stillPic");
      var animatedImage = $("<img>").attr("src", animatedImgURL).attr("id", "movePic");

      giphyDiv.append(stillImage);
      
      // Appending the images
      $(this).on("click", "#stillPic", function(){
       if($(this).attr('id') === "stillPic")
       {
         giphyDiv.append(animatedImage);
       }else{
         giphyDiv.append(stillImage);
       }}
      );

      //$(document).on("click", "#stillPic", stillPicFunction());
 
      // Putting images of the clicked item
      $("#giphy-view").prepend(giphyDiv);
    };
  });
  // Clears chosen items on screen for next set
  $("#giphy-view").empty();
}

// Function for displaying buttons
function renderButtons() {
  // Deleting the images prior to adding new images
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of harryObjects
  for (var i = 0; i < harryObjects.length; i++) {
    // Then dynamicaly generating buttons for each giphy in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>")
      .addClass ('btn btn-primary')
    ;
    // Adding a class of giphy to our button
    a.addClass("giphy");
    // Adding a data-attribute
    a.attr("data-name", harryObjects[i]);
    // Providing the initial button text
    a.text(harryObjects[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a button is clicked
$("#add-button").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var giphy = $("#harry-input").val().trim();

  // Adding entry in textbox to the array
  harryObjects.push(giphy);

  // Calling renderButtons which handles the processing of the array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "giphy"
$(document).on("click", ".giphy", displayGiphyInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();