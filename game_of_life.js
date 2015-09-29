gameOfLife = function(x,y) {

	var that = Object.create(gameOfLife.prototype);

	var SIZE_X = x;
	var SIZE_Y = y;
	var CELL_WIDTH = 8;

	that.cells = new Array(SIZE_X);
	for (var i = 0; i < SIZE_X; i++) {
	  that.cells[i] = new Array(SIZE_Y);
	}

	for (i = 0; i < SIZE_X; i++) {
		for (j = 0; j < SIZE_Y; j++) {
			that.cells[i][j] = 0;
		}
	}

	var numNeighbors = function(x,y) {
		var num_neighbors = 0;
		var neighbors = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
		
		neighbors.forEach(function(e) {
			var newX = x + e[0];
			var newY = y + e[1];
			if (newX >= 0 && newX < SIZE_X && newY >= 0 && newY < SIZE_Y) {
				if (that.cells[newX][newY] === 1) {
					num_neighbors++;
				}
			}
		});

		return num_neighbors;
	}

	that.update = function() {
		for (i = 0; i < SIZE_X; i++) {
			for (j = 0; j < SIZE_Y; j++) {
				neigh = numNeighbors(i,j);
				if (that.cells[i][j] === 1) {
					if (neigh < 2 || neigh > 3) {
						that.cells[i][j] = 0;
					} 
				} else {
					if (neigh === 3) {
						that.cells[i][j] = 1;
					}
				}
			}
		}
	}

	that.clearCells = function() {
		for (i = 0; i < SIZE_X; i++) {
			for (j = 0; j < SIZE_Y; j++) {
				that.cells[i][j] = 0;
			}
		}
	}

	that.randomize = function() {
		for (i = 0; i < SIZE_X; i++) {
			for (j = 0; j < SIZE_Y; j++) {
				if (Math.random() <= 0.2) {
					that.cells[i][j] = 1;
				} else {
					that.cells[i][j] = 0;
				}
			}
		}
	}

	return that;
}