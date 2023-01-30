class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.elapsedTime = 0;
        this.knight = new knight(this.game, 100, 100); 
        this.game.addEntity(this.knight);
    };

    

    update() {
    
    };



    draw(ctx) {
    };
    
};
