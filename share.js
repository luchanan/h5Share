(function($,window){

    var preventBodyScroll = false;

    var ua=window.navigator.userAgent;
    //手机qq浏览器js调用分享接口地址
    var qqBrowserSrc = {
        lower: "http://3gimg.qq.com/html5/js/qb.js",
        higher: "http://jsapi.qq.com/get?api=app.share"
    };
    var level = {
        qq: {forbid: 0, lower: 1, higher: 2},
        uc: {forbid: 0, allow: 1}
    };
    //浏览器版本
    var version={
        qq:'',
        uc:''
    };
    //浏览器接口
    var appList={
        //参数[ios_uc,andriod_uc,qq浏览器,名称]
        sina: ['kSinaWeibo', 'SinaWeibo', 11, '微博'],
        wechat: ['kWeixin', 'WechatFriends', 1, '微信'],
        friend: ['kWeixinFriend', 'WechatTimeline', 8, '朋友圈'],
        qq: ['kQQ', 'QQ', 4, 'QQ好友'],
        qzone: ['kQZone', 'QZone', 3, 'QQ空间']
    }
    var isUCBrowser=checkBrowser('UCBrowser')?level.uc.allow:level.uc.forbid;//uc浏览器
    var isMQQBrowser=checkBrowser('MQQBrowser')?level.qq.higher : level.qq.forbid;//qq浏览器
    var isWechat=checkBrowser('MicroMessenger');//微信
    version.qq = isMQQBrowser ?getVersion(ua.split("MQQBrowser/")[1]) : 0;
    version.uc = isUCBrowser ?getVersion(ua.split("UCBrowser/")[1]) : 0;
    if(isMQQBrowser){
        loadQqBrowserSrc();
    }
    var defaults ={
        ele:false,//触发分享按钮
        title:document.title,//分享标题
        pic:"",//分享图片地址
        url:window.location.href,//分享地址
        desc:document.title,//分享描述
        summary:document.title,
        rightImg:'images/share/share.png',//微信分享提示图片
        overlayClick:true,
        imgTitle:'',
        appendTo:'body',
        appId: "",
        timestamp: "",
        nonceStr: "",
        signature: "",
        wechatShareSucess:null,
        wechatShareCancel:null
    };
    function getVersion(c){
        var a = c.split("."),
            b = parseFloat(a[0] + "." + a[1]);
        return b;
    }
    function loadQqBrowserSrc(){
        var b = (version.qq < 5.4) ? qqBrowserSrc.lower : qqBrowserSrc.higher;
        var d = document.createElement("script");
        var a = document.getElementsByTagName("body")[0];
        d.setAttribute("src", b);
        a.appendChild(d);
    };
    //检测浏览器
    function checkBrowser(name){
        return ua.indexOf(name)>-1;
    }
    //检测手机系统
    function checkPlatform(){
        var ua =window.navigator.userAgent;
        if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
            return "iPhone";
        }
        return "Android";
    }
    var platform=checkPlatform();
    function AppShare(options){
        this.settings=$.extend({},defaults,options || {});
        this.init();
    }
    AppShare.prototype={
        init:function(){
            var _this=this;
            this.settings.sinaWebUrl="http://service.weibo.com/share/share.php?url="+encodeURIComponent(this.settings.url)+"&title="+encodeURIComponent(this.settings.title)+"&pic="+encodeURIComponent(this.settings.pic);
            this.settings.qzoneWebUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+encodeURIComponent(this.settings.url)+"&title="+encodeURIComponent(this.settings.title)+"&pics="+encodeURIComponent(this.settings.pic)+"&desc="+encodeURIComponent(this.settings.desc)+"&summary="+encodeURIComponent(this.settings.summary);
            this.stopBodyScroll();
            if(!this.settings.ele){
                //不绑定元素
                document.title=this.settings.title;
                $("[name='description']").attr("content",this.settings.desc);
                if(!isUCBrowser&&!isMQQBrowser&&!isWechat){
                    $("[data-app='wechat'],[data-app='friend'],[data-app='qq']").addClass('hideIcon');
                    $("[data-app='qzone']").attr("href",this.settings.qzoneWebUrl);
                    $("[data-app='sina']").attr("href",this.settings.sinaWebUrl);
                }
                else{
                    if(isWechat){
                        $("[data-app='qq']").addClass('hideIcon');
                        $("[data-app='qzone']").attr("href",this.settings.qzoneWebUrl);
                        $("[data-app='sina']").attr("href",this.settings.sinaWebUrl);
                        $("body").append(this.wechatShareTips());
                        this.bindWechatShareTipsClick();
                    }
                }
                $(document).on("click","[data-app]",function(){
                    if($(this).attr("href")!==undefined){
                        window.location.href=$(this).attr("href");
                    }
                    else{
                        _this.shareEvent($(this).data('app'));
                    }

                });
            }
            else{
                //绑定元素
                this.create();
                $(this.settings.ele).click($.proxy(function(){
                    this.open();
                    preventBodyScroll=true;
                },this));
            }
            //加载微信js文件
            if(isWechat){
                /*要手动将这个文件添加，不能动态添加*/
                /*var d = document.createElement("script");
                var a = document.getElementsByTagName("head")[0];
                d.setAttribute("src", 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
                a.appendChild(d);
                d.onload=d.onreadystatechange=function(){
                    if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){*/
                      this.wechatEvent();
                    /*}
                    d.onload=d.onreadystatechange=null;
                }*/
            }
        },
        create:function(){
            this.htmlTemplate();
            this.eachIcon();
            this.appendTo();
            this.setLevel();
        },
        stopBodyScroll:function(){
            //针对手机，弹窗阻止body点透滑动
            document.addEventListener('touchmove', function(e) {
                if (preventBodyScroll){
                    e.preventDefault();
                }
            }, false);
        },
        wechatEvent:function(){
            //微信浏览器分享事件
            var _this=this;
            wx.config({
                debug: false,
                appId: _this.settings.appId,
                timestamp:_this.settings.timestamp,
                nonceStr:_this.settings.nonceStr,
                signature:_this.settings.signature,
                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]
            });
            wx.ready(function () {
                //分享到朋友圈操作
                wx.onMenuShareTimeline({
                    title:_this.settings.title, // 分享标题
                    link: _this.settings.url, // 分享链接
                    imgUrl:_this.settings.pic, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareSucess();
                        }
                    },
                    cancel: function (){
                        // 用户取消分享后执行的回调函数
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareCancel();
                        }
                    }
                });
                //发送给朋友
                wx.onMenuShareAppMessage({
                    title:_this.settings.title, // 分享标题
                    desc: _this.settings.desc, // 分享描述
                    link: _this.settings.url, // 分享链接
                    imgUrl:_this.settings.pic, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareSucess();
                        }
                    },
                    cancel: function () {
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareCancel();
                        }
                    }
                });
                //qq好友
                wx.onMenuShareQQ({
                    title:_this.settings.title, // 分享标题
                    desc: _this.settings.desc, // 分享描述
                    link: _this.settings.url, // 分享链接
                    imgUrl: _this.settings.pic, // 分享图标
                    success: function () {
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareSucess();
                        }
                    },
                    cancel: function () {
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareCancel();
                        }
                    }
                });
                //腾讯微博
                wx.onMenuShareWeibo({
                    title: _this.settings.title, // 分享标题
                    desc: _this.settings.desc, // 分享描述
                    link:_this.settings.url, // 分享链接
                    imgUrl:_this.settings.pic, // 分享图标
                    success: function () {
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareSucess();
                        }
                    },
                    cancel: function () {
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareCancel();
                        }
                    }
                });
                //qq空间
                wx.onMenuShareQZone({
                    title: _this.settings.title, // 分享标题
                    desc: _this.settings.desc, // 分享描述
                    link: _this.settings.url, // 分享链接
                    imgUrl:_this.settings.pic, // 分享图标
                    success: function () {
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareSucess();
                        }
                    },
                    cancel: function () {
                        if($.isFunction(_this.wechatShareSucess)){
                            _this.wechatShareCancel();
                        }
                    }
                });
            })
        },
        setLevel:function(){
             if ((isMQQBrowser && version.qq < 5.4 && platform == "iPhone") || (isMQQBrowser && version.qq < 5.3 && platform == "Android")){
                    isMQQBrowser = level.qq.forbid;
             }else{
                if (isMQQBrowser && version.qq < 5.4 && platform == "Android") {
                    isMQQBrowser = level.qq.lower;
                }else{
                    if (isUCBrowser && ((version.uc < 10.2 && platform == "iPhone") || (version.uc < 9.7 && platform == "Android"))) {
                        isUCBrowser = level.uc.forbid;
                    }
                }
            }
        },
        shareEvent:function(appname){
            //UC浏览器
            if (isUCBrowser) {
                appname = appname == '' ? '' : (platform == 'iPhone' ? appList[appname][0] : appList[appname][1]);
                if (typeof(ucweb) != "undefined") {
                    ucweb.startRequest("shell.page_share", [this.settings.title,this.settings.desc, this.settings.url, appname,'','','']);
                } else {
                    if (typeof(ucbrowser) != "undefined") {

                        ucbrowser.web_share(this.settings.title,this.settings.desc,this.settings.url,appname, "", "", "");
                    }
                }
            }
            else {
                //手机QQ浏览器
                if (isMQQBrowser && !isWechat) {
                    appname = appname == '' ? '' :appList[appname][2];
                    var config = {
                        url: this.settings.url,
                        title: this.settings.title,
                        description: this.settings.desc,
                        img_url: this.settings.pic,
                        img_title: this.settings.imgTitle,
                        to_app: appname,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                        cus_txt: "请输入此时此刻想要分享的内容"
                    };
                    config = appname == '' ? '' : config;
                    if (typeof(browser) != "undefined") {
                        if (typeof(browser.app) != "undefined" && isMQQBrowser == level.qq.higher) {
                            browser.app.share(config);
                        }
                    } else {
                        if (typeof(window.qb) != "undefined" && isMQQBrowser == level.qq.lower) {
                            window.qb.share(config);
                        }
                    }
                }
                //微信浏览器
                if((isWechat&&appname=='wechat')||(isWechat&&appname=='friend')){
                    $("body").find(".wechatShareTips").show();
                }
            }
        },
        eachIcon:function(){
            var html='';
            if(isUCBrowser||isMQQBrowser||isWechat){
                html+='<li data-app="wechat"><a href="javascript:void(0)"><em class="appicon wechat"></em><p>'+appList.wechat[3]+'</p></a></li>';
                html+='<li data-app="friend"><a href="javascript:void(0)"><em class="appicon friend"></em><p>'+appList.friend[3]+'</p></a></li>';
                if(!isWechat){
                    html+='<li data-app="sina"><a href="javascript:void(0)"><em class="appicon sina"></em><p>'+appList.sina[3]+'</p></a></li>';
                    html+='<li data-app="qzone"><a href="javascript:void(0)"><em class="appicon qzone"></em><p>'+appList.qzone[3]+'</p></a></li>';
                    html+='<li data-app="qq"><a href="javascript:void(0)"><em class="appicon qq"></em><p>'+appList.qq[3]+'</p></a></li>';
                }
                else{
                    html+='<li><a href="'+this.settings.sinaWebUrl+'"><em class="appicon sina"></em><p>'+appList.sina[3]+'</p></a</li>';
                    html+='<li><a href="'+this.settings.qzoneWebUrl+'"><em class="appicon qzone"></em><p>'+appList.qzone[3]+'</p></a></li>';
                }
            }
            else{
                html+='<li><a href="'+this.settings.sinaWebUrl+'"><em class="appicon sina"></em><p>'+appList.sina[3]+'</p></a</li>';
                html+='<li><a href="'+this.settings.qzoneWebUrl+'"><em class="appicon qzone"></em><p>'+appList.qzone[3]+'</p></a></li>';
            }
            $(this.settings.html).find("ul").append(html);
            var _this=this;
            $(this.settings.html).find("li").each(function(index,val){
                if($(this).attr("data-app")!==undefined){
                    $(this).click(function(){
                        _this.shareEvent($(this).data('app'));
                    });
                }
            });
            return this.settings.html;
        },
        bindCancel:function(){
            $(this.settings.html).find(".cancel").click($.proxy(function(){
                this.closed();
            },this));
        },
        appendTo:function(){
            $(this.settings.html).appendTo(this.settings.appendTo);
        },
        open:function(){
            $("body").addClass('overflow');
            $(this.settings.html).show();
            setTimeout($.proxy(function(){
                $(this.settings.html).find(".share_content").addClass("show");
            },this),100);

        },
        closed:function(){
            var _this=this;
            $("body").removeClass('overflow');
            $(this.settings.html).find(".share_content").removeClass("show");
            /*$(this.settings.html).find(".share_content").on(_this.whichTransitionEvent(),function(){
                console.log('finish');
            });*/
            setTimeout($.proxy(function(){
                $(this.settings.html).hide();
            },this),400);
            preventBodyScroll=false;
        },
        whichTransitionEvent:function(){
            var t;
            var el = document.createElement('div');
            var transitions = {
              'transition':'transitionend',
              'OTransition':'oTransitionEnd',
              'MozTransition':'transitionend',
              'WebkitTransition':'webkitTransitionEnd'
            }
            for(t in transitions){
                if( el.style[t] !== undefined ){
                    return transitions[t];
                }
            }
        },
        wechatShareTips:function(){
            return '<div class="wechatShareTips"><img src="'+this.settings.rightImg+'"></div>';
        },
        bindWechatShareTipsClick:function(){
            $(document).on('click', '.wechatShareTips', function(event) {
                $(this).hide();
            });
        },
        htmlTemplate:function(){
            this.settings.html=$('<div class="app_share" style="display:none">');
            var template='<div class="table">\
                             <div class="table_cell">\
                                 <div class="share_content">\
                                     <div class="icon_wrap">\
                                        <ul></ul>\
                                     </div>\
                                     <div class="cancel">取消</div>\
                                 </div>\
                             </div>\
                          </div>';
            $(template).appendTo($(this.settings.html));
            this.bindCancel();
            if(isWechat){
                $(this.settings.html).prepend(this.wechatShareTips());
                this.bindWechatShareTipsClick();
            }

            if(this.settings.overlayClick){
                $(this.settings.html).find(".table_cell").click($.proxy(function(e){
                    if($(event.target).attr("class")=='table_cell'){
                        this.closed();
                    }
                },this));
            }
            return this.settings.html;
        }
    }
    var appShare=function(options){
        return new AppShare(options);
    }
    window.appShare=$.appShare=appShare;
})(window.jQuery||window.Zepto,window);