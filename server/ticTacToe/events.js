const mongoose = require('mongoose'),
      ticTacToe = mongoose.model('TTT');
var didWin = require('./didWin');
var hasMove = require('./hasMove');

function updateBoard(board, row, col, pice) {
    let newBoard = board.map(row => [...row])
    newBoard[row][col] = pice;
    return newBoard;
}

function getGame(gameId) {
    return ticTacToe.findOne({ _id: gameId })
        .catch(console.error);
}

exports.onInit = function onInit(data, io) {
    console.log('TTT init', data);
    return getGame(data['gameId'])
    .then(game => io.emit('tictactoe', {game: game} ));
}

exports.onMove = function onMove(data, io) {
    console.log('TTT move', data);
    return getGame(data['gameId'])
        .then(game => {
            let [p1, p2] = game.players;
            let isP1 = p1.username == data['username'];
            let pice = isP1 ? 'X' : 'O';

            game.turn = isP1 ? p2.username : p1.username;
            game.gameBoard = updateBoard(game.gameBoard, data['row'], data['col'], pice);

            if(!hasMove(game.gameBoard)){
                game.winner = 'draw';
                game.turn = 'none';
            } else if(didWin(game.gameBoard, 'X')) {
                game.winner = p1.username;
                game.turn = 'none';
            } else if(didWin(game.gameBoard, 'O')) {
                game.winner = p2.username;
                game.turn = 'none'
            }

            return game.save();
        })
        .then(game => io.emit('tictactoe', {game} ));
}

