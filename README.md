### 预览地址: ###
[http://www.frontsucai.com/upload/file/20161012/h5Share/index.html](http://www.frontsucai.com/upload/file/20161012/h5Share/index.html)
### 新特性及说明: ###

- 新增图标点击分享功能，大概是这个效果：[http://m.sohu.com/n/469995844/?wscrid=1137_1](http://m.sohu.com/n/469995844/?wscrid=1137_1)
- 新增微信分享成功和失败的回调函数
- 手机UC,QQ浏览器中qq空间和新浪微博分享改为对应浏览器的接口，代替原来跳转地址
- 新浪，QQ空间分享，如果浏览器有对应接口，则用对应接口，否则跳转
- QQ好友分享，如果浏览器有对应接口，则用对应接口，否则隐藏
- 微信中右上角点开的分享到手机QQ，分享到QQ空间中自定义分享也进行了配置
- 非弹层，非ICON点击分享之外的no_element.php分享只不过是改了页面的title而已，因为有自带分享功能的浏览器分享就抓取title(貌似手机QQ浏览器不支持JS动态改title这种方式，测试环境：iphone6s+,ios9.3.2,qqv6.9.1.2509)


### 调用方法: ###
```javascript
<?php if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false){?>
    appShare({
        ele:'#share',//可选
        title:"标题",//可选
        desc:'描述',//可选
        pic:"http://www.frontsucai.com/upload/file/20150701/angular+requirejs/images/touxiang/5.jpg",
        appId: "<?php echo $signPackage['appId']?>",//可选
        timestamp:"<?php echo $signPackage['timestamp']?>",//可选
        nonceStr: "<?php echo $signPackage['nonceStr']?>",//可选
        signature: "<?php echo $signPackage['signature']?>"//可选
    });
<?php }else{?>
    appShare({
        ele:'#share',//可选
        title:"标题",//可选
        desc:'描述',//可选
        pic:"http://www.frontsucai.com/upload/file/20150701/angular+requirejs/images/touxiang/5.jpg"
    });
<?php };?>
```
### uc手机浏览器gif展示效果(测试环境：iphone6s+,ios9.3.2,ucv11.1.5.861): ###
[http://7qn7ih.com1.z0.glb.clouddn.com/2016101123072.gif](http://7qn7ih.com1.z0.glb.clouddn.com/2016101123072.gif)
### qq手机浏览器gif展示效果(测试环境：iphone6s+,ios9.3.2,qqv6.9.1.2509): ###
[http://7qn7ih.com1.z0.glb.clouddn.com/2016101123072.gif](http://7qn7ih.com1.z0.glb.clouddn.com/2016101123071.gif)
### 微信浏览器gif展示效果(测试环境：iphone6s+,ios9.3.2,wechat6.3.27): ###
[http://7qn7ih.com1.z0.glb.clouddn.com/2016101123072.gif](http://7qn7ih.com1.z0.glb.clouddn.com/2016101123073.gif)
### safari浏览器gif展示效果(测试环境：iphone6s+,ios9.3.2): ###
[http://7qn7ih.com1.z0.glb.clouddn.com/2016101123072.gif](http://7qn7ih.com1.z0.glb.clouddn.com/2016101123074.gif)
### 使用注意事项: ###
![](http://7qn7ih.com1.z0.glb.clouddn.com/20161012173354.jpg)
![](http://7qn7ih.com1.z0.glb.clouddn.com/20161012173430.jpg)
![](http://7qn7ih.com1.z0.glb.clouddn.com/20161012174306.jpg)

- 上面的appid和是appsecret是个人测试号的，要关注测试公众号（二维码在下面），然后分享功能才可以正常使用，否则提取的是title和默认第一张图，而不是自己要自定义分享的内容，建议改为自己的appid和是appsecret。
- 接口配置信息中的Token要与token.php中定义的TOKEN值要一样
- 要设置js安全域名，不要加http://
- qq手机浏览器中的新浪微博分享，只要登录了，然后在一段时间内就不会再登录，当点击图标的时候，会显示分享功能（有时候这时间有点长）。
- uc手机浏览器自定义图片分享好像没有用，它自己截了一张图

### 微信测试分享请先关注测试公账号: ###
![](http://7qn7ih.com1.z0.glb.clouddn.com/201610121739.jpg)
