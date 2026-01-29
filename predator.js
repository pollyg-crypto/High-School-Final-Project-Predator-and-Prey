
class Predator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.creaturesEaten = 0;
    this.movesWithoutFood = 0;
  }

  update() {
    // Move every round: random direction
    let moves = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];
    let validMoves = [];

    for (let [dx, dy] of moves) {
      let nx = this.x + dx;
      let ny = this.y + dy;
      if (nx >= 0 && nx < columns && ny >= 0 && ny < rows) {
        validMoves.push([nx, ny]);
      }
    }

    if (validMoves.length === 0) return;

    let [nx, ny] = random(validMoves);

    // Remove predator from old tile
    Earth[this.x][this.y].hasPredator = false;

    let ateCreature = false;

    // If creature on new tile, eat it
    if (Earth[nx][ny].hasCreature) {
      this.creaturesEaten++;
      ateCreature = true;
      this.movesWithoutFood = 0; // reset counter
      // Remove creature from simulation
      for (let i = creatures.length - 1; i >= 0; i--) {
        if (creatures[i].x === nx && creatures[i].y === ny) {
          creatures.splice(i, 1);
          break;
        }
      }
      Earth[nx][ny].hasCreature = false;
    } else {
      this.movesWithoutFood++;
    }

    // Starve if hasn't eaten for 30 moves
    if (this.movesWithoutFood >= 30) {
      Earth[this.x][this.y].hasPredator = false;
      for (let i = predators.length - 1; i >= 0; i--) {
        if (predators[i] === this) {
          predators.splice(i, 1);
          return; // End update early since predator is dead
        }
      }
    }

    // Move predator
    this.x = nx;
    this.y = ny;
    Earth[this.x][this.y].hasPredator = true;

    // Reproduce if eaten enough creatures
    if (this.creaturesEaten >= 5) {
      this.creaturesEaten = 0;
      this.reproduce();
    }
  }

  reproduce() {
    let moves = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];
    for (let [dx, dy] of moves) {
      let nx = this.x + dx;
      let ny = this.y + dy;
      if (
        nx >= 0 &&
        nx < columns &&
        ny >= 0 &&
        ny < rows &&
        !Earth[nx][ny].hasCreature &&
        !Earth[nx][ny].hasPredator
      ) {
        predators.push(new Predator(nx, ny));
        Earth[nx][ny].hasPredator = true;
        break;
      }
    }
  }
}
