class Cell {
  constructor(type, x, y, w) {
    this.type = type; // 'land', 'water', or 'food'
    this.x = x;
    this.y = y;
    this.w = w;

    this.landCounter = 0; // counts how many rounds on land
    this.hasCreature = false;
    this.hasPredator = false;
  }

  updateTile() {
    if (this.type === LAND) {
      this.landCounter++;
      if (this.landCounter >= 10) {
        this.type = FOOD;
        this.landCounter = 0;
      }
    }
  }

  show() {
    stroke(0);
    if (this.hasPredator) {
      fill(255,0,0); // red for predator
    } else if (this.hasCreature) {
      fill(128); // grey for creature
    } else {
      if (this.type === LAND) fill(255, 255, 0);
      else if (this.type === WATER) fill(0, 0, 255);
      else if (this.type === FOOD) fill(0, 255, 0);
    }
    square(this.x, this.y, this.w);
  }
}
