'use strict'

let gameISOn = true;
let cancelRecognizeCollision;
let cancelSuperPackman;
let time = 5000;
let timeOfSuperPackman;
let timeForSpeed;
let prevKeyPress;
let speedTimePackman = 30;

var x, y, z;

const packman = {
    left: 0,
    top: 0,
    bottom: 380,
    right: 450,
    width: 20,
    height: 20,
    isSuper: false,
    isSpeeder: false
};

let enemies = [
    {
        id: Math.floor(Math.random() * 100000) + '',
        top: 175,
        bottom: 205,
        left: 75,
        right: 385
    },
    {
        id: Math.floor(Math.random() * 100000) + '',
        top: 100,
        left: 100,
        bottom: 280,
        right: 350
    },
    {
        id: Math.floor(Math.random() * 100000) + '',
        top: 125,
        left: 125,
        bottom: 255,
        right: 325
    },
    {
        id: Math.floor(Math.random() * 100000) + '',
        top: 150,
        left: 150,
        bottom: 230,
        right: 300
    },
    {
        id: Math.floor(Math.random() * 100000) + '',
        top: 175,
        left: 175,
        bottom: 285,
        right: 285
    },
    // {
    //     id: Math.floor(Math.random() * 100000) + '',
    //     top: 100,
    //     left: 100,
    //     bottom: 280,
    //     right: 350
    // },
    // {
    //     top: 100,
    //     left: 300,
    //     bottom: 280,
    //     right: 150
    // },
    // {
    //     top: 100,
    //     left: 400,
    //     bottom: 280,
    //     right: 50
    // },
    // {
    //     top: 330,
    //     left: 400,
    //     bottom: 50,
    //     right: 50
    // },
    // {
    //     top: 360,
    //     left: 400,
    //     bottom: 20,
    //     right: 50
    // },
    // {
    //     top: 250,
    //     left: 430,
    //     bottom: 130,
    //     right: 20
    // },
    // {
    //     top: 350,
    //     left: 20,
    //     bottom: 30,
    //     right: 430
    // },
    // {
    //     top: 190,
    //     left: 225,
    //     bottom: 190,
    //     right: 225
    // },

]

const enemyPosition = {
    top: 100,
    left: 100,
    bottom: 280,
    right: 350
}

const boardSize = {
    width: 450,
    height: 380
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

const createFoodInit = () => {
    let [top, left] = [20, 20];
    let [bottom, right] = [boardSize.height - top, boardSize.width - left];
    for (let i = 0; i < 180; i++) {
        const board = document.querySelector('.board');
        board.innerHTML += '<div class="food" style="top:' + top + 'px; left:' + left + 'px; bottom:' + bottom + 'px; right:' + right + 'px;"></div>'
        if (top < 330) {
            top += 30
            bottom -= 30
        } else {
            top = 20
            left += 30
            right -= 30
            bottom = boardSize.height - top
        }
    }
}

createFoodInit()

const displayTimer = () => {
    let timer = 1
    setInterval(() => {
        document.querySelector('.time').innerHTML = timer++
    }, 1000)
}
// displayTimer()

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
            prevKeyPress = 39
            if (!sideActive.right) {
                clearIntervalsOfSides('left', 'up', 'down')
                restSecondarySide('left', 'up', 'down')
                sideActive.right = setInterval(movePackmanRight, speedTimePackman)
            } else return
            break;
        case 37:
            prevKeyPress = 37
            if (!sideActive.left) {
                clearIntervalsOfSides('right', 'up', 'down')
                restSecondarySide('right', 'up', 'down')
                sideActive.left = setInterval(movePackmanLeft, speedTimePackman)
            } else return
            break;
        case 38:
            prevKeyPress = 38
            if (!sideActive.up) {
                clearIntervalsOfSides('right', 'left', 'down')
                restSecondarySide('right', 'left', 'down')
                sideActive.up = setInterval(movePackmanUp, speedTimePackman);
            } else return
            break;
        case 40:
            prevKeyPress = 40
            if (!sideActive.down) {
                clearIntervalsOfSides('right', 'up', 'left')
                restSecondarySide('right', 'up', 'left')
                sideActive.down = setInterval(movePackmanDown, speedTimePackman)
            } else return
            break;
    }
}


// Movement of packman

const movePackmanRight = e => {
    console.log(speedTimePackman);

    if (gameISOn) {
        if (packman.left <= 425) {
            packman.left = packman.left + 5;
            packman.right = packman.right - 5
            document.querySelector('.packman').style.left = packman.left + 'px';
        } else clearInterval(sideActive.right)
    }
}

const movePackmanLeft = e => {
    if (gameISOn) {
        if (packman.left >= packman.width) {
            packman.left = packman.left - 5;
            packman.right = packman.right + 5;
            document.querySelector('.packman').style.left = packman.left + 'px';
        } else clearInterval(sideActive.left)
    }
}
const movePackmanUp = e => {
    if (gameISOn) {
        if (packman.top >= packman.height) {
            packman.top = packman.top - 5;
            packman.bottom = packman.bottom + 5
            document.querySelector('.packman').style.top = packman.top + 'px';
        } else clearInterval(sideActive.up)
    }
}
const movePackmanDown = e => {
    if (gameISOn) {
        if (packman.top <= 355) {
            packman.top = packman.top + 5;
            packman.bottom = packman.bottom - 5
            document.querySelector('.packman').style.top = packman.top + 'px';
        } else clearInterval(sideActive.down)
    }
}

/* handle all types food in the game */

const createElementInBoard = (className) => {
    if (gameISOn) {
        let [top, left] = [Math.floor(Math.random() * (boardSize.height - 50) + 30), Math.floor(Math.random() * (boardSize.width - 50) + 30)];
        let [bottom, right] = [boardSize.height - top, boardSize.width - left]
        const board = document.querySelector('.board');
        board.innerHTML += '<div class="' + className + '" style="top:' + top + 'px; left:' + left + 'px; bottom:' + bottom + 'px; right:' + right + 'px"></div>'
    }
}

const createSuperFood = () => createElementInBoard('super-food');

const createSpeed = () => createElementInBoard('speed');


setInterval(createSuperFood, 8000)
setInterval(createSpeed, 12000)

const recognizePackmanEating = (className) => {
    if (gameISOn) {
        document.querySelectorAll('.' + className)
            .forEach(food => {
                if (packman.top + packman.width >= parseInt(food.style.top) &&
                    packman.left + packman.height >= parseInt(food.style.left) &&
                    packman.bottom + foodSize.height >= parseInt(food.style.bottom) &&
                    packman.right + foodSize.width >= parseInt(food.style.right)
                ) {
                    if (className === 'super-food' && !packman.isSuper) {
                        // food.remove()
                        time = time === 0 ? 5000 : time
                        x = setInterval(() => {
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

                    } else if (className === 'super-food' && packman.isSuper) {
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
                    if (className === 'speed' && !packman.isSpeeder) {
                        packman.isSpeeder = true
                        speedTimePackman = 10;
                        switch (prevKeyPress) {
                            case 39:
                                clearInterval(sideActive.right)
                                sideActive.right = null
                                sideActive.right = setInterval(movePackmanRight, speedTimePackman)
                                break;
                            case 37:
                                clearInterval(sideActive.left)
                                sideActive.left = null;
                                sideActive.left = setInterval(movePackmanLeft, speedTimePackman)
                                break;
                            case 38:
                                clearInterval(sideActive.up)
                                sideActive.up = null;
                                sideActive.up = setInterval(movePackmanUp, speedTimePackman)
                                break;
                            case 40:
                                clearInterval(sideActive.down)
                                sideActive.down = null;
                                sideActive.down = setInterval(movePackmanDown, speedTimePackman)
                                break;
                        }
                        timeForSpeed = setTimeout(() => {
                            speedTimePackman = 30;
                            packman.isSpeeder = false
                        }, 3000)
                    } else if (className === 'speed' && packman.isSpeeder) {
                        clearTimeout(timeForSpeed);
                        timeForSpeed = setTimeout(() => {
                            speedTimePackman = 30;
                            packman.isSpeeder = false
                        }, 3000)
                    }
                    food.remove()
                }
            })
    }
}

setInterval(() => recognizePackmanEating('food'), 30)
setInterval(() => recognizePackmanEating('super-food'), 30)
setInterval(() => recognizePackmanEating('speed'), 30)
setInterval(recognizeCollision, 30)


const createEnemy = (newEnemies) => {
    // let [top, left] = [100, 100]
    // let [bottom, right] = [boardSize.height - top, boardSize.width - left]
    if (!newEnemies) {
        for (let i = 0; i < enemies.length; i++) {
            console.log(enemies.length);

            const board = document.querySelector('.board');
            board.innerHTML += "<div class='enemy enemy" + enemies[i].id + "' style='top:" + enemies[i].top + "px; left:" + enemies[i].left + "px; bottom:" + enemies[i].bottom + "px; right:" + enemies[i].right + "px;'></div>"
        }
    } else {
        for (let i = 0; i < newEnemies.length; i++) {
            const board = document.querySelector('.board');
            board.innerHTML += "<div class='enemy enemy" + newEnemies[i].id + "' style='top:" + newEnemies[i].top + "px; left:" + newEnemies[i].left + "px; bottom:" + newEnemies[i].bottom + "px; right:" + newEnemies[i].right + "px;'></div>"
        }
    }
};
createEnemy()

const moveEnemy = () => {
    if (gameISOn && enemies.length) {
        console.log(enemies);

        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].top <= 20) {
                enemies[i].top = 20
            }
            if (enemies[i].top >= boardSize.height - 50) {
                enemies[i].top = boardSize.height - 50
            }
            if (enemies[i].left <= 20) {
                enemies[i].left = 20
            }
            if (enemies[i].left >= boardSize.width - 50) {
                enemies[i].left = boardSize.width - 50;
            }
            const addedNum = Math.random() > 0.5 ? 10 : -10;
            if (Math.random() > 0.5) {
                // handle top and bottom for enemy location
                enemies[i].top = enemies[i].top + addedNum
                enemies[i].bottom = boardSize.height - enemies[i].top;
                try {
                    document.querySelector('.enemy' + enemies[i].id + '').style.top = enemies[i].top + 'px'
                } catch (e) {
                    return
                }
            } else {
                enemies[i].left = enemies[i].left + addedNum;
                enemies[i].right = boardSize.width - enemies[i].left;
                try {
                    document.querySelector('.enemy' + enemies[i].id + '').style.left = enemies[i].left + 'px'
                } catch (e) {
                    return
                }
            }
        }

    }
}
setInterval(moveEnemy, 100)

function recognizeCollision() {
    if (gameISOn && enemies.length) {
        try {
            document.querySelectorAll('.enemy')
                .forEach((enemy, i) => {
                    if (packman.top + packman.width >= enemies[i].top &&
                        packman.left + packman.height >= enemies[i].left &&
                        packman.bottom + foodSize.width >= enemies[i].bottom &&
                        packman.right + foodSize.height >= enemies[i].right
                    ) {
                        if (packman.isSuper) {
                            const id = enemy.className.substr(11);
                            enemies = enemies.filter(enemy => enemy.id !== id);
                            enemy.remove()

                        } else {
                            gameISOn = false
                        }
                    }
                })

        } catch (e) {
            return

        }
    }
}


const removeElementFromBoard = (className) => {
    if (gameISOn) {
        try {
            document.querySelectorAll('.' + className + '')[0].remove()
        } catch (e) {
            return
        }
    }
}

setInterval(() => removeElementFromBoard('super-food'), 10000)
setInterval(() => removeElementFromBoard('speed'), 15000)



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

setInterval(addAnimationForEnemy, 100);


const createRandomEnemies = () => {
    const newEnemies = [
        {
            id: Math.floor(Math.random() * 1000000) + '',
            top: 240,
            bottom: 240,
            left: 275,
            right: 275
        },
        {
            id: Math.floor(Math.random() * 1000000) + '',
            top: 240,
            bottom: 240,
            left: 275,
            right: 275
        },
    ];
    enemies = enemies.concat(newEnemies)
    createEnemy(newEnemies)
};

setInterval(createRandomEnemies, 5000)