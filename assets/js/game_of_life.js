/**
 * Draws the canvas that represents the game.
 *
 * @param {Number} x - the board height (must be positive)
 * @param {Number} y - the board length (must be positive)
 */
 gameOfLife = function(x,y) {

	var that = Object.create(gameOfLife.prototype);

	// height and length of the board
	var SIZE_X = x;
	var SIZE_Y = y;

	// some present configurations, and a counter to show which one we will currently display to the user
	var presetPretty  = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],[0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],[0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],[0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],[0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],[0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
	var presetSwag    = [[0,1,1,1,0,1,0,0,0,1,1,1,1,1,0],[0,1,0,1,0,1,0,0,0,1,0,1,0,0,0],[0,1,0,1,0,1,0,0,0,1,0,1,0,0,0],[0,1,0,1,0,1,0,0,0,1,0,1,0,0,0],[0,1,0,1,0,1,0,0,0,1,0,1,0,0,0],[0,1,0,1,1,1,0,0,0,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],[0,0,0,0,0,1,0,0,0,1,0,0,0,1,0],[0,0,0,0,1,1,0,0,0,1,0,0,0,1,0],[0,0,0,1,0,0,0,0,0,1,0,0,0,1,0],[0,0,0,0,1,1,0,0,0,1,0,1,0,1,0],[0,0,0,0,0,1,0,0,0,1,0,1,0,1,0],[0,1,1,1,1,1,0,0,0,1,0,1,1,1,0]];
	var presetSmile   = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],[0,0,1,1,1,0,0,1,1,1,0,0,0,0,0],[0,0,1,0,1,0,0,0,1,1,1,0,0,0,0],[0,0,1,1,1,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,1,1,1,0,0,0,0,1,1,1,0,0,0],[0,0,1,0,1,0,0,0,1,1,1,0,0,0,0],[0,0,1,1,1,0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
 	var presetConfigs = [presetPretty, presetSwag, presetSmile];
	var presetCount   = 0;

	// a functional to iterate through a two-dimensional array and change values based on
	// a given function
	var mapForEachPair = function(array, callback) {
		array.forEach(function(column, i) {
			column.forEach(function(value,j) {
 				array[i][j] = callback(i,j,value);
			});
		});
	}

	// initialize a SIZE_X by SIZE_Y array of zeroes
	that.cells = Array.apply(null, new Array(SIZE_X)).map(function() {return new Array(SIZE_Y).fill(0);});

	/**
	 * Finds the number of neighbors of a given cell.
	 *
	 * @param {Number} x - The x-coordinate of the cell. (must be a valid index)
	 * @param {Number} y - The y-coordinate of the cell. (must be a valid index)
	 * @return {Number} the number of neighbors if cell (x,y)
	 */

	var numNeighbors = function(x,y) {
		// representing the 8 neighbors of a cell
		var neighbors = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
		// count the number of live neighbors for each cell
		return neighbors.reduce(function(total, e) {
			var newX = x + e[0];
			var newY = y + e[1];
			if (newX >= 0 && newX < SIZE_X && newY >= 0 && newY < SIZE_Y && that.cells[newX][newY] === 1) {
				return total + 1;
			}
			return total;
		},0);
	}

	/**
	 * Applies the rules of the Game of Life to update the cells.
	 */

	that.update = function() {
		// keep a copy of the array so that we can update the cells based on
		// the current counts
		var copy = Array.apply(null, new Array(SIZE_X)).map(function() {return new Array(SIZE_Y).fill(0);});

		that.cells.forEach(function(column, i) {
			column.forEach(function(value,j) {
				neigh = numNeighbors(i,j);
				// apply the rules of the game of life
				if (value === 1) {
					copy[i][j] = neigh < 2 || neigh > 3 ? 0 : 1;
				} else if (neigh == 3) {
					copy[i][j] = neigh === 3 ? 1 : 0;
				}
		});
	});

		// now, set the values to the updated ones
		mapForEachPair(that.cells, function(i,j) {return copy[i][j];});
	}

	/**
	 * Clear the board, setting all cells back to unfilled.
	 */

	that.clearCells = function() {
		mapForEachPair(that.cells, function(i,j) {return 0;});
	}

	/**
	 * Randomly fill the board, each cell having a one-fifth probability of
	 * being filled.
	 */
	that.randomize = function() {
		mapForEachPair(that.cells, function(i,j) {return Math.random() <= 0.2  ? 1 : 0; });
	}

	/**
	 * Set the board to one of a set of present configurations.
	 */
	that.preset = function() {
		mapForEachPair(that.cells, function(i,j) {return presetConfigs[presetCount][i][j];});
		presetCount = (presetCount + 1)%presetConfigs.length;
	}

	/**
	 * Toggles the value of a cell.
	 *
	 * @param {Number} x - The x-coordinate of the cell. (must be a valid index)
	 * @param {Number} y - The y-coordinate of the cell. (must be a valid index)
	 */
	that.switchCell = function(x,y) {
		that.cells[x][y] = 1 - that.cells[x][y];
	}

	Object.freeze(that);
	return that;
}
