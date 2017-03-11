$(document).ready(function(){

var topics = ["music", "dogs", "fail", "will ferrell"];


function renderButtons() {

//this empties array (topics) so that new elements can be added
  $("#gif-view").empty();

// Looping through the array of Gifs

  for (var i = 0; i < topics.length; i++) {
  
// adds buttons from the topics array  

  var a = $("<button>");

// Adding a class of gif to our button
      a.addClass("gif btn btn-info");
  // Adding a data-attribute
      a.attr("data-name", topics[i]);
  // Providing the initial button text
      a.text(topics[i]);
  // Adding the button to the HTML
      $("#gif-view").append(a);
        }
}

// This function handles events where one button is clicked

$("#add-gif").on("click", function(event) {
        
  event.preventDefault();

// This line grabs the input from the textbox
  var gif = $("#gif-input").val().trim();

  if (gif == ""){
  alert("You must enter a value");
  }
  else {
// Adding the gif from the textbox to our array
    topics.push(gif);
  }

// Calling renderButtons which handles the processing of our gif topics array
        renderButtons();
      });

// grabs the class of gif and returns the user input with the correct gif //
$(document).on("click", ".gif", function(){
// remove prior gifs // 
    $(".view").empty();
        // We build out our URL // 
    var gifName = $(this).attr("data-name");
    console.log(gifName);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ gifName + "&api_key=dc6zaTOxFJmzC&limit=10";

// Make a request // 
  $.ajax({
    url: queryURL,
    method: 'GET'
    }).done(function(response) {

//create variable to hold our results //
    var results = response.data;
    console.log(response.data[0].images);
// loop through our results //
  for (var i = 0; i < results.length; i++) {
// assign variable to gif url //  
    var animated = results[i].images.fixed_height.url;
    var still = results[i].images.fixed_height_still.url;
// create image // 
    var gifImage = $("<img>");

          gifImage.addClass("giphys");
          gifImage.attr('src', still);
          gifImage.attr('data-still', still);
          gifImage.attr('data-animated', animated);
          gifImage.attr('data-state', "still");

          $(".view").append(gifImage);
        }

      }); 

  }); 
        // click function for giphy images // 
$(document).on("click", ".giphys", function(){
  var state = $(this).attr('data-state');
  console.log(this);
    if (state == "still"){
      $(this).attr('src', $(this).attr('data-animated'));
      $(this).attr('data-state', "animated");
    }
    else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', "still");
          }

      }); 
      
      renderButtons();

});//document.ready close






