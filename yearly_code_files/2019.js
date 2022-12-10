//Day1
aof[0][4] = (input) => {
	var masses = input.split('\n');
	var P1 = 0, P2 = 0;
	for(var i = 0; i < masses.length; i++){
		var mass = parseInt(masses[i]);
		P1 += (Math.floor(mass / 3) - 2);
		mass = (Math.floor(mass / 3) - 2);
		do{
			P2 += mass;
			mass = (Math.floor(mass / 3) - 2);
		}while(mass > 0);
	}
	
	alert("2019, Day 1\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day2
aof[1][4] = (input) => {
	var ints = input.split(',').map(Number);
	ints[1] = 12;
	ints[2] = 2;
	var P1 = 0;
	var pos = 0;
	while(ints[pos] != 99){
		var op = ints[pos];
		var n1 = ints[ints[pos+1]];
		var n2 = ints[ints[pos+2]];
		var out = ints[pos+3];
		if(op == 1){
			ints[out] = n1 + n2;
		}
		else{
			ints[out] = n1 * n2;
		}
		pos += 4;
	}
	P1 = ints[0];

	var expected = 19690720;
	var P2 = 0;
	for(var noun = 10; noun < 100; noun++){
		for(var verb = 10; verb < 100; verb++){
			ints = input.split(',').map(Number);
			ints[1] = noun;
			ints[2] = verb;
			pos = 0;
			while(ints[pos] != 99){
				var op = ints[pos];
				var n1 = ints[ints[pos+1]];
				var n2 = ints[ints[pos+2]];
				var out = ints[pos+3];
				if(op == 1){
					ints[out] = n1 + n2;
				}
				else{
					ints[out] = n1 * n2;
				}
				pos += 4;
			};
			if(ints[0] == expected)
				P2 = (100 * noun) + verb;
		}
	}
	alert("2019, Day 2\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day3
aof[2][4] = (input) => {
	function between(a,b,num){
		if((num <= a && num >= b) || (num >= a && num <= b))
			return true;
		return false;
	}

	var P1, P2;
	var intersections = [];
	var x = 0, y = 0;
	var w1 = [], w2 = [];
	var directions = input.split("\n").map(x => x.split(','));
	for(d of directions[0]){
		var start = [x,y];
		var cnt = parseInt(d.substring(1));
		var distance = parseInt(d.substring(1));
		switch(d[0]){
			case 'U':
				y += cnt;
				break;
			case 'R':
				x += cnt;
				break;
			case 'L':
				x -= cnt;
				break;
			case 'D':
				y -= cnt;
				break;
		}
		w1.push({
			dir: d[0],
			dist: distance,
			xA: start[0],
			xB: x,
			yA: start[1],
			yB: y
		});
	}
	x = 0, y = 0;
	for(d of directions[1]){
		start = [x,y];
		var cnt = parseInt(d.substring(1));
		var distance = parseInt(d.substring(1));
		switch(d[0]){
			case 'U':
				y += cnt;
				break;
			case 'R':
				x += cnt;
				break;
			case 'L':
				x -= cnt;
				break;
			case 'D':
				y -= cnt;
				break;
		}
		w2.push({
			dir: d[0],
			dist: distance,
			xA: start[0],
			xB: x,
			yA: start[1],
			yB: y
		});
	}

	var distA = 0;
	for(var i = 0; i < w1.length-1; i++){
		var lineA = w1[i];
		var distB = 0;
		for(var j = 0; j < w2.length-1; j++){
			var lineB = w2[j];
			var posA = distA;
			var posB = distB;
			if(lineB.xA == lineB.xB)
				if(between(lineA.xA, lineA.xB, lineB.xA) && between(lineB.yA, lineB.yB, lineA.yA)){
					switch(lineA.dir){
						case 'L':
							posA = distA + lineA.xA - lineB.xA;
							break;
						case 'R':
							posA = distA + lineB.xA - lineA.xA;
							break;
					}switch(lineB.dir){
						case 'U':
							posB = distB + lineA.yA - lineB.yA;
							break;
						case 'D':
							posB = distB + lineB.yA - lineA.yA;
							break;
					}
					intersections.push([lineB.xA, lineA.yA, posA, posB]);
				}
			else
				if(between(lineA.yA, lineA.yB, lineB.yA) && between(lineB.xA, lineB.xB, lineA.xA)){
					switch(lineB.dir){
						case 'R':
							posB = distB + lineA.xA - lineB.xA;
							break;
						case 'L':
							posB = distB + lineB.xA - lineA.xA;
							break;
					}switch(lineA.dir){
						case 'D':
							posA = distA + lineA.yA - lineB.yA;
							break;
						case 'U':
							posA = distA + lineB.yA - lineA.yA;
							break;
					}
					intersections.push([lineA.xA, lineB.yA, posA, posB]);
				}

			distB += lineB.dist;
		}
		distA += lineA.dist;
	}

	var manDists = intersections.map(x => Math.abs(x[0]) + Math.abs(x[1]));
	var steps = intersections.map(x => x[2] + x[3]);

	P1 = Math.min(...manDists);
	P2 = Math.min(...steps);

	alert("2019, Day 3\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day4
aof[3][4] = (input) => {
	var range = input.split("-").map(x => parseInt(x));
	function digits(val){
		digitChars = (val + "").split("");
		return digitChars.map(x => parseInt(x));
	}
	function repeat(digits){
		var rep = false;
		for(var i = 0; i < digits.length-1; i++){
			if(digits[i] == digits[i+1])
				rep = true;
		}
		return rep;
	}
	function increase(digits){
		var inc = true;
		for(var i = 0; i < digits.length-1; i++){
			if(digits[i+1] < digits[i])
				inc = false;
		}
		return inc;
	}
	function double(digits){
		var d = false;
		for(var i = 1; i < digits.length; i++){
			if(digits[i] == digits[i-1] && digits[i+1] != digits[i] && digits[i-2] != digits[i])
				d = true;
		}
		return d;
	}

	var P1 = 0, P2 = 0;
	for(var i = range[0]; i <= range[1]; i++){
		if(increase(digits(i))){
			if(repeat(digits(i))){
				P1++;
			}
			if(double(digits(i))) {
				P2++;
			}
		}
	}

	alert("2019, Day 4\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day5
aof[4][4] = (input) => {
	var instructions = input.split(",").map(Number);

	const getDiagnosticCode = (instructions, part2) => {
		let diagnosticCode = null,
				instructionPointer = 0;
		while (instructions[instructionPointer] !== 99) {
			const instruction = instructions[instructionPointer].toString();
			const opcode = instruction[instruction.length - 1];
			const parameterModes = instruction.slice(0, instruction.length - 2);
			const [C = "0", B = "0", A = "0"] = [...parameterModes].reverse();
			let increaseBy = 0;
			if ("125678".includes(opcode)) {
					const [input1, input2, output] = instructions.slice(instructionPointer + 1, instructionPointer + 4);
					const a = (C === "0") ? instructions[input1] : input1;
					const b = (B === "0") ? instructions[input2] : input2;
					if (opcode === "1") {
							instructions[output] = a + b;
					} else if (opcode === "2") {
							instructions[output] = a * b;
					} else if (opcode === "5" || opcode === "6") {
							if ((opcode === "5") ? (a !== 0) : (a === 0)) {
									instructionPointer = b;
									continue;
							}
							increaseBy = -1;
					} else if (opcode === "7") {
							instructions[output] = (a < b) ? 1 : 0;
					} else if (opcode === "8") {
							instructions[output] = (a === b) ? 1 : 0;
					}
					increaseBy += 4;
			} else if (opcode === "3") {
					instructions[instructions[instructionPointer + 1]] = (part2) ? 5 : 1;
					increaseBy += 2;
			} else if (opcode === "4") {
					if (A === "0") {
							diagnosticCode = instructions[instructions[instructionPointer + 1]];
					}
					increaseBy += 2;
			}
			instructionPointer += increaseBy;
		}
		return diagnosticCode;
	};

	const P1 = getDiagnosticCode(instructions);
	instructions = input.split(",").map(Number);
	const P2 = getDiagnosticCode(instructions, true)

	alert("2019, Day 5\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day6
aof[5][4] = (input) => {
	const orbits = input.split("\n").map(x => x.split(")"));
	var base = [[{name: "COM", depth: 0}]];
	var you, san;
	for(let i = 0; i < orbits.length; i++){
		let o = orbits[i];
		orbits[i] = {
			name: o[1],
			orbitting: o[0],
			depth: 0
		};
	}

	function findAllAtDepth(depthList, orbits){
		var result = [];
		for(o of depthList){
			result = [...result, ...findOrbitters(o, orbits)];
		}
		return result;
	}

	function findOrbitters(node, orbits){
		var result = [];
		for(o of orbits){
			if(o.orbitting === node.name){
				o.orbitting = node;
				result = [...result, o];
			}
		}
		return result;
	}

	var i = 0;
	var list = findAllAtDepth(base[i], orbits);
	while(list.length > 0){
		base = [...base, list];
		i++;
		list = findAllAtDepth(base[i], orbits);
	}
	var P1 = 0;
	for(var x = 0; x < base.length; x++){
		P1 += (base[x].length * x);
	}
	console.log(P1);

	for(var x = 0; x < base.length; x++){
		for(o of base[x])
			o.depth = x;
	}

	for(o of orbits){
		if(o.name === "YOU")
			you = o;
		if(o.name === "SAN")
			san = o;
	}

	var P2 = 0;
	while(you.orbitting !== san.orbitting){
		if(you.depth > san.depth){
			you = you.orbitting;
			P2++;
		}
		else if(you.depth < san.depth){
			san = san.orbitting;
			P2++;
		}
		else{
			you = you.orbitting;
			san = san.orbitting;
			P2 += 2;
		}
	}
	console.log(P2);
};

//Day7
aof[6][4] = (input) => {
	let data = input.toString().split(",").map(Number)

	let output =''; 
	let maxValue = 0;
	let finished = false;
	var indexes = [0,0,0,0,0]
	var arrays = [[...data],[...data],[...data],[...data],[...data]]
	var queues = [[],[],[],[],[]]

	const program = function (part){
		part == 'partOne' ? combinations = getAnagrams('01234') : combinations = getAnagrams('56789');
		combinations.forEach(el =>{
				queues = [[],[],[],[],[]]
				finished = false;
				indexes = [0,0,0,0,0]
				arrays = [[...data],[...data],[...data],[...data],[...data]]
				let arr = el.split('').map(Number)
				for(var i =0;i<arr.length;i++){
						queues[i].push(arr[i]);
				}
				queues[0].push(0)
				const res = function(){
						while(!finished){
								for(let j=0;j<5;j++){
										signal = getSignal(arrays[j],indexes[j],j,queues[j],queues[(j+1)%5])
								}
						}
								return signal
				}
				res() > maxValue ? maxValue = res() : undefined;
		})
		console.log(part + ' : ' + maxValue)
	}

	program('partOne')
	program('partTwo')

	function getSignal(data,iP,id,queue,dest){ // Amp's array, indexPointer, Amp's id, Amp's queue list, Amp's output receiver 

		for(let i=iP;i<data.length;i++){
				let opcode = data[i].toString().split('');
				let instruction = '';
				opcode.length == 1 ? instruction = parseInt(opcode[opcode.length-1]) :  instruction = parseInt(opcode[opcode.length-2] + opcode[opcode.length-1])
				if(instruction==3){
						if(queue.length<1){
								indexes[id] = i-1;
								return 
						}else{
							input = queue.shift() 
						}
						
				}
				if(instruction==99){
						dest.push(output)
						id==4 ? finished = true : undefined;
						return output
				}
				opcode[opcode.length-3] ? modeFirstP = parseInt(opcode[opcode.length-3]) : modeFirstP = 0;
				opcode[opcode.length-4] ? modeSecondP = parseInt(opcode[opcode.length-4]) : modeSecondP = 0;
				modeFirstP == 1 ? valFirst = data[i+1] : valFirst = data[data[i+1]];
				modeSecondP == 1 ? valSecond= data[i+2] : valSecond = data[data[i+2]];
				i = process(instruction,valFirst,valSecond,i,input,data)
				if(instruction==4){
						indexes[id] = i;
						dest.push(output)
						return output
				}
		}
		return output
	}

	function process(opcode, firstVal, secondVal,i,input,data){

		switch(opcode){
				case 1:
						data[data[i+3]] = firstVal + secondVal
						i+=3;
						break;            
				case 2:
						data[data[i+3]] =firstVal * secondVal
						i+=3;
						break;
				case 3:
						data[data[i+1]] = input;
						i+=1;
						break;       
				case 4:
						output = firstVal;
						i+=1;
						break;
				case 5:
						firstVal !== 0 ? i = secondVal - 1 : undefined;          
						break;
				case 6:
						firstVal == 0 ? i = secondVal - 1 : undefined;          
						break;
				case 7:
						firstVal < secondVal ? data[data[i+3]] = 1 : data[data[i+3]] = 0;
						i+=3;
						break;
				case 8:
						firstVal == secondVal ? data[data[i+3]] = 1 : data[data[i+3]] = 0;
						i+=3;
						break;       
		}
		return i
	}

	function swap(chars, i, j) {
		var tmp = chars[i];
		chars[i] = chars[j];
		chars[j] = tmp;
	}

	function getAnagrams(input) {
		var counter = [],
				anagrams = [],
				chars = input.split(''),
				i;
		for (i = 0; i < chars.length; i++) {
				counter[i] = 0;
		}
		anagrams.push(input);
		i = 0;
		while (i < chars.length) {
				counter[i]<i ? (swap(chars, i % 2 === 1 ? counter[i] : 0, i),counter[i]++, i =0,  anagrams.push(chars.join(''))) : (counter[i] = 0, i++)
		}

		return anagrams;
	}
};

//Day 8
aof[7][4] = (input) => {
	var values = input.split("").map(Number);
	var layers = [];
	var layerLength = 25 * 6;
	var currentIndex = 0;
	for(let i = 0; i < values.length; i += layerLength)
		layers = [...layers, values.slice(i, i + layerLength)];
	var leastZeroes = [Infinity, Infinity, Infinity, []];
	for(l of layers){
		let zeroes = 0, ones = 0, twos = 0;
		for(c of l){
			if(c === 0)
				zeroes++;
			else if(c === 1)
				ones++;
			else if(c === 2)
				twos++;
		}
		leastZeroes = (zeroes < leastZeroes[0]) ? [zeroes, ones, twos, l] : leastZeroes;
	}
	console.log(leastZeroes[1] * leastZeroes[2]);

	var message = layers[0];
	for(l of layers){
		for(let i = 0; i < l.length; i++){
			if(l[i] !== 2 && message[i] === 2)
				message[i] = l[i];
		}
	}
	var P2 = "";
	for(let i = 0; i < message.length; i++){
		if(message[i] == 0)
			message[i] = " ";
		if(message[i] == 1)
			message[i] = ".";
	}
	message = message.join("");
	for(let i = 0; i < message.length; i += 25){
		P2 += message.substring(i, i+25) + "\n";
	}
	console.log(P2);
};

//Day 9
aof[8][4] = (input) => {
	let data = input.toString().split(',').map(Number);
	let resetArr = [...data];
	let output = [];
	let relBase = 0;

	console.log(getDiagnostic(1)[0]);
	console.log(getDiagnostic(2)[0]);

	function getValue(a){
		return data[a] == undefined ? 0 : data[a];
	}

	function getIndex(mode, ip){
		switch(mode){
			case 0: return data[ip];
			case 1: return ip;
			case 2: return relBase + data[ip];
		}
	}

	function getDiagnostic(input){
		data = [...resetArr];
		relBase = 0;
		output = [];

		for(let i = 0; i < data.length; i++){
			let opcode = data[i].toString().split('');
			opcode.length == 1 ? instruction = parseInt(opcode[opcode.length-1]) : instruction = parseInt(opcode[opcode.length-2] + opcode[opcode.length-1]);
			if(instruction === 99){
				i = data.length;
				return output;
			}
			let mode1 = opcode[opcode.length-3] ? parseInt(opcode[opcode.length-3]) : 0;
			let mode2 = opcode[opcode.length-4] ? parseInt(opcode[opcode.length-4]) : 0;
			let mode3 = opcode[opcode.length-5] ? parseInt(opcode[opcode.length-5]) : 0;
			let a = getIndex(mode1, i+1);
			let b = getIndex(mode2, i+2);
			let c = getIndex(mode3, i+3);
			switch(instruction){
				case 1:
					data[c] = getValue(a) + getValue(b);
					i += 3;
					break;
				case 2:
					data[c] = getValue(a) * getValue(b);
					i += 3;
					break;
				case 3:
					data[a] = input;
					i += 1;
					break;
				case 4:
					output.push(data[a]);
					i += 1;
					break;
				case 5:
					getValue(a) != 0 ? i = getValue(b) - 1 : i += 2;
					break;
				case 6:
					getValue(a) == 0 ? i = getValue(b) - 1 : i += 2;
					break;
				case 7:
					getValue(a) < getValue(b) ? data[c] = 1 : data[c] = 0;
					i += 3;
					break;
				case 8:
					getValue(a) == getValue(b) ? data[c] = 1 : data[c] = 0;
					i += 3;
					break;
				case 9:
					relBase += getValue(a);
					i += 1;
					break;
			}
		}
		return output;
	}
};

//Day10
aof[9][4] = (input) => {
	const map = input.split('\n').map(x => x.split(''));
	const getSlope = (a1, a2) => {
		let dx = a2[1] - a1[1];
		let dy = a2[0] - a1[0];
		let frac = reduceFrac(dy,dx);
		return [frac[0],frac[1]];
	};
	const reduceFrac = (numerator, denominator) => {
		const gcd = (a,b) => {return ((a % b) ? gcd(b, a % b) : b);};
		let div = gcd(numerator, denominator);
		let num = (div) ? numerator/div : 0;
		let den = (div) ? denominator/div : 0;
		return [num, den];
	};
	const vis = (row, col) => {
		let slopesSeen = [];
		for(let y = 0; y < map.length; y++){
			for(let x = 0; x < map[0].length; x++){
				if(map[y][x] == '#'){
					let slope = getSlope([row,col],[y,x]);
					if(!blocked(slope,slopesSeen))
						slopesSeen.push(slope);
				}
			}
		}
		return slopesSeen.length;
	};
	const blocked = (slope, blockedSlopes) => {
		for(s of blockedSlopes){
			if(s[0] === slope[0] && s[1] === slope[1])
				return true;
		}
		return false;
	};
	let rows = map.length, cols = map[0].length;
	let maxVisible = 0;
	let visibles = [];
	let xMax, yMax;
	for(let y = 0; y < rows; y++){
		for(let x = 0; x < cols; x++){
			if(map[y][x] == '#'){
				let visible = vis(y,x);
				if(visible > maxVisible){
					xMax = x;
					yMax = y;
					maxVisible = visible;
				}
				visibles = [...visibles, visible];
			}
		}
	}
	console.log(visibles);
	console.log(maxVisible);
};