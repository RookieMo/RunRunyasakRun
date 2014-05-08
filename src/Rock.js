var Rock = cc.Sprite.extend({
    ctor: function( x1, y1 ) {
        this._super();
        this.initWithFile( s_rock );
        this.setAnchorPoint( cc.p( 0, 0.5 ) );
        this.setPosition( cc.p( x1, y1 ) );
    },

    hitRock: function( rect ) {
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
    update:function(){
        var pos = this.getPosition();
        this.setPosition(new cc.p( pos.x-3 , pos.y ));
    },
});