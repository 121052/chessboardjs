[chessboard.js](http://chessboardjs.com) - Extended to support dark chess.
==================================================

What is chessboard.js?
--------------------------------------

chessboardjs is a standalone Javascript Chess Board. It is designed to be "just a board" and exposes a powerful API to be used in different ways. This version include support for representing dark chess as described at [chessvariants.com](http://www.chessvariants.com/incinf.dir/darkness.html).
This is found under the darkchess directory, including the integration of [chess.js](https://github.com/jhlywa/chess.js) which also support dark chess.

chess.js API
--------------------------------------

For the logic, instead of using `game.in_checkmate()` to check someone has
won the game, use `game.king_captured()`.
Another difference is retrieving the fen object. Specify true, to indicate
that it should return dark chess FEN.

```Javascript
var game = new Chess();

var onDragStart = function(source, piece, position, orientation) {
    if (game.king_captured() === true) {
        return false;
    }
};

var onSnapEnd = function() {
    var isDark = true;
    var fen = game.fen(isDark);
    board.position(fen);
};
```

chessboard.js API
---------------------------------------

To use dark chess, specify `darkMode` in the config object with the value `true`
as shown below. The default value is `false`.
This indicates the use of FEN version which include hidden squares.

```Javascript
var config = {
    darkMode: true,
    onDragStart: onDragStart,
    onSnapEnd: onSnapEnd
};

var board = ChessBoard('board', config);
```

License
--------------------------------------

chessboard.js is released under the [MIT License](https://github.com/oakmac/chessboardjs/blob/master/LICENSE).
