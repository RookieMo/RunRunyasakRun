var screenWidth = 800;
var screenHeight = 600;
var cocos2dApp = cc.Application.extend({
    config: document[ 'ccConfig' ],

    ctor: function( scene ) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup( this.config[ 'tag' ] );
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },

    applicationDidFinishLaunching: function() {
        // initialize director
        var director = cc.Director.getInstance();

        cc.EGLView.getInstance()._adjustSizeToBrowser();

        var designSize = cc.size(800, 600);

        var searchPaths = [];

        searchPaths.push("res");
        cc.FileUtils.getInstance().setSearchPaths(searchPaths);



        cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            director.replaceScene(new this.startScene());
        }, this);

        return true;
    }
});

var myApp = new cocos2dApp( MenuScene );
