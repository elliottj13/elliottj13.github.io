var output = document.getElementById("output");

aof[0][6] = (input) => {
	var entries = input.split('\n');
	var P1 = 0, P2 = 0;
	var x = parseInt(entries[0]);
	for(var i = 1; i < entries.length; i++){
		var y = parseInt(entries[i]);
		if(y > x) {
			P1++;
		}
		x = y;
	}
	for(var i = 0; i < entries.length - 3; i++){
		let windowA = parseInt(entries[i]) + parseInt(entries[i+1]) + parseInt(entries[i+2]);
		let windowB = parseInt(entries[i+1]) + parseInt(entries[i+2]) + parseInt(entries[i+3]);
		if(windowA < windowB) {
			P2++;
		}
	}
	
	output.value = "2021, Day 1\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[1][6] = (input) => {
	var instructions = input.split('\n');
	var P1 = 0, P2 = 0;
	var depth1 = 0, distance1 = 0, depth2 = 0, distance2 = 0, aim = 0;
	for(var i = 0; i < instructions.length; i++){
		let dir = instructions[i].split(' ')[0];
		let dist = parseInt(instructions[i].split(' ')[1]);
		switch(dir){
			case "forward":
				distance1 += dist;
				distance2 += dist;
				depth2 += aim * dist;
				break;
			case "up":
				depth1 -= dist;
				aim -= dist;
				break;
			case "down":
				depth1 += dist;
				aim += dist;
				break;
		}
	}
	P1 = depth1 * distance1;
	P2 = depth2 * distance2;
	output.value = "2021, Day 2\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[2][6] = (input) => {
	var report = input.split('\n');
	var P1 = 0, P2 = 0;
	var epsilon = "", gamma = "", O2Rating = "", CO2ScrubberRating = "";
	var zeroList = [], oneList = [];

	const findOxygenRating = (list, index) => {
		var nextList = [];
		let zeroList = [], oneList = [];
		let zeroCnt = 0, oneCnt = 0;
		for(var i = 0; i < list.length; i++){
			if(list[i][index] == '0'){
				zeroList.push(list[i]);
				zeroCnt++;
			} else {
				oneList.push(list[i]);
				oneCnt++;
			}
		}
		if(zeroCnt > oneCnt)
			nextList = zeroList;
		else
			nextList = oneList;
		if(nextList.length > 1)
			return findOxygenRating(nextList, index+1)
		else
			return nextList;
	};

	const findCO2ScrubberRating = (list, index) => {
		var nextList = [];
		let zeroList = [], oneList = [];
		let zeroCnt = 0, oneCnt = 0;
		for(var i = 0; i < list.length; i++){
			if(list[i][index] == '0'){
				zeroList.push(list[i]);
				zeroCnt++;
			} else {
				oneList.push(list[i]);
				oneCnt++;
			}
		}
		if(oneCnt < zeroCnt)
			nextList = oneList;
		else
			nextList = zeroList;
		if(nextList.length > 1)
			return findCO2ScrubberRating(nextList, index+1)
		else
			return nextList;
	};

	for(var i = 0; i < report[0].length; i++){
		let zeroCnt = 0, oneCnt = 0;
		for(var j = 0; j < report.length; j++){
			if(report[j][i] == '0')
				zeroCnt++;
			else
				oneCnt++;
		}
		if(zeroCnt > oneCnt){
			gamma = gamma + '0';
			epsilon = epsilon + '1';
		} else {
			gamma = gamma + '1';
			epsilon = epsilon + '0';
		}
	}
	gamma = parseInt(gamma, 2);
	epsilon = parseInt(epsilon, 2);
	O2Rating = parseInt(findOxygenRating(report, 0), 2);
 	CO2ScrubberRating = parseInt(findCO2ScrubberRating(report, 0), 2);

	P1 = gamma * epsilon;
	P2 = O2Rating * CO2ScrubberRating;

	output.value = "2021, Day 3\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[3][6] = (input) => {
	var P1 = 0, P2 = 0;
	var lines = input.split("\n");
	var calledNumbers = lines[0].split(',');
	lines = lines.slice(2);
	var boards = [];

	const checkRow = (board, rowIndex) => {
		for(var j = 0; j < 5; j++){
			if(board[rowIndex][j] != 'X')
				return false;
		}
		return true;
	};

	const checkCol = (board, colIndex) => {
		for(var j = 0; j < 5; j++){
			if(board[j][colIndex] != 'X')
				return false;
		}
		return true;
	};

	const checkBingo = (board) => {
		for(var i = 0; i < 5; i++){
			if(checkCol(board, i) || checkRow(board, i))
				return true;
		}
		return false;
	};

	const markOff = (board, num) => {
		var hold = board;
		for(var i = 0; i < 5; i++){
			for(var j = 0; j < 5; j++){
				if(board[i][j] == num){
					hold[i][j] = 'X'
					return hold;
				}
			}
		}
		return hold;
	};

	const totalUnmarked = (board) => {
		var total = 0;
		for(var i = 0; i < 5; i++){
			for(var j = 0; j < 5; j++){
				if(board[i][j] != 'X')
					total += parseInt(board[i][j]);
			}
		}
		return total;
	};

	for(var i = 0; i < lines.length; i++){
		let hold = lines[i].split(' ');
		while(hold.indexOf('') >= 0){
			let index = hold.indexOf('');
			hold.splice(index, 1);
		}
		lines[i] = hold;
	}

	var board = [];
	for(var i = 0; i < lines.length; i++){
		if(board.length != 5){
			board.push(lines[i]);
		} else {
			boards.push(board);
			board = [];
		}
	}

	for(var i = 0; i < calledNumbers.length; i++){
		for(var j = 0; j < boards.length; j++){
			markOff(boards[j], calledNumbers[i]);
			if(checkBingo(boards[j])){
				if(P1 == 0)
					P1 = totalUnmarked(boards[j]) * parseInt(calledNumbers[i]);
				if(boards.length == 1)
					P2 = totalUnmarked(boards[0]) * parseInt(calledNumbers[i])
				boards.splice(j, 1);
				j--;
			}
		}
	}
	
	output.value = "2021, Day 4\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[4][6] = (input) => {
	var lines = input.split("\n");
	var P1 = 0, P2 = 0;

	var ventFieldA = [], ventFieldB = [];
	for(let i = 0; i < 1000; i++){
		ventFieldA.push(new Array(1000));
		ventFieldB.push(new Array(1000));
		for(let j = 0; j < ventFieldA[i].length; j++){
			ventFieldA[i][j] = 0;
			ventFieldB[i][j] = 0;
		}
	}

	const drawLine = (p1, p2) => {
		var x1 = parseInt(p1[0]), y1 = parseInt(p1[1]);
		var x2 = parseInt(p2[0]), y2 = parseInt(p2[1]);
		
		//Horizontal & Vertical Lines
		if(x1 == x2 || y1 == y2){
		  if(x1 < x2){
				for(let x = x1; x <= x2; x++){
					ventFieldA[x][y1] += 1;
					ventFieldB[x][y1] += 1;
				}
			}
			else if(x2 < x1){
				for(let x = x2; x <= x1; x++){
					ventFieldB[x][y1] += 1;
					ventFieldA[x][y1] += 1;
				}
			}
			else if(y1 < y2){
				for(let y = y1; y <= y2; y++){
					ventFieldB[x1][y] += 1;
					ventFieldA[x1][y] += 1;
				}
			}
			else if(y2 < y1){
				for(let y = y2; y <= y1; y++){
					ventFieldB[x1][y] += 1;
					ventFieldA[x1][y] += 1;
				}
			}
			else{
				ventFieldB[x1][y1] += 1;
				ventFieldA[x1][y1] += 1;
			}
		}

		//Diagonal Lines
		else{
			let dist = Math.abs(x1 - x2);
			if(x1 < x2 && y1 < y2){
				for(let i = 0; i <= dist; i++){
					ventFieldB[x1+i][y1+i] += 1;
				}				
			} 
			else if(x1 < x2 && y2 < y1){
				for(let i = 0; i <= dist; i++){
					ventFieldB[x1+i][y1-i] += 1;
				}				
			}
			else if(x2 < x1 && y1 < y2){
				for(let i = 0; i <= dist; i++){
					ventFieldB[x1-i][y1+i] += 1;
				}				
			}
			else if(x2 < x1 && y2 < y1){
				for(let i = 0; i <= dist; i++){
					ventFieldB[x2+i][y2+i] += 1;
				}				
			}
		}
	};

	const countOverlapVents = (field) => {
		var cnt = 0;
		for(let x = 0; x < field.length; x++){
			for(let y = 0; y < field[x].length; y++){
				if(field[x][y] >= 2)
					cnt++;
			}
		}
		return cnt;
	}

	for(let i = 0; i < lines.length; i++){
		let points = lines[i].split(" -> ");
		let p1 = points[0].split(',');
		let p2 = points[1].split(',');
		drawLine(p1,p2);
	}

	P1 = countOverlapVents(ventFieldA);
	P2 = countOverlapVents(ventFieldB);

	output.value = "2021, Day 5\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[5][6] = (input) => {
	var P1 = 0, P2 = 0;
	var groups = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
	var input = input.split(',');
	for(let i = 0; i < input.length; i++){
		switch(input[i]){
			case '0': 
				groups[0][0]++;
				break;
			case '1': 
				groups[1][0]++;
				break;
			case '2': 
				groups[2][0]++;
				break;
			case '3': 
				groups[3][0]++;
				break;
			case '4': 
				groups[4][0]++;
				break;
			case '5': 
				groups[5][0]++;
				break;
			case '6': 
				groups[6][0]++;
				break;
		}
	}

	const totalFish = () => {
		let cnt = 0;
		for(let i = 0; i < groups.length; i++){
			cnt += groups[i][0];
			cnt += groups[i][1];
		}
		return cnt;
	};

	const runCycle = (days) => {
		for(let dayNum = 0; dayNum < days; dayNum++){
			if(dayNum == 80)
				P1 = totalFish();
			birthGroup = dayNum%7;
			babyGroup = (dayNum+9)%7;
			groups[babyGroup][1] = groups[birthGroup][0];
			groups[birthGroup][0] += groups[birthGroup][1];
			groups[birthGroup][1] = 0;
		}
	};

	runCycle(256);

	console.log(groups);
	P2 = totalFish();

	output.value = "2021, Day 6\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[6][6] = (input) => {
	var P1 = 1000000000, P2 =  1000000000;
	var min = 100000, max = 0;
	positions = input.split(',');
	for(let i = 0; i < positions.length; i++){
		let pos = parseInt(positions[i]);
		if(pos < min)
			min = pos;
		if(pos > max)
			max = pos;
		positions[i] = parseInt(positions[i]);
	}

	const P2FuelCost = (index, align) => {
		let pos = positions[index];
		let dist = Math.abs(pos - align);
		let fuel = 0;
		for(let c = 0; c <= dist; c++)
			fuel += c;
		return fuel;
	};

	const P1Alignment = (align) => {
		let fuel = 0;
		for(let i = 0; i < positions.length; i++){
			fuel += Math.abs(positions[i] - align);
		}
		return fuel;
	};

	const P2Alignment = (align) => {
		let fuel = 0;
		for(let i = 0; i < positions.length; i++){
			fuel += P2FuelCost(i, align);
		}
		return fuel;
	};

	for(let a = min; a <= max; a++){
		P1 = Math.min(P1Alignment(a), P1);
		P2 = Math.min(P2Alignment(a), P2);
	}

	output.value = "2021, Day 7\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[7][6] = (input) => {
	var P1 = 0, P2 = 0;
	var input = input.split('\n');
	var part1 = [];
	for(let i = 0; i < input.length; i++){
		part1 = part1.concat(input[i].split(' | ')[1].split(' '));
		input[i] = input[i].split(' | ');
	}
	for(let i = 0; i < part1.length; i++){
		let n = part1[i].length;
		if(n == 2 || n == 3 || n == 4 || n == 7)
			P1++;
	}

	const contains = (num1, num2) => {
		for(let i = 0; i < num2.length; i++){
			let cont = false;
			if(num1.indexOf(num2[i]) >= 0)
				cont = true;
			if(!cont)
				return false;
		}
		return true;
	};

	const identifyNums = (scramble) => {
		let fives = [];
		let sixes = [];
		let nums = new Array(10);
		for(let i = 0; i < scramble.length; i++){
			let num = scramble[i];
			switch(num.length) {
				case 2:
					nums[1] = num;
					break;
				case 3:
					nums[7] = num;
					break;
				case 4:
					nums[4] = num;
					break;
				case 5:
					fives.push(num);
					break;
				case 6:
					sixes.push(num);
					break;
				case 7:
					nums[8] = num;
					break;
			}
		}
		for(let i = 0; i < sixes.length; i++){
			if(contains(sixes[i], nums[4]))
				nums[9] = sixes[i];
		}
		for(let i = 0; i < fives.length; i++){
			if(contains(fives[i], nums[7]))
				nums[3] =  fives[i];
			else if(contains(nums[9], fives[i]))
				nums[5] = fives[i];
			else
				nums[2] = fives[i];
		}
		for(let i = 0; i < sixes.length; i++){
			if(sixes[i] != nums[9]){
				if(contains(sixes[i], nums[5]))
					nums[6] = sixes[i];
				else
					nums[0] = sixes[i];
			}
		}
		return nums;
	};

	const isNum = (num1, num2) => {
		return (contains(num1, num2) && contains(num2, num1));
	};

	for(let i = 0; i < input.length; i++){
		let nums = identifyNums(input[i][0].split(' '));
		let output  = input[i][1].split(' ');
		let val = '';
		for(let j = 0; j < output.length; j++){
			for(let k = 0; k < nums.length; k++){
				if(isNum(output[j],nums[k])){
					val += k + '';
					break;
				}
			}
		}
		P2 += parseInt(val);
	}


	output.value = "2021, Day 8\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[8][6] = (input) => {
	var P1 = 0, P2 = 0;
	var input = input.split('\n');
	var lowPoints = [];
	var basins = [];

	for(let i = 0; i < input.length; i++){
		let hold = [];
		for(let j = 0; j < input[i].length; j++){
			hold.push(parseInt(input[i][j]));
		}
		input[i] = hold;
	}

	const isLowPoint = (row, col) => {
		let val = input[row][col];
		if(row > 0){
			if(val >= input[row-1][col])
				return false;
		}
		if(row < input.length-1){
			if(val >= input[row+1][col])  
				return false;
		}
		if(col > 0){
			if(val >= input[row][col-1])
				return false;
		}
		if(col < input[0].length){
			if(val >= input[row][col+1])
				return false;
		}
		return true;
	}

	for(let i = 0; i < input.length; i++){
		for(let j = 0; j < input[i].length; j++){
			if(isLowPoint(i,j)){
				lowPoints.push([i,j]);
				P1 += input[i][j] + 1;
			}
		}
	}

	const checked = (element, list) => {
		for(let i = 0; i < list.length; i++){
			let p = list[i];
			if(element[0] == p[0] && element[1] == p[1])
				return true;
		}
		return false;
	};

	const checkCardinal =  (x, y, checkedPts) => {
		var left = 9, right = 9, up = 9, down = 9;
		let cards = [];
		if(x > 0)
			left = input[x-1][y];
		if(x < input.length-1)
			right = input[x+1][y];
		if(y > 0)
			up = input[x][y-1];
		if(y < input[0].length-1)
			down = input[x][y+1];
		if(left != 9 && !checked([x-1,y], checkedPts))
			cards.push([x-1, y]);
		if(right != 9 && !checked([x+1,y], checkedPts))
			cards.push([x+1,y]);
		if(up != 9 && !checked([x,y-1], checkedPts))
			cards.push([x,y-1]);
		if(down != 9 && !checked([x,y+1], checkedPts))
			cards.push([x,y+1]);
		return cards;
	};

	const getBasin = (lowPoint) => {
		let x = lowPoint[0];
		let y = lowPoint[1];
		let size = 0;
		let basin = [lowPoint];
		while(basin.length != size){
			size = basin.length;
			let hold = basin;
			for(let i = 0; i < basin.length; i++){
				let pt = basin[i];
				hold = hold.concat(checkCardinal(pt[0], pt[1], hold));
			}
			basin = hold;
		}		
		return basin.length;
	};

	for(let i = 0; i < lowPoints.length; i++){
		basins.push(getBasin(lowPoints[i]));
	}

	var largestBasins = [0,0,0];
	for(let i = 0; i < basins.length; i++){
		let b = basins[i];
		if(b > largestBasins[0])
			largestBasins = [b, largestBasins[0], largestBasins[1]];
		else if(b > largestBasins[1])
			largestBasins = [largestBasins[0], b, largestBasins[1]];
		else if(b > largestBasins[2])
			largestBasins = [largestBasins[0], largestBasins[1], b];
	}

	P2 = largestBasins[0] * largestBasins[1] * largestBasins[2];

	output.value = "2021, Day 9\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[9][6] = (input) => {
	var P1 = 0, P2 = 0;
	var lines = input.split('\n');
	var openers = ['(', '[', '{', '<'], closers = [')', ']', '}', '>'];
	var completionScores = [];

	const errorScore = (char) => {
		switch (closers.indexOf(char)){
			case 0:
				return 3;
			case 1:
				return 57;
			case 2:
				return 1197;
			case 3:
				return 25137;
			default:
				return 0;
		}
	};

	const completionScore = (list) => {
		let score = 0;
		for(let i = list.length-1; i >= 0; i--){
			score = (score*5) + (openers.indexOf(list[i]) + 1);
		}
		return score;
	};

	const syntax = (line) => {
		let queue = [];
		let b = '';
		for(let i = 0; i < line.length; i++){
			b = line[i];
			if(openers.indexOf(b) >= 0)
				queue.push(b);
			else if(openers[closers.indexOf(b)] == queue[queue.length-1])
				queue.pop();
			else{
				P1 += errorScore(b);
				return;
			}
		}
		completionScores.push(completionScore(queue));
	};

	const bubbleSort = (list) => {
		let sorting = false;
		do {
			sorting = false;
			for(let i = 0; i < list.length-1; i++){
				if(list[i] < list[i+1]){
					let hold = list[i+1];
					list[i+1] = list[i];
					list[i] = hold;
					sorting = true;
				}
			}
		} while(sorting);
		return list;
	};

	for(let i = 0; i < lines.length; i++){
		syntax(lines[i]);
	}

	completionScores = bubbleSort(completionScores);

	console.log(completionScores);

	P2 = completionScores[Math.floor(completionScores.length/2)];

	output.value = "2021, Day 10\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[10][6] = (input) => {
	var P1 = 0, P2 = 0;
	input = input.split('\n');
	var octopuses = [];
	for(let i = 0; i < input.length; i++){
		let hold = [];
		for(let j = 0; j < input[i].length; j++)
			hold.push(parseInt(input[i][j]));
		octopuses.push(hold);
	}

	const incEnergy = () => {
		for(let i = 0; i < octopuses.length; i++){
			for(let j = 0; j < octopuses[i].length; j++){
				octopuses[i][j] += 1;
			}
		}
	};

	const incNeighbors = (row, col) => {
		let top = (row == 0);
		let bot = (row == octopuses.length-1);
		let left = (col == 0);
		let right = (col == octopuses[row].length-1);

		if(!top){
			octopuses[row-1][col] += 1;
			if(!left)
				octopuses[row-1][col-1] += 1;
			if(!right)
				octopuses[row-1][col+1] += 1;
		}
		if(!bot){
			octopuses[row+1][col] += 1;
			if(!left)
				octopuses[row+1][col-1] += 1;
			if(!right)
				octopuses[row+1][col+1] += 1;
		}
		if(!left)
			octopuses[row][col-1] += 1;
		if(!right)
			octopuses[row][col+1] += 1;
	};

	const hasFlashed = (row, col, flashed) => {
		for(let i = 0; i < flashed.length; i++){
			if(flashed[0] == row && flashed[1] == col)
				return true;
		}
		return false;
	};

	const handleFlashes = (day) => {
		let flashOccured = false;
		let flashed = [];
		do {
			flashOccured = false;
			for(let i = 0; i < octopuses.length; i++){
				for(let j = 0; j < octopuses[i].length; j++){
					if(octopuses[i][j] >= 10 && !hasFlashed(i,j,flashed)){
						flashOccured = true;
						flashed.push([i,j]);
						incNeighbors(i, j);
						if(d < 100)
							P1++;
						octopuses[i][j] = -1000;
					}
				}
			}
		} while(flashOccured);

		for(let i = 0; i < flashed.length; i++){
			let o = flashed[i];
			octopuses[o[0]][o[1]] = 0;
		}

		if(flashed.length == 100)
			return true;
		else
			return false;
	};

	let d = 0;
	let synchronized = false;

	do { 
		incEnergy();
		synchronized = handleFlashes(d);
		d++;
	} while(!synchronized);

	P2 = d;

	output.value = "2021, Day 11\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[11][6] = (input) => {
	input = input.split('\n');
	var P1 = 0, P2 = 0;
	var paths = [];
	for(let i = 0; i < input.length; i++){
		paths.push(input[i].split('-'));
	}

	const isUpper = (string) => {
		return string == string.toUpperCase();
	};

	console.log(paths);
	output.value = "2021, Day 12\nPart 1: " + P1 + "\nPart 2: " + P2;
};

aof[12][6] = (input) => {
};

aof[13][6] = (input) => {
};

aof[14][6] = (input) => {
};

aof[15][6] = (input) => {
};

aof[16][6] = (input) => {
};

aof[17][6] = (input) => {
};

aof[18][6] = (input) => {
};

aof[19][6] = (input) => {
};

aof[20][6] = (input) => {
};

aof[21][6] = (input) => {
};

aof[22][6] = (input) => {
};

aof[23][6] = (input) => {
};

aof[24][6] = (input) => {
};