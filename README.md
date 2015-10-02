Gameizzle of Life
=====

I would like to thanks Calvin Cordozar Broadus, Jr. for inspiring this project.

## Sepration of Concerns and Modules

When making my Game of Life program, I separated the task into three separate problems: representing the game board, drawing the canvas, and connecting user input to the previous two entities.

First, the file ```game_of_life.js``` involves representation of the board. with the ```gameOfLife``` datatype. We represent the cells as a two-dimensional array, with ```1``` and ```0``` representing alive and dead cells, respectively. Here is where we make significant changes to the cells: these include randomizing, setting a preset board, clearing all the cells, updating according to the Game of Life rules, and toggling a single cell. This does not depend on any of the other files.

Second, the file ```draw_game.js``` involves drawing the board on the canvas with a ```canvasDrawer``` datatype. Here, we pass in the HTML id of the canvas, as well as the game it will be representing. This file has only one important method: ```draw()```, which redraws the canvas based on the current state of the cells in the game. Right now, this file depends on ```game_of_life.js```, because we are directly binding the ```canvasDrawer``` instance to the game instance. This dependency doesn't necessarily need to exist: we could simply pass in the array of cells to the draw function every time, and similarly define the board size and other variables. However, I think this dependency makes sense within the confines of this project, because the canvas is a visual representation of the board, and therefore the connection and the code feels natural.

Finally, the file ```init_board.js``` controls the connections between the user inputs and the previous two files. This includes taking the inputs of all the buttons, range slider, and checkbox switch, and performing the appropriate functions. In addition, in this file we implement the STOP and START procedures with a function that repeatedly updates the board then draws the result. This module depends on both the other modules, which is something we can't really avoid because user input directly controls them.

## Functionals
Use of functionals really simplified the code in ```game_of_life.js```. Most importantly, traversal of the two-dimensional cells array was becoming a pain: therefore, I implemented my own functional ```forEachPair```, takes in a callback function and applies it to every  ```(x_index, y_index, value)``` combination. Using this functional made implemented functions like ```clearCells``` and ```randomize``` easy one-line implementations.

On a smaller scale, using a map function enables one to easily define a two-dimensional array in one line. Also, I used a reduce to iterate through all neighbors and find the ones that were live. Finally, use of ```forEach``` enabled me to easily implement ```forEachPair``` and avoid index errors on a couple of other loops.


## Comments

I had a lot of fun playing around with this, making the background, choose to draw images instead of filling squares, etc.
