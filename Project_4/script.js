var xWins = 0;  //stores X win count
var oWins = 0;  //stores O win count

$(function () {

    var squares = [], 
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    startNewGame = function () {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {square.html(EMPTY);});
    },

    /*
     * Returns whether the given score is a winning score.
     */
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {
        
        if ($(this).html() !== EMPTY) {
            return;
        }
        if (turn == "X") {  //changes X and O display color
            $(this).html(turn.fontcolor("red")); 
        } else {  
            $(this).html(turn.fontcolor("blue"));
        }
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);
        if (win(score[turn])) {
            $("#message").text("Good Job " + turn + "... " + "You win! Play again!").css({//displays game winner
                    "color": "yellow"
                });
            if (turn === "X") {  //animates and changes X score
                xWins++;  
                $("#xScore").text(xWins + " = X"); 
                $("header").css({
                    "border": "8px double red" // changes border to red on X win
                });
                var count = 6;
                var i = 0;
                for (i = 0; i < count; i++) // X score fades in out out briefly 
                    {
                        $("#xScore").fadeOut(100).delay(100);
                        $("#xScore").fadeIn(100).delay(100);
                    }
            } else {  //animates and changes O score
                oWins++;  
                $("#oScore").text("O = " + oWins);  
                $("header").css({
                    "border": "8px double blue" // changes border to blue on O win
                });
                var count = 6;
                var i = 0;
                for (i = 0; i < count; i++) // O score fades in out out briefly 
                    {
                        $("#oScore").fadeOut(100).delay(100);
                        $("#oScore").fadeIn(100).delay(100);
                    }
            }
            startNewGame();
        } else if (moves === SIZE * SIZE) {
            $("#message").text("Cat's game! Play again!").css({ //displays cats game message
                    "color": "yellow"//change
                });
            $("header").css({
                    "border": "8px double yellow" // changes border to blue on O win
                });
            startNewGame();
        } else { // displays whos turn it is
            turn = turn === "X" ? "O" : "X";
            if (turn === "X") { 
                $("#message").text("Go " + turn + "... " + "It's your turn!").css({
                    "color": "red"
                });
            } else {     
                $("#message").text("Go " + turn + "... " + "It's your turn!").css({
                    "color": "blue"
                });
            }
        }
    },

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=150 width=150 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    play();
});

//styling for html
$("html").css({ 
  "background": "black no-repeat center center fixed", 
  "background-size": "cover"
});

//styling for header container
$("#header_container").css({
   "background-color": "black" 
});

//styling for header
$("header").css({
    "font-size": "500%",
    "background-color": "lightgrey",
    "border": "8px double green",
    "margin": "0% 0%",
    "text-shadow": "-10px 10px 3px red, -10px -10px 3px green"
});

//styling for instruction
$("#instruction").css({
    "color": "white",
    "text-align": "center",
    "background-color": "black"
});

//styling for message
$("#message").css({
    "font-size": "350%"
});

//styling for score container
$("#score_container").css({
    "text-align": "center",
    "background-color": "black"
});

//styling for score label
$("#score_label").css({
    "font-size": "325%",
    "color": "yellow"
});

//styling for game row
$("#game_row").css({
    "background": "linear-gradient(black, green)"
});

//styling for tic tac toe game
$("#tictactoe").css({
    "font-size": "75pt",
    "color": "red"
});

//styling for footer
$("#footer").css({
    "color": "white",
    "background": "black",
    "text-align": "center"
});

//styling for music
$("#music").css({
    "text-align": "center",
    "background-color": "black",
    "border": "4px solid black",
    "margin": "0 auto",
    "display": "block",
    "width": "100%"
});
