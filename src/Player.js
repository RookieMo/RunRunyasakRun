var Player = cc.Sprite.extend({
    ctor: function(x,y) {
        this._super();
        this.initWithFile( 'res/player.png' );
        this.setAnchorPoint( cc.p( 0.5, 0 ) );
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.jumpV = 20;
        this.g = -1;

        this.jump = false;

        this.ground = null;

        this.blocks = [];

        this.updatePosition();
    },
    updatePosition: function() {
        this.setPosition( cc.p( Math.round( this.x ),
                                Math.round( this.y ) ) );
    },
    update: function( dt ) {

        var oldRect = this.getBoundingBoxToWorld();
        var oldX = this.x;
        var oldY = this.y;
        
        this.updateYMovement();

        var dX = this.x - oldX;
        var dY = this.y - oldY;
        
        var newRect = cc.rect( oldRect.x + dX,
                               oldRect.y + dY - 1,
                               oldRect.width,
                               oldRect.height + 1 );

        this.handleCollision( oldRect, newRect );
        this.updatePosition();

    },
    updateYMovement: function() {
        if ( this.ground ) {
            this.vy = 0;
            if ( this.jump ) {
                this.vy = this.jumpV;
                this.y = this.ground.getTopY() + this.vy;
                this.ground = null;
            }
        } else {
            this.vy += this.g;
            this.y += this.vy;
        }
    },
    handleCollision: function( oldRect, newRect ) {
        if ( this.ground ) {
            if ( !this.ground.onTop( newRect ) ) {
                this.ground = null;
            }
        } else {
            if ( this.vy <= 0 ) {
                var topBlock = this.findTopBlock( this.blocks, oldRect, newRect );
                
                if ( topBlock ) {
                    this.ground = topBlock;
                    this.y = topBlock.getTopY();
                    this.vy = 0;
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
    handleKeyDown: function( e ) {
        if ( Player.KEYMAP[ e ] != undefined ) {
            this[ Player.KEYMAP[ e ] ] = true;
        }
    },

    handleKeyUp: function( e ) {
        if ( Player.KEYMAP[ e ] != undefined ) {
            this[ Player.KEYMAP[ e ] ] = false;
        }
    },
    setBlocks: function( blocks ) {
        this.blocks = blocks;
    },

});
Player.KEYMAP = {}
Player.KEYMAP[cc.KEY.up] = 'jump';