const dir = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];

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

const countBoom = (gameMap,x,y,count) => {
	if(gameMap[x][y] === -1) return -1;
	for(let i = 0;i < 8;i++){
		const tx = x + dir[i][0];
		const ty = y + dir[i][1];
		if(tx < 0 || ty < 0 || tx >= xSize||ty >= ySize) continue;
		if(gameMap[tx][ty] === -1) {
			count++;
		}
	}
	return count;
}

const spread = (x,y) => {
	step[x][y] = 0;
	if(gameMap[x][y] !== 0){
		const div = document.getElementById(x + '/' + y);
		div.className = 'tapNum';
		div.style.fontSize = '32px';
		div.innerText = gameMap[x][y];
		return;
	}
	for(let i = 0;i < 8;i++){
		const tx = Number(x) + Number(dir[i][0]);
		const ty = Number(y) + Number(dir[i][1]);
		if(tx < 0 || ty < 0 || tx >= xSize||ty >= ySize||step[tx][ty] === 0) continue;
//		console.log(Number(tx),Number(ty));
		const div = document.getElementById(tx + '/' + ty);
		div.className = 'tapNum';
		spread(tx,ty);
	}
}


const click = (e) => {
	console.log(e)
	const site = e.target.id.split('/');
	const div = document.getElementById(e.target.id);
	const x = site[0];
	const y = site[1];
	if(gameMap[x][y] != -1){
		if(gameMap[x][y] !== 0){
			step[x][y] = 0;
			div.className = 'tapNum';
			div.style.fontSize = '32px';
			div.innerText = gameMap[x][y];
		}else{
			div.className = 'tapNum';
			spread(x,y);
		}
	}
	else {
		step[x][y] = 0;
		for(let i = 0;i < xSize;i++){
			for(let j = 0;j < ySize;j++){
				const tdiv = document.getElementById(i+'/'+j);
				if(gameMap[i][j] > 0){
					tdiv.className = 'tapNum';
					tdiv.style.fontSize = '32px';
					tdiv.innerText = gameMap[i][j];
				}else if(gameMap[i][j] === -1){
					tdiv.className = 'boom';
				}else {
					tdiv.className = 'tapNum';
				}
			}
		}
		div.className = 'tapBoom';
	}
	console.log(gameMap[x][y]);
}