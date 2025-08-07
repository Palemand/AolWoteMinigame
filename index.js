console.log("Hello World!");
window.addEventListener('load', () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    class InputHandler { //handles input for the game
        constructor(game) {
            this.game = game;
            this.pressedKeys = new Set();

            window.addEventListener('keydown', (event) => {
                this.pressedKeys.add(event.key);
                console.log('Pressed Key', event.key);
            });

            window.addEventListener('keyup', (event) => {
                this.pressedKeys.delete(event.key);
                console.log(`Key released: ${event.key}`);
            });

            console.log("handler init");
        }
    }

    class Player {
        constructor(game) {
            this.game = game;
            this.width = 50;
            this.height = 50;
            this.x = 150;
            this.y = 150;
            this.speed = 3;
            this.diagonalSpeed = this.speed / Math.sqrt(2);

        }

        draw(context) {
            context.fillStyle = 'blue';
            context.fillRect(this.x, this.y, this.width, this.height);
        }

        updatePos() {
            let keys = this.game.input.pressedKeys;
            // make better later lol
            if (keys.has('w') && keys.has('a')) {
                this.y -= this.diagonalSpeed;
                this.x -= this.diagonalSpeed;
            }
            else if (keys.has('w') && keys.has('d')) {
                this.y -= this.diagonalSpeed;
                this.x += this.diagonalSpeed;
            }
            else if (keys.has('s') && keys.has('a')) {
                this.y += this.diagonalSpeed;
                this.x -= this.diagonalSpeed;
            }
            else if (keys.has('s') && keys.has('d')) {
                this.y += this.diagonalSpeed;
                this.x += this.diagonalSpeed;
            }
            else if (keys.has('w')) this.y -= this.speed;
            else if (keys.has('s')) this.y += this.speed;
            else if (keys.has('a')) this.x -= this.speed;
            else if (keys.has('d')) this.x += this.speed;

        }
    }

    class Boss {
        constructor(game) {
            this.game = game;
            this.width = 100;
            this.height = 100;
            this.x = canvas.width / 2 - this.width / 2;
            this.y = canvas.height / 2 - this.height / 2;
        }

        draw(context) {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.input = new InputHandler(this);
            this.player = new Player(this);
            this.boss = new Boss(this);
        }
        render(context) {
            this.boss.draw(context);
            this.player.draw(context);
        }
    }

    let game = new Game(canvas.height, canvas.width)
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.player.updatePos();
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();

    //gotta add player movement



});