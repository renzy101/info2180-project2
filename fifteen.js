/**
 * Special feature implemented was visual notification for winning.
 */

window.onload = function()
{
    gameOn();
    $("#shufflebutton").click(shuffle);
};

//GLOBAL VARIABLES
var BOARD = []; //Array of puzzle pieces used to keep track of the empty tile.
var puzzlePieces; //Array of puzzle pieces.

/**
 * Function to arrange the tiles in puzzle spaces.
 * @param  {puzzlepiece} tile  represents a tile in the puzzle.
 * @param  {int} index represents the index where tile should be placed.
 */
function arrangeTiles(tile, index)
{
    positionX(tile, index);
    positionY(tile, index);

    tile.style.backgroundPosition = (400 - getY(index)) + "px" + " " + (400 - getX(index)) + "px";
}


/**
 * Function to layout the tiles in the puzzle in the correct order.
 */
function layoutBoard()
{
    puzzlePieces = $('#puzzlearea div');
    var idCounter = 0;
    puzzlePieces.each(function(index, element)
    {
        element.className = "puzzlepiece";
        element.id = idCounter;
        arrangeTiles(element, idCounter);
        BOARD[idCounter] = 1;
        idCounter++;
    });
    BOARD[15] = 0; // Empty tile.
}


/**
 * Moves a tile.
 * @param  {puzzlepiece} tile  represents a tile in the puzzle.
 * @param  {int} indexToMoveTo Index to move tile to.
 */
function move(tile, indexToMoveTo)
{
    positionX(tile, indexToMoveTo);
    positionY(tile, indexToMoveTo);

    BOARD[indexToMoveTo] = 1;
    BOARD[tile.id] = 0;
    tile.id = indexToMoveTo;
}


/**
 * Moves a tile and determine if game is won.
 * @param {puzzlepiece} tile  represents a tile in the puzzle.
 */
function makeMove(tile)
{
    puzzlePieces[tile].onclick = function()
    {
        var indexToMoveTo = movableTile(parseInt(puzzlePieces[tile].id));
        console.log("INDEX:" + indexToMoveTo); //FIXME
        if (indexToMoveTo != -1)
        {
            move(puzzlePieces[tile], indexToMoveTo);
            gameWon();
        }
    }
}


/**
 * Moves a random tile in empty position.
 * @param  {puzzlepiece} tile  represents a tile in the puzzle.
 */
function makeRandomMove(tile)
{
    console.log(tile);
    var indexToMoveTo = emptyTile();
    move(puzzlePieces[tile], indexToMoveTo);
}


/**
 * Shuffles the tiles on the board.
 */
function layoutBoardRandom()
{
    for (var n = 0; n < 1000; n++)
    {
        var i = Math.floor(Math.random() * 15);
        console.log("RANDOM: " +i);
        makeRandomMove(i);
        
    }
}


/**
 * Function to layout the tiles in the puzzle in random order and restores the state of the game page.
 */
function shuffle()
{
    layoutBoardRandom();
    document.body.style.backgroundColor = "white";
    var heading = $("#h1");
    heading.innerHTML = "CSE 190 M Fifteen Puzzle";

}


/**
 * Initiates the game.
 */
function gameOn()
{
    layoutBoard();
    for (var i = 0; i < 15; i++) //FIXME change to each loop
    {
        makeMove(i);
        onHover(i);
    }
}


/**
 * Highlights a movable.
 * @param  {int} i index of tile.
 */
function onHover(i)
{
    puzzlePieces[i].onmouseover = function()
    {
        var index = movableTile(parseInt(puzzlePieces[i].id));
        if (index != -1)
        {
            puzzlePieces[i].classList.add('movablepiece');
        }
        else
        {
            puzzlePieces[i].classList.remove('movablepiece');
        }
    }

}


/**
 * Returns Y position of tile.
 * @param  {tile} index index of tile
 */
function getY(index)
{

    return (index % 4) * 100;
}


/**
 * Returns X position of tile.
 * @param  {int} index index of tile
 */
function getX(index)
{
    return Math.floor(index / 4) * 100;
}


/**
 * Positions tile on the y axis.
 * @param  {puzzlepiece} tile  represents a tile in the puzzle.
 * @param  {int} index index of tile.
 */
function positionY(tile, index)
{
    tile.style.left = getY(index) + "px";
}


/**
 * Positions tile on the x axis.
 * @param  {puzzlepiece} tile  represents a tile in the puzzle.
 * @param  {int} index index of tile.
 */
function positionX(tile, index)
{
    tile.style.top = getX(index) + "px";

}


/**
 * Determines the index of the empty tile.
 * @return {[type]} [description]
 */
function emptyTile()
{
    for (var tilePosition = 0; tilePosition < 16; tilePosition++)
    {
        if (BOARD[tilePosition] === 0)
        {
            return tilePosition;
        }
    }
}


/**
 * Determines is tile is movable.
 * @param  {int} tilePosition index of the tile.
 */
function movableTile(tilePosition)
{
    var emptyTilePosition = emptyTile();
    if ((tilePosition % 4 !== 0 && tilePosition - 1 === emptyTilePosition) ||
        (tilePosition % 4 !== 3 && tilePosition + 1 === emptyTilePosition) ||
        (tilePosition + 4 === emptyTilePosition) || (tilePosition - 4 === emptyTilePosition))
    {
        return emptyTilePosition;
    }
    return -1;
}


/**
 * Determines if game has been won.
 */
function gameWon()
{
    for (var i = 0; i < puzzlePieces.length; i++)
    {
        if (parseInt(puzzlePieces[i].id) !== i)
        {
            i--;
            break;
        }
    }
    if (i === 15)
    {
        document.body.style.backgroundColor = "green";
        var heading = $('#h1');
        heading.innerHTML = "You Win";
    }
}