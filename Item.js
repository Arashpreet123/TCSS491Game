class Item{
    constructor(game, x, y, speed){
        Object.assign(this, { game, x, y, speed});
        this.spritesheet = assetMangager.getAsset("./spritesheet/arrow.png");
        this.animations = [];
        this.rand = Math.floor(Math.random() * 9);
        this.state = 0;
        this.speed = speed;
        this.dead = false;
        this.loadAnimations();
        this.updateBB();
    } 
    loadAnimations(){
        // arrow
        this.animations[0] = new Animator(this.spritesheet, 36, 31, 9, 16, 1, 0.30, 0, false, true, true);
        
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+5, this.y, 10, 40);
        
    };
    update(){
        if(this.dead){
        this.removeFromWorld = true;
        }
        else{
        const TICK = this.game.clockTick;
        this.y += this.speed * TICK;
        this.updateBB();
        var that = this;
        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                    if ((entity instanceof BackGround) && (that.lastBB.bottom) >= entity.BB.top) {
                        console.log("PRINTED")
                            that.dead = true;
                        }
                        that.updateBB();
                    }
            });
        }
    };


    draw(ctx){
        // console.log(this.state);
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2.5);
        
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        
    };
};