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
  var solution = [];
  var board = new Board({n:n});
  var row = 0;

  var rec = function(row){
    if(row === n) return;
    for(var i = 0; i<n; i++){
      board.togglePiece(row, i);
      if(board.hasAnyRooksConflicts()) board.togglePiece(row, i);
    }
     rec(row+1);
  };

  rec(0);
  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var row = 0;

  var recur = function(row){
    for(var i =0; i<n; i++){
      if(row === n){
        solutionCount++;
        return;
      }
      board.togglePiece(row, i);
      if(board.hasAnyRooksConflicts()) board.togglePiece(row, i);
      else {
        recur(row+1);
        board.togglePiece(row, i);
      }
    }
  };

  recur(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n:n});
  var row = 0;
  var count = 0;
  var rec = function(row){
    if(row === n){
      if(count === n) solution.push(JSON.parse(JSON.stringify(board.rows())));
      return;
    } else {
      for(var i = 0; i<n; i++){
        board.togglePiece(row, i);
        count++;
        if(!board.hasAnyQueensConflicts()) rec(row+1);
        board.togglePiece(row, i);
        count--;
      }
    }
  };

  rec(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution[0] || board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = [];
  var board = new Board({n:n});
  var row = 0;
  var count = 0;
  var rec = function(row){
    if(row === n){
      if(count === n) solution.push(JSON.parse(JSON.stringify(board.rows())));
      return;
    } else {
      for(var i = 0; i<n; i++){
        board.togglePiece(row, i);
        count++;
        if(!board.hasAnyQueensConflicts()) rec(row+1);
        board.togglePiece(row, i);
        count--;
      }
    }
  };

  rec(0);

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solution.length;
};
