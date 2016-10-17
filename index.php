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
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="share.css">
        <style>
            .btn{
                -webkit-appearance:none;
                display:block;
                font-size:16px;
                width:100%;
                line-height:40px;
                background:red;
                border:none;
                border-radius:0;
                color:#fff;
            }

        </style>
        <title>分享插件，UC浏览器，手机QQ浏览器支持微信好友，朋友圈分享</title>
    </head>
    <body>
        <!--输入您微公司信公众号（或者测试号）的appId,appSecret;否则在微信会报错-->
        <?php
            if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false){
                include 'Jssdk.class.php';
                $jssdk =  new JSSDK('appId','appSecret');
                $signPackage = $jssdk->GetSignPackage();
            }
        ?>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
        <button type="button" class="btn" id="share">立即分享</button>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script src="jquery.min.js"></script>
        <script src="flexible.js"></script>
        <script src="flexible_css.js"></script>
        <script src="share.js"></script>
        <script>
            <?php if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false){?>
                appShare({
                    ele:'#share',//可选
                    title:"标题",//可选
                    desc:'描述',//可选
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
                });
            <?php };?>
        </script>
    </body>
</html>
