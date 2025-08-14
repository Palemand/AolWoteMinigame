console.log("Hello World!");
window.addEventListener('load', () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    function drawCircularImage(context, image, x, y, radius) {
        context.save();
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.clip();
        context.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
        context.restore();
    }

    class InputHandler { //handles input for the game
        constructor(game) {
            this.game = game;
            this.pressedKeys = new Set();

            window.addEventListener('keydown', (event) => {
                this.pressedKeys.add(event.key);
                //console.log('Pressed Key', event.key);
            });

            window.addEventListener('keyup', (event) => {
                this.pressedKeys.delete(event.key);
                //console.log(`Key released: ${event.key}`);
            });

            console.log("Input handler init");
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
            drawCircularImage(context, this.image, this.x + this.width / 2, this.y + this.height / 2, this.width / 2);
        }

        update(deltaTime) {

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
            this.lastAttackTime = 5; //i sekunder og vi starter med et predelay på 5 sekunder
            this.currentAttack = 'none';
        }

        draw(context) {
            drawCircularImage(context, this.image, this.x + this.width / 2, this.y + this.height / 2, this.width / 2);
        }

        update(deltaTime) {
            // Randomly select a move from the moveset every 4 seconds
            let gameTime = this.game.gameTime;
            if (gameTime - this.lastAttackTime >= 4) {
                let moves = Array.from(this.attackSet);
                // Ensure the new attack is different from the last one
                if (this.currentAttack !== 'none' && moves.includes(this.currentAttack)) {
                    moves = moves.filter(move => move !== this.currentAttack);
                }
                this.currentAttack = moves[Math.floor(Math.random() * moves.length)];
                this.lastAttackTime = gameTime;
                console.log(`Boss attack: ${this.currentAttack}`);
            }
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.input = new InputHandler(this);
            this.player = new Player(this);
            this.boss = new Boss(this);
            this.gameTime = 0; //i sekunder
        }
        update(deltaTime) {
            //update game logic here
            this.player.update(deltaTime);
            this.boss.update(deltaTime);
            this.gameTime += deltaTime;

        }
        drawTimer(context) {
            context.font = '20px Arial';
            context.fillStyle = 'black';
            context.fillText(`Game Time: ${Math.floor(this.gameTime)}s`, 5, 20);
        }

        render(context) {
            this.boss.draw(context);
            this.player.draw(context);
            this.drawTimer(context);

        }
    }

    let game = new Game(canvas.height, canvas.width)
    let lastTime = 0;
    function animate(timeStamp) {
        let deltaTime = (timeStamp - lastTime) / 1000;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);





});