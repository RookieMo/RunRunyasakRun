var Coin = cc.Sprite.extend({
    ctor: function( x1, y1 ) {
        this._super();
        this.initWithFile( s_coin0 );
        this.coinAction = this.animate();
        this.runAction(this.coinAction);
        this.setAnchorPoint( cc.p( 0, 0.5 ) );
        this.setPosition( cc.p( x1, y1 ) );
    },
    animate:function () {
        this._super();
        
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile( s_coin0 );
        animation.addSpriteFrameWithFile( s_coin1 );
        animation.addSpriteFrameWithFile( s_coin2 );
        animation.addSpriteFrameWithFile( s_coin3 );
        animation.addSpriteFrameWithFile( s_coin4 );
        animation.addSpriteFrameWithFile( s_coin5 );
        animation.addSpriteFrameWithFile( s_coin6 );
        animation.addSpriteFrameWithFile( s_coin7 );
        animation.setDelayPerUnit( 0.1 );
        return cc.RepeatForever.create( cc.Animate.create( animation ));
    },
    hitCoin: function( rect ) {
        var brect = this.getBoundingBoxToWorld();
        var bminX = cc.rectGetMinX( brect );
        var bmaxX = cc.rectGetMaxX( brect );
        var bminY = cc.rectGetMinY( brect );
        var bmaxY = cc.rectGetMaxY( brect );
        var minX = cc.rectGetMinX( rect );
        var maxX = cc.rectGetMaxX( rect );
        var minY = cc.rectGetMinY( rect );
        var maxY = cc.rectGetMaxY( rect );
        return ( minX <= bmaxX - 20 ) && ( bminX <= maxX - 15 ) 
            && ( minY <= bmaxY ) && ( bminY <= maxY );
    },
    update:function(vx){
        var pos = this.getPosition();
        this.setPosition(new cc.p( pos.x-vx , pos.y ));
    },
});