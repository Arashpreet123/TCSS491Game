var assetMangager = new AssetManager();

assetMangager.queueDownload("./knight_sprite_full.png");
assetMangager.queueDownload("./knight_sprite_full_Left.png");
assetMangager.queueDownload("./spritesheet/Background.png");
assetMangager.queueDownload("./spritesheet/arrow.png");

assetMangager.downloadAll(() => {
var canvas = document.getElementById('gameWorld');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
var gameEngine = new GameEngine();
PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
PARAMS.BLOCKHEIGHT = PARAMS.BITHEIGHT * PARAMS.SCALE;
PARAMS.CANVAS_WIDTH = canvas.width;
PARAMS.CANVAS_HEIGHT = canvas.height;

gameEngine.init(ctx);
gameEngine.addEntity(new SceneManager(gameEngine));
gameEngine.start();

});
