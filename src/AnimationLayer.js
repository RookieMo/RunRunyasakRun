var AnimationLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.x = 80;
        this.y = 160;

        this.jumpV = 20;
        this.g = -1;
        this.vy = 0;
        this.vx = 3;
        this.jump = false;
        this.isRunning = true;
        this.isHit = false;
        this.ground = null;
        this.isDead = false;
        this.blocks = [];
        this.rocks = [];
        this.coins = [];
        this.heart = null;
        this.meter = 1;
        this.runningAction = this.animate();
        this.createBlocks();
        this.createRocks();
        this.createHeart();
        this.creatCoin();

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
        this.isHit = this.heart.hitHeart( currentPositionRect );
        if(this.isHit){
                this.meter += 500; 
                this.removeAllChildren();
                this.createBlocks();
                this.createRocks();
                this.createHeart();
                this.creatCoin();
                this.vx+=1;
                this.player.runAction(this.runningAction);
                this.setBlocks( this.blocks );
                this.addChild( this.player );  
                this.isHitH = false;      
        }
        this.updateY();
        
        this.updateBlock(this.blocks);
        this.updateRock(this.rocks);
        this.updateCoin(this.coins);
        this.heart.update( this.vx );

        var statusLayer = this.getParent().getChildByTag(TagOfLayer.Status);
        statusLayer.updateMeter(this.meter);

        this.collisionRock(this.rocks , currentPositionRect);
        this.collisionCoin(this.coins , currentPositionRect);

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
        if ( e == cc.KEY.space ) {
            this.jump = true;
            var audioEngine = cc.AudioEngine.getInstance();
            audioEngine.playEffect(s_music_jump);
        }
    },

    onKeyUp: function( e ) {
        if ( e == cc.KEY.space ) {
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

        this.block4 = new Block( 1200, 240, 1800, 290 );
        this.blocks.push( this.block4 );

        this.block5 = new Block( 2000, 290, 2600, 340 );
        this.blocks.push( this.block5 );

        this.block6 = new Block( 1900, 50, 2400, 100 );
        this.blocks.push( this.block6 );

        this.block7 = new Block( 2400, 170, 3000, 220 );
        this.blocks.push( this.block7 );

        this.block8 = new Block( 3400, 240, 4000, 290 );
        this.blocks.push( this.block8 );

        this.block9 = new Block( 3000, 330, 3600, 380 );
        this.blocks.push( this.block9 );

        this.block10 = new Block( 3800, 240, 4200, 290 );
        this.blocks.push( this.block10 );

        this.block11 = new Block( 3800, 100, 4000, 150 );
        this.blocks.push( this.block11 );

        this.block12 = new Block( 3800, 490, 4000, 540 );
        this.blocks.push( this.block12 );

        this.block13 = new Block( 4300, 240, 4900, 290 );
        this.blocks.push( this.block13 );

        this.blocks.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },
    updateBlock:function( blocks ){
        blocks.forEach( function( b ) {
            b.update(this.vx);
        }, this );
        this.meter+=0.1;
    },
    createRocks:function(){
        this.rocks = [];

        this.rock1 = new Rock( 700, 275 );
        this.rocks.push( this.rock1 );

        this.rock2 = new Rock( 1300, 285 );
        this.rocks.push( this.rock2 );

        this.rock3 = new Rock( 2500, 335 );
        this.rocks.push( this.rock3 );

        this.rock4 = new Rock( 2100, 95 );
        this.rocks.push( this.rock4 );

        this.rock5 = new Rock( 4500, 285 );
        this.rocks.push( this.rock5 );

        this.rocks.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },
    updateRock:function( rocks ){
        rocks.forEach( function( b ) {
            b.update(this.vx);
        }, this );
    },
    collisionRock:function(rocks , rect){
        rocks.forEach( function( b ) {
            if ( b.hitRock( rect ) ) {
                this.isDead = true;
            }
        }, this );
    },
    createHeart:function(){
        this.heart = new Heart(5025 , 340);
        this.addChild(this.heart);
    },
    creatCoin:function(){
        this.coins = [];

        this.coin1 = new Coin( 2100, 360 );
        this.coins.push( this.coin1 );

        this.coin2 = new Coin( 2200, 360 );
        this.coins.push( this.coin2 );

        this.coin3 = new Coin( 2300, 360 );
        this.coins.push( this.coin3 );

        this.coin4 = new Coin( 3800, 550 );
        this.coins.push( this.coin4 );

        this.coin5 = new Coin( 3900, 550 );
        this.coins.push( this.coin5 );

        this.coins.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },
    updateCoin:function( coins ){
        coins.forEach( function( b ) {
            b.update(this.vx);
        }, this );
    },
    collisionCoin:function(coins , rect){
        coins.forEach( function( b ) {
            if ( b.hitCoin( rect ) ) {
                var audioEngine = cc.AudioEngine.getInstance();
                audioEngine.playEffect(s_music_coin);
                this.meter+=100;
                b.setPosition(cc.p(-100 , -100));
                this.removeChild( b )
            }
        }, this );
    },
});