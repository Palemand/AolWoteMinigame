console.log("Hello World!");
window.addEventListener('load', () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;




    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', (event) => {
                this.game.lastKey = 'P' + event.key;
                console.log('key', this.game.lastKey);
            });

            window.addEventListener('keyup', (event) => {
                this.game.lastKey = 'R' + event.key;
                console.log('key', this.game.lastKey);
            });
            console.log("handler created")
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

        }
        draw(context) {
            context.fillStyle = 'blue';
            context.fillRect(this.x, this.y, this.width, this.height);
        }

        update() {

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
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.player = new Player(this);
            this.boss = new Boss(this);
        }
        render(context) {
            this.player.draw(context);
            this.boss.draw(context);
            this.player.update();

        }
    }

    let game = new Game(canvas.height, canvas.width)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();

});