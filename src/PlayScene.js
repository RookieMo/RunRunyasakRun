var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.bgLayer = new BackgroundLayer();
        this.animLayer = new AnimationLayer();
        this.statusLayer = new StatusLayer();
        this.addChild(this.bgLayer, 0, TagOfLayer.background);
        this.addChild(this.animLayer,0, TagOfLayer.Animation );
        this.addChild(this.statusLayer,0, TagOfLayer.Status);

        var audioEngine = cc.AudioEngine.getInstance();
        audioEngine.playMusic(s_music_background, true);

        this.scheduleUpdate();
    },
    gameOver:function () {
        cc.log("==game over");
        this.bgLayer.unscheduleUpdate();
        this.statusLayer.unscheduleUpdate();
        this.animLayer.unscheduleUpdate();
        var audioEngine = cc.AudioEngine.getInstance();
        audioEngine.stopMusic();
        this.addChild(new GameOverLayer());
    },
    update:function(){
        if(this.animLayer.isDead){
            this.gameOver();
            this.animLayer.isDead = false;
        }
    },
});