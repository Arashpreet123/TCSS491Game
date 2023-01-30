class knight{

    constructor(game){
        this.game = game;
        this.spritesheet = assetMangager.getAsset("./knight_sprite.png");

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
        this.animations[0][0] = new Animator(this.spritesheet,0,0 ,55, 80, 6, .2, 25,  false,true)


        //facing right
    }

    update() {
        

    };


    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);

    };


}