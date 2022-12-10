var output = document.getElementById("output");

aof[0][3] = (input) => {
  P1 = 0, P2 = 0, visited = [0];
  input = input.split('\n').join(' ').trim().split(' ').map(x => Number.parseInt(x));
  P1 = input.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  let seen = (array, value) => {
    for(let i = 0; i < array.length; i++){
      if(array[i] == value)
        return true;
    }
    if(value == 124645)
      console.log(value);
    return false;
  }

  while(P2 == 0){
    for(let i = 0; i < input.length; i++){
      let freq = visited[visited.length-1] + input[i];
      if(seen(visited, freq) && P2 == 0){
        console.log("here");
        P2 = freq;
      }
      visited.push(freq);
    }
  }

  output.value = "2018, Day 1\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[1][3] = (input) => {
  
};

aof[2][3] = (input) => {};

aof[3][3] = (input) => {};

aof[4][3] = (input) => {};

aof[5][3] = (input) => {};

aof[6][3] = (input) => {};

aof[7][3] = (input) => {};

aof[8][3] = (input) => {};

aof[9][3] = (input) => {};

aof[10][3] = (input) => {};

aof[11][3] = (input) => {};

aof[12][3] = (input) => {};

aof[13][3] = (input) => {};

aof[14][3] = (input) => {};

aof[15][3] = (input) => {};

aof[16][3] = (input) => {};

aof[17][3] = (input) => {};

aof[18][3] = (input) => {};

aof[19][3] = (input) => {};

aof[20][3] = (input) => {};

aof[21][3] = (input) => {};

aof[22][3] = (input) => {};

aof[23][3] = (input) => {};

aof[24][3] = (input) => {};