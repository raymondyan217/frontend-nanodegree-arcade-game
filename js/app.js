var yAxis = [60, 145, 230];
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = Math.floor(Math.random() * (300 - 100)) + 100;
    this.x = 0;
    this.y = yAxis[Math.floor(Math.random() * (4 - 0))];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if(this.x > 400) {
        if(allEnemies && allEnemies.indexOf(this)) {
            allEnemies.splice(allEnemies.indexOf(this), 1);
        }
    }

    if(allEnemies && allEnemies.length < 4) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
    if(player) {
        for(var i = 0; i < allEnemies.length; i++) {
            if(player.y === allEnemies[i].y
                && (player.x > allEnemies[i].x
                && player.x < (allEnemies[i].x + 101))
            ) {
            // console.log('enemy', allEnemies[i].y, 'enemyx', allEnemies[i].x);
            // console.log('playery', player.y, 'playerx', player.x);
                player.resetPlayer();
            }
        }
        // console.log('py', player.y, 'px', player.x);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    var height = ctx.canvas.offsetHeight;
    var width = ctx.canvas.offsetWidth;

    if (this.x > 0 && key === 'left') {
        this.x -= 100;
    } else if (this.x < 400 && key === 'right') {
        this.x += 100;
    } else if (this.y > 0 && key === 'up') {
        this.y -= 85;
    } else if (this.y < 400 && key === 'down') {
        this.y += 85;
    }

    if (this.y < 0) {
        this.resetPlayer();
    }
};

Player.prototype.resetPlayer = function() {
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
