var AnimationLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.setAnchorPoint( cc.p( 0.5, 0 ) );
        this.x = 80;
        this.y = 160;

        this.jumpV = 20;
        this.g = -1;
        this.vy = 0;
        this.jump = false;
        this.ground = null;
        this.animate();

        this.player = cc.Sprite.create(s_runner0);
        this.player.runAction(this.runningAction);

        this.setKeyboardEnabled( true );
        this.updatePosition();
        this.addChild( this.player );

        
        this.scheduleUpdate();
        
    },
    animate:function () {
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
    updatePosition: function() {
        this.player.setPosition( cc.p( Math.round( this.x ),
                                Math.round( this.y ) ) );
    },
    getPlayerRect: function() {
        var spriteRect = this.player.getBoundingBoxToWorld();
        var spritePos = this.player.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    },
    update:function(){
        var currentPositionRect = this.getPlayerRect();

        this.updateY();

        var newPositionRect = this.getPlayerRect();
        this.handleCollision( currentPositionRect,
                              newPositionRect );

        this.updatePosition();
    },
    updateY:function(){
        if( this.ground ){
            this.vy = 0;
            if(this.jump){
                this.player.stopAllActions();
                this.vy = this.jumpV;
                this.y = 160 + this.vy;
                this.ground = null;
            } else{
                this.player.runAction(this.runningAction);
            }

        } else{
            this.player.stopAllActions();
            this.vy += this.g;
            this.y += this.vy;
        }
    },
    handleCollision: function( oldRect, newRect ) {
        if ( this.ground ) {
            
        } else {
            if ( this.vy <= 0 ) {
                this.ground = true;
                this.y = 160;
                this.vy = 0;
            }
        }
    },
    onKeyDown: function( e ) {
        if ( e == cc.KEY.up ) {
            this.jump = true;
            console.log('jump');
        }
    },

    onKeyUp: function( e ) {
        if ( e == cc.KEY.up ) {
            this.jump = false;
        }
    },
});