const initialize = function(){
	const children = root.childNodes;
	for(let i = root.childNodes.length - 1;i >= 0;i--){
		root.removeChild(children[i]);
	}
	
	gameMap = new Array(xSize);
	step = new Array(xSize);
	for(let i = 0;i < xSize;i++){
			gameMap[i] = new Array(ySize);
			step[i] = new Array(ySize);
			gameMap[i].fill(0);
			step[i].fill(1);
		}
		for(let i = 0;i < xSize;i++){
			while(true){
		 		const x = randomNum(0,xSize-1);
				const y = randomNum(0,ySize-1);
				if(gameMap[x][y] === 0){
					gameMap[x][y] = -1;
					break;
				}
			}
		}
		for(let i = 0;i < xSize;i++){
			for(let j = 0;j < ySize;j++){
				gameMap[i][j] = countBoom(gameMap,i,j,0);
				const patch = document.createElement('div');
				patch.style.width = Math.floor(root.offsetWidth * 0.1 - 2) + 'px';
				patch.style.height = Math.floor(root.offsetWidth * 0.1 - 2) + 'px';
				patch.className = 'init';
				patch.onclick = click;
				patch.oncontextmenu = mouseRight;
				patch.id = i + '/' + j;
				root.appendChild(patch);
			}
		}
}
const mouseRight = (e) => {
	const site = e.target.id.split('/');
	const div = document.getElementById(e.target.id);
	if(div.className === 'init') {
		div.className = 'flag';
	} else if(div.className === 'flag') {
		div.className = 'init';
	}

}

const click = (e) => {
	const site = e.target.id.split('/');
	const div = document.getElementById(e.target.id);
	if(div.className === 'flag') return;
	const x = site[0];
	const y = site[1];
	if(gameMap[x][y] != -1) {
		if(gameMap[x][y] !== 0) {
			step[x][y] = 0;
			div.className = 'tapNum';
			div.style.fontSize = '32px';
			div.innerText = gameMap[x][y];
		} else {
			div.className = 'tapNum';
			spread(x, y);
		}
	} else {
		step[x][y] = 0;
		for(let i = 0; i < xSize; i++) {
			for(let j = 0; j < ySize; j++) {
				const tdiv = document.getElementById(i + '/' + j);
				if(tdiv.className === 'flag') continue;
				tdiv.onclick = null;
				if(gameMap[i][j] > 0) {
					tdiv.className = 'tapNum';
					tdiv.style.fontSize = '32px';
					tdiv.innerText = gameMap[i][j];
				} else if(gameMap[i][j] === -1) {
					tdiv.className = 'boom';
				} else {
					tdiv.className = 'tapNum';
				}
			}
		}
		div.className = 'tapBoom';
		setTimeout(() => {
			const message = confirm('游戏结束，是否重新开始？');
			if(message === true) {
				initialize();
				console.log('opk');
			} else {
				console.log(123);
			}
		}, 200);
	}
}
initialize();