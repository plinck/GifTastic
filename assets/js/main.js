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

// Initial array of topics
var topics = ["Giraffe", "Einstein", "Stock Market"];

// Initial array of favorites
var favs = [];

// Helper functiion for AJAX calls
function httpGet(requestURL, aCallback) {

    // I had to use the JSONP method since the one used in class caused CORS issues
    $.ajax({
        url: requestURL,
        method: 'GET',
        dataType: 'JSON',
        success: function (result) {
            console.log(result);
            aCallback(result.data);
        },
        error: function (err) {
            console.log('error:' + err);
            errorRender(err);
        }
    });
}

// Get GIFs based on name passed
function getGIPHYs(animal) {
    var requestURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&limit=${maxNbrGifs}&rating=${ratingFilter}&api_key=dc6zaTOxFJmzC&limit=10`;

    // Use helper function for AJAX
    httpGet(requestURL, function (data) {
        gifsRender(data);
    });
}

// Display GIFs retrieved
function gifsRender(gifs) {
    $(".articles").empty();

    for (var i in gifs) {
        let cardDiv = cardRender(gifs[i]);

        $(".articles").append(cardDiv);
    }
}

// Render all favorite GIFs
function favoritesRender() {
    $(".favorites").empty();

    for (var i in favs) {
        // format URL for getting single GIF by saved ID
        var requestURL = `https://api.giphy.com/v1/gifs/${favs[i]}?api_key=dc6zaTOxFJmzC`;
        // Use helper function for AJAX
        httpGet(requestURL, function (data) {
            let cardDiv = cardRender(data);
            $(".favorites").append(cardDiv);
        });
    }
}

// Render HTML for a single GIF Card
function cardRender(gif) {
    let cardDiv = "";
    let caption = "Animal Image";
    let gif_id = gif.id;

    cardDiv += `<div class="articleCard card">`;
    cardDiv += `<div class="cardHeader articleHeadline">Rating:${gif.rating} `;
    cardDiv += `<a href="${gif.images.fixed_height_still.url}" download>(still)</a>`;
    cardDiv += `<button class="saveFavorite" data-gifId="${gif_id}">(fav)</button>`;
    cardDiv += `</div>`;
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
    for (var i in topics) {
        var btn = $("<button>");
        btn.addClass("animal");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(btn);
    }
}

// Save Favorites
function favoritesSave(favorites) {
    // Check browser support
    if (typeof (Storage) !== "undefined") {
        // Store
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
}

// Save Favorites
function favoritesGet() {
    // Check browser support
    if (typeof (Storage) !== "undefined") {
        // Store
        return JSON.parse(localStorage.getItem("favorites"));
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
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
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#topic-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        buttonsRender();

    });

    // Swap the GIFs from still to animated
    $(document.body).on("click", ".articleImage", function () {
        let state = $(this).attr("data-state");

        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Save favorite
    $(document.body).on("click", ".saveFavorite", function () {

        // Get the gif id of the button from its data attribute
        let gif_id = $(this).attr("data-gifId");

        favs.push(gif_id);
        favoritesSave(favs);

        // rencer the favorites
        favoritesRender();

    });

    // START
    favs = favoritesGet();
    if (favs.length > 0) {
        favoritesRender();
    }

}); // (document).ready