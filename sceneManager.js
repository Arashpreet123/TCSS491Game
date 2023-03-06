
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.elapsedTime = 0;
        this.knight = new knight(this.game, 100, 100); 
        this.game.addEntity(this.knight);
        this.game.addEntity(new BackGround(this.game, 0, -290, 1200, 1100));
        this.time = 0;
        this.lose = false;
        this.timer = 0;

    };

    

    update() {
        this.time += this.game.clockTick;
        // console.log(this.time);

        if(!this.lose){
            this.timer += this.game.clockTick;

            if(this.time > 1){
            this.randX = Math.random() * (700 - 5) + 5;
            this.game.addEntityToBegin(new Item(this.game, this.randX, 100, 200))
            this.time = 0;
            }
            if(this.knight.hp === 0){
                this.lose = true;
                console.log("lose");
            }
        }

    };



    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.font = "30px Arial";
        ctx.font = "50px Arial";

        if(this.lose){
            ctx.fillText(("Survival Time: " + Math.round(this.timer)), 250, 350);

            ctx.fillText("You Lose!", 260, 420);
            ctx.fillText("Refresh to Restart", 260, 480);
        }
    };
    
};
