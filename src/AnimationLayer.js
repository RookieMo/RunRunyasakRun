var AnimationLayer = cc.Layer.extend({
    spriteSheet:null,
    runningAction:null,
    sprite:null,
    jumpUpAction:null,
    jumpDownAction:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_runnerplist);
        this.spriteSheet = cc.SpriteBatchNode.create(s_runner);
        this.addChild(this.spriteSheet);

        this.initAction();
        /*
        var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.1);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
        */

        this.sprite = cc.Sprite.createWithSpriteFrameName("runner0.png");
        this.sprite.setPosition(cc.p(80, 160));
        this.sprite.runAction(this.runningAction);
        this.spriteSheet.addChild(this.sprite);

        this.scheduleUpdate();
    },
    initAction:function () {
        // init runningAction
        var animFrames = [];
        // num equal to spriteSheet
        for (var i = 0; i < 8; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.1);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.runningAction.retain();
        // init jumpUpAction
        animFrames = [];
        for (var i = 0; i < 4; i++) {
            var str = "runnerJumpUp" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.2);
        this.jumpUpAction = cc.Animate.create(animation);
        this.jumpUpAction.retain();
        // init jumpDownAction
        animFrames = [];
        for (var i = 0; i < 2; i++) {
            var str = "runnerJumpDown" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.3);
        this.jumpDownAction = cc.Animate.create(animation);
        this.jumpDownAction.retain();
    }
});