var aof = [];
for(var i = 0; i < 25; i++){
	aof.push([]);
}

function clearOut() {
	document.getElementById("output").value = "";
}

function run() {
	var input = document.getElementById("input").value;
	var year = parseInt(document.getElementById("year").value, 10);
	var day = parseInt(document.getElementById("day").value, 10);
	var output = document.getElementById("output");
	if (input == "")
		output.value = "No Input Detected";
	else {
		try{
			aof[day-1][year-15](input);
		}catch(err){
			console.log(err);
		}
	}
}