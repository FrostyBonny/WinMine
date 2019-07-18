const initialize = function () {
    if(selectElement[0].checked == true){
        flagCount = 10;
        xSize = 10;
        ySize = 10;
        fontSize = "32px"
    }else{
        flagCount = 40;
        xSize = 16;
        ySize = 16;
        fontSize = "20px"
    }
    startTime = null;
    const children = root.childNodes;
    for (let i = root.childNodes.length - 1; i >= 0; i--) {
        root.removeChild(children[i]);
    }

    flagCountElement.innerHTML = flagCount.toString();

    // 地图数组
    gameMap = new Array(xSize);
    // 用于标记是否走过
    step = new Array(xSize);
    for (let i = 0; i < xSize; i++) {
        gameMap[i] = new Array(ySize);
        step[i] = new Array(ySize);
        gameMap[i].fill(0);
        step[i].fill(1);
    }
    for (let i = 0; i < flagCount; i++) {
        while (true) {
            const x = randomNum(0, xSize - 1);
            const y = randomNum(0, ySize - 1);
            if (gameMap[x][y] === 0) {
                mine.push({
                    "x": x,
                    "y": y,
                })
                gameMap[x][y] = -1;
                break;
            }
        }
    }
    for (let i = 0; i < xSize; i++) {
        for (let j = 0; j < ySize; j++) {
            gameMap[i][j] = countBoom(gameMap, i, j, 0);
            const patch = document.createElement('div');
            patch.style.width = Math.floor(root.offsetWidth /xSize - 2) + 'px';
            patch.style.height = Math.floor(root.offsetWidth /xSize - 2) + 'px';
            patch.className = 'init';
            patch.onclick = click;
            patch.oncontextmenu = mouseRight;
            patch.id = i + '/' + j;
            root.appendChild(patch);
        }
    }
}
const mouseRight = (e) => {
    console.log(flagMine)
    startTime == null ? startTime = new Date() : null;
    const site = e.target.id.split('/');
    let x = site[0];
    let y = site[1];
    const div = document.getElementById(e.target.id);
    if (div.className == "init") {
        div.className = "flag";
        flagCount--;

        let index = -1;
        for (let i = 0; i < mine.length; i++) {
            if (mine[i].x == x && mine[i].y == y) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            flagMine.push({"x": x, "y": y});
        }

        if (flagMine.length === mine.length && flagCount == 0) {
            setTimeout(() => {
                let usedTime = (Math.floor((new Date()-startTime)/1000));
                const message = confirm(`游戏胜利,用时${usedTime}秒，是否重新开始？`);
                if (message === true) {
                    initialize();
                    console.log('win');
                } else {
                    console.log(123);
                }
            }, 200);
        }
    } else if (div.className == "tapNum") {
        return;
    } else {
        div.className = "init";
        flagCount++;
        for (let i = 0; i < flagMine.length; i++) {
            if (flagMine[i].x == x && flagMine[i].y == y) {
                flagMine.splice(i, 1)
            }
        }
        // mine.push({"x":x,"y":y});
    }
    console.log(flagCount)
    flagCountElement.innerHTML = flagCount.toString();
    // div.className = div.className == "init"? "flag":"init";
}

const click = (e) => {
    startTime == null ? startTime = new Date() : null;
    const site = e.target.id.split('/');
    const div = document.getElementById(e.target.id);
    if (div.className === 'flag') return;
    const x = site[0];
    const y = site[1];
    if (gameMap[x][y] != -1) {
        if (gameMap[x][y] !== 0) {
            step[x][y] = 0;
            div.className = 'tapNum';
            div.style.fontSize = fontSize;
            div.innerText = gameMap[x][y];
        } else {
            div.className = 'tapNum';
            spread(x, y);
        }
    } else {
        step[x][y] = 0;
        for (let i = 0; i < xSize; i++) {
            for (let j = 0; j < ySize; j++) {
                const tdiv = document.getElementById(i + '/' + j);
                if (tdiv.className === 'flag') continue;
                tdiv.onclick = null;
                if (gameMap[i][j] > 0) {
                    tdiv.className = 'tapNum';
                    tdiv.style.fontSize = fontSize;
                    tdiv.innerText = gameMap[i][j];
                } else if (gameMap[i][j] === -1) {
                    tdiv.className = 'boom';
                } else {
                    tdiv.className = 'tapNum';
                }
            }
        }
        div.className = 'tapBoom';
        setTimeout(() => {
            const message = confirm('游戏结束，是否重新开始？');
            if (message === true) {
                initialize();
                console.log('opk');
            } else {
                console.log(123);
            }
        }, 200);
    }
}

for(let i = 0;i < selectElement.length;i++){
    selectElement[i].addEventListener("click",()=>{
        const message = confirm('是否放弃当前游戏重新开始？');
        if (message === true) {
            initialize();
            console.log('restart1');
        } else {
            console.log(123);
        }
    })
}
restartBtn.addEventListener("click",()=>{
    const message = confirm('是否重新开始？');
    if (message === true) {
        initialize();
        console.log('restart1');
    } else {
        console.log(123);
    }
})
initialize();
console.log(mine)
