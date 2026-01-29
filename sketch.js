let columns, rows;
let Earth = [];
let predators = [];
let creatures = [];
const cellsize = 20;

//tile types:
const LAND = 'land';
const WATER = 'water';
const FOOD = 'food';

function setup(){
  createCanvas(600,400);
  frameRate(5);
  
  columns = floor(width / cellsize);
  rows = floor(height / cellsize);
  
   // Initialize system with random tile types
   for (let i = 0; i < columns; i++) {
    Earth[i] = [];
    for (let j = 0; j < rows; j++) {
      // Randomly assign land, water, or food tiles initially
      let type;
     let r = floor(random(3)); 
      if (r == 0) {
        type = WATER;
      }
       else if (r == 1) {
        type = LAND;
      }    
      else {
        type = FOOD;
      }
      Earth[i][j] = new Cell(type, i * cellsize, j * cellsize, cellsize);
    }
  }
  
  
   for (let k = 0; k < 100; k++) {
    let cx = floor(random(columns));
    let cy = floor(random(rows));
    if (!Earth[cx][cy].hasCreature && !Earth[cx][cy].hasPredator) {
      creatures.push(new Creature(cx, cy));
      Earth[cx][cy].hasCreature = true;
    }
  }
  
  for (let k = 0; k < 50; k++) {
    let px = floor(random(columns));
    let py = floor(random(rows));
    if (!Earth[px][py].hasCreature && !Earth[px][py].hasPredator) {
      predators.push(new Predator(px, py));
      Earth[px][py].hasPredator = true;
    }
  }
  
}


function draw() {
  background(220);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      Earth[i][j].updateTile();
    }
  }

  //some code that Initialize creatures and predators here.
  // TODO Code 1
    for (let c of creatures) {
    c.update();
  }
  
  
  // Update predators
  for (let p of predators) {
    p.update();
  
    //show grids.
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      Earth[i][j].show();
    }
  }
}
}
