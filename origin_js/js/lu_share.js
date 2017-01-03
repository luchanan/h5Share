/*(function(){
	var Lu_share=function(options){
		this.pic=options.pic||"";//图片地址
		this.title=options.title||"";//标题
		this.url=options.url||"";//链接地址
		this.desc=options.desc||"";//描述
		this.init();//this指向window,undefined，如果没有实例化类导致的，这是错误的
	}
	Lu_share.prototype={
		init:function(){
			alert(this.pic);
		}
	}
	window["Lu_share"]={};//lu_share为命名空间
	window["Lu_share"]["share"]=Lu_share;
})();*/
//调用
/*Lu_share.share({
	pic:"http://home.gaosouyi.me/Public/Images/register/201504241413.jpg",
	title:"标题",
	url:"http://home.gaosouyi.me/",
	desc:"描述"
});*/
(function(){
	var Lu_share=function(options){
		this.pic=options.pic||"";//图片地址
		this.title=options.title||"";//标题
		this.url=options.url||"";//链接地址
		this.desc=options.desc||"";//描述
		this.summary=options.summary||"";//摘要
		this.showicon=options.showicon||"true";
		this.overlay=options.overlay||"true";//遮罩层
		this.qrcode=options.qrcode||"images/code.png";//二维码图片
		this.rightimg=options.rightimg||'images/weixin.png';//微信浏览器分享提示图片
		this.brolist=["MicroMessenger","UCBrowser","MQQBrowser","SogouMobileBrowser","QHBrowser","baidubrowser"];////微信，uc,qq,搜狗，360，百度
		this.version={
			qq:'',
			uc:''
		};
		this.init();
	}
	var qqJsSrc = {
        lower: "http://3gimg.qq.com/html5/js/qb.js",
        higher: "http://jsapi.qq.com/get?api=app.share"
    };
	Lu_share.prototype={
		init:function(){
			this.create();
			var b=this.getBrowser();
			if(/MQQBrowser/.test(b)){
				 this.bversion();
				 this.loadqqjs();
			}
		},
		bversion:function(){
			var ua=navigator.userAgent;
			var v=ua.split("MQQBrowser/")[1].split(" ")[0];
			return this.version.qq=v;
		},
		loadqqjs:function(){
			//qq浏览器需要加载js
            var v = (this.version.qq < 5.4) ? qqJsSrc.lower : qqJsSrc.higher;
            var s = document.createElement("script");
            var b = document.getElementsByTagName("body")[0];
            s.setAttribute("src", v);
            b.appendChild(s) ;
		},
		create:function(){
			var shareName='';
			this.shareName={
				//http://service.weibo.com/share/share.php?url=&title=&appkey=&pic=&searchPic=true
				'sina':{name:"新浪微博",cname:"sina",url:'http://service.weibo.com/share/share.php?'},
				//http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=&title=&desc=&summary=&site=&pics=
				'qzone':{name:"QQ空间",cname:"qzone",url:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'},
				'friend':{name:"微信好友",cname:"friend"},
				'weixin':{name:"朋友圈",cname:"weixin"}
			}
			var sname=this.shareName;
			for(var i in sname){
				switch(i){
					case 'sina':
						shareName+='<li><a href="'+sname[i].url+'url='+encodeURIComponent(this.url)+'&title='+encodeURIComponent(this.title)+'&pic='+encodeURIComponent(this.pic)+'">'+
						'<span class="icon '+sname[i].cname+'"></span><div class="share_name">'+sname[i].name+'</div></a></li>';
						break;
					case 'qzone':
						shareName+='<li><a href="'+sname[i].url+'url='+encodeURIComponent(this.url)+'&title='+encodeURIComponent(this.title)+'&pics='+encodeURIComponent(this.pic)+'&desc='+
						encodeURIComponent(this.desc)+'&summary='+encodeURIComponent(this.summary)+'">'+'<span class="icon '+sname[i].cname+'"></span><div class="share_name">'+sname[i].name+
						'</div></a></li>';
						break;
					default:
					shareName+='<li><a href="javascript:void(0)"><span class="icon '+sname[i].cname+'"></span><div class="share_name">'+sname[i].name+'</div></a></li>';	
				}
			}
			var div=document.createElement("div");
			div.className="lu_share";
			var mask=document.createElement("div");
			mask.className="mask";
			if(this.overlay==="false"){
				mask.style.visibility="hidden";
			}
			div.appendChild(mask);
			var share=document.createElement("div");
			share.className="share";
			var showIconStr='';
			if(this.showicon==="false"){
				showIconStr='style="display:none"';
			}
			share.innerHTML='<div class="share_inner"><div class="content" '+showIconStr+'><ul class="clearfix"></ul></div></div>';
			div.appendChild(share);
			var body=document.getElementsByTagName("body")[0];
			body.insertBefore(div,null);//相当于appendChild()
			var content=document.querySelector(".share_inner").getElementsByClassName('clearfix')[0];
			content.innerHTML=shareName;
			this.htmlTemplate=div;
			this.bindEvent();
		},
		show:function(){
			var e=this.htmlTemplate.children[0].parentNode;
			e.style.display="block";
		},
		rightShare:function(){
			var _this=this;
			var wb=document.createElement("div");
			wb.className="weishare";
			//wb.innerHTML='<img src="images/weixin .png" alt="">';
			wb.innerHTML='<img src="'+this.rightimg+'" alt="">';
			var getContent=document.querySelector(".share_inner");
			wb.onclick=function(){
				this.style.display="none";
			};
			getContent.insertBefore(wb,null);
		},
		codeShare:function(){
			var code=document.createElement("div");
			code.className="code";
			code.innerHTML='<div class="code_inner"><div class="code_content"><img src="'+this.qrcode+'" alt="">'+
							'<div class="code_intro">长按保存图片，打开微信扫一扫</div></div></div>';
			var getContent=document.querySelector(".share_inner");
			code.onclick=function(){
				this.style.display="none";
			};
			getContent.insertBefore(code,null);
		},
		bindEvent:function(){
			var _this=this;
			var c=this.htmlTemplate.querySelector(".share_inner");
			c.onclick=function(event){
				var e=event||window.event;
				var s=e.target||e.srcElement;
				//alert(s.nodeName);//tagName;
				if(s.className=="share_inner"){
					_this.close();
				}
			}
			var li=this.htmlTemplate.getElementsByTagName("ul")[0].children;
			for(var i=0;i<li.length;i++){
				//闭包应用
				li[i].onclick=(function(arg){
					return function(){
						var cname=li[arg].children[0].children.item(0).className.split(' ')[1];
						_this.browser=_this.getBrowser();
						switch(_this.browser){
							case "MicroMessenger":
								if(cname=="weixin"){
									_this.rightShare();
								}
								else if(cname=="friend"){
									_this.rightShare();
								}
								break;
							case "UCBrowser":
								if(cname=="weixin"){
									_this.weixin("WechatTimeline");
								}
								else if(cname=="friend"){
									_this.weixin("WechatFriends");
								}
								break;
							case "MQQBrowser":
								if(cname=="weixin"){
									_this.weixin("WechatTimeline");
								}
								else if(cname=="friend"){
									_this.weixin("WechatFriends");
								}
								break;
							default:
								if(cname=="weixin"){
									_this.codeShare();
								}
								else if(cname=="friend"){
									_this.codeShare();
								};
						}
					}
				})(i);
			}
		},
		getBrowser:function(){
			var ua=navigator.userAgent;
			var bl=this.brolist;
			for(var i=0;i<bl.length;i++){
				if(ua.indexOf(bl[i])>-1){
					return bl[i].toString();
					break;	
				}
			}
		},
		weixin:function(sname){
			var b=this.browser;
			var bl=this.brolist;
			if(b.indexOf(bl[1])>-1){
				//UC
				if(typeof(ucweb)!="undefined"){
					//安卓
					if(sname=="WechatTimeline"){
						var name="WechatTimeline";
					}
					else if(sname=="WechatFriends"){
						var name="WechatFriends";
					}
					//uc貌似设置了指定图片没有用,name为空可以调用uc的分享插件
					ucweb.startRequest("shell.page_share", [this.title, this.desc, this.url,name,'','','']);//WechatFriends微信好友,WechatTimeline朋友圈，SinaWeibo新浪微博
				}
				else if(typeof(ucbrowser) != "undefined"){
					//IOS
					if(sname=="WechatTimeline"){
						var name="kWeixinFriend";
					}
					else if(sname=="WechatFriends"){
						var name="kWeixin";
					}
					ucbrowser.web_share(this.title,this.desc,this.url,name, "", "", "");//kWeixin微信好友,kWeixinFriend朋友圈,kSinaWeibo新浪微博,kQQ qq好友,kQZone qq空间
				}
			}
			else if(b.indexOf(bl[2])>-1){
				//qq
				var toapp=sname=="WechatTimeline"?8:1;
				var ah = {
                    url:this.url,
                    title: this.title,
                    description:this.desc,
                    img_url: this.pic,
                    img_title: "img_title",
                    to_app: toapp,////微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                    cus_txt: "请输入此时此刻想要分享的内容"
                }
				if (typeof(browser) != "undefined") {
                    if (typeof(browser.app) != "undefined") {
                       browser.app.share(ah);
                    }
                }
				else {
                    if (typeof(window.qb) != "undefined") {
                        window.qb.share(ah);
                    }
                }
			}
		},
		close:function(){
			var e=this.htmlTemplate.children[0].parentNode;
			e.style.display="none";
		}
	}
	/*var share=function(options){
		return new Lu_share(options);//闭包用例一
	}*/
	function share(options){
		return new Lu_share(options);
	}
	window["Lu_share"]={};//lu_share为命名空间
	window["Lu_share"]=share;
})();