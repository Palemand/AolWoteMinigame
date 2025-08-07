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
            this.x = 400;
            this.y = 500;
            this.speed = 2;
            this.diagonalSpeed = this.speed / Math.sqrt(2);
            this.image = new Image();
            this.image.src = 'img_1.png';
        }

        draw(context) {
            context.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);

            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        updatePos(deltaTime) {

            let keys = this.game.input.pressedKeys;
            const speed = this.speed * deltaTime * 60;
            const diagonalSpeed = this.diagonalSpeed * deltaTime * 60;


            // make better later lol
            if (keys.has('w') && keys.has('a')) {
                this.y -= diagonalSpeed;
                this.x -= diagonalSpeed;
            }
            else if (keys.has('w') && keys.has('d')) {
                this.y -= diagonalSpeed;
                this.x += diagonalSpeed;
            }
            else if (keys.has('s') && keys.has('a')) {
                this.y += diagonalSpeed;
                this.x -= diagonalSpeed;
            }
            else if (keys.has('s') && keys.has('d')) {
                this.y += diagonalSpeed;
                this.x += diagonalSpeed;
            }
            else if (keys.has('w')) this.y -= speed;
            else if (keys.has('s')) this.y += speed;
            else if (keys.has('a')) this.x -= speed;
            else if (keys.has('d')) this.x += speed;

        }
    }

    class Boss {
        constructor(game) {
            this.game = game;
            this.width = 100;
            this.height = 100;
            this.x = canvas.width / 2 - this.width / 2;
            this.y = canvas.height / 2 - this.height / 2;
            this.image = new Image();
            this.image.src = 'img.png';
            this.attackSet = new Set(['left' , 'right', 'up', 'slam']);
            this.lastAttack = 'none';
            this.currentAttack = 'none';
        }

        draw(context) {
            context.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        update(deltaTime) {
            // Randomly select a move from the moveset every 2 seconds

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
    let lastTime = 0;
    function animate(timeStamp) {
        let deltaTime = (timeStamp - lastTime) / 1000;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.player.updatePos(deltaTime);
        game.boss.update(deltaTime);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);

    //gotta add player movement



});