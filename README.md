# Final-project: The Ecosystem project
## In this project, I will use 2D arrays to model an Ecosystem with creatures and predators. 


1. Consider the ecosystem’s world to be a CA. The creatures move from tile to tile, and each tile has a state. It is either land, water, or food. If it is land, color it yellow, if it is water, color it blue, if it is food, color it green.
   
2. A land tile will turn into a food tile after 30 rounds.

3. There will be a property of creature. The creature takes a random move, either up, down left or right on the 2D array every round. If the creature is on a grid, the grid will be colored grey. 
- If the creature is on a food tile, the creature will eat the food on the food tile. and Move in any direction. The food tile will turn into the land tile. 
- If the creature is on a water tile, it will skip the move this round, and move next round. 
- If the creature is on a land tile, it does nothing but take the move. 
- If the creature eat five food, it will reproduce, and create a new creature.
- if the creature move without food for 10 days, it dies.

4. There will be property of predators. The predators will eat creatures. if a predator is on a tile, tile is colored black. The predators will also make random move of up, down left or right.
- if predator and creature is on the same tile, the predator eat the creature, creature disappear. Predator keeps moving.
- If predator moves every round no matter its food, water, or land tile. 
If predator eat five creatures, it will reproduce, and create a new predator.
- If a predator doesn't eat for 50 moves, it dies.

Code with polymorphism and inheritance:
https://editor.p5js.org/PanyiGong/sketches/KZmp-rKbX 
