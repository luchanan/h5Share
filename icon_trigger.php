<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="keywords" content="" >
        <meta name="description" content="">
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="yes" name="apple-touch-fullscreen" />
        <meta name="full-screen" content="yes">
        <meta name="x5-fullscreen" content="true" />
        <meta name="screen-orientation" content="portrait">
        <meta name="x5-orientation" content="portrait">
        <meta content="telephone=no,email=no" name="format-detection" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut appicon" href="/favicon.ico" type="image/x-appicon" />
        <script src="flexible.js"></script>
        <script src="flexible_css.js"></script>
        <link rel="stylesheet" href="share.css">
        <style>
        html,body{
            background:#fafafa !important;
        }
        </style>
        <title>触发某个按钮的分享事件，请在UC，QQ浏览器测试，其他浏览器要进行判断</title>
    </head>
    <body>
        <?php
            if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false){
                include 'Jssdk.class.php';
                $jssdk =  new JSSDK('wxf5635db75a1aac3d','d4624c36b6795d1d99dcf0547af5443d');
                $signPackage = $jssdk->GetSignPackage();
            }
        ?>
        <p>分享到：</p>
        <em class="appicon sina" data-app="sina"></em>
        <em class="appicon wechat" data-app="wechat"></em>
        <em class="appicon friend" data-app="friend"></em>
        <em class="appicon qzone" data-app="qzone"></em>
        <em class="appicon qq" data-app="qq"></em>



        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script src="//cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
        <script src="share.js"></script>
        <script>
            //你可以指定一个元素来实现触发分享事件
            <?php if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false){?>
                appShare({
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
                    title:"标题",//可选
                    desc:'描述',//可选
                    pic:"http://www.frontsucai.com/upload/file/20150701/angular+requirejs/images/touxiang/5.jpg"
                });
            <?php };?>
        </script>
    </body>
</html>
