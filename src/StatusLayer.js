var StatusLayer = cc.Layer.extend({
    labelMeter:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winSize = cc.Director.getInstance().getWinSize();

        /*this.labelCoin = cc.LabelTTF.create("Coins:0", "Helvetica", 20);
        this.labelCoin.setColor(cc.c3(0,0,0));//black color
        this.labelCoin.setPosition(cc.p(70, winSize.height - 20));
        this.addChild(this.labelCoin);*/

        this.labelMeter = cc.LabelTTF.create("0 M", "Helvetica", 20);
        this.labelMeter.setPosition(cc.p(winSize.width - 70, winSize.height - 20));
        this.addChild(this.labelMeter);
    },
    updateMeter:function (px) {
        this.labelMeter.setString(parseInt(px / 10) + " M");
    }
});