var output = document.getElementById("output");

aof[0][2] = (input) => {
	var tape = [];
	var P1 = 0, P2 = 0;
	var half = input.length/2;

	for(let i = 0; i < input.length; i++){
		tape.push(parseInt(input[i]));
	}

	for(let i = 0; i < tape.length; i++){
		if(i == tape.length-1){
			if(tape[0] == tape[i]){
				P1 += tape[0];
			}
		}
		else if(tape[i] == tape[i+1]){
			P1 += tape[i];
		}
	}

	for(let i = 0; i < tape.length; i++){
		let index = (i + half) % tape.length;
		if(tape[i] == tape[index])
			P2 += tape[i];
	}

	output.value = "2017, Day 1\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[1][2] = (input) => {
	var P1 = 0, P2 = 0;
	var lines = input.split('\n');

	for(let i = 0; i < lines.length; i++){
		lines[i] = lines[i].split("\t");
		for(let j = 0; j < lines[i].length; j++)
			lines[i][j] = parseInt(lines[i][j]);
	}

	for(let i = 0; i < lines.length; i++){
		P1 += Math.max(...lines[i]) - Math.min(...lines[i]);
	}

	const evenlyDivisible = (line) => {
		for(let i = 0; i < line.length; i++){
			for(let j = 0; j < line.length; j++){
				if((i != j) && ((line[i] % line[j]) == 0)){
					P2 += (line[i] / line[j]);
				}
			}
		}
	};

	for(let i = 0; i < lines.length; i++){
		evenlyDivisible(lines[i]);
	}

	console.log(lines);

	output.value = "2017, Day 2\nPart 1: " + P1 + "\nPart 2: " + P2;
};


aof[2][2] = (input) => {
	var P1 = 0, P2 = 0;

	var dir = 'N';

	output.value = "2017, Day 3\nPart 1: " + P1 + "\nPart 2: " + P2;
};