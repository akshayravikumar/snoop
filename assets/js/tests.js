// because draw_game.js and init_board.js are only concerned with the view,
// these will be hard to test programmatically. therefore, we run some tests
// on the gameOfLife datatype in  game_of_life.js


// ----- HELPER FUNCTIONS ---------------------------------


/**
 * A helper function to find the index of an array in an array of arrays.
 * from // from http://stackoverflow.com/questions/19543514/check-whether-an-array-exists-in-an-array-of-arrays
 * @param {Array} haystack    - the array to search through
 * @param {Array} needle      - the array to find
 * @return index of first instance of needle in haystack, -1 if doesn't exist
 */
function searchForArray(haystack, needle){
  var i, j, current;
  for(i = 0; i < haystack.length; ++i){
    if(needle.length === haystack[i].length){
      current = haystack[i];
      for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if(j === needle.length)
        return i;
    }
  }
  return -1;
}

/**
 * A helper function to toggle an array of cells, represented in (x,y) pairs
 *
 * @param {gameOfLife} game    - The game instance to use.
 * @param {[[Number, Number]]} - an array of [x,y] pairs of cells
 */
var toggleCells = function(game,cells) {
  cells.forEach(function(cell) {game.switchCell(cell[0], cell[1])});
}

/**
 * A helper function to test if only a list of given cells is set as
 * alive in the game board.
 *
 * @param {gameOfLife} game    - The game instance to use.
 * @param {[[Number, Number]]} - an array of [x,y] pairs of cells
 */

var containsCells = function(game,cells) {
  var matches = true;
  game.cells.forEach(function(column, i) {
    column.forEach(function(value,j) {
      if (searchForArray(cells, [i,j]) > -1) {
        if (value === 0) {matches = false;}
      } else {
        if (value === 1) {matches = false;}
      }
    });
  });

  return matches;
}

var printLiveCells = function(game) {
  var ans = [];
  game.cells.forEach(function(column, i) {
    column.forEach(function(value,j) {
        if (value === 1) {ans.push([i,j]);}
    });
  });
  return ans;
}

// ----- TEST FUNCTIONS ---------------------------------
// test names here should be rather self-explanatory
// testing the exported methods of game_of_life.js: cant really test preset and
// randomize, but testing update, clearCells, and switchCell


// these four tests make sure the game of life rules are being implemented correctly
// they also make sure that neighbor-counting works correctly on the boundary

QUnit.test("test a live cell that dies", function( assert ) {
  var game = gameOfLife(15, 15);
  toggleCells(game, [[0,0]]);
  game.update();
  assert.ok(containsCells(game, []), "Passed!" );
});

QUnit.test("test a dead cell that lives", function( assert ) {
  var game = gameOfLife(15, 15);
  toggleCells(game, [[0,0], [0,2],[2,0]]);
  game.update();
  assert.ok(containsCells(game, [[1,1]]), "Passed!" );
});

QUnit.test("test a live cell that stays alive #stayinalive", function( assert ) {
  var game = gameOfLife(15, 15);
  toggleCells(game, [[0,0], [0,2],[2,0],[1,1]]);
  game.update();
  assert.ok(containsCells(game, [[0,1],[1,0],[1,1]]), "Passed!" );
});

QUnit.test("test a dead cell that stays dead", function( assert ) {
  var game = gameOfLife(15, 15);
  toggleCells(game, []);
  game.update();
  assert.ok(containsCells(game, []), "Passed!" );
});


// we only need one test for this
QUnit.test("test clearCells", function( assert ) {
  var game = gameOfLife(15, 15);
  toggleCells(game, [[1,2], [10,4], [9,5]]);
  game.update();
  game.clearCells();
  assert.ok(containsCells(game, []), "Passed!" );
});

// test that toggling with switchCell works in both directions
QUnit.test("test switchCell alive --> dead", function( assert ) {
  var game = gameOfLife(15, 15);
  toggleCells(game, [[1,2]]);
  game.switchCell(1,2);
  assert.ok(containsCells(game, []), "Passed!" );
});


QUnit.test("test switchCell dead --> alive", function( assert ) {
  var game = gameOfLife(15, 15);
  toggleCells(game, [[1,2]]);
  game.switchCell(1,2);
  game.switchCell(1,2);
  assert.ok(containsCells(game, [[1,2]]), "Passed!" );
});
