const tilesContainer = document.querySelector(".tile-container");
const colors = ["greenyellow", "lightcoral", "darkslateblue", "goldenrod", "mintcream", "darkorchid", "orangered", "plum"];

// to create array of duplicate colors will use the spread operator
const colorList = [...colors, ...colors];
// checking to make sure colors appear twice
// console.log(colorsList);

//reference for the number of tiles we have in a constant so we can loop
const tileCount = colorList.length;

//Current state of the game
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;


//Create a new tile element and return in to the creating tiles loop
function createTile(color) {
    const tileElement = document.createElement("div");
//Set the class to "tile" and add a data attribute equal to the color assigned so we can test for match later
    tileElement.classList.add("tile");
    tileElement.setAttribute("data-color", color);
//Need this attribute to prevent from clicking on a revealed matched tile 
    tileElement.setAttribute("data-revealed", "false");

    tileElement.addEventListener("click", () => {
//This is going to prevent the user from clicking on revealing another tile while waiting for the tiles to turn over if they got the match wrong 
        const revealed = tileElement.getAttribute("data-revealed");

        if (awaitingEndOfMove
//This resets it if you have a match and click on one of the revealed tiles 
            || revealed === "true"
//This does not allow you to click on a revealed tile and match it with itself           
            || tileElement === activeTile) {
            return;
        }

        tileElement.style.backgroundColor = color;

        if (!activeTile) {
            activeTile = tileElement;
            return; //to cancel the function after we have an active tile
        }

        const colorToMatch = activeTile.getAttribute("data-color")

        if (colorToMatch === color) {
            tileElement.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");
            
            awaitingEndOfMove = false;
            activeTile = null;
            revealedCount += 2;

            setTimeout (() => {
                if (revealedCount === tileCount) {
                alert("YOU WIN!!!! Refresh to play again.");
            }
        }, 500)

            return;
        }

//If we are not awaiting end of move and there is an active tile now we need to check if it matches 

        awaitingEndOfMove = true;

        setTimeout(() => {
            tileElement.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;
            
// The awaitingEndOfMove & activeTile variable are still set so we need to clear them
            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);

    });

    return tileElement;
}

//Creating the tiles
for (let i=0; i<tileCount; i++) {
    const colorIndex = Math.floor(Math.random() * colorList.length);
    const color = colorList[colorIndex];
    const tile = createTile(color);
//We don't want a color to be picked more than twice
    colorList.splice(colorIndex, 1);
//Check to see that now more than 2 of each color is printed    
//  console.log(color);
//Append the tile to the container
    tilesContainer.appendChild(tile);
}

