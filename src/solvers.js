/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

    var myBoard = new Board({
        "n": n
    });
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            myBoard.togglePiece(i, j);
            if (myBoard.hasAnyRooksConflicts()) {
                myBoard.togglePiece(i, j);
            }
        }
    }
    var solution = myBoard.rows();

    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
}
;

// return the number of nxn chessboards that exist,
// with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
    var solutionCount = 0;

    var myBoard = new Board({
        "n": n
    });
    var executioner = (r)=>{
        if (r === n) {
            solutionCount++
            return;
        }
        for (var j = 0; j < n; j++) {
            myBoard.togglePiece(r, j);
            if (!myBoard.hasAnyRooksConflicts(j)) {
                executioner(r + 1)
            }
            myBoard.togglePiece(r, j);
        }
    }
    executioner(0);

    // Does the same as the function above //

    // var count = 0
    // var find = (board ,count , i) => {
    //   if(count === n) {
    //     solutionCount++
    //     return solutionCount;
    //   }
    //   for (var j = 0; j < n; j++) {
    //      board.togglePiece(i,j);
    //     if( !board.hasAnyColConflicts(j) ){
    //       find( board ,count + 1 ,i + 1 )
    //      }
    //       board.togglePiece(i,j);
    //    }
    // }

    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
    return solutionCount;
}
;

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
    var solution;

    var myBoard = new Board({
        "n": n
    });
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            myBoard.togglePiece(i, j);
            if (myBoard.hasAnyQueenConflictsOn()) {
                myBoard.togglePiece(i, j);
            }
        }
    }

    var solution = myBoard.rows();
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
}
;

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
    var myBoard = new Board({
        "n": n
    });
    var solutionCount = 0;

    var executioner = (r) => {
        if (r === n) {
            solutionCount++
            return;
        }
        for (var j = 0; j < n; j++) {
            myBoard.togglePiece(r, j);
            if (!myBoard.hasAnyRooksConflicts(j)) {
                executioner(r + 1)
            }
            myBoard.togglePiece(r, j);
        }
    }
    executioner(0);

    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
    return solutionCount;
}
;

