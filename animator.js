class Animator {

    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, reverse, loop) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePaddingX, reverse, loop});
        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    };

    drawFrame(tick, ctx, x, y, scale) {

        this.elapsedTime += tick;
        
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        
        let frameX = this.currentFrame();
        if (this.reverse) {
            frameX = this.frameCount - frameX - 1;
        }
        ctx.drawImage(this.spritesheet,  
            this.xStart + frameX * (this.width + this.framePaddingX), this.yStart, 
            this.width, this.height, 
            x, y, 
            this.width*scale, this.height*scale);
        
            
    };

currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
};
    
isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
}