class fireBoss{

    constructor(game){
        this.game = game;
        this.spritesheet = assetMangager.getAsset("./demonFire.png");
        this.spritesheetLeft = assetMangager.getAsset("./demonFireLeft.png");

        // this.animator = new Animator(ASSET_MANAGER.getAsset("./demonFire.png"), 103, 50, 100, 108, 6, .2 ,187, false);
        this.x = 0;
        this.y = 0;
        this.speed = 100;
        this.facing = 1; //0=right, 1 = left
        this.state = 0; // 0 = idle, 1 = running, 3 = jumping/falling 
        
        //animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for(var i = 0; i < 4; i++){ // number of different states
            this.animations.push([]);
            for(var j = 0; j < 2; j++){ // two directions
                this.animations[i].push([]);
            }
        }

        // right idle
        this.animations[0][0] = new Animator(this.spritesheet, 103, 50, 100, 108, 6, .2 ,187, false, true);
        
        //left idle
        this.animations[0][1] = new Animator(this.spritesheetLeft, 6000, 50, 200, 108, 6, .2 ,0, true, true);

        

    }

    update() {
        // this.x += this.speed * this.game.clockTick;
        // if(this.x > 1200){
        //     this.x = 0;
        // }

    };


    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);

    };


}