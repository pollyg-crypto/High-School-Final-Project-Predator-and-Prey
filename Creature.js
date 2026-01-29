
class Creature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.foodEaten = 0;
    this.skipMove = false; // for water tile logic
    this.movesWithoutFood = 0;
  }

  update() {
    if (this.skipMove) {
      this.skipMove = false;
      this.movesWithoutFood++; // still counts as not eating
      if (this.movesWithoutFood >= 10) {
        this.die();
      }
      return;
    }

    // Try to move randomly (up/down/left/right), store valid moves in an array
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
        if (!Earth[nx][ny].hasCreature && !Earth[nx][ny].hasPredator) {
          validMoves.push([nx, ny]);
        }
      }
    }

    if (validMoves.length === 0) {
      this.movesWithoutFood++;
      if (this.movesWithoutFood >= 10) this.die();
      return;
    }
    //If there are valid moves, randomly choose a valid move.
    let [nx, ny] = random(validMoves);
    Earth[this.x][this.y].hasCreature = false;
    let targetTile = Earth[nx][ny];

    //What happens for each type of tile;
    if (targetTile.type === FOOD) {
      this.foodEaten++;
      this.movesWithoutFood = 0; // reset starvation counter
      targetTile.type = LAND;
      targetTile.landCounter = 0;

    
      targetTile.hasCreature = true;
    } 
    else if (targetTile.type === WATER) {
    
      targetTile.hasCreature = true;
      this.skipMove = true;
      this.movesWithoutFood++; // didn't eat
    } 
    else{
      targetTile.hasCreature = true;
      this.movesWithoutFood++; // didn't eat
    }
    
      this.x = nx;
      this.y = ny;

    if (this.foodEaten >= 5) {
      this.foodEaten = 0;
      this.reproduce();
    }

    if (this.movesWithoutFood >= 15) {
      this.die();
    }
  }

  die() {
    Earth[this.x][this.y].hasCreature = false;
    for (let i = creatures.length - 1; i >= 0; i--) {
      if (creatures[i] === this) {
        creatures.splice(i, 1);
        break;
      }
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
        creatures.push(new Creature(nx, ny));
        Earth[nx][ny].hasCreature = true;
        break;
      }
    }
  }
}

  }
}
