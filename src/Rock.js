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
        return ( minX <= bmaxX - 10 ) && ( bminX <= maxX - 10 ) 
            && ( minY <= bmaxY - 10 ) && ( bminY <= maxY - 10);
    },
});