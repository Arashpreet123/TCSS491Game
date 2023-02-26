class knight{

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.knight = game;
        this.spritesheet = assetMangager.getAsset("./knight_sprite_full.png");
        this.spritesheetLeft = assetMangager.getAsset("./knight_sprite_full_Left.png");
        this.velocity = {x:0, y:0};
        this.x = 0;
        this.y = 0;
        this.speed = 400;
        this.facing = 0; //0=right, 1 = left
        this.state = 1; // 0 = idle, 1 = running, 2 = jumping/falling 
        this.states = {
            idle: 0,
            run: 1,
            normAttack: 2,
            skullAttack: 3,
            hit: 4,
            death: 5,
            jump: 6
        }
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

        //right walking
        this.animations[0][0] = new Animator(this.spritesheet,128,0 ,100, 125, 8, .1, 28,  false,true)

        //jumping
        this.animations[1][0] = new Animator(this.spritesheet,0,1152 ,110, 125, 8, .08, 18,  false,true)


        //walking left
        this.animations[0][1] = new Animator(this.spritesheetLeft,913,0 ,100, 125, 8, .1, 28,  true,true)

        //Jumping left
        this.animations[1][1] = new Animator(this.spritesheetLeft,1024,1152 ,110, 125, 8, .08, 18,  true,true)

    }

    update() {
        const TICK = this.game.clockTick;
        const DE_ACC = 200;
        const RUN = 200;
        const MAXFALL = 200;
        
        if(this.state != this.states.jump){
            if (this.game.left) {
                this.velocity.x -= RUN;
            }
            if (this.game.right) {
                this.velocity.x += RUN;
            }  
            if(!this.game.left && !this.game.right){
                this.velocity.x = 0;
            }     
            if(this.game.attack){
                this.shoot = true;
                this.velocity.x = 0;
            }
            else if(this.game.digit1 && (this.curMana >= 50)){       
                this.specialAttack1 = true;
            }
            if(this.game.jump && this.playerJump){
                this.state = this.states.jump;  
                this.velocity.y = -MAXFALL;
                this.animations[this.state][this.facing].elapsedTime = 0;
                
                this.playerJump = false;
            }
            
    };
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        // this.y += this.velocity.y * TICK * PARAMS.SCALE;
    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE);

    };


}