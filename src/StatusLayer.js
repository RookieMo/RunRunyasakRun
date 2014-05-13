var StatusLayer = cc.Layer.extend({
    labelMeter:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winSize = cc.Director.getInstance().getWinSize();

        this.labelMeter = cc.LabelTTF.create("Score      0 point", "Helvetica", 30);
        this.labelMeter.setPosition(cc.p(winSize.width - 140, winSize.height - 30));
        this.addChild(this.labelMeter);
    },
    updateMeter:function (px) {
        this.labelMeter.setString("Score      " + parseInt(px) + " point");
    }
});