Gameizzle of Life
=====

I would like to thank Calvin Cordozar Broadus, Jr. for inspiring this project.

## Sepration of Concerns and Modules

When making my Game of Life program, I separated the task into three separate problems: representing the game board, drawing the canvas, and connecting user input to the previous two entities.

First, the file ```game_of_life.js``` involves representation of the board with the ```gameOfLife``` datatype. We represent the cells as a two-dimensional array, with ```1``` and ```0``` representing alive and dead cells, respectively. Here is where we make significant changes to the cells: these include randomizing, setting a preset board, clearing all the cells, updating according to the Game of Life rules, and toggling a single cell. This does not depend on any of the other modules.

Second, the file ```draw_game.js``` involves drawing the board on the canvas with a ```canvasDrawer``` datatype. Here, we pass in the HTML id of the canvas in our constructor, then call ```bindToGame()``` to connect it with a ```gameOfLife``` instance. This module has only one important method, ```draw()```, which redraws the canvas based on the current state of the cells in the game. Right now, this file depends on ```game_of_life.js```, because we are directly binding the ```canvasDrawer``` instance to the game instance. This dependency doesn't necessarily need to exist, but I think it makes sense within the confines of this project because the canvas is designed to be a visual representation of a single board instance -- so the resulting code feels natural and prevents errors where the canvas dimensions are not synchronized with the actual board datatype.

Finally, the file ```init_board.js``` controls the connections between the user inputs and the previous two modules. This includes listening for user inputs and performing the appropriate functions. In addition, this module implements the STOP and START procedures with a function that repeatedly updates the board then draws the result. This module depends on both the other modules, which we cannot really avoid because the user must be able to directly control them.

## Functionals
Use of functionals really simplified the code in ```game_of_life.js```. Most notably, traversal of the two-dimensional cells array was becoming a pain; therefore, I implemented my own functional ```mapForEachPair```, which modifies the array at each index pair using a function passed in as a parameter. Using this functional made implementing functions like ```clearCells``` and ```randomize``` easy one-liners.

On a smaller scale, using a ```map``` function let me easily define a two-dimensional array of zeroes in one line of code. Also, I used a ```reduce``` to iterate through all neighbors and find the ones that were alive. Finally, use of ```forEach``` enabled me to easily implement ```forEachPair``` and avoid index errors on a couple of other loops.


## Comments

I had a lot of fun playing around with the UI design portion, choosing to use a canvas, drawing images instead of filling squares, adding the pulsation to title, etc. For one significant design choice, I decided that adding a checkbox/switch for starting and stopping made more sense than a separate button for each, because it easily indicates whether a non-moving board has been stopped by the user or is simply in equilibrium. I also decided that having hard boundaries instead of wrapping around would be the easiest for the user to understand and visualize.

In addition, I added in the functionality of increasing or decreasing the speed of the iterations, which I thought was nice. I did this by simply using a range slider and connected it with the variable that represents time between iterations. I also wanted to make more things customizable by the user, like board dimensions and cell size; however, this would take some restructuring of the HTML to prevent a too-big board from colliding with my man Snoop (as in, making sure the size reasonably fits on the screen).
