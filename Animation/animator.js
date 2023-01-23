let playerState = 'spawn';
class Animator {
    
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse});
        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    };

    drawFrame(tick, ctx, x, y) {

        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        
        let frameX = Math.floor(this.elapsedTime / this.frameDuration);
        if (this.reverse) {
            frameX = this.frameCount - frameX - 1;
        }
        ctx.drawImage(this.spritesheet,  
            this.xStart + (this.width + this.framePadding)*frameX, this.yStart, 
            this.width, this.height, 
            x, y, 
            this.width*2, this.height*2);
            
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
    
}