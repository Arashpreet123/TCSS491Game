class knight{

    constructor(game){
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./knight_sprite.png"), 0, 0, 80, 75, 6, .1 ,5, false);
        this.x = 0;
        this.y = 0;
        this.speed = 400;
        this.facing = 0; //0=right, 1 = left
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

        //facing right
    }

    update() {
        this.x += this.speed * this.game.clockTick;
        if(this.x > 1200){
            this.x = 0;
        }

    };


    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    };


}