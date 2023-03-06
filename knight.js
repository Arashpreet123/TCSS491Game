class knight{

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.knight = game;
        this.spritesheet = assetMangager.getAsset("./knight_sprite_full.png");
        this.spritesheetLeft = assetMangager.getAsset("./knight_sprite_full_Left.png");
        this.velocity = {x:0, y:0};
        this.x = 0;
        this.y = 550;
        this.speed = 400;
        this.facing = 0; //0=right, 1 = left
        this.state = 0; // 0 = idle, 1 = running, 2 = jumping/falling 
        this.states = {
            idle: 0,        
            jump: 1,
        }
        this.hp = 3;
        this.playerJump = false;
        //animations
        this.updateBB();
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

        //right walking
        this.animations[0][0] = new Animator(this.spritesheet,128,0 ,100, 125, 8, .1, 28,  false,true)

        //jumping
        this.animations[1][0] = new Animator(this.spritesheet,0,1152 ,110, 125, 8, .08, 18,  false,true)


        //walking left
        this.animations[0][1] = new Animator(this.spritesheetLeft,913,0 ,100, 125, 8, .1, 28,  true,true)

        //Jumping left
        this.animations[1][1] = new Animator(this.spritesheetLeft,1024,1152 ,110, 125, 8, .08, 18,  true,true)

    }

    updateBB(){
        this.lastBB = this.BB;
        if(this.facing === 0){
            if(this.state === 0){
                this.BB = new BoundingBox(this.x+35, this.y+10, 40, 90);
            }
            else if(this.state === 1){
                this.BB = new BoundingBox(this.x+35, this.y+10, 40, 90);
            }
        }
        else{
            if(this.state === 0){
                this.BB = new BoundingBox(this.x+20, this.y+10, 40, 90);
            }
            else if(this.state === 1){
                this.BB = new BoundingBox(this.x+20, this.y+10, 40, 90);
            }
        }

        // this.topBB = new BoundingBox(this.x+20, this.y+130, PARAMS.PLAYERWIDTH, 0);
        // this.rightBB = new BoundingBox(this.x+20+PARAMS.PLAYERWIDTH, this.y+130, 0, PARAMS.PLAYERHEIGHT);
        // this.leftBB = new BoundingBox(this.x+20, this.y+130, 0, PARAMS.PLAYERHEIGHT);  
    };
    update() {
        const TICK = this.game.clockTick;
        const DE_ACC = 200;
        const RUN = 100;
        const MAXFALL = 200;
        this.velocity.y += 200 * TICK;
        
        if(this.state != this.states.jump){
            if (this.game.left) {
                this.facing = 1;
                this.velocity.x -= RUN;
            }
            if (this.game.right) {
                this.facing = 0;

                this.velocity.x += RUN;
            }  
            if(!this.game.left && !this.game.right){
                this.velocity.x = 0;
            }     
            if(this.game.jump){
                console.log("JUMp");
                this.state = this.states.jump;  
                this.velocity.y = -150;
                this.animations[this.state][this.facing].elapsedTime = 0;
                
                this.playerJump = false;
            }
            
        }
        else{
            if(this.animations[this.state][this.facing].currentFrame() >= 6){
                this.animations[this.state][this.facing].elapsedTime = 0.48;

            }
            if (this.game.right && !this.game.left) {
                this.velocity.x += 0.8;
            } else if (this.game.left && !this.game.right) {
                this.velocity.x -= 0.8;
            }
            
        }
        var that = this;
            this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { 
                    if ((entity instanceof BackGround) && (that.lastBB.bottom <= entity.BB.top)){
                    
                        that.playerJump = true;
                        that.velocity.y = 0;
                        that.y = entity.BB.top - that.lastBB.height - 10;
                        if(that.state == that.states.jump) that.state = that.states.idle;
                        that.updateBB();
                    }
                }
                if(entity instanceof Item){
                    that.hp = 0;
                    that.removeFromWorld = true;
                }
                }
        });
        if (this.velocity.x >= RUN) this.velocity.x = RUN;
        if (this.velocity.x <= -RUN) this.velocity.x = -RUN;
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.updateBB();
    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, .8);
        // if(debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            // ctx.strokeRect(this.rightBB.x-this.game.camera.x, this.rightBB.y-this.game.camera.y, this.rightBB.width, this.rightBB.height);
            // }
    };


}