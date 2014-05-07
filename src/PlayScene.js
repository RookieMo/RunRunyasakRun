var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.bgLayer = new BackgroundLayer();
        this.animLayer = new AnimationLayer();
        this.statusLayer = new StatusLayer();
        this.addChild(this.bgLayer, 0, TagOfLayer.background);
        this.addChild(this.animLayer,0, TagOfLayer.Animation );
        this.addChild(this.statusLayer,0, TagOfLayer.Status);
        this.scheduleUpdate();
    },
    collisionRockBegin:function () {
        cc.log("==game over");
        this.bgLayer.unscheduleUpdate();
        this.statusLayer.unscheduleUpdate();
        this.animLayer.unscheduleUpdate();
        this.addChild(new GameOverLayer());
    },
    update:function(){
        if(this.animLayer.isDead){
            this.collisionRockBegin();
            this.animLayer.isDead = false;
        }
    },
});