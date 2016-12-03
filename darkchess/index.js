$(document).ready(function() {

    var game = new Chess();

    var onDragStart = function(source, piece, position, orientation) {
        console.group('On Move');
        if (game.game_over() === true) {
            console.log('GAME OVER?');
            return false;
        }
    };

    var onDrop = function(source, target) {

        var move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });
        console.groupEnd();

        if (move === null) return 'snapback';
        updateStatus();
    };

    var onSnapEnd = function() {
        var isDark = true;
        var fen = game.fen(isDark);
        board.position(fen);
    };

    var updateStatus = function() {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') moveColor = 'Black';

        if (game.king_captured() === true) {
            status = 'Game over, ' + moveColor + ' lost its king!';
        } else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        } else {
            status = moveColor + ' to move';

            if (game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }

        var statusElement = $('#status');
        statusElement.html(status);
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
