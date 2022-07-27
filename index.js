const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5

const background = new sprite ({
    position: {
        x: 0 ,
        y: 0
    }, 
    imageSrc: './img/Background ionia1.png'
})
const player = new fighter({
    position: {
        x: 0, 
        y: 0
    },
    velocity: {
        x: 0, 
        y: 0
    },
    offset: {
        x: 0, 
        y: 0
    }
})

const enemy = new fighter({
    position: {
        x: 400, 
        y: 100
    },
    velocity: {
        x: 0, 
        y: 0
    },
    offset: {
        x: -50, 
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50, 
        y: 0
    },
    
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
    
}

decreaseTimer()

function animated() {
    window.requestAnimationFrame(animated)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -4.5
    } else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 4.5
    }

    // enemy movement
    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 4.5
    } else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -4.5
    }

    // detect for collision
    if( rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && 
        player.isAttacking ){
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        }

    if( rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && 
        enemy.isAttacking ){
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#playerHealth').style.width = player.health + '%'
        }
    
    // fim de jogo baseado na vida
    if(enemy.health <= 0 || player.health <= 0 ){
        determineWinner({player, enemy, timerId})
    }
}

animated()

window.addEventListener('keydown', (event) => {
    switch (event.key) {        
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -13
            break
        case ' ':
            player.attack()
            break
    
// enemy keys

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -13
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
    
})

window.addEventListener('keyup', (event) => {

    switch (event.key) {

//player keys        
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

// enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
                  
    }
})