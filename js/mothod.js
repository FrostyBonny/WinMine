const dir = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];

function round(number, precision) {
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

function countBoom(map,x,y,count){
	if(map[x][y] === -1) return -1;
	for(let i = 0;i < 8;i++){
		const tx = x + dir[i][0];
		const ty = y + dir[i][1];
		if(tx < 0 || ty < 0 || tx >= 10||ty >= 10) continue;
		if(map[tx][ty] === -1) {
			count++;

		}
	}

	return count;
}
