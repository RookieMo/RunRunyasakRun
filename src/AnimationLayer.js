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
        this.isDead = false;
        this.blocks = [];
        this.rocks = [];
        this.runningAction = this.animate();
        this.createBlocks();
        this.createRocks();
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
        this.updateRock();

        this.collisionRock(this.rocks , currentPositionRect);

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
            if(this.y <= 0){
                this.isDead = true;
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

        this.block1 = new Block( 0, 110, 300, 160 );
        this.blocks.push( this.block1 );

        this.block2 = new Block( 400, 230, 1000, 280 );
        this.blocks.push( this.block2 );

        this.block3 = new Block( 800, 110, 1400, 160 );
        this.blocks.push( this.block3 );

        this.block4 = new Block( 2000, 240, 2600, 290 );
        this.blocks.push( this.block4 );

        this.blocks.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },
    updateBlock:function(){
        var pos1 = this.block1.getPosition();
        this.block1.setPosition(new cc.p(pos1.x-3,pos1.y));
        var pos2 = this.block2.getPosition();
        this.block2.setPosition(new cc.p(pos2.x-3,pos2.y));
        var pos3 = this.block3.getPosition();
        this.block3.setPosition(new cc.p(pos3.x-3,pos3.y));
        var pos4 = this.block4.getPosition();
        this.block4.setPosition(new cc.p(pos4.x-5,pos4.y));
    },
    createRocks:function(){
        this.rocks = [];

        this.rock1 = new Rock( 200, 155 );
        this.rocks.push( this.rock1 );

        this.rock2 = new Rock( 500, 275 );
        this.rocks.push( this.rock2 );

        this.rock3 = new Rock( 2200, 285 );
        this.rocks.push( this.rock3 );

        this.rocks.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },
    updateRock:function(){
        var pos1 = this.rock1.getPosition();
        this.rock1.setPosition(new cc.p(pos1.x-3,pos1.y));
        var pos2 = this.rock2.getPosition();
        this.rock2.setPosition(new cc.p(pos2.x-3,pos2.y));
        var pos3 = this.rock3.getPosition();
        this.rock3.setPosition(new cc.p(pos3.x-5,pos3.y));
    },
    collisionRock:function(rocks , rect){
        rocks.forEach( function( b ) {
            if ( b.hitRock( rect ) ) {
                this.isDead = true;
            }
        }, this );
    },
});