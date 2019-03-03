'use strict'

let gameISOn = true;
let cancelRecognizeCollision;
let cancelSuperPackman;
let time = 5000;
let timeOfSuperPackman;
var x, y, z;

const packman = {
    left: 0,
    top: 0,
    bottom: 300,
    right: 300,
    width: 20,
    height: 20,
    isSuper: false
};

const enemies = [
    {
        top: 75,
        left: 75,
        bottom: 225,
        right: 225
    },
    {
        top: 100,
        left: 100,
        bottom: 200,
        right: 200
    },
    {
        top: 125,
        left: 125,
        bottom: 175,
        right: 175
    },
    {
        top: 150,
        left: 150,
        bottom: 150,
        right: 150
    },
    {
        top: 175,
        left: 175,
        bottom: 125,
        right: 125
    },
    {
        top: 100,
        left: 100,
        bottom: 200,
        right: 200
    },

]

const enemyPosition = {
    top: 100,
    left: 100,
    bottom: 200,
    right: 200
}

const boardSize = {
    width: 300,
    height: 300
};

const sideActive = {
    right: null,
    left: null,
    down: null,
    up: null
};

const foodSize = {
    width: 10,
    height: 10
};

let originalTime;

packmanPosition()

const clearIntervalsOfSides = (a, b, c) => {
    clearInterval(sideActive[a])
    clearInterval(sideActive[b])
    clearInterval(sideActive[c])
};

const displayTimer = () => {
    let timer = 1
    setInterval(() => {
        document.querySelector('.time').innerHTML = timer++
    }, 1000)
}
displayTimer()

const restSecondarySide = (a, b, c) => {
    sideActive[a] = null
    sideActive[b] = null
    sideActive[c] = null
}


function packmanPosition() {
    document.querySelector('.packman').style.left = packman.left + 'px';
    document.querySelector('.packman').style.top = packman.top + 'px'
    document.querySelector('.packman').style.right = packman.right + 'px'
    document.querySelector('.packman').style.bottom = packman.bottom + 'px'
}

function movePackman(e) {
    switch (e.keyCode) {
        case 39:
            if (!sideActive.right) {
                clearIntervalsOfSides('left', 'up', 'down')
                restSecondarySide('left', 'up', 'down')
                sideActive.right = setInterval(movePackmanRight, 30)
                break;
            } else return
        case 37:
            if (!sideActive.left) {
                clearIntervalsOfSides('right', 'up', 'down')
                restSecondarySide('right', 'up', 'down')
                sideActive.left = setInterval(movePackmanLeft, 30)
                break;
            } else return
        case 38:
            if (!sideActive.up) {
                clearIntervalsOfSides('right', 'left', 'down')
                restSecondarySide('right', 'left', 'down')
                sideActive.up = setInterval(movePackmanUp, 30);
                break;
            } else return
        case 40:
            if (!sideActive.down) {
                clearIntervalsOfSides('right', 'up', 'left')
                restSecondarySide('right', 'up', 'left')
                sideActive.down = setInterval(movePackmanDown, 30)
                break;
            } else return
    }
}


// Movement of packman

const movePackmanRight = e => {
    if (gameISOn) {
        if (packman.left <= 300) {
            packman.left = packman.left + 5;
            packman.right = packman.right - 5
            document.querySelector('.packman').style.left = packman.left + 'px';
        } else clearInterval(sideActive.right)
    }
}

const movePackmanLeft = e => {
    if (gameISOn) {
        if (packman.left >= 0) {
            packman.left = packman.left - 5;
            packman.right = packman.right + 5;
            document.querySelector('.packman').style.left = packman.left + 'px';
        } else clearInterval(sideActive.left)
    }
}
const movePackmanUp = e => {
    if (gameISOn) {
        if (packman.top >= 0) {
            packman.top = packman.top - 5;
            packman.bottom = packman.bottom + 5
            document.querySelector('.packman').style.top = packman.top + 'px';
        } else clearInterval(sideActive.up)
    }
}
const movePackmanDown = e => {
    if (gameISOn) {
        if (packman.top <= 300) {
            packman.top = packman.top + 5;
            packman.bottom = packman.bottom - 5
            document.querySelector('.packman').style.top = packman.top + 'px';
        } else clearInterval(sideActive.down)
    }
}

/* handle all types food in the game */

const createFood = (className) => {
    if (gameISOn) {
        let [top, left] = [Math.floor(Math.random() * 300), Math.floor(Math.random() * 300)];
        let [bottom, right] = [boardSize.height - top, boardSize.width - left]
        const board = document.querySelector('.board');
        board.innerHTML += '<div class="' + className + '" style="top:' + top + 'px; left:' + left + 'px; bottom:' + bottom + 'px; right:' + right + 'px"></div>'
    }
}

const createRegularFood = () => {
    createFood('food')
}

const createSuperFood = () => {
    createFood('super-food')

}

setInterval(createRegularFood, 2000)
setInterval(createSuperFood, 5000)

const recognizePackmanEating = (className) => {
    if (gameISOn) {
        document.querySelectorAll(className)
            .forEach(food => {
                if (packman.top + packman.width >= parseInt(food.style.top) &&
                    packman.left + packman.height >= parseInt(food.style.left) &&
                    packman.bottom + foodSize.height >= parseInt(food.style.bottom) &&
                    packman.right + foodSize.width >= parseInt(food.style.right)
                ) {
                    if (className === '.super-food' && !packman.isSuper) {
                        time = time === 0 ? 5000 : time
                        x = setInterval(() => {
                            console.log('asddddddddddd');

                            if (time) {
                                time -= 1000
                            }
                        }, 1000)
                        packman.isSuper = true
                        document.querySelectorAll('.enemy')
                            .forEach(enemy => {
                                enemy.style.opacity = '0.2'
                            })
                        timeOfSuperPackman = setTimeout(() => {
                            packman.isSuper = false
                            document.querySelectorAll('.enemy')
                                .forEach(enemy => {
                                    enemy.style.opacity = '1'

                                })
                        }, 5000)
                    } else if (className === '.super-food' && packman.isSuper) {
                        if (x) clearInterval(x)
                        if (y) clearInterval(y)
                        time = 5000
                        y = setInterval(() => {
                            if (time) {
                                time -= 1000
                            }
                        }, 1000)
                        clearTimeout(timeOfSuperPackman)
                        timeOfSuperPackman = setTimeout(() => {
                            packman.isSuper = false
                            document.querySelectorAll('.enemy')
                                .forEach(enemy => {
                                    enemy.style.opacity = '1'

                                })
                        }, 5000)
                    }
                    food.remove()
                }
            })
    }
}

setInterval(() => recognizePackmanEating('.food'), 30)
setInterval(() => recognizePackmanEating('.super-food'), 30)
setInterval(recognizeCollision, 30)


const createEnemy = () => {
    let [top, left] = [100, 100]
    let [bottom, right] = [boardSize.height - top, boardSize.width - left]
    for (let i = 0; i < enemies.length; i++) {
        const board = document.querySelector('.board');
        board.innerHTML += "<div class='enemy enemy" + i + "' style='top:" + enemies[i].top + "px; left:" + enemies[i].left + "px; bottom:" + enemies[i].bottom + "px; right:" + enemies[i].right + "px;'></div>"
    }
};
createEnemy()

const moveEnemy = () => {
    if (gameISOn) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].top <= 20) {
                enemies[i].top = 20
            }
            if (enemies[i].top >= 280) {
                enemies[i].top = 280
            }
            if (enemies[i].left <= 20) {
                enemies[i].left = 20
            }
            if (enemies[i].left >= 280) {
                enemies[i].left = 280;
            }
            const addedNum = Math.random() > 0.5 ? 10 : -10;
            if (Math.random() > 0.5) {
                enemies[i].top = enemies[i].top + addedNum
                enemies[i].bottom = boardSize.height - enemies[i].top;
                document.querySelector('.enemy' + i + '').style.top = enemies[i].top + 'px'
            } else {
                enemies[i].left = enemies[i].left + addedNum;
                enemies[i].right = boardSize.width - enemies[i].left;

                document.querySelector('.enemy' + i + '').style.left = enemies[i].left + 'px'
            }
        }

    }
}
setInterval(moveEnemy, 100)

function recognizeCollision() {
    if (gameISOn && !packman.isSuper) {
        document.querySelectorAll('.enemy')
            .forEach((_, i) => {
                if (packman.top + packman.width >= enemies[i].top &&
                    packman.left + packman.height >= enemies[i].left &&
                    packman.bottom + foodSize.width >= enemies[i].bottom &&
                    packman.right + foodSize.height >= enemies[i].right
                ) {
                    gameISOn = false
                }
            })
    }
}

const removeSuperFoodAfterSec = () => {
    if (gameISOn) {
        try {
            document.querySelectorAll('.super-food')[0].remove()
        } catch (e) {
            return
        }
    }
}

setInterval(removeSuperFoodAfterSec, 8000)



function addAnimationForEnemy(enemy) {
    document.querySelectorAll('.enemy')
        .forEach(enemy => {
            if (time > 0) {
                if (time === 5000 && packman.isSuper) {
                    enemy.style.animation = null;
                    enemy.style.opacity = '.2'
                }
                else if (time < 3000) {
                    enemy.style.opacity = '.5'
                    enemy.style.animation = 'mymove .5s infinite'
                } else if (time < 5000) {
                    enemy.style.opacity = '.2'
                }
            } else {
                enemy.style.animation = null
                enemy.style.opacity = '1'
                clearInterval(y)
                clearInterval(x)
            }
        })
}

setInterval(addAnimationForEnemy, 100)