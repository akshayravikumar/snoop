canvasDrawer = function(gameOfLife, canvasId) {
	var that = Object.create(canvasDrawer.prototype);

	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext("2d");
	var game = gameOfLife;

	// get size from the game board, and update the canvas' size accordingly
	var SIZE_X = game.cells.length;
	var SIZE_Y = game.cells[0].length;
	var CELL_WIDTH = 25;
	canvas.width = CELL_WIDTH*SIZE_X;
	canvas.height = CELL_WIDTH*SIZE_Y;

	// to draw the blank squares
	ctx.strokeStyle = '#E1E1E1';

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
					var img = document.getElementById("snoop");
					ctx.drawImage(img, CELL_WIDTH*i,CELL_WIDTH*j,CELL_WIDTH,CELL_WIDTH);
 				} else {
					ctx.rect(CELL_WIDTH*i,CELL_WIDTH*j,CELL_WIDTH,CELL_WIDTH);
					ctx.stroke();
				}
			});
		});
	}

	/**
	 * Return the cell width.
	 *
	 */
	 that.getCellWidth = function() {
		 return CELL_WIDTH;
	 }

	Object.freeze(that);
	// update canvas for the first time
	that.draw();
	return that;
}
