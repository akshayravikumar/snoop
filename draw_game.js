canvasDrawer = function(gameOfLife, canvasId) {
	var that = Object.create(canvasDrawer.prototype);

	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext("2d");
	var game = gameOfLife;

	var SIZE_X = game.cells.length;
	var SIZE_Y = game.cells[0].length;
	var CELL_WIDTH = 25;
	canvas.width = CELL_WIDTH*SIZE_X;
	canvas.height = CELL_WIDTH*SIZE_Y;
	ctx.fillStyle = "#3498db";
	ctx.strokeStyle = '#E1E1E1';
	var TIME_INTERVAL = 200;
	var start_drawing = false;

	that.drawRepeatedly = function() {
		if (start_drawing) {
			setTimeout(function() {game.update(); y.draw(); that.drawRepeatedly();}, TIME_INTERVAL);
		} else {
			return;
		}
	}  

	document.getElementById(canvasId).addEventListener('click',function(evt){
		var cell_x = Math.floor((evt.clientX - $("#" + canvasId).offset().left)/CELL_WIDTH);
		var cell_y = Math.floor((evt.clientY - $("#" + canvasId).offset().top)/CELL_WIDTH);
		game.cells[cell_x][cell_y] = 1 - game.cells[cell_x][cell_y];
		that.draw();
	},false);

	$('#startStop').change(function() {
        if($(this).is(":checked")) {
            start_drawing = true;
			that.drawRepeatedly();
        } else {
        	start_drawing = false;
        }
    });

	$('#timeInterval').change(function() {
		TIME_INTERVAL = $(this).val();
    });


	document.getElementById("stepButton").addEventListener('click',function(evt){
		game.update();
		that.draw();
	},false);


	document.getElementById("clearButton").addEventListener('click',function(evt){
		game.clearCells();
		that.draw();
	},false);

	document.getElementById("randomButton").addEventListener('click',function(evt){
		game.randomize();
		that.draw();
	},false);



	that.draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.cells.forEach(function(column, i) {
			column.forEach(function(value, j) {
				ctx.beginPath();
				// ctx.rect(CELL_WIDTH*i,CELL_WIDTH*j,CELL_WIDTH,CELL_WIDTH);
				if (value === 1) {
					var img = document.getElementById("snoop");
					ctx.drawImage(img, CELL_WIDTH*i,CELL_WIDTH*j,CELL_WIDTH,CELL_WIDTH);
					// ctx.fill()
				} else {
					ctx.rect(CELL_WIDTH*i,CELL_WIDTH*j,CELL_WIDTH,CELL_WIDTH);
					ctx.stroke();
				}
			});
		});
	}

	Object.freeze(that);
	that.draw();
	return that;
}