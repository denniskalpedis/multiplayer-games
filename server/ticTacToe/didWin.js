function checkAcross(game, player) {
    var hasWon = false;

    for (let row = 0; row < game.length; row++) {
        let allMatch = true;

        for (let col = 0; col < game[row].length; col++) {

            if (game[row][col] != player) {
                allMatch = false;
            }

        }

        if (allMatch) { hasWon = true; }

    }

    return hasWon;
}

function checkDown(game, player) {
    var hasWon = false;


    for (let col = 0; col < game[0].length; col++) {
        let allMatch = true;

        for (let row = 0; row < game.length; row++) {

            if (game[row][col] != player) {
                allMatch = false;
            }

        }

        if (allMatch) { hasWon = true; }

    }

    return hasWon;
}

// TODO!!
function checkDiag(game, player) {
    var hasWon = true;
    for(let i = 0;i<game.length; i++){
        if(game[i][i] != player){
            hasWon = false;
        }
    }
    return hasWon;
}

function checkBackwardsDiag(game,player){
    var hasWon = true;
    for(let i = 0; i<game.length;i++){
        if(game[i][game.length-1-i] != player){
            hasWon = false;
        }
    }
    return hasWon;
}

module.exports = function didWin(game, player) {
    return checkAcross(game, player) || checkDown(game, player) || checkDiag(game,player) || checkBackwardsDiag(game,player);
}