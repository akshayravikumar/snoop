$(document).ready(function() {


	// distance, in ms, between iterations
	TIME_INTERVAL = 100;

	// if this is true, then we are repeatedly iterating the game
	start_drawing = false;

	// the game and board we plan on using
	var game = gameOfLife(15,15);
	var board = canvasDrawer("myCanvas");
	board.bindToGame(game);

	// to continuously update the draw the board every TIME_INTERVAL milliseconds
	drawRepeatedly = function() {
		if (start_drawing) {
			setTimeout(function() {game.update(); board.draw(); drawRepeatedly();}, TIME_INTERVAL);
		} else {
			// we have called the stopDrawing function
			return;
		}
	}

	// update the cells once, then draw the result
	$("#stepButton").click(function(){
		game.update();
		board.draw();
	});

	// set all cells to zero, then draw the result
	$("#clearButton").click(function(){
		game.clearCells();
		board.draw();
	});

	// randomize the cells, then draw the result
	$("#randomButton").click(function(){
		game.randomize();
		board.draw();
	});

	// starting/stopping repeated iterations of the cells
	$("#myonoffswitch").change(function(){
		  if($(this).is(":checked")) {
				start_drawing = true;
				drawRepeatedly();
			} else {
				start_drawing = false;
			}
	})

	// give a preset configuration, then draw the result
	$("#presetButton").click(function(){
		game.preset();
		board.draw();
	});

	// update the speed report in the view, and change the time interval
	$('#timeInterval').change(function() {
		$("#speed").html($(this).val());
		TIME_INTERVAL = $(this).val();
  });

	$("#myCanvas").click(function(e){
	 // use the x and y coordinates to find which cell was clicked
	 var cell_x = Math.floor((e.pageX - $("#myCanvas").offset().left)/board.getCellWidth());
	 var cell_y = Math.floor((e.pageY - $("#myCanvas").offset().top)/board.getCellWidth());
	 // toggle this cell, then redraw the board
	 game.switchCell(cell_x, cell_y);
	 board.draw();
	});

});
