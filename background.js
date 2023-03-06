class BackGround {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});
        this.spritesheet = assetMangager.getAsset("./spritesheet/Background.png");
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y+1010, this.w, 50);
        
    };
    update() {
    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x ,this.y, this.w, this.h);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
};