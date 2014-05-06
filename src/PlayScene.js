var y = 0;
var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.addChild(new AnimationLayer(),0, TagOfLayer.Animation );
        this.addChild(new StatusLayer(),0, TagOfLayer.Status);
        
    },
    collisionRockBegin:function () {
        cc.log("==game over");
        cc.Director.getInstance().pause();
        this.addChild(new GameOverLayer());
    },
});