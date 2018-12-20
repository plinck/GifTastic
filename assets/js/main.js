/* **********************************************************************************
 * Main Program - 
 ********************************************************************************** */
// Use strict to keep things sane and not crapp code
"use strict";
/*global $:false, jQuery:false */
/*global document:false */
/*global console:false */
/*global alert:false */

// API Key for NYT article search
const APIKEY = "7ea61b540c7c42c0beeec1cea9ccb3d5";
const maxNbrGifs = 10;
const ratingFilter = "pg";

// Initial array of Animals
var animals = ["Dog", "Cat", "Giraff"];


function getGIPHYs(animal) {
    var requestURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&limit=${maxNbrGifs}&rating=${ratingFilter}&api_key=dc6zaTOxFJmzC&limit=10`;

    console.log(`Request: ${requestURL}`);

    // I had to use the JSONP method since the one used in class caused CORS issues
    $.ajax({
        url: requestURL,
        method: 'GET',
        dataType: 'JSON',
        success: function (result) {
            console.log(result);
            gifRender(result.data);
        },
        error: function (err) {
            console.log('error:' + err);
            errorRender(err);
        }
    });
}

// Display GIFs retrieved
function gifRender(gifs) {
    $(".articles").empty();

    for (var i in gifs) {
        let cardDiv = cardRender(gifs[i]);

        $(".articles").append(cardDiv);
    }


}

// Render HTML for a single GIF Card
function cardRender(gif) {
    let cardDiv = "";
    let caption = "Animal Image";
    console.log(gif.images.fixed_height.url);

    cardDiv += `<div class="articleCard card">`;
    cardDiv += `<div class="cardHeader articleHeadline">Rating: ${gif.rating}</div>`;
    cardDiv += `<div class="cardBody">`;
    cardDiv += `<img class="articleImage" src="${gif.images.fixed_height_still.url}" `;
    cardDiv += `data-still="${gif.images.fixed_height_still.url}" `;
    cardDiv += `data-animate="${gif.images.fixed_height.url}" `;
    cardDiv += `data-state="still" alt="${caption}">`;
    cardDiv += `</img>`;
    cardDiv += `</div>`;
    cardDiv += `</div>`;

    return cardDiv;
}

// handle errors when retrieving GIFs
function errorRender(err) {
    console.log(`Error: ${err.statusText}`);
    alert(`Error: ${err.statusText}`);

    $("#errorMessage").html(`${err.statusText}`);
}

// Render button that allows you to get a bunch of GIFs
function buttonsRender() {
    $("#buttons-view").empty();

    // Loops through the array of buttons
    for (var i in animals) {
        var btn = $("<button>");
        btn.addClass("animal");
        btn.attr("data-name", animals[i]);
        btn.text(animals[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(btn);
    }
}

// Wait for doc to be ready
$(document).ready(function () {
    buttonsRender();

    $("#buttons-view").on("click", "button", function () {
        // make it so page does not refeesh when form submits
        event.preventDefault();

        getGIPHYs($(this).attr("data-name"));

    });

    // Wait for button click to display GIFs
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        buttonsRender();

    });

    // Swap the GIFs from still to animated
    $(".articles").on("click", ".articleImage", function () {
        let state = $(this).attr("data-state");
  
        if (state == "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else if (state == "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

    });


});