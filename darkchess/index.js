$(document).ready(function() {

    var game = new Chess();

    var onDragStart = function(source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };

    var onDrop = function(source, target) {
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';
        updateStatus();
    };

    var onSnapEnd = function() {
        board.position(game.fen());
    };

    var updateStatus = function() {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') moveColor = 'Black';

        if (game.in_checkmate() === true) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        } else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        } else {
            status = moveColor + ' to move';

            if (game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }

        //statusElement.html(status);
    };

    var config = {
        darkMode: true,
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };

    var board = ChessBoard('board', config);
});
