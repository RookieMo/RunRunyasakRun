var AnimationLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.x = 80;
        this.y = 160;

        this.jumpV = 20;
        this.g = -1;
        this.vy = 0;
        this.jump = false;
        this.isRunning = true;
        this.ground = null;
        this.blocks = [];
        this.runningAction = this.animate();
        this.createBlocks();
        this.player = cc.Sprite.create(s_runner0);
        this.player.setAnchorPoint(cc.p(0.5,0));
        this.player.runAction(this.runningAction);

        this.setKeyboardEnabled( true );
        this.updatePosition();
        this.setBlocks( this.blocks );
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
        return cc.RepeatForever.create( cc.Animate.create( animation ));
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
        
        this.updateBlock();

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
                this.y = this.ground.getTopY() + this.vy;
                this.ground = null;
                this.isRunning = true;
            } else if(this.isRunning == true){    
                this.player.runAction(this.runningAction);
                this.isRunning = false;
            }

        } else{
            this.player.stopAllActions();
            this.vy += this.g;
            this.y += this.vy;
            if(this.y<0){
                cc.Director.getInstance().pause();
                this.addChild(new GameOverLayer());
            }
        }
    },
    handleCollision: function( oldRect, newRect ) {
        if ( this.ground ) {
            if ( !this.ground.onTop( newRect ) ) {
                this.ground = null;
            }
        } else {
            if ( this.vy <= 0 ) {
                var topBlock = this.findTopBlock( this.blocks,
                                                  oldRect,
                                                  newRect );
                if ( topBlock ) {
                    this.ground = topBlock;
                    this.y = topBlock.getTopY();
                    this.vy = 0;
                    this.isRunning = true;
                }
            }
        }
    },
    findTopBlock: function( blocks, oldRect, newRect ) {
        var topBlock = null;
        var topBlockY = -1;
        
        blocks.forEach( function( b ) {
            if ( b.hitTop( oldRect, newRect ) ) {
                if ( b.getTopY() > topBlockY ) {
                    topBlockY = b.getTopY();
                    topBlock = b;
                }
            }
        }, this );
        
        return topBlock;
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
    setBlocks: function( blocks ) {
        this.blocks = blocks;
    },
    createBlocks: function() {
        this.blocks = [];

        this.groundBlock = new Block( 0, 110, 600, 160 );
        this.blocks.push( this.groundBlock );

        this.middleBlock = new Block( 400, 230, 1000, 280 );
        this.blocks.push( this.middleBlock );

        this.topBlock = new Block( 800, 110, 1400, 160 );
        this.blocks.push( this.topBlock );

        this.blocks.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },
    updateBlock:function(){
        var pos1 = this.groundBlock.getPosition();
        this.groundBlock.setPosition(new cc.p(pos1.x-2,pos1.y));
        var pos2 = this.middleBlock.getPosition();
        this.middleBlock.setPosition(new cc.p(pos2.x-2,pos2.y));
        var pos3 = this.topBlock.getPosition();
        this.topBlock.setPosition(new cc.p(pos3.x-2,pos3.y));
    },
});