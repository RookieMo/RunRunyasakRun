var AnimationLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.gravity = 5;
        this.v = 0;
        this.isAlive = true;
        this.started = false;
        this.setAnchorPoint( cc.p( 0.5, 0 ) );
        
        
        this.movingAction = this.init();

        this.player = cc.Sprite.create(s_runner0);
        this.player.setPosition(cc.p(80, 160));
        this.player.runAction(this.runningAction);
        this.addChild( this.player );
        this.player.scheduleUpdate();
    },
    init:function () {
        this._super();
        
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( s_runner0 );
        animation.addSpriteFrameWithFile( s_runner1 );
        animation.addSpriteFrameWithFile( s_runner2 );
        animation.addSpriteFrameWithFile( s_runner3 );
        animation.addSpriteFrameWithFile( s_runner4 );
        animation.addSpriteFrameWithFile( s_runner5 );
        animation.addSpriteFrameWithFile( s_runner6 );
        animation.addSpriteFrameWithFile( s_runner7 );
        console.log( animation.getDelayPerUnit() );
        animation.setDelayPerUnit( 0.1 );
        this.runningAction = cc.RepeatForever.create( cc.Animate.create( animation ));
    },

});
