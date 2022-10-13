const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let map1 = [
  `##############################`,
  `_.....................########`,
  `##########..########..########`,
  `##########..#......#.........#`,
  `#...........#..##..########..#`,
  `#..#######..#..##..########..#`,
  `#..#....##..#..##..####......#`,
  `#..###..#####..##.....########`,
  `#...............####........!#`,
  `##############################`,
];

let map2 = [
  `##############################`,
  `_....###..........#........###`,
  `###..###..###..####..####..###`,
  `###.......###..#.....####..###`,
  `#############..####..#.......#`,
  `#..............####..#..###..#`,
  `#..################..#..###..#`,
  `#..##........######..#....#..#`,
  `#..##..####..#.......######..#`,
  `#......####..#..###.......#..#`,
  `###########..#..###########..#`,
  `#............#..#.......##...#`,
  `#..###########..#..###..##..##`,
  `#..................###..#...!#`,
  `##############################`,
];

let map3 = [
  `#############################################################`, //index 4
  `_.........#.....................#.....................#######`,
  `########..##...#######..######..#..#################........#`,
  `##.....#..###..##............#..##########..##############..#`,
  `##..#.......#..##..#..#####..#..........................##..#`,
  `##..#########..##..####..#########..#############..#######..#`,
  `##..#..........##...............................#..#######..#`,
  `##..#..######..################..################...........#`,
  `##..#.......#..#................................##########..#`,
  `##..#########..######..###########..######################..#`,
  `##.............#............#..........#.............#......#`,
  `#############..######..######..#..########..###..#####..##..#`,
  `######..#########..##########..#######..##...............#..#`,
  `#.......................................##..#################`,
  `##########################################..#..............##`,
  `#.......#...................................###..########..##`,
  `#########..####################################..#......#..##`,
  `#.......#..#........#........................##..#..#####..##`,
  `#########..#..####..#..####################..##..#.........##`,
  `#.......#..#.....#..#..#..................#..##..############`,
  `#########..#######..#..#..##############..#..##..#..........#`,
  `#..........#...........#..#......#.....#..#..##.....######..#`,
  `#..##################..#..#..##..#..#..#..#..##########..#..#`,
  `#..#...................#..#..##..#..#..#..#..............#..#`,
  `#..########..########..#..#####..#..#..#..##########..#..#..#`,
  `#..#.........#.........#.........#..#..#..............#..#..#`,
  `#..#..############################..#..################..#..#`,
  `#..#.............#....##............#....................#..#`,
  `#..############..###..##..################################..#`,
  `#.....................##...................................!#`,
  `#############################################################`
];
let singleBlock
let maps = [map1, map2, map3]
let currentMap = 0
class Entity {
  constructor(position, width, height, color) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Velocity {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
}

class Player extends Entity {
  constructor(position, width, height, color) {
    super(position, width, height, color);

    this.speed = 700;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
  }

  draw() {
    context.fillStyle = this.color;
    //context.fillRect(this.position.x - this.width / 2, this.position.y - this. height / 2, this.width, this.height)
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  move() {
    
    //Kollar om nån bit e innanför
    if (this.up) {
      this.position.y -= this.speed * deltaTime;
      let block = checkCollision(this, entities);

      if (block !== null) {
        this.position.y = block.position.y + block.height;
      }
    }

    if (this.down) {
      this.position.y += this.speed * deltaTime;

      let block = checkCollision(this, entities);

      if (block !== null) {
        this.position.y = block.position.y - player.height;
      }
    }
    if (this.left) {
        if(this.position.x < 0) {
            this.position.x = 0
        }
        this.position.x -= this.speed * deltaTime;

      let block = checkCollision(this, entities);

      if (block !== null) {
        this.position.x = block.position.x + block.width;
      }

    }

    if (this.right) {
      this.position.x += this.speed * deltaTime;

      let block = checkCollision(this, entities);

      if (block !== null) {
        this.position.x = block.position.x - player.width;
      }
    }
  }
}

let player = new Player(new Position(40, 80), 20 , 20, "black");

function checkCollision(player, blocks) {
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    if (
      block.position.x < player.position.x + player.width &&
      block.position.x + block.width > player.position.x &&
      block.position.y < player.position.y + player.height &&
      block.height + block.position.y > player.position.y && block.color !== "green" && "yellow"
    ) {
      return block;
    }
    if (
      block.position.x < player.position.x + player.width &&
      block.position.x + block.width > player.position.x &&
      block.position.y < player.position.y + player.height &&
      block.height + block.position.y > player.position.y && block.color == "green"
    ) {
      ++currentMap
      entities = createLabyrinth(maps[currentMap]);
      player.position.x = 40
      player.position.y = 50
      player.height = singleBlock.height - 20;
      player.width = singleBlock.width - 15;
      player.right = false;
      player.up = false;
      player.down = false;
      player.left = false;
      
    }
    
  }
  return null;
}

function handleKeyDown(event) {
  if (event.repeat) return;

  if (event.key === "w") {
    player.up = true;
  } else if (event.key === "a") {
    player.left = true;
  } else if (event.key === "s") {
    player.down = true;
  } else if (event.key === "d") {
    player.right = true;
  }
}

function handleKeyUp(event) {
  if (event.key === "w") {
    player.up = false;
  } else if (event.key === "a") {
    player.left = false;
  } else if (event.key === "s") {
    player.down = false;
  } else if (event.key === "d") {
    player.right = false;
  }
}

window.addEventListener("keypress", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);


let entities = createLabyrinth(maps[0]);

function createLabyrinth(template) {
  let blocks = [];


  for (let y = 0; y < template.length; y++) {
    let row = template[y];
    for (let x = 0; x < row.length; x++) {
      let char = row[x];

      if (char === "#") {
        let width = canvas.width / row.length;
        let height = canvas.height / template.length;
        let position = { x: x * width, y: y * height };
        let block = new Entity(position, width, height, "red");
        blocks.push(block);
      }
      if (char === "!") {
        let width = canvas.width / row.length;
        let height = canvas.height / template.length;
        let position = { x: x * width, y: y * height };
        let block1 = new Entity(position, width, height, "green");
        blocks.push(block1);
       
      }
      if (char === "_") {
        let width = canvas.width / row.length;
        let height = canvas.height / template.length;
        let position = { x: x * width, y: y * height };
        let block2 = new Entity(position, width, height, "yellow");
        singleBlock = {height: block2.height, width: block2.width}
        blocks.push(block2)
        
      }
    }
  }
  

  return blocks ;
}

let lastTime = Date.now();
let deltaTime = 0;

function tick() {
    let currentTime = Date.now();
    deltaTime = (currentTime - lastTime) /1000;
    lastTime = currentTime;


  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  player.draw();
  player.move();

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];

    entity.draw();

  }
  requestAnimationFrame(tick);
}
tick();
