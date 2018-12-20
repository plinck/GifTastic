# GifTastic

### Overview

This app uses the GIPHY API to make a dynamic web page that populates with gifs of your choice. You create a button with a name of anyuthng you wish - amnimal, person, whatever.  It just gets 10 images from GIPHY and displays them with their rating.  The initial display of the image is static.  When you click an image, it animates.  When you click it again, it goes back to static.  It is mnobile responsive as well.

### Instructions

1. When the user clicks on a button, the page grabs 10 static, non-animated gif images from the GIPHY API and place them on the page.

2. When the user clicks one of the still GIPHY images, the gif animates. If the user clicks the gif again, it should stop playing.

3. Under every gif, display its rating (PG, G, so on).

4. You can type a name into the user input box, press add, and it will add another buttopn used to fetch GIFs.  You can use that button like any other on the page.

- - -

### To Do

1. Make it look a little better on mobile - i.e. bigger buttons and fonts

2. Create a 275x200 icon for the portfolio page

3. Allow users to request additional gifs to be added to the page.
   * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

4. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

5. Include a 1-click download button for each gif, this should work across device types.

6. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

7. Allow users to add their favorite gifs to a `favorites` section.
   * This should persist even when they select or add a new topic.
   * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).

- - -

## Linked my responsive portffolio and my bootstrap portfolio sites

I added a portfolio item to both my responsive and bootstrap portfolio.  Both of those have a portfolio item that links to this game.  Just click on the image to open up the game.  You can link to either of them by clicking the links below:

* [Responsvive Portfolio](https://plinck.github.io/Responsive-Portfolio/portfolio.html)
* [Bootstrap Portfolio](https://plinck.github.io/Bootstrap-Portfolio/portfolio.html)

- - -

## Bugs, known issues

* Make it look a little better - Colors and Design

### Notes

* I am using a functional programming approach in this assigment, although I much prefer an object oriented design and programming approach.  

- - -