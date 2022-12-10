//Day1
aof[0][5] = (input) => {
	var entries = input.split('\n');
	var P1 = 0, P2 = 0;
	for(var i = 0; i < entries.length; i++){
		var x = parseInt(entries[i]);
		for(var j = i+1; j < entries.length; j++){
			var y = parseInt(entries[j]);
			if(P1 == 0 && x + y == 2020)
				P1 = x*y;
			for(k = j+1; k < entries.length; k++){
				var z = parseInt(entries[k]);
				if(P2 == 0 && x+y+z == 2020)
					P2 = x*y*z;
			}
		}
	}
	
	alert("2020, Day 1\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[1][5] = (input) => {
	var passwords = input.split('\n');
	var P1 = 0, P2 = 0;
	for(let i = 0; i < passwords.length; i++){
		var p = passwords[i];
		var min = parseInt(p.split(' ')[0].split('-')[0])
		var max = parseInt(p.split(' ')[0].split('-')[1])
		var letter = p.split(' ')[1][0];
		var pass = p.split(' ')[2];
		passwords[i] = [min, max, letter, pass];
	}
	for(let i = 0; i < passwords.length; i++){
		var p = passwords[i]
		var cnt = 0;
		var pass = p[3];
		var letter = p[2];
		for(let j = 0; j < pass.length; j++){
			if(pass[j] == letter)
				cnt++;
		}
		if(cnt >= p[0] && cnt <= p[1])
			P1++;
		if((pass[p[0]-1] == letter && pass[p[1]-1] != letter) ||
		   (pass[p[0]-1] != letter && pass[p[1]-1] == letter))
			P2++;
	}

	alert("2020, Day 2\nPart 1: " + P1 + "\nPart 2: " + P2);
};

aof[2][5] = (input) => {
	var P1 = 0, P2 = 1;
	var map = input.split('\n');
	var max = map[0].length;
	var slopes = [1,3,5,7];
	var x = 0;
	for(let k = 0; k < slopes.length; k++){
		x = 0;
		s = slopes[k];
		let tally = 0;
		for(let i = 0; i < map.length; i++){
			if(x >= max)
				x -= max;
			if(map[i][x] == '#'){
				tally++;
				if(s == 3)
					P1++;
			}
			x += s;
		}
		P2 *= tally;
	}
	x = 0;
	var cnt = 0;
	for(let j = 0; j < map.length; j+=2){
		if(x >= max)
			x -= max;
		if(map[j][x] == '#')
			cnt++;
		x++;
	}
	P2 *= cnt;
	

	alert("2020, Day 3\nPart 1: " + P1 + "\nPart 2: " + P2);
}

aof[3][5] = (input) => {
	var P1 = 0, P2 = 0;
	var lines = input.split("\n")
	var passports = [];
	var pass = "";
	var valid_passports = [];
	for(let i = 0; i < lines.length; i++){
		if(lines[i] == ""){
			passports.push(pass);
			pass = "";
		}else{
			if(lines[i+1] != "")
				pass += lines[i] + " ";
			else
				pass += lines[i];
		}
	}
	for(let i = 0; i < passports.length; i++){
		p = passports[i].split(' ');
		if(p.length == 8){
			valid_passports.push(p);
			P1++;
		}
		if(p.length == 7){
			let cid = false;
			for(let f = 0; f < p.length; f++){
				if(p[f].substring(0,3) == "cid")
					cid = true;
			}
			if(!cid){
				valid_passports.push(p);
				P1++;
			}
		}
	}
	var hash_vals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	var hair_colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
	var integers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var P2debug = "";
	for(let i = 0; i < valid_passports.length; i++){
		p = valid_passports[i];
		let valid = true;
		for(let j = 0; j < p.length; j++){
			k = p[j].split(':');
			switch(k[0]){
				case "byr":
					if(parseInt(k[1]) > 2002 || parseInt(k[1]) < 1920)
						valid = false;
					break;
				case "iyr":
					if(parseInt(k[1]) > 2020 || parseInt(k[1]) < 2010)
						valid = false;
					break;
				case "eyr":
					if(parseInt(k[1]) > 2030 || parseInt(k[1]) < 2020)
						valid = false;
					break;
				case "hgt":
					if(k[1].substring(k[1].length-2, k[1].length) == "cm"){
						if(parseInt(k[1].substring(0, k[1].length-2)) > 193 || parseInt(k[1].substring(0, k[1].length-2)) < 150)
							valid = false;
					}
					if(k[1].substring(k[1].length-2, k[1].length) == "in"){
						if(parseInt(k[1].substring(0, k[1].length-2)) > 76 || parseInt(k[1].substring(0, k[1].length-2)) < 59)
							valid = false;
					}
					break;
				case "hcl":
					if(k[1].length > 7 || k[1][0] != '#')
						valid = false;
					else{
						let hash = parseInt(k[1].substring(1,7), 16);
						if(hash.toString(16) !== k[1].substring(1,7))
							valid = false;	
					}
					break;
				case "ecl":
					if(!hair_colors.includes(k[1]))
						valid = false;
					break;
				case "pid":
					if(k[1].length != 9)
						valid = false;
					else
						for(let n = 0; n < k[1].length; n++){
							if(!integers.includes(k[1][n]))
								valid = false;
						}
					break;
			}
			P2debug += valid +', ';
		}
		if(valid)
			P2++;
	}


	alert("2020, Day 4\nPart 1: " + P1 + "\nPart 2: " + P2);
}

aof[4][5] = (input) => {
	var P1 = 0, P2 = 0;
	var lines = input.split('\n');
	var highestSeat = '';
	var seatIDs = [];
	for(let x = 0; x < 128; x++){
		var row =  [];
		for(let y = 0; y < 8; y++){
			row.push(false);
		}
		seatIDs.push(row);
	}
	for(let i = 0; i < lines.length; i++){
		var minR = 0, maxR = 127;
		var minC = 0, maxC = 7;
		for(let j = 0; j < lines[i].length; j++){
			switch(lines[i][j]){
				case 'F': 
					maxR = Math.floor((maxR+minR)/2);
					break;
				case 'B':
					minR = Math.ceil((minR+maxR)/2);
					break;
				case 'L':
					maxC = Math.floor((minC+maxC)/2);
					break;
				case 'R':
					minC = Math.ceil((minC+maxC)/2);
					break;
			}
		}
		let seatID = (minR * 8) + minC;
		if(seatID > P1){ 
			P1 = seatID;
			highestSeat =  lines[i];
		}
		seatIDs[minR][minC] = true;
	}
	for(var i = 5; i < seatIDs.length-5; i++){
		for(var j = 0; j < seatIDs[i].length; j++){
			let seatID = (i * 8) + j;
			if(!seatIDs[i][j] && seatID < P1){
				P2 = seatID
			}
		}
	}

	//alert(highestSeat);
	alert("2020, Day 5\nPart 1: " + P1 + "\nPart 2: " + P2);
}

aof[5][5] = (input) => {
	var P1 = 0, P2 = 0;
	var groups = input.split('\n\n')
	for(let i = 0; i < groups.length; i++){
		let g = '';
		let group = groups[i].split('\n');
		for(let j = 0; j < group.length; j++){
			g += group[j];
		}
		let questions = '';
		for(let j = 0; j < g.length; j++){
			if(!questions.includes(g[j]))
				questions += g[j];
		}
		P1 += questions.length;
		if(group.length == 1)
			P2 += group[0].length;
		else{
			let personA = group[0];
			for(let j = 0; j < personA.length; j++){
				let allYes = true;
				for(let k = 1; k < group.length; k++){
					if(!group[k].includes(personA[j]))
						allYes = false;
				}
				if(allYes)
					P2++;
			}
		}
	}


	alert("2020, Day 6\nPart 1: " + P1 + "\nPart 2: " + P2);
}