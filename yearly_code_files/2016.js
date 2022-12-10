var output = document.getElementById("output");

//Day1
aof[0][1] = (input) => {
	let directions = input.split(', ').map(x => [x[0], parseInt(x.substring(1))]);
	console.log(directions);
	var visited = ["0,0"];
	var me = {
		facing: 'N',
		xPos: 0,
		yPos: 0
	};
	const changeDir = (turn, person) => {
		cardinal = ['N', 'E', 'S', 'W'];
		myDir = person.facing;
		if(turn === "R"){person.facing = (myDir !== 'W') ? cardinal[cardinal.indexOf(person.facing) + 1] : 'N';}
		else{person.facing = (myDir !== 'N') ? cardinal[cardinal.indexOf(person.facing) - 1] : 'W';}
	};
	var P2 = 0;
	for(d of directions){
		let dist = d[1];
		changeDir(d[0], me);
		for(i = 0; i < dist; i++){
			switch(me.facing){
				case 'N':
					me.yPos++;
					break;
				case 'E':
					me.xPos++;
					break;
				case 'S':
					me.yPos--;
					break;
				case 'W':
					me.xPos--;
					break;
			}
			let loc = me.xPos + "," + me.yPos;
			if(P2 === 0 && visited.includes(loc))
				P2 = Math.abs(me.xPos) + Math.abs(me.yPos);
			else
				visited = [...visited, loc];
		}
	}

	console.log(Math.abs(me.xPos) + Math.abs(me.yPos));
	console.log(P2);
};

//Day2
aof[1][1] = (input) => {
	var instructions = input.split('\n');
	var keypad1 = [['1','2','3'],
								 ['4','5','6'],
								 ['7','8','9']];
	var keypad2 = [[   ,   ,'1',   ,   ,],
								 [   ,'2','3','4',   ,],
								 ['5','6','7','8','9' ],
								 [   ,'A','B','C',   ,],
								 [   ,   ,'D',   ,   ,]];
	const getKeyCode = (keypad, xStart, yStart) => {
		let keycode = "";
		let col = xStart;
		let row = yStart;
		for(i of instructions){
			for(c of i){
				switch(c) {
					case 'U':
						row -= (keypad[row-1] !== undefined && keypad[row-1][col] !== undefined) ? 1 : 0;
						break;
					case 'D':
						row += (keypad[row+1] !== undefined && keypad[row+1][col] !== undefined) ? 1 : 0;
						break;
					case 'R':
						col += (keypad[row][col+1] !== undefined) ? 1 : 0;
						break;
					case 'L':
						col -= (keypad[row][col-1] !== undefined) ? 1 : 0;
						break;
				}
			}
			keycode += keypad[row][col];
		}
		return keycode;
	};
	console.log(getKeyCode(keypad1,1,1));
	console.log(getKeyCode(keypad2,0,2));
};

//Day 3
aof[2][1] = (input) => {
	var triangles = input.split("\n");
	var P1 = 0, P2 = 0;
	var tri1 = [], tri2 = [], tri3 = [];

	const isValidTriangle = (sides) => {
		return ((sides[0] + sides[1] > sides[2]) 
			&& (sides[1] + sides[2] > sides[0]) 
			&& (sides[2] + sides[0] > sides[1]))
	};

	for(var x = 0; x < triangles.length; x++){
		var sidesProto = triangles[x].split(" ");
		var sides = [];
		if(tri1.length >= 3){
			tri1 = [];
			tri2 = [];
			tri3 = [];
		}
		var cnt = 1;
		for(var i = 0; i < sidesProto.length; i++){
			let side = parseInt(sidesProto[i]);
			if(Number.isInteger(side)){
				sides.push(side);
				switch (cnt) {
					case 1:
						tri1.push(side);
						cnt++;
						break;
					case 2:
						tri2.push(side);
						cnt++;
						break;
					case 3:
						tri3.push(side);
						cnt++;
						break;
					default:
						break;
				}
			}
		};

		if(tri1.length == 3){
			if(isValidTriangle(tri1))
				P2++;
			if(isValidTriangle(tri2))
				P2++;
			if(isValidTriangle(tri3))
				P2++;
		}
		if(isValidTriangle(sides)){
			P1++;
		};
	}

	alert("2016, Day 3\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day 4
aof[3][1] = (input) => {
	var rooms = input.split("\n");
	var P1 =  0, P2 = 0;
	var validRooms = [];
	var NPRoom = "northpoleobjectstorage";
	var alpha = "abcdefghijklmnopqrstuvwxyz";

	const checked = (list, letter) => {
		for(var i = 0; i < list.length; i++){
			if(list[i][0] == letter)
				return true;
		}
		return false;
	};

	const swap = (list, index) => {
		let hold1 = list[index+1];
		let hold2 = list[index];
		list[index] = hold1;
		list[index+1] = hold2;
		return list;
	};

	const compare = (list, index) => {
		let val1 = list[index];
		let val2 = list[index+1];
		if(val2[1] > val1[1])
			return true;
		else if(val2[1] == val1[1]){
			if(val2[0] < val1[0])
				return true;
		}
		else
			return false;
	};

	const sort = (list) => {
		let hold = list;
		let sorting = false;
		do {
			sorting = false;
			for(var i = 0; i < hold.length-1; i++){
				if(compare(hold, i)){
					hold = swap(hold, i);
					sorting = true;
				}
			}
		} while(sorting);
		return hold;
	};

	const shift = (letter, id) => {
		let val = (alpha.indexOf(letter) + id) % 26;
		return alpha[val];
	};

	for(var i = 0; i < rooms.length; i++){
		let parts = rooms[i].split('-');
		let room = ["", ""];
		for(var j = 0; j < parts.length-1; j++){
			room[0] += parts[j];
		}
		room[1] += parts[parts.length-1];
		rooms[i] = room;
	}

	for(var i = 0; i < rooms.length; i++){
		var letterlist = [];
		for(var j = 0; j < rooms[i][0].length; j++){
			if(!checked(letterlist, rooms[i][0][j])){
				let cnt = 0;
				for(var k = 0; k < rooms[i][0].length; k++){
					if(rooms[i][0][k] == rooms[i][0][j])
						cnt++;
				}
				letterlist.push([rooms[i][0][j], cnt]);
			}
		}
		rooms[i].push(sort(letterlist));
	}

	for(var i = 0; i < rooms.length; i++){
		let room = rooms[i];
		let check = "";
		let checksum = room[1].substring(room[1].length - 6, room[1].length - 1);
		let roomId = parseInt(room[1].substring(0,room[1].indexOf('[')));

		for(var j = 0; j < 5; j++){
			check += room[2][j][0];
		}
		if(check == checksum){
			validRooms.push([room[0], roomId]);
			P1 += roomId;
		}
	}

	for(var i = 0; i < validRooms.length; i++){
		let room = validRooms[i];
		let code = room[0];
		let shifted = "";
		for(var j = 0; j < code.length; j++){
			shifted += shift(code[j], room[1]);
		}
		if(shifted == NPRoom){
			P2 = room[1];
		}
	}
	console.log(validRooms);

	alert("2016, Day 4\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day 5
aof[4][1] = (input) => {
	var P1 = "", P2 = "";
	var part2 = ['-','-','-','-','-','-','-','-'];
	var hash = input;
	var index = 0;

	while (P1.length != 8 || part2.indexOf('-') >= 0){
		let value = input + index;
		hash = calcMD5(value);
		if(hash.substring(0,5) == "00000"){
			if(P1.length != 8)
				P1 += hash[5];
			let loc = parseInt(hash[5]);
			let val = hash[6];
			if(loc >= 0 && loc <= 7){
				if(part2[loc] == '-'){
					part2[loc] = val;
				}
			}
		}
		index++;
	}

	for(var i = 0; i < part2.length; i++){
		P2 += part2[i];
	}

	alert("2016, Day 5\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day 6
aof[5][1] = (input) => {
	var P1 = "", P2 = "";
	var lines = input.split('\n')
	var columns = [];
	
	const checked = (list, element) => {
		for(let i = 0; i < list.length; i++){
			if(list[i][0] == element)
				return true;
		}
		return false;
	};

	const occurences = (list) => {
		let cntList = [];
		for(let i = 0; i < list.length; i++){
			if(!checked(cntList, list[i])){
				let cnt = 0;
				for(let j = 0; j < list.length; j++){
					if(list[j] == list[i])
						cnt++;
				}
				cntList.push([list[i], cnt]);
			}
		}
		return cntList;
	};

	const findMax = (list) => {
		var largest = list[0];
		for(let i = 0; i < list.length; i++){
			if(list[i][1] > largest[1])
				largest = list[i];
		}
		return largest;
	};

	const findMin = (list) => {
		var smallest = list[0];
		for(let i = 0; i < list.length; i++){
			if(list[i][1] < smallest[1])
				smallest = list[i];
		}
		return smallest;
	};

	for(let j = 0; j < lines[0].length; j++){
		let col = [];
		for(var i = 0; i < lines.length; i++){
			col.push(lines[i][j]);
		}
		columns.push(col);
	}

	for(let i = 0; i < columns.length; i++){
		P1 += findMax(occurences(columns[i]))[0];
		P2 += findMin(occurences(columns[i]))[0];
	}
	console.log(columns);

	alert("2016, Day 6\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day 7
aof[6][1] = (input) => {
	var P1 = 0, P2 = 0;
	var ips = input.split('\n');
	var validTLSIPs = [];
	var validSSLIPs = [];

	const separate = (ip) => {
		var hold = ip.split('[');
		var arr = [];
		for(let i = 0; i < hold.length; i++){
			let a = hold[i].split(']');
			for(let j = 0; j < a.length; j++){
				arr.push(a[j]);
			}
		}
		return arr;
	};

	const checkABBA = (string) => {
		for(let i = 0; i < string.length - 3; i++){
			if(string[i] == string[i+3] && string[i+1] == string[i+2] && string[i] != string[i+1])
				return true;
		}
		return false;
	};

	const validTLS = (ipList) => {
		var tlsips = [];
		for(let i = 0; i < ipList.length; i++){
			let invalid = false;
			let valid = false;
			for(let j = 0; j < ipList[i].length; j++){
				if(checkABBA(ipList[i][j])){
					if(j % 2 == 1)
						invalid = true;
					else
						valid = true;
				}
			}
			if(valid && !invalid){
				tlsips.push(ipList[i]);
			}
		}
		return tlsips;
	};

	const checkBAB = (ABA, ip) => {
		let BAB = ABA[1] + ABA[0] + ABA[1];
		for(let i = 0; i < ip.length; i++){
			if(i % 2 == 1){
				for(let j = 0; j < ip[i].length - 2; j++){
					if(ip[i].substring(j, j+3) == BAB)
						return true;
				}
			}
		}
		return false;
	};

	const validSSL = (ipList) => {
		var sslips = [];
		for(let i = 0; i < ipList.length; i++){
			let ABA = "";
			let checked = false;
			let ip = ipList[i];
			for(let j = 0; j < ip.length; j++){
				if(j % 2 == 0){
					let segment = ip[j];
					for(let k = 0; k < segment.length - 2; k++){
						let ABA = segment[k] + segment[k+1] + segment[k+2];
						if(!checked && ABA[0] == ABA[2] && ABA[0] != ABA[1]){
							if(checkBAB(ABA, ip)){
								sslips.push(ip);
								checked = true;
							}
						}
					}
				}
			}
		}
		return sslips;
	};

	for(let i = 0; i < ips.length; i++){
		ips[i] = separate(ips[i]);
	}

	validTLSIPs = validTLS(ips);
	P1 = validTLSIPs.length;

	validSSLIPs = validSSL(ips);
	P2 = validSSLIPs.length;

	alert("2016, Day 7\nPart 1: " + P1 + "\nPart 2: " + P2);
};

//Day 8
aof[7][1] = (input) => {
	var P1 = 0, P2 = 0;
	var insts = input.split('\n');

	var screen = [];
	for(let x = 0; x < 50; x++){
		screen.push(new Array(6));
		for(let y = 0; y < 6; y++){
			screen[x][y] = " ";
		}
	}

	for(let i = 0; i < insts.length; i++){
		let hold = insts[i].split(' ');
		if(hold.length == 2){
			let dim = hold[1].split('x');
			insts[i] = [hold[0], parseInt(dim[0]), parseInt(dim[1])];
		} else {
			insts[i] = [hold[0], hold[1], parseInt(hold[2].slice(2)), parseInt(hold[4])]
		}
	}

	const rotateRow = (row) => {
		let hold = screen[49][row];
		for(let x = 49; x > 0; x--){
			screen[x][row] = screen[x-1][row];
		}
		screen[0][row] = hold;
	};

	const rotateCol = (col) => {
		let hold = screen[col][5];
		for(let y = 5; y > 0; y--){
			screen[col][y] = screen[col][y-1];
		}
		screen[col][0] = hold;
	};

	const getCode = () => {
		let code = "";
		for(let y = 0; y < screen[0].length; y++){
			let cnt = 0;
			code += "| ";
			for(let x = 0; x < screen.length; x++){
				code += screen[x][y];
				cnt++;
				if(cnt == 5){
					code += " | "
					cnt = 0;
				}
			}
			code += "\n";
		}
		return code;
	};

	for(let i = 0; i < insts.length; i++){
		switch(insts[i][0]){
			case "rect":
				for(let x = 0; x < insts[i][1]; x++){
					for(let y = 0; y < insts[i][2]; y++){
						screen[x][y] = "#";
					}
				}
				break;
			case "rotate":
				let rotAmt = insts[i][3];
				switch(insts[i][1]){
					case "row":
						for(let c = 0; c < rotAmt; c++){
							rotateRow(insts[i][2]);
						}
						break;
					case "column":
						for(let c = 0; c < rotAmt; c++){
							rotateCol(insts[i][2]);
						}
						break;
				}
			default:
				break;
		}
	}

	for(let x = 0; x < screen.length; x++){
		for(let y = 0; y < screen[x].length; y++){
			if(screen[x][y] == "#")
				P1++;
		}
	}

	P2 = getCode();
	output.value = "2016, Day 8\nPart 1: " + P1 + "\nPart 2: \n" + P2;
};

//Day 9
aof[8][1] = (input) => {
	var comp = input;

	const part1 = (compString) => {
		let cnt = 0;
		let nonComp = "";
		for(let i = 0; i < compString.length; i++){
			if(compString[i] == '('){
				cnt += nonComp.length;
				nonComp = "";

				let j = i+1;
				let marker = "";
				while(compString[j] != ')'){
					marker += compString[j];
					j++;
				}
				marker = marker.split('x');
				let length = parseInt(marker[0]);
				let mult = parseInt(marker[1]);

				cnt += length*mult;
				i = j + length; 

			} else {
				nonComp += compString[i];
			}
		}
		return cnt;
	};

	const part2 = (compString) => {
		let cnt = 0;
		let nonComp = "";
		for(let i = 0; i < compString.length; i++){
			if(compString[i] == '('){
				cnt += nonComp.length;
				nonComp = "";

				let j = i+1;
				let marker = "";
				while(compString[j] != ')'){
					marker += compString[j];
					j++;
				}
				marker = marker.split('x');
				let length = parseInt(marker[0]);
				let mult = parseInt(marker[1]);
				let repString = compString.substring(j+1, j+length+1);

				if(repString.indexOf('(') >= 0){
					cnt += mult*part2(repString);
				} else {
					cnt += length*mult;
				}
				i = j + length; 

			} else {
				nonComp += compString[i];
			}
		}
		return cnt;
	};

	var P1 = part1(comp);
	var P2 = part2(comp);

	output.value = "2016, Day 9\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 10
aof[9][1] = (input) => {
	var instructions = input.split('\n');
	var P1 = -1, P2 = 0;
	var dirs = [];
	var bots = new Array(210), outs = new Array(21);

	const giveVal = (botNum, val, list) => {
		let hold = list;
		if(hold[botNum][0] > 0)
			hold[botNum][1] = val;
		else
			hold[botNum][0] = val;
		return hold;
	};

	for(let i = 0; i < bots.length; i++){
		if(i < outs.length)
			outs[i] = 0;
		bots[i] = [0,0];
	}

	for(let i = 0; i < instructions.length; i++){
		if(instructions[i].indexOf("value") >= 0){
			let parts = instructions[i].split(' ');
			let val = parseInt(parts[1]);
			let botNum = parseInt(parts[5]);
			bots = giveVal(botNum, val, bots);
		}
		else
			dirs.push(instructions[i]);
	}

	const handsFull = () => {
		var full = [];
		for(let i = 0; i < bots.length; i++){
			if(bots[i][0] > 0 && bots[i][1] > 0)
				full.push([i, bots[i]]);
		}
		return full;
	};

	const resolveHandoffs = (arr) => {
		let hold = bots;
		for(let i = 0; i < arr.length; i++){
			let botNum = arr[i][0];
			let inst = "";
			for(let j = 0; j < dirs.length; j++){
				if(parseInt(dirs[j].split(' ')[1]) == botNum)
					inst = dirs[j].split(' ');
			}
			let lowVal = Math.min(arr[i][1][0], arr[i][1][1]), highVal = Math.max(arr[i][1][0], arr[i][1][1]);
			let lowDestNum = parseInt(inst[6]), highDestNum = parseInt(inst[11]);
			let lowDest = inst[5], highDest = inst[10];
			if(lowDest == 'output')
				outs[lowDestNum] = lowVal;
			else
				hold = giveVal(lowDestNum, lowVal, hold);
			if(highDest == 'output')
				outs[highDestNum] = highVal;
			else
				hold = giveVal(highDestNum, highVal, hold);
			hold[botNum] = [0,0];
		}
		return hold;
	};

	const part1 = () => {
		for(let i = 0; i < bots.length; i++){
			let bot = bots[i];
			if((bot[0] == 61 && bot[1] == 17) || (bot[0] == 17 && bot[1] == 61))
				return i;
		}
		return -1;
	};

	let ready = handsFull();
	while(ready.length > 0){
		bots = resolveHandoffs(ready);
		ready = handsFull();
		if(P1 < 0)
			P1 = part1();
	}

	P2 = outs[0] * outs[1] * outs[2];

	output.value = "2016, Day 10\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 11
aof[10][1] = (input) => {
	
	output.value = "2016, Day 11\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 12
aof[11][1] = (input) => {
	var instructions = input.split('\n');
	var P1 = 0, P2 = 0;
	const regs = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		run(A, B, C, D, insts) {
			var i = 0;
			this.a = A, this.b = B, this.c = C, this.d = D;
			while(i < insts.length){
				let inst = insts[i];
				switch(inst[0]){
				case 'cpy':
					if(Number.isInteger(Number.parseInt(inst[1])))
						this[inst[2]] = Number.parseInt(inst[1]);
					else
						this[inst[2]] = this[inst[1]];
					i = i + 1;
					break;
				case 'jnz':
					if(Number.isInteger(Number.parseInt(inst[1]))){
						if(Number.parseInt(inst[1]) != 0)
							i = i + Number.parseInt(inst[2]);
						else
							i = i + 1;
					}else{
						if(this[inst[1]] != 0)
							i = i + Number.parseInt(inst[2]);
						else
							i = i + 1;
					}
					break;
				case 'inc':
					this[inst[1]] = this[inst[1]] + 1;
					i = i + 1;
					break;
				case 'dec':
					this[inst[1]] = this[inst[1]] - 1;
					i = i + 1;
					break;
				}
			}
			return this.a;
		}
	};

	for(let i = 0; i < instructions.length; i++){
		instructions[i] = instructions[i].split(' ');
	}
	
	P1 = regs.run(0,0,0,0,instructions);
	P2 = regs.run(0,0,1,0,instructions);

	output.value = "2016, Day 12\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 13
aof[12][1] = (input) => {
	var favorite_number = Number.parseInt(input);
	var P1 = 0, P2 = 0;
	
	var x_start = 1;
	var y_start = 1;

	function open(x, y){
		var one_bits = 0;
		var bin = (x*x + 2*x*y + y + y*y + favorite_number).toString(2);
		for(let i = 0; i < bin.length; i++){
			if(bin[i] == '1')
				one_bits++;
		}
		if(one_bits % 2 == 0)
			return true;
		else
			return false
	};

	var building = [];
	var visited = [];
	for(let i = 0; i < 100; i++){
		building.push(new Array(100));
		visited.push(new Array(100));
	}

	for(let x = 0; x < building.length; x++){
		for(let y = 0; y < building[x].length; y++){
			switch(open(x, y)){
			case true:
				building[x][y] = '.';
				break;
			case false:
				building[x][y] = '#'
				break;
			}
		}
	}

	var x_target = 31;
	var y_target = 39;

	while(x_start != x_target || y_start != y_target){
		var last_x = x_start;
		var last_y = y_start;
	}

	//output.value = "2016, Day 13\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 14
aof[13][1] = (input) => {

	output.value = "2016, Day 14\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 15
aof[14][1] = (input) => {

	output.value = "2016, Day 15\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 16
aof[15][1] = (input) => {

	output.value = "2016, Day 16\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 17
aof[16][1] = (input) => {

	output.value = "2016, Day 17\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 18
aof[17][1] = (input) => {

	output.value = "2016, Day 18\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 19
aof[18][1] = (input) => {

	output.value = "2016, Day 19\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 20
aof[19][1] = (input) => {

	output.value = "2016, Day 20\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 21
aof[20][1] = (input) => {

	output.value = "2016, Day 21\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 22
aof[21][1] = (input) => {

	output.value = "2016, Day 22\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 23
aof[22][1] = (input) => {

	output.value = "2016, Day 23\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 24
aof[23][1] = (input) => {

	output.value = "2016, Day 24\nPart 1: " + P1 + "\nPart 2: " + P2;
};

//Day 25
aof[24][1] = (input) => {

	output.value = "2016, Day 25\nPart 1: " + P1 + "\nPart 2: " + P2;
};

