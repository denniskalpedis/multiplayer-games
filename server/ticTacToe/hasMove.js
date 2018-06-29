module.exports = function hasMove (game, blank = "") {
    // the cool way 
    //    return game.reduce((acc, row) => acc || row.reduce((acc, x) => acc || x === blank , false), false);

    var hasBlank = false;
    for (let row = 0; row < game.length; row++) {
        for (let col = 0; col < game[row].length; col++) {
            if(game[row][col] == blank) {
                hasBlank = true
            }   
        }
    }
    return hasBlank;
}
