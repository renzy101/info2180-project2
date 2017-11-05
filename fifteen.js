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
    posX(tile, index);
    posY(tile, index);

    tile.style.backgroundPosition = (400 - getY(index)) + "px" + " " + (400 - getX(index)) + "px";
}


/**
 * Function to layout the tiles in the puzzle in the correct order.
 */
function arrangePuzzle()
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
    posX(tile, indexToMoveTo);
    posY(tile, indexToMoveTo);

    BOARD[indexToMoveTo] = 1;
    BOARD[tile.id] = 0;
    tile.id = indexToMoveTo;
}


/**
 * Moves a tile and determine if game is won.
 * @param {puzzlepiece} tile  represents a tile in the puzzle.
 */
function moveTile(tile)
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
function arrangePuzzleRandom()
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
    arrangePuzzleRandom();
    document.body.style.backgroundColor = "white";
    var heading = $("#h1");
    heading.innerHTML = "Fifteen Puzzle";

}


/**
 * Initiates the game.
 */
function gameOn()
{
    arrangePuzzle();
    for (var i = 0; i < 15; i++) //FIXME change to each loop
    {
        moveTile(i);
        hover(i);
    }
}


/**
 * Highlights a movable.
 * @param  {int} i index of tile.
 */
function hover(i)
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
function posY(tile, index)
{
    tile.style.left = getY(index) + "px";
}


/**
 * Positions tile on the x axis.
 * @param  {puzzlepiece} tile  represents a tile in the puzzle.
 * @param  {int} index index of tile.
 */
function posX(tile, index)
{
    tile.style.top = getX(index) + "px";

}


/**
 * Determines the index of the empty tile.
 * @return {[type]} [description]
 */
function emptyTile()
{
    for (var tilePos = 0; tilePos < 16; tilePos++)
    {
        if (BOARD[tilePos] === 0)
        {
            return tilePos;
        }
    }
}


/**
 * Determines is tile is movable.
 * @param  {int} tilePos index of the tile.
 */
function movableTile(tilePos)
{
    var emptytilePos = emptyTile();
    if ((tilePos % 4 !== 0 && tilePos - 1 === emptytilePos) ||
        (tilePos % 4 !== 3 && tilePos + 1 === emptytilePos) ||
        (tilePos + 4 === emptytilePos) || (tilePos - 4 === emptytilePos))
    {
        return emptytilePos;
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