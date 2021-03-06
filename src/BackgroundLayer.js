var BackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.meter = 0;
        this.init();
    },

    init:function () {
      this._super();

      this.bg1 = cc.Sprite.create(s_PlayBG);
      this.bg1.setPosition(cc.p(400 , 300));
      this.bg2 = cc.Sprite.create(s_PlayBG);
      this.bg2.setPosition(cc.p(4400 , 300));
      
      this.addChild(this.bg1);
      this.addChild(this.bg2);
      
      this.scheduleUpdate();
    },
    update:function () {
        var pos1 = this.bg1.getPosition();
        if(pos1.x!=-2000){
          this.bg1.setPosition(new cc.p(pos1.x-2,300));
          this.meter++;}
        else{
          this.bg1.setPosition(new cc.p(400,300));
          this.meter++;
        }
        var pos2 = this.bg2.getPosition();
        if(pos2.x!=-2000){
          this.bg2.setPosition(new cc.p(pos2.x-2,300));}
        else{
          this.bg2.setPosition(new cc.p(400,300));
        }

        var statusLayer = this.getParent().getChildByTag(TagOfLayer.Status);
        statusLayer.updateMeter(this.meter);
    },
    getMeter:function(){
      return this.meter;
    }
});