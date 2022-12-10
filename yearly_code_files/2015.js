var output = document.getElementById("output");

aof[0][0] = (input) => {
	input = input.split('');
	let run = (part2) => {
		let flr = 0;
		for(let i = 0; i < input.length; i++){
			input[i] == '(' ? flr++ : flr--;
			if(part2 && flr < 0)
				return i+1;
		}
		return flr;
	};
	let P1 = run(false);
	let P2 = run(true);
	output.value += "2015, Day 1\nPart 1: " + P1 + "\nPart 2: " + P2 + '\n\n';
};

aof[1][0] = (input) => {
	input = input.split('\n').map(x => x.split('x').map(y => Number.parseInt(y)));
	let getPaper = (box) => {
		let l = box[0], w = box[1], h = box[2];
		let lw = l*w, wh = w*h, hl = h*l;
		return (2*l*w) + (2*w*h) + (2*h*l) + Math.min(lw,wh,hl);
	};
	let getRibbon = (box) => {
		box.sort((a,b) => a - b);
		return 2*box[0] + 2*box[1] + box[0]*box[1]*box[2];
	};
	let P1 = input.map(x => getPaper(x)).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
	let P2 = input.map(x => getRibbon(x)).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
	output.value += "2015, Day 2\nPart 1: " + P1 + "\nPart 2: " + P2 + '\n\n';
};

aof[2][0] = (input) => {
	let visited = ['0'];
	let santa = 0, robot = 0;
	let move = (direction, bot) => {
		switch(direction){
		case '>':
			bot ? robot++ : santa++;
			break;
		case '<':
			bot ? robot-- : santa--;
			break;
		case 'v':
			bot ? robot += 1000000000 : santa += 1000000000;
			break;
		case '^':
			bot ? robot -= 1000000000 : santa -= 1000000000;
			break;
		}
		let house = bot ? robot.toString() : santa.toString();
		if(visited.indexOf(house) == -1)
			visited.push(house);
	};

	input.split('').forEach(x => move(x, false));
	let P1 = visited.length;

	santa = 0, visited = ['0'];
	input.split('').forEach((x,n) => n % 2 == 0 ? move(x, false) : move(x, true));
	let P2 = visited.length;

	console.log(visited);

	output.value += "2015, Day 3\nPart 1: " + P1 + "\nPart 2: " + P2 + '\n\n';
};

aof[3][0] = (input) => {
	var cnt = 0;
	var found1 = false, found2 = false;
	var P1 = 0, P2 = 0;
	while(found1 == false || found2 == false){
		cnt++;
		hash = calcMD5(input + "" + cnt);
		if(hash.substring(0,5) == "00000"){
			if(!found1){
				P1 = cnt;
				found1 = true;
			}
			if(!found2 && hash[5] == "0"){
				P2 = cnt;
				found2 = true;
			}
		}
	}

	output.value += "2015, Day 4\nPart 1: " + P1 + "\nPart 2: " + P2 + '\n\n';
};

aof[4][0] = (input) => {
	let hasBadStrings = (str) => {return (/(ab|cd|pq|xy)/).test(str);};
	let hasDoubleLetter = (str) => {return (/([A-z])\1/).test(str);};
	let hasThreeVowels = (str) => {return (/((a|e|i|o|u).*){3}/).test(str);};
	let hasDoubleInstance = (str) => {return (/([A-z][A-z]).*\1/).test(str);};
	let hasSandwichLetter = (str) => {return (/([A-z])[A-z]\1/).test(str);};
	var niceStrings1 = input.split('\n').filter(x => !hasBadStrings(x))
									   	.filter(x => hasDoubleLetter(x))
									   	.filter(x => hasThreeVowels(x));
	var niceStrings2 = input.split('\n').filter(x => hasDoubleInstance(x))
										.filter(x => hasSandwichLetter(x));
	let P1 = niceStrings1.length;
	let P2 = niceStrings2.length;

	output.value += "2015, Day 5\nPart 1: " + P1 + "\nPart 2: " + P2 + '\n\n';
};

aof[5][0] = (input) => {
	let lights = new Array(1000).fill(new Array(1000).fill(0));

	input = input.split('\n').map(x => x.split(' ').length == 5 ? x.split(' ').slice(1,5) : x.split(' ').slice(0, 4));

	let runInst = (inst, part2) => {
		let [x1, y1] = inst[1].split(',').map(x => Number.parseInt(x));
		let [x2, y2] = inst[3].split(',').map(x => Number.parseInt(x));
		switch(inst[0]) {
		case 'on':
			lights = lights.map((x,n) => (n >= x1 && n <= x2) ? x.map((y,m) => (m >= y1 && m <= y2) ? (part2 ? y+1 : 1) : y) : x);
			break;
		case 'off':
			lights = lights.map((x,n) => (n >= x1 && n <= x2) ? x.map((y,m) => (m >= y1 && m <= y2) ? (part2 ? Math.max(0,y-1) : 0) : y) : x);
			break;
		case 'toggle':
			lights = lights.map((x,n) => (n >= x1 && n <= x2) ? x.map((y,m) => (m >= y1 && m <= y2) ? (part2 ? y+2 : !y + 0) : y) : x);
			break;
		}
	};

	input.forEach(x => runInst(x,false));
	let P1 = lights.flat().filter(x => x == 1).length;

	lights = new Array(1000).fill(new Array(1000).fill(0));
	input.forEach(x => runInst(x,true));
	let P2 = lights.flat().reduce((a,x) => a + x, 0);

	output.value += "2015, Day 6\nPart 1: " + P1 + "\nPart 2: " + P2 + '\n\n';
};

aof[6][0] = (input) => {
	input = input.split('\n').map(x => x.split(' -> ')).map(x => [x[0].split(' '), x[1]]);
	let convert = (inst) => {
		return {
			operation: inst[0].filter(x => x == x.toUpperCase() && !Number.isInteger(Number.parseInt(x))).join(''),
			output: inst[1],
			input: inst[0].filter(x => x == x.toLowerCase())
		}
	};

	let wires = input.map(x => convert(x));
	let start = wires.find(x => x.output == 'a');

	let run = (inst) => {
		if(inst.input.length == 1 && Number.isInteger(Number.parseInt(inst.input[0])))
			inst.input[0] = Number.parseInt(inst.input[0]);
		else
			inst.input = inst.input.map(x => Number.isInteger(Number.parseInt(x)) ? Number.parseInt(x) : run(wires.find(y => y.output == x)));
		switch(inst.operation){
		case "NOT":
			return 65535 - inst.input[0];
		case "AND":
			return inst.input[0] & inst.input[1];
		case "OR":
			return inst.input[0] | inst.input[1];
		case "RSHIFT":
			return inst.input[0] >> inst.input[1];
		case "LSHIFT":
			return inst.input[0] << inst.input[1];
		default:
			return inst.input[0];			
		}
	};

	let P1 = run(start);

	wires = input.map(x => convert(x)), start = wires.find(x => x.output == 'a');
	wires.find(x => x.output == 'b').input = [P1 + ""];

	let P2 = run(start);

	output.value += "2015, Day 7\nPart 1: " + P1 + "\nPart 2: " + P2 + '\n\n';
};

aof[7][0] = (input) => {
	lines = input.split("\n");
	literalSum = 0, memorySum = 0, encodedSum = lines.length*2;
	
	lines.forEach(x => literalSum += x.length);
	lines.forEach(x => encodedSum += x.length);
	
	console.log(lines);

	lines.forEach(x => x.split('').forEach(y => (l[x] == "\\" || l[x] == "\"") ? encodedSum++ : 0));

	lines = lines.map(x => x.substring(1, x.length-1)).map(x => x.split("\\\"").join(".")).map(x => x.split("\\\\").join("."));
	lines.map(x => x.replace(/\\x([0-9]|[a-f])/, " "));

	lines.forEach(x => memorySum += x.length);
	
	var P1 = literalSum - memorySum;
	var P2 = encodedSum - literalSum;

	output.value += "2015, Day 8\nPart 1: " + P1 + "\nPart 2: " + P2 + "\n\n";
};

aof[8][0] = (input) => {
	var flights = input.split("\n");
	var paths = [];
	var locations = [];
	for(var x = 0; x < flights.length; x++){
		var flight = flights[x].split(" ");
		paths.push({
			start: flight[0],
			end: flight[2],
			distance: parseInt(flight[4])
		});
		paths.push({
			start: flight[2],
			end: flight[0],
			distance: parseInt(flight[4])
		});
		if(!locations.includes(flight[0]))
			locations.push(flight[0]);
		if(!locations.includes(flight[2]))
			locations.push(flight[2]);
	}
	let perm = (xs) => {
		let ret = [];

		for (let i = 0; i < xs.length; i = i + 1) {
			let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

			if(!rest.length) {
				ret.push([xs[i]])
			} else {
				for(let j = 0; j < rest.length; j = j + 1) {
					ret.push([xs[i]].concat(rest[j]))
				}
			}
		}
		return ret;
	};
	var permutations = perm(locations);
	var shortest = 1000000;
	var longest = 0;
	for(p of permutations){
		var totalDist = 0;
		for(var i  = 0; i < p.length-1; i++){
			var path;
			for(x of paths){
				if(x.start == p[i] && x.end == p[i+1])
					path = x;
			}
			totalDist += path.distance;
		}
		if(totalDist < shortest){
			shortest = totalDist;
		}
		if(totalDist > longest){
			longest = totalDist;
		}
	}
	alert("2015, Day 9\nPart 1: " + shortest + "\nPart 2: " + longest);
};

aof[9][0] = (input) => {
	var string = input, P1 = "";
	var iteration = 0;
	while(iteration < 50){
		var replacement = "";
		var i = 0;
		while(i < string.length){
			var cnt = 0;
			var char = string[i];
			while(string[i] == char){
				i++;
				cnt++;
			}
			replacement = replacement + cnt + char;
		}
		string = replacement;
		iteration++;
		if(iteration == 40)
			P1 = string.length;
	}
	var P2 = string.length;

	alert("2015, Day 10\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[10][0] = (input) => {
	var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var pw = input;
	var finished = false;
	var passwords = [];
	let password = (entry) => {
		var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		var increasing = false, badChars = false, pairs = false;
		badChars = (entry.includes("i") || entry.includes("o") || entry.includes("l"));
		var rep1 = false, rep2 = false;
		for(var i = 0; i < entry.length-1; i++){
			if(entry[i] == entry[i+1]){
				if(!rep1){
					rep1 = true;
					i++;
				}else if(!rep2){
					rep2 = true;
					i++;
				}
			}
		}
		pairs = rep1 && rep2;
		for(var i = 0; i < entry.length-2; i++){
			var index = alpha.indexOf(entry[i]);
			if(index+2 < alpha.length && entry[i+1] == alpha[index+1] && entry[i+2] == alpha[index+2])
				increasing = true;
		}
		return (!badChars && pairs && increasing);
	};
	while(!finished){
		var index = pw.length-1;
		var running = true;
		while(running){
			if(pw[index] == 'z'){
				pw = pw.substring(0, index) + 'a' + pw.substring(index+1);
				index--;
			}
			else{
				pw = pw.substring(0, index) + alpha[alpha.indexOf(pw[index])+1] + pw.substring(index+1);
				running = false;
			}
		}
		if(password(pw))
			passwords.push(pw);
		if(passwords.length == 2)
			finished = true;
	}
	alert("2015, Day 11\nPart 1: " + passwords[0] + "\nPart 2: " + passwords[1]);
};

aof[11][0] = (input) => {
	var json = input;
	var badChars1 = ['\"','[','{','}',']',',',':'];
	for(c of badChars1){
		json = json.split(c).join(' ');
	}
	json = json.replace(/\s+/g,' ').trim();
	json = json.split(' ');
	var P1 = 0;
	for(p of json){
		if(!isNaN(p)){
			P1 += parseInt(p);
		}
	}

	json = JSON.parse(input);
	alert(Object.values([1, 2, 3, 4]));
	
	let valOf = (entry) => {
		var total = 0;
		if(!Array.isArray(entry)){
			if(Object.values(entry).includes("red"))
				return 0;
		}
		for(k of Object.values(entry)){
			if(typeof k == "object"){
				total += valOf(k);
			}else if(typeof k == "number"){
				total += k;
			}
		}
		return total;
	};

	var P2 = valOf(json);

	alert("2015, Day 12\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[12][0] = (input) => {
	var relationships = [];
	var table = [];
	var lines = input.split("\n");
	var i = lines.length-1;
	while(lines[i] == ""){
		lines = lines.slice(0,i);
		i--;
	}
	for(s of lines){
		var parts = s.substring(0,s.length-1).split(" ");
		var recip = parts[0];
		var giver = parts[parts.length-1];
		var change = parseInt(parts[3]);
		if(parts[2] == "lose")
			change *= -1;
		relationships = [...relationships, {
			recipient: recip,
			cause: giver,
			happiness: change
		}];
		if(!table.includes(recip)){
			table = [...table, recip];
		}
	}

	let findRelTot = (a,b,rels) => {
		var relHap = 0;
		for(r of rels){
			if(r.recipient == a && r.cause == b)
				relHap += r.happiness;
			if(r.recipient == b && r.cause == a)
				relHap += r.happiness;
		}
		return relHap;
	};
	let tableHap = (tab, rels, part1) => {
		var hap = 0;
		for(var i = 0; i < tab.length; i++){
			if(i == tab.length-1 && part1)
				hap += findRelTot(tab[0], tab[i], rels);
			else
				hap += findRelTot(tab[i], tab[i+1], rels);
		}
		return hap;
	};

	var tables = perm(table);
	var P1 = Math.max(...(tables.map(x => tableHap(x, relationships, true))));
	var P2 = Math.max(...(tables.map(x => tableHap(x, relationships, false))));

	alert("2015, Day 13\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[13][0] = (input) => {
	var  reindeer = [];
	for(s of input.split("\n")){
		var parts = s.split(" ");
		var rd = parts[0];
		var sp = parseInt(parts[3]);
		var runT = parseInt(parts[6]);
		var resT = parseInt(parts[13]);
		reindeer = [...reindeer, {
			reindeer: rd,
			speed: sp,
			runTime: runT,
			restTime: resT,
			running: true,
			dist: 0,
			points: 0,
			time: 0,
			tick: function(){
				if(this.time == this.restTime){
					this.running = true;
					this.time = 0;
				}
				if(this.running && this.time < this.runTime){
					this.dist += this.speed;
				}else if(this.running && this.time == this.runTime){
					this.time = 0;
					this.running = false;
				}
				this.time++;
			}
		}];
	}
	var distances = reindeer.map(x => x.dist);
	var time = 0;
	while(time < 2503){
		for(r of reindeer){
			r.tick();
		}
		distances = reindeer.map(x => x.dist);

		var leaders = [];
		var leadDist = Math.max(...distances);
		for(r of reindeer){
			if(r.dist == leadDist)
				r.points++;
		}
		time++;
	}
	var points = reindeer.map(x => x.points);
	var P2 = Math.max(...points);
	var P1 = Math.max(...distances);


	alert("2015, Day 14\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[14][0] = (input) => {
	let sum = (arr) => {return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)};
	let combos = (n, size) => {
		if(n == 0){
			return [];
		}
		var arr = [];
		for(var i = 0; i <= size; i++){
			var subArrs = combos(n-1, size-i);
			if(subArrs.length == 0)
				arr.push([i]);
			else{
				for(var j = 0; j < subArrs.length; j++) {
					subArrs[j].unshift(i);
					arr.push(subArrs[j]);
				}
			}
		}
		return arr;
	};
	let getScore = (combo, ings) => {
		var score = {cap:0,dur:0,fla:0,tex:0,cal:0};
		for(var i = 0; i < combo.length; i++){
			score.cap += ings[i].cap * combo[i];
			score.dur += ings[i].dur * combo[i];
			score.fla += ings[i].fla * combo[i];
			score.tex += ings[i].tex * combo[i];
			score.cal += ings[i].cal * combo[i];			
		}
		score.cap = Math.max(0, score.cap);
		score.dur = Math.max(0, score.dur);
		score.fla = Math.max(0, score.fla);
		score.tex = Math.max(0, score.tex);
		score.cal = Math.max(0, score.cal);
		score.total = score.cap * score.dur * score.fla * score.tex;
		return score;
	};
	var ingredients = [];
	for(s of input.split("\n")){
		var parts = s.split(",").join("").split(" ");
		ingredients = [...ingredients, {
			name: parts[0].substring(0,parts[0].length-1),
			cap: parseInt(parts[2]),
			dur: parseInt(parts[4]),
			fla: parseInt(parts[6]),
			tex: parseInt(parts[8]),
			cal: parseInt(parts[10])
		}];
	}
	var allCombos = combos(4, 100);
	var finalCombos = [];
	for(var i = 0; i < allCombos.length; i++){
		if(sum(allCombos[i]) == 100)
			finalCombos.push(allCombos[i]);
	}
	P1 = 0;
	P2 = 0;
	for(c of finalCombos){
		var s = getScore(c,ingredients);
		if(s.total > P1){
			P1 = s.total;
		}
		if(s.total > P2 && s.cal == 500){
			P2 = s.total;
		}
	}
	
	alert("2015, Day 15\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[15][0] = (input) => {
	let checkSue = (sue, tape1, part2) => {
		var keys = Object.keys(sue);
		for(k of keys){
			if(part2 && (k == "cats" || k == "trees")){
				if(tape1[k] >= sue[k])
					return false;
			}else if(part2 && (k == "pomeranians" || k == "goldfish")){
				if(tape1[k] <= sue[k])
					return false;
			}else if(tape1[k] != sue[k])
				return false;
		}
		return true;
	};

	var tape = {
		children: 3,
		cats: 7,
		samoyeds: 2,
		pomeranians: 3,
		akitas: 0,
		vizslas: 0,
		goldfish: 5,
		trees: 3,
		cars: 2,
		perfumes: 1
	};
	var sues = [];
	for(s of input.split("\n")){
		var parts = (s + ",").split(" ").slice(2);
		parts = parts.map(x => "\"" + x.substring(0,x.length-1) + "\"" + x[x.length-1]).join("");
		parts = "{" + parts.slice(0, parts.length-1) + "}";
		sues = [...sues, JSON.parse(parts)];
	}
	for(s of sues){
		for(k of Object.keys(s))
			s[k] = parseInt(s[k]);
	}
	var P1 = -1, P2 = -1;
	for(var i = 0; i < sues.length; i++){
		if(P1 < 0 && checkSue(sues[i], tape, false))
			P1 = i+1;
		if(P2 < 0 && checkSue(sues[i], tape, true))
			P2 = i+1;
	}

	alert("2015, Day 16\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[16][0] = (input) => {
	var containers = input.split("\n").map(x => parseInt(x));

	function count(total, n, i){
		i = i || 0;
		if(n < 0)
			return 0;
		else if(total == 0)
			return 1;
		else if(i == containers.length || total < 0)
			return 0;
		else
			return count(total, n, i+1) + count(total - containers[i], n-1, i+1);
	}

	var P1 = count(150, containers.length);
	var i = 1, P2;
	while(!P2){
		P2 = count(150, i);
		i++;
	}
	alert("2015, Day 17\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[17][0] = (input) => {

	function count(stringNum, index, lights){
		var maxX = lights.length-1, maxY = lights[stringNum].length-1;
		var cnt = 0;

		if(stringNum > 0){cnt += (lights[stringNum-1][index] == '#') ? 1 : 0;}
		if(stringNum < maxX){cnt += (lights[stringNum+1][index] == '#') ? 1 : 0;}
		if(index > 0){cnt += (lights[stringNum][index-1] == '#') ? 1 : 0;}
		if(index < maxY){cnt += (lights[stringNum][index+1] == '#') ? 1 : 0;}

		if(stringNum > 0 && index > 0){cnt += (lights[stringNum-1][index-1] == '#') ? 1 : 0;}
		if(stringNum < maxX && index > 0){cnt += (lights[stringNum+1][index-1] == '#') ? 1 : 0;}
		if(stringNum > 0 && index < maxY){cnt += (lights[stringNum-1][index+1] == '#') ? 1 : 0;}
		if(stringNum < maxX && index < maxY){cnt += (lights[stringNum+1][index+1] == '#') ? 1 : 0;}

		return cnt;
	}

	function tick(lights, stuck){
		if(stuck === true){
			lights[0][0] = "#";
			lights[0][lights[0].length-1] = "#";
			lights[lights.length-1][0] = "#";
			lights[lights.length-1][lights[0].length-1] = "#";
		}
		var holdLayout = [];
		for(var x = 0; x < lights.length; x++){
			holdLayout[x] = [];
			for(var y = 0; y < lights[x].length; y++){
				var cnt = count(x,y,lights);
				if(lights[x][y] == "#"){
					holdLayout[x][y] = (cnt == 2 || cnt == 3) ? "#" : ".";
				}else if(lights[x][y] == "."){
					holdLayout[x][y] = (cnt == 3) ? "#" : ".";
				}
			}
		}
		if(stuck === true){
			holdLayout[0][0] = "#";
			holdLayout[0][holdLayout[0].length-1] = "#";
			holdLayout[holdLayout.length-1][0] = "#";
			holdLayout[holdLayout.length-1][holdLayout[0].length-1] = "#";
		}
		return holdLayout;
	}

	
	var layout = input.trim().split("\n").map(x => x.split(""));
	for(var i = 0; i < 100; i++){
		layout = tick(layout);
	}
	var P1 = layout.reduce( (a,b) => a.concat(b), []).filter( (f) => f == "#").length;
	
	layout = input.trim().split("\n").map(x => x.split(""));
	for(var i = 0; i < 100; i++){
		layout = tick(layout, true);
	}
	var P2 = layout.reduce( (a,b) => a.concat(b), []).filter( (f) => f == "#").length;

	alert("2015, Day 18\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[18][0] = (input) => {
	let isUpper = (char) => {return char == char.toUpperCase();};
	let isLower = (char) => {return char == char.toLowerCase();};

	formula = input.split('\n')[input.split('\n').length-1];
	transitions = input
		.split('\n')
		.slice(0,input.split('\n').length-2)
		.reduce((formula, line) => {
			const [element, replacement] = line.split(' => ');
			if(!formula[element]) 
				formula[element] = [];
			formula[element].push(replacement);
			return formula;
		}, {});
	console.log(transitions);
	
	const rx = /([a-zA-Z][a-z]*)/g;
	let match;
	let matches = [];

	while((match = rx.exec(formula)) !== null){
		matches = [...matches, match];
	}

	const P1 = matches.reduce((data, entry) => {
		const index = entry.index;
		const element = entry[0];

		if(transitions[element]) {
			transitions[element].forEach(replacement => {
				data.push(formula.substring(0,index) + replacement + formula.substring(index+element.length));
			});
		}

		return data;
	}, []).filter(function(item,pos,self) {
		return self.indexOf(item) == pos;
	});


	const reverse = Object.keys(transitions).reduce((table, replacement) => {
		transitions[replacement].forEach(element => {
			table.set(element, replacement)
		});
		return table;
	}, new Map());

	let target = formula;
	let P2 = 0;

	while(target !== 'e') {
		for(const [element, replacement] of reverse.entries()) {
			if(target.includes(element)) {
				target = target.replace(element, replacement);
				P2++;
			}
		}
	}

	alert("2015, Day 19\nPart 1: " + P1.length + "\nPart 2: " + P2);
};

aof[19][0] = (input) => {
	var target = Number(input);

	const presents = [];
	const presents2 = [];

	for (let e = 1; e < target / 10; e++) {
		let visits = 0;
		for (let i = e; i < target / 10; i = i + e) {
			if (!presents[i]) 
				presents[i] = 10;
			presents[i] = presents[i] + e * 10;

			if (visits < 50) {
				if (!presents2[i]) 
					presents2[i] = 11;
				presents2[i] = presents2[i] + e * 11;
				visits = visits + 1;
			}
		}
	}

	const P1 = presents.reduce((min, current, index) => (min === 0 && current >= target) ? min = index : min, 0);
	const P2 = presents2.reduce((min, current, index) => (min === 0 && current >= target) ? min = index : min, 0);

	
	alert("2015, Day 20\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[20][0] = (input) => {
	var bossStats = input.split("\n").map(x => x.split(" ")).map(x => Number(x[x.length-1]));
	const weapons = [
		{cost: 8, damage: 4, armor: 0},
		{cost: 10, damage: 5,	armor: 0},
		{cost: 25, damage: 6,	armor: 0},
		{cost: 40, damage: 7,	armor: 0},
		{cost: 74, damage: 8,	armor: 0}
	];
	const	armors = [ 
		{cost: 0,	damage: 0, armor: 0},
		{cost: 13, damage: 0, armor: 1},
		{cost: 31, damage: 0,	armor: 2},
		{cost: 53, damage: 0,	armor: 3},
		{cost: 75, damage: 0, armor: 4},
		{cost: 102, damage: 0, armor: 5}
	];
	const rings = [
		{cost: 0, damage: 0, armor: 0},
		{cost: 25, damage: 1, armor: 0},
		{cost: 50, damage: 2, armor: 0},
		{cost: 100, damage: 3, armor: 0},
		{cost: 20, damage: 0, armor: 1},
		{cost: 40, damage: 0, armor: 2},
		{cost: 80, damage: 0, armor: 3}
	];

	//returns true if the player wins, returns false if the player dies
	function fight(player){
		const boss = {hp: bossStats[0], damage: bossStats[1], armor: bossStats[2]};
		while(player.hp > 0 && boss.hp > 0){
			let playerDamage = Math.max(player.damage - boss.armor, 1);
			let bossDamage = Math.max(boss.damage - player.armor, 1);
			if(player.hp > 0) boss.hp -= playerDamage;
			if(boss.hp > 0) player.hp -= bossDamage;
		}
		return player.hp > 0;
	}

	var loadouts = [];
	var P1 = Infinity, P2 = 0;
	for(let w of weapons){
		for(let a of armors){
			for(let r1 of rings){
				for(let r2 of rings){
					if(r1 !== r2 || (r1.cost === 0 && r2.cost === 0)){
						const player = {
							hp: 100,
							damage: w.damage + r1.damage + r2.damage,
							armor: a.armor + r1.armor + r2.armor
						};
						if(fight(player))
							P1 = Math.min(P1, (w.cost + a.cost + r1.cost + r2.cost));
						else
							P2 = Math.max(P2, (w.cost + a.cost + r1.cost + r2.cost));
					}
				}
			}
		}
	}

	alert("2015, Day 21\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[21][0] = (input) => {
	var bossStats = input.split("\n").map(x => x.split(" ")).map(x => Number(x[x.length-1]));
	var Player = {
		hp: 50,
		armor: 0,
		mana: 500,
		recharge: 0,
		shield: 0,
		spent: 0,
		spells: [
			{name: "MM", cost: 53},
			{name: "D", cost: 73},
			{name: "S", cost: 113, active: false, duration: 6},
			{name: "P", cost: 173, active: false, duration: 6},
			{name: "R", cost: 229, active: false, duration: 5}
		]
	};
	var Boss = {
		hp: bossStats[0],
		damage: bossStats[1],
		poison: 0
	};

	function castSpell(spellIndex, player, boss){
		player.mana -= player.spells[spellIndex].cost;
		player.spent += player.spells[spellIndex].cost;
		switch(spellIndex){
			case 0:
				boss.hp -= 4;
				break;
			case 1:
				boss.hp -= 2;
				player.hp += 2;
				break;
			case 2:
				player.spells[2].active = true;
				player.shield = 6;
				break;
			case 3:
				player.spells[3].active = true;
				boss.poison = 6;
				break;
			case 4:
				player.spells[4].active = true;
				player.recharge = 5;
				break;
		}
	}

	function effect(player, boss, hard){
		if(hard){
			player.hp--;
		}
		if(player.shield > 0){
			player.shield--;
		}
		if(player.recharge > 0){
			player.mana += 101;
			player.recharge--;
		}
		if(boss.poison > 0){
			boss.hp -= 3;
			boss.poison--;
		}
		player.armor = (player.shield > 0) ? 7 : 0;
		player.spells[2].active = (player.shield > 0);
		player.spells[3].active = (boss.poison > 0);
		player.spells[4].active = (player.recharge > 0);
	}

	var P1 = Infinity;

	function play(player, boss, partTwo){
		for(var i = 0; i < player.spells.length; i++){
			var s = player.spells[i];
			if(s.active)
				continue;
			if(s.cost > player.mana)
				continue;

			var pCopy = JSON.parse(JSON.stringify(player));
			var bCopy = JSON.parse(JSON.stringify(boss));

			effect(pCopy, bCopy, partTwo);
			if(pCopy.hp <= 0 && bCopy.hp > 0)
				continue;
			castSpell(i, pCopy, bCopy);
			effect(pCopy, bCopy, false);
			pCopy.hp -= Math.max(bCopy.damage - pCopy.armor);

			if(bCopy.hp <= 0){
				P1 = Math.min(P1, pCopy.spent);
			}
			if(pCopy.hp > (partTwo ? 1 : 0) && bCopy.hp > 0 && pCopy.spent < P1)
				play(pCopy, bCopy, partTwo);
		}
	}

	play(Player, Boss, false);
	alert(P1);

	P1 = Infinity;
	play(Player, Boss, true);
	var P2 = P1;
	alert(P2 + " Wrong ");
};

aof[22][0] = (input) => {
	let instructions = input.split('\n').map(x => x.split(' '));

	function runInstructions(part2){
		let regA = (part2) ? 1 : 0;
		let regB = 0;
		let instIndex = 0;
		while(instIndex < instructions.length && instIndex >= 0){
			let jmp = 0;
			let inst = instructions[instIndex];
			switch(inst[0]){
				case 'inc':
					if(inst[1] == 'a')
						regA++;
					else
						regB++;
					instIndex++;
					break;
				case 'tpl':
					if(inst[1] == 'a')
						regA *= 3;
					else
						regB *= 3;
					instIndex++;
					break;
				case 'hlf':
					if(inst[1] == 'a')
						regA /= 2;
					else
						regB /= 2;
					instIndex++;
					break;
				case 'jio':
					jmp = inst[2];
					if(jmp[0] == '+')
						jmp = jmp.substring(1);
					if(inst[1][0] == 'a')
						instIndex += (regA == 1) ? parseInt(jmp) : 1;
					else
						instIndex += (regB == 1) ? parseInt(jmp) : 1;
					break;
				case 'jie':
					jmp = inst[2];
					if(jmp[0] == '+')
						jmp = jmp.substring(1);
					if(inst[1][0] == 'a')
						instIndex += (regA%2 == 0) ? parseInt(jmp) : 1;
					else
						instIndex += (regB%2 == 0) ? parseInt(jmp) : 1;
					break;
				case 'jmp':
					jmp = inst[1];
					if(jmp[0] == '+')
						jmp = jmp.substring(1);
					instIndex += parseInt(jmp);
					break;
			}
		}
		return regB;
	}
	console.log(runInstructions(false));
	console.log(runInstructions(true));
};

aof[23][0] = (input) => {
	var weights = input.split('\n').map(Number);
	var totalWeight = weights.reduce((total, val) => total + val);

	function calcQE(set){
		return set.reduce((total, val) => total * val, 1);
	}
	
	function getGroups(maxWeight, packages, index){
		var allGroups = [];
		index = (index === undefined) ? packages.length - 1 : index;

		for(var i = index; i >= 0; i--){
			var weight = maxWeight - packages[i];
			if(weight === 0){
				allGroups.push([packages[i]]);
			} else if(weight > 0){
				var subGroups = getGroups(weight, packages, i - 1);
				for(var j = 0; j < subGroups.length; j++){
					subGroups[j].push(packages[i]);
				}
				allGroups = allGroups.concat(subGroups);
			}
		}

		if(!allGroups.length)
			return allGroups;

		var shortest = allGroups.reduce((p, i) => Math.min(p, i.length), Infinity);
		return allGroups.map(a => a.sort((a,b) => a-b)).filter((a, i) => {
			if(a.length !== shortest){return false;}
			return !(allGroups.find((f, fi) => i > fi && a.toString() === f.toString()));
		});
	}

	function groupSort(a,b) {
		if(a.length === b.length)
			return calcQE(a) - calcQE(b);
		else
			return a.length - b.length;
	}

	var groups = getGroups(totalWeight/3, weights);
	groups.sort(groupSort);
	var P1 = null;
	for(var i = 0; i < groups.length && !P1; i++){
		var g = groups[i];
		var remainder = weights.filter(w => g.indexOf(w) === -1);
		if(getGroups(totalWeight/3, remainder).length)
			P1 = calcQE(g);
	}
	console.log(P1);

	groups = getGroups(totalWeight/4, weights);
	groups.sort(groupSort);
	var P2 = null;
	for(var i = 0; i < groups.length && !P2; i++){
		var g = groups[i];
		var remainder = weights.filter(w => g.indexOf(w) === -1);
		var subGroups;
		if((subGroups = getGroups(totalWeight/4, remainder)) && subGroups.length) {
			for(var j = 0; j < subGroups.length; j++) {
				var subG = subGroups[j];
				var subRem = weights.filter(w => g.indexOf(w) === -1 && subG.indexOf(w) === -1);
				if(getGroups(totalWeight/4, subRem).length)
					P2 = calcQE(g);
			}
		}
	}
	console.log(P2);
};

aof[24][0] = (input) => {
	let parts = input.split(' ');
	let row = parseInt(parts[parts.indexOf('row') + 1]);
	let col = parseInt(parts[parts.indexOf('column') + 1]);
	console.log([row, col]);
	let manual = [[20151125, 18749137, 17289845, 30943339, 10071777, 33511524],
								[31916031, 21629792, 16929656,  7726640, 15514188,  4041754],
								[16080970,  8057251,  1601130,  7981243, 11661866, 16474243],
								[24592653, 32451966, 21345942,  9380097, 10600672, 31527494],
								[   77061, 17552253, 28094349,  6899651,  9250759, 31663883],
								[33071741,  6796745, 25397450, 24659492,  1534922, 27995004]];
	function nextIndex(r,c) {
		if(r-1 == -1)
			return [c+1, 0];
		else
			return [r-1, c+1];
	}
	function nextVal(val) {
		result = (val * 252533) % 33554393;
		return result;
	}

	let r = 0, c = 0;
	let currentVal = 0;
	while(r !== row || c !== col){
		//console.log([r, c]);
		currentVal = manual[r][c];
		let next = nextIndex(r,c);
		if(manual[next[0]] === undefined)
			manual[next[0]] = [];
		if(manual[next[0]][next[1]] === undefined)
			manual[next[0]][next[1]] = nextVal(manual[r][c]);
		r = next[0];
		c = next[1];
	}

	console.log(manual[row-1][col-1]);
};