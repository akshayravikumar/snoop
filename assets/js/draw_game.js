/**
 * Draws the canvas that represents the game.
 *
 * @param {String} canvasId - the id of the canvas     (must exist)
 */
 canvasDrawer = function(canvasId) {
	var that = Object.create(canvasDrawer.prototype);

	var game;
	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext("2d");

	// get size from the game board, and update the canvas' size accordingly
	var SIZE_X, SIZE_Y;
	var CELL_WIDTH = 25;

	/**
	 * Binds the canvas to a game instance, and changes the necessary sizes.
	 *
	 * @param {gameOfLife} game - the game instance to use (must be valid)
	 */

	that.bindToGame = function(gameInstance) {
		game = gameInstance;
		SIZE_X = game.cells.length;
		SIZE_Y = game.cells[0].length;
		canvas.width = CELL_WIDTH*SIZE_X;
		canvas.height = CELL_WIDTH*SIZE_Y;

		// to draw the blank squares
		ctx.strokeStyle = '#E1E1E1';
		that.draw();
	}

	/**
	 * Uses the current state of the game's cells to update the canvas.
	 *
	 */

	that.draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.cells.forEach(function(column, i) {
			column.forEach(function(value, j) {
				ctx.beginPath();
 				if (value === 1) {
					// its alive, lets bring in the dogg
					var img = document.getElementById("snoop");
					ctx.drawImage(img, CELL_WIDTH*i,CELL_WIDTH*j,CELL_WIDTH,CELL_WIDTH);
 				} else {
					// draw a blanks square
					ctx.rect(CELL_WIDTH*i,CELL_WIDTH*j,CELL_WIDTH,CELL_WIDTH);
					ctx.stroke();
				}
			});
		});
	}

	/**
	 * Return the cell width.
	 */
	 that.getCellWidth = function() {
		 return CELL_WIDTH;
	 }

	Object.freeze(that);
	return that;
}
