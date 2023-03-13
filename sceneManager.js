
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.elapsedTime = 0;
        this.knight = new knight(this.game, 100, 100); 
        this.game.addEntity(this.knight);
        this.game.addEntity(new BackGround(this.game, 0, -290, 1200, 1100));
        this.playMusic = false;
        this.time = 0;
        this.lose = false;
        this.timer = 0;
        this.level = 1;
        this.loaded = false;
    };

    

    update() {
        this.time += this.game.clockTick;
        // console.log(this.time);
        
        if(!this.lose){
            this.timer += this.game.clockTick;
            
            if(this.time > this.level){
            this.randX = Math.random() * (1000 - 5) + 5;
            this.game.addEntityToBegin(new Item(this.game, this.randX, 100, 200))
            if(this.timer < 20){
                
                this.time = 0;
                this.level = 2;
            }
            else if(this.timer < 50){
               
                this.time = 0;
                this.level = 0.5;
            }
            else{
                this.time = 0;
                this.level = 0.25;
            }
            }
            if(this.knight.hp === 0){
                this.lose = true;
                console.log("lose");
            }
            this.loaded = true;

        }
        this.updateAudio();

        

    };
    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        assetMangager.muteAudio(mute);
        assetMangager.adjustVolume(volume);

    };



    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.font = "30px Arial";
        ctx.font = "20px Arial";
        ctx.fillText("Survival Time: " + Math.round(this.timer),10,30);
        if(this.lose){
            ctx.font = "50px Arial";

            ctx.fillText(("Survival Time: " + Math.round(this.timer)), 250, 350);

            ctx.fillText("You Lose!", 260, 420);
            ctx.fillText("Refresh to Restart", 260, 480);
        }
    };
    
};
