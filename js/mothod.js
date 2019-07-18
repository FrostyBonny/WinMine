const dir = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
	[1, 1],
	[1, -1],
	[-1, 1],
	[-1, -1]
];
document.oncontextmenu = function() {
	return false;
};
const root = document.getElementById('map');
const flagCountElement = document.getElementById("mineRemain");
const timeCountElement = document.getElementById("timeUsed");
const selectElement = document.getElementsByName("level");
const restartBtn = document.getElementById("restart");
let xSize = null;
let ySize = null;
let gameMap = new Array(xSize);
let step = new Array(xSize);
let mine = [];
let flagMine = [];
let flagCount;
let startTime = null;
let fontSize = null;
let timer = setInterval(function(){
	if(startTime){
		timeCountElement.innerHTML = (Math.floor((new Date()-startTime)/1000)).toString();
	}
},1000);



const round = (number, precision) => {
	return Math.round((number + 'e' + precision) / Math.pow(10, precision));
	//same as:
	//return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
}

function randomNum(minNum, maxNum) {
	switch(arguments.length) {
		case 1:
			return round(Math.random() * minNum, 1);
			break;
		case 2:
			return round(Math.random() * (maxNum - minNum) + minNum, 1);
			break;
		default:
			return 0;
			break;
	}
}

const countBoom = (gameMap, x, y, count) => {
	if(gameMap[x][y] === -1) return -1;
	for(let i = 0; i < 8; i++) {
		const tx = x + dir[i][0];
		const ty = y + dir[i][1];
		if(tx < 0 || ty < 0 || tx >= xSize || ty >= ySize) continue;
		if(gameMap[tx][ty] === -1) {
			count++;
		}
	}
	return count;
}

const spread = (x, y) => {
	step[x][y] = 0;
	if(gameMap[x][y] !== 0) {
		const div = document.getElementById(x + '/' + y);
		div.className = 'tapNum';
		div.style.fontSize = fontSize;
		div.innerText = gameMap[x][y];
		return;
	}
	for(let i = 0; i < 8; i++) {
		const tx = Number(x) + Number(dir[i][0]);
		const ty = Number(y) + Number(dir[i][1]);
		if(tx < 0 || ty < 0 || tx >= xSize || ty >= ySize || step[tx][ty] === 0) continue;
		//		console.log(Number(tx),Number(ty));
		const div = document.getElementById(tx + '/' + ty);
		div.className = 'tapNum';
		spread(tx, ty);
	}
}
