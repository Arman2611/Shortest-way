var node1 = document.getElementById('node1');
var node2 = document.getElementById('node2');
var button = document.getElementById('solve-btn');
var answerField = document.getElementById('answer-field');

// Graph nodes numbers
var nodes = [1, 2, 3, 4, 5];

// Starting points for vectors
var M = [5, 1, 3, 5, 1, 3, 3, 3];

// Final points for vectors
var N = [1, 2, 2, 2, 3, 3, 4, 5];


button.onclick = getAnswer;

function getAnswer () {
	var arg1 = parseInt(node1.value);
	var arg2 = parseInt(node2.value);
	getShortestWay(arg1, arg2)
}

function getShortestWay (arg1, arg2) {

	// Inputs validation
	if (arg1 < nodes[0] || arg1 > nodes[nodes.length-1] || 
		arg2 < nodes[0] || arg2 > nodes[nodes.length-1]) {
		wrongArguments();
		return;
	}
	if (arg1 === arg2) {
		drunkPassenger(arg1, arg2);
		return;
	}

	var result = [];
	var length = -1;

	// Checking 1 length ways
	for (let i = 0; i < M.length; i++) {
		if (M[i] == arg1 && N[i] == arg2) {
			result.push(arg1, arg2);
		}
	}

	// Checking 2 or more length ways
	if (result.length == 0) {
		var subArray = createSubArray(arg1);
		// console.log(subArray);
		var breakPoint = scanSubArray(subArray, arg2);
		if (breakPoint != undefined) {
			result.push(arg1, breakPoint, arg2)
		}
	}


	length = result.length - 1;

	if (length == -1) {
		answerField.innerHTML = `No way found from ${arg1} to ${arg2}`;
	} else {
		answerField.innerHTML = `Shortest way from ${arg1} to ${arg2} is ${result}`;
		answerField.innerHTML += `<br>Shortest way's length is ${length}`;
	}
}

function scanSubArray (subArray, arg2) {
	for (let i = 0; i < subArray.length; i++) {
		for (let j = 0; j < M.length; j++) {
			if (subArray[i] == M[j] && N[j] == arg2) {
				// console.log(M[j], arg2);
				return M[j];
			}
		}
	}
}

function createSubArray (arg1) {
	var subArray = [];
	for (let i = 0; i < M.length; i++) {
		if (M[i] == arg1) {
			subArray.push(N[i]);
		}
	}
	return subArray;
};

function wrongArguments () {
	alert('Incorrect node numbers. Please enter numbers between ' + 
		nodes[0] + ' and ' + nodes[nodes.length-1]);
}

function drunkPassenger (arg1, arg2) {
	answerField.innerHTML = 'Beginning and final points are the same.'; 
	answerField.innerHTML += '<br>The shortest way\'s length is 0';
}