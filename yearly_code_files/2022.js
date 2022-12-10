var output = document.getElementById("output");

aof[0][7] = (input) => {
  P1 = 0, P2 = 0;
	input = input.split('\n\n')
               .map(x => x.split('\n').map(y => Number.parseInt(y)))
               .map(x => x.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
               .sort((a,b) => b - a);
  P1 = input[0];
  P2 = input[0] + input[1] + input[2];

  output.value += "2022, Day 1\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[1][7] = (input) => {
  matchups = [['A X', 4], ['A Y', 8], ['A Z', 3], ['B X', 1], ['B Y', 5], ['B Z', 9], ['C X', 7], ['C Y', 2], ['C Z', 6]];
  directions = [['A X', 3], ['A Y', 4], ['A Z', 8], ['B X', 1], ['B Y', 5], ['B Z', 9], ['C X', 2], ['C Y', 6], ['C Z', 7]];
  let result = (match, mappings) => {
    for(let i = 0; i < mappings.length; i++)
      if(mappings[i][0] == match)
        return mappings[i][1];
  };
  let P1 = input.split('\n').map(x => result(x, matchups)).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let P2 = input.split('\n').map(x => result(x, directions)).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  output.value += "2022, Day 1\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[2][7] = (input) => {
  priorities = ' abcdefghijklmnopqrstuvwxyz';
  priorities += priorities.trim().toUpperCase();

  let intersection = (str1, str2, str3) => {
    for(let i = 0; i < str1.length; i++){
      if(str2.indexOf(str1.charAt(i)) >= 0){
        if(str3 != ''){
          if(str3.indexOf(str1.charAt(i)) >= 0){
            return str1.charAt(i);
          }
        }else{
          return str1.charAt(i);
        }
      }
    }
    return ' ';
  };

  let P1 = input.split('\n')
                .map(x => [x.substring(0, x.length/2), x.substring(x.length/2)])
                .map(x => intersection(x[0], x[1], ''))
                .map(x => priorities.indexOf(x))
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  let re = /([A-z]*\w+\n[A-z]*\w+\n[A-z]*\w+)/
  let P2 = input.split(re)
                .filter(x => x.length > 2)
                .map(x => x.split('\n'))
                .map(x => intersection(x[0], x[1], x[2]))
                .map(x => priorities.indexOf(x))
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  output.value += "2022, Day 3\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[3][7] = (input) => {
  let contains = (pairing) => {
    let x1 = pairing[0][0], y1 = pairing[0][1];
    let x2 = pairing[1][0], y2 = pairing[1][1];
    if((x1 >= x2 && y1 <= y2) || (x1 <= x2 && y1 >= y2))
      return true;
    return false;
  };
  let overlap = (pairing) => {
    let x1 = pairing[0][0], y1 = pairing[0][1];
    let x2 = pairing[1][0], y2 = pairing[1][1];
    if((x1 <= y2 && y1 >= y2) || (y1 >= x2 && x1 <= x2) || contains(pairing))
      return true;
    return false;
  };
  input = input.split('\n').map(x => x.split(',').map(x => x.split('-').map(x => Number.parseInt(x))));

  let P1 = input.filter(pair => contains(pair)).length;
  let P2 = input.filter(pair => overlap(pair)).length;
  output.value += "2022, Day 4\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[4][7] = (input) => {
  input = input.split('\n\n').map(x => x.split('\n'));
  let stack_amt = input[0][input[0].length-1].trim().split('   ').length;
  let stacks1 = new Array(stack_amt);
  let stacks2 = new Array(stack_amt);
  for(let i = 0; i < stacks1.length; i++){
    stacks1[i] = new Array();
    stacks2[i] = new Array();
  }

  let stack_lines = input[0].splice(0, input[0].length-1);
  for(let i = 0; i < stack_lines.length; i++){
    for(let j = 0; j < stack_lines[i].length; j += 4){
      let box = stack_lines[i].substring(j, j+3);
      if(box != '   '){
        stacks1[j/4].push(box);
        stacks2[j/4].push(box);
      }
    }
  }

  stacks1.map(x => x.reverse());
  stacks2.map(x => x.reverse());

  let instructions = input[1].map(x => x.match(/[0-9]+/g).map(y => Number.parseInt(y)));
  console.log(instructions);

  let move = (inst, mover) => { 
    let num = inst[0], loc1 = stacks1[inst[1] - 1], dest1 = stacks1[inst[2] - 1];
    let loc2 = stacks2[inst[1] - 1], dest2 = stacks2[inst[2] - 1];
    let crane = [];
    if(mover == 9000){
      for(let i = 0; i < num; i++){
        if(loc1.length > 0)
          dest1.push(loc1.pop());
      }
    }
    else if(mover == 9001){
      for(let i = 0; i < num; i++){
        if(loc2.length > 0)
          crane.push(loc2.pop());
      }
      while(crane.length > 0)
        dest2.push(crane.pop());
    }
  };

  console.log(instructions);
  instructions.forEach(x => move(x, 9000));
  instructions.forEach(x => move(x, 9001));

  let P1 = "";
  for(let i = 0; i < stacks1.length; i++){
    if(stacks1[i].length > 0)
      P1 += stacks1[i][stacks1[i].length - 1].charAt(1);
    else
      P1 += " ";
  }

  let P2 = "";
  for(let i = 0; i < stacks2.length; i++){
    if(stacks2[i].length > 0)
      P2 += stacks2[i][stacks2[i].length - 1].charAt(1);
    else
      P2 += " ";
  }

  output.value += "2022, Day 5\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[5][7] = (input) => {
  let findMarker = (len) => {
    for(let i = len; i <= input.length; i++){
      let packet = input.substring(i-len,i);
      if(!duplicates(packet))
        return i;
    }
    return 0;
  }
  let duplicates = (str) => {
    for(let i = 0; i < str.length; i++){
      if(str.substring(i+1,str.length).indexOf(str.charAt(i)) != -1)
        return true;
    }
    return false;
  }

  P1 = findMarker(4);
  P2 = findMarker(14);
  output.value += "2022, Day 6\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[6][7] = (input) => {
  input = input.split('\n');

  class elfFile {
    constructor(str) {
      this.name = str.split(' ')[1];
      this.size = Number.parseInt(str.split(' ')[0]);
    }
    static isParseable(str) {
      return Number.isInteger(Number.parseInt(str.split(' ')[0]));
    }
  };

  class elfDirectory {
    constructor(name, parent) {
      this.name = name;
      this.files = [];
      if(parent != null)
        parent.children.push(this);
      this.children = [];
      this.parent = parent;
    }

    addFile(file) {
      this.files.push(file);
    }

    size() {
      return this.files.reduce((a,c) => a + c.size, 0) + this.children.reduce((a,c) => a + c.size(), 0);
    }

    static buildFileSystem(lines) {
      let root = new elfDirectory('/', null);
      let currentDir = root;
      for(const line of lines){
        if(elfDirectory.isParseable(line))
          processDirLine(currentDir, line);
        else if(elfFile.isParseable(line))
          processFileLine(currentDir, line);
        else if(line.startsWith('$ cd'))
          currentDir = processDirChange(currentDir, line);
      }
      return root;
    }

    static isParseable(str) {
      return str.split(' ')[0] == 'dir';
    }
  };

  let processDirLine = (currentDir, str) => {
    return new elfDirectory(str.split(' ')[1], currentDir);
  };

  let processFileLine = (currentDir, str) => {
    currentDir.files.push(new elfFile(str));
  };

  let processDirChange = (currentDir, str) => {
    switch(str.split(' ')[2]){
    case '..':
      return currentDir.parent;
    case '/':
      return currentDir;
    default:
      return currentDir.children.find(x => x.name == str.split(' ')[2]);
    }
  };

  let findAllDirs = (dir) => {
    let dirs = [];
    dirs.push(dir);
    for(const child of dir.children)
      findAllDirs(child).forEach(x => dirs.push(x));
    return dirs;
  };

  let part1 = (lines) => {
    let fileSystem = elfDirectory.buildFileSystem(lines);
    let dirs = findAllDirs(fileSystem);
    let total = 0;
    for(const dir of dirs){
      let size = dir.size();
      size <= 100000 ? total += size : 0;
    }
    return total;
  };

  let part2 = (lines) => {
    let fileSystem = elfDirectory.buildFileSystem(lines);
    let used = fileSystem.size();
    let needed = 30000000 - (70000000 - used);
    let dirs = findAllDirs(fileSystem);
    let lowest = 70000000;
    for(const dir of dirs){
      let size = dir.size();
      if(size > needed && size < lowest)
        lowest = size;
    }
    return lowest;
  };

  let P1 = part1(input), P2 = part2(input);

  output.value += "2022, Day 7\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[7][7] = (input) => {
  class Tree {
    constructor(height, x, y) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.visibility = false;
      this.scenicScore = 0;
    }

    isVisible(trees) {
      let row = trees.filter(x => x.y == this.y);
      let col = trees.filter(x => x.x == this.x);
      let [left, right, up, down] = [true,true,true,true];
      row.forEach(x => (x.x < this.x && x.height >= this.height) ? left = false : 0);
      row.forEach(x => (x.x > this.x && x.height >= this.height) ? right = false : 0);
      col.forEach(x => (x.y < this.y && x.height >= this.height) ? down = false : 0);
      col.forEach(x => (x.y > this.y && x.height >= this.height) ? up = false : 0);
      this.visibility = left || right || up || down;
    }

    calcScore(trees) {
      let row = trees.filter(x => x.y == this.y);
      let col = trees.filter(x => x.x == this.x);

      let left = row.filter(x => x.x < this.x).reverse();
      let treesLeft = left.slice(0,left.findIndex(x => x.height >= this.height));
      let L = (treesLeft.length == left.length) ? treesLeft.length : treesLeft.length + 1;

      let right = row.filter(x => x.x > this.x);
      let treesRight = right.slice(0,right.findIndex(x => x.height >= this.height));
      let R = (treesRight.length == right.length) ? treesRight.length : treesRight.length + 1;

      let up = col.filter(x => x.y < this.y).reverse();
      let treesUp = up.slice(0,up.findIndex(x => x.height >= this.height));
      let U = (treesUp.length == up.length) ? treesUp.length : treesUp.length + 1;

      let down = col.filter(x => x.y > this.y);
      let tressDown = down.slice(0,down.findIndex(x => x.height >= this.height));
      let D = (tressDown.length == down.length) ? tressDown.length : tressDown.length + 1;

      this.scenicScore = L*R*U*D;
    }
  }
  input = input.split('\n').map(x => x.split(''));
  input = input.map((x,n) => x.map((y,m) => new Tree(Number.parseInt(y), m, n))).flat();
  input.forEach(x => x.isVisible(input));
  input.forEach(x => x.calcScore(input));

  let P1 = input.filter(x => x.visibility).length;
  let P2 = input.sort((a,b) => b.scenicScore - a.scenicScore)[0].scenicScore;

  output.value += "2022, Day8\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[8][7] = (input) => {
  class Knot {
    constructor(number,parent){
      this.number = number;
      this.parent = parent;
      this.nextKnot = null;
      if(parent != null)
        parent.nextKnot = this;
      this.x = 0;
      this.y = 0;
      this.visited = [[0,0]];
    }

    distance(){
      let distance = Math.sqrt(Math.pow(this.x - this.parent.x, 2) + Math.pow(this.y - this.parent.y, 2));
      return distance;
    }

    move(){
      let dx = this.x - this.parent.x, dy = this.y - this.parent.y;
      if(this.distance() >= 2){
        if(dy > 0)
          this.y--;
        else if(dy < 0)
          this.y++;
        if(dx > 0)
          this.x--;
        else if(dx < 0)
          this.x++;
      }
      if(this.visited.findIndex(c => (c[0] == this.x && c[1] == this.y)) == -1)
        this.visited.push([this.x, this.y]);
      if(this.nextKnot != null)
        this.nextKnot.move();
    }
  }
  class Rope {
    constructor(knots){
      this.head = new Knot(0, null);
      this.knots = [this.head];
      for(let i = 0; i < knots-1; i++){
        this.knots.push(new Knot(i+1, this.knots[i]));
      }
    }
    move(dir, times){
      for(let i = 0; i < times; i++){
        let xh = this.head.x, yh = this.head.y;
        switch(dir){
        case "U":
          this.head.y--;
          break;
        case "D":
          this.head.y++;
          break;
        case "L":
          this.head.x--;
          break;
        case "R":
          this.head.x++;
          break;
        }
        this.head.nextKnot.move();
      }
    }
  }

  let rope = new Rope(10);

  input = input.split('\n').map(x => x.split(' ')).map(x => [x[0], Number.parseInt(x[1])]);
  input.forEach(x => rope.move(x[0],x[1]));

  let P1 = rope.knots[1].visited.length;
  let P2 = rope.knots[9].visited.length;

  output.value += "2022, Day 9\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[9][7] = (input) => {
  class Pixel{
    constructor(){
      this.loc = [0,1,2];
      this.lines = new Array(6).fill(new Array(40).fill(' '));
      console.log(this.lines);
    }
    mark(lineNum, cycle){
      let point = this.loc.find(x => x == ((cycle - 1) % 40));
      //console.log([lineNum, cycle, point]);
      if(point != undefined){
        console.log('marking');
        this.lines[lineNum] = this.lines[lineNum].map((x,n) => n == point ? "#" : x);
      }
    }
    move(amt){
      this.loc = this.loc.map(x => x += amt);
    }
    print(){
      let result = "";
      for(let i = 0; i < this.lines.length; i++)
        result += this.lines[i].join('') + "\n";
      return result;
    }
  }
  class Register{
    constructor(){
      this.val = 1;
      this.cycle = 0;
      this.strengths = [];
      this.pixel = new Pixel();
    }
    runInst(inst){
      switch(inst[0]){
      case "noop":
        this.incCycle(1);
        break;
      case "addx":
        this.incCycle(2);
        this.val += Number.parseInt(inst[1]);
        this.pixel.move(Number.parseInt(inst[1]));
        break;
      }
    }
    incCycle(num){
      for(let i = 0; i < num; i++){
        this.cycle++;
        let lineNum = Math.floor((this.cycle - 1) / 40);
        this.pixel.mark(lineNum, this.cycle);
        if(this.cycle % 40 == 20)
          this.strengths.push(this.cycle * this.val);
      }
    }
  }

  let regX = new Register();
  input = input.split('\n').map(x => x.split(' '));
  input.forEach(x => regX.runInst(x));

  let P1 = regX.strengths.reduce((a,c) => a + c, 0);
  let P2 = regX.pixel.print();

  output.value += "2022, Day 10\nPart 1: " + P1 + "\nPart 2: \n" + P2 + "\n\n";
};

aof[10][7] = (input) => {};

aof[11][7] = (input) => {};

aof[12][7] = (input) => {};

aof[13][7] = (input) => {};

aof[14][7] = (input) => {};

aof[15][7] = (input) => {};

aof[16][7] = (input) => {};

aof[17][7] = (input) => {};

aof[18][7] = (input) => {};

aof[19][7] = (input) => {};

aof[20][7] = (input) => {};

aof[21][7] = (input) => {};

aof[22][7] = (input) => {};

aof[23][7] = (input) => {};

aof[24][7] = (input) => {};