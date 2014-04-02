var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.createMap();
        this.player = new Player( 50, 200);
        this.player.setBlocks( this.blocks );
        this.addChild( this.player );
        this.scheduleOnce(function() {
            this.player.scheduleUpdate();
        }, 2);
        
        this.setKeyboardEnabled( true );

        this.scheduleUpdate();
        
        return true;
    },

    createMap: function() {
        this.blocks = [];
        var groundBlock = new Map( 0, 0, 700, 160 );
        this.blocks.push( groundBlock );

        this.blocks.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },
    onKeyDown: function( e ) {
        this.player.handleKeyDown( e );
    },

    onKeyUp: function( e ) {
        this.player.handleKeyUp( e );
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

