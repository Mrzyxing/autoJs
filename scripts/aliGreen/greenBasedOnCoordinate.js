auto.waitFor();
requestScreenCapture();
var img = images.read("./g.png");

home();
sleep(1000);
// 打开蚂蚁森林
startGreenApp();
sleep(8000);
// 先收自己的
collect();
sleep(2000);
// 直接点到好友明细中
var btn;
if (btn = desc('查看更多好友').findOnce())
    btn.click();
else
    clickMoreFriendsDetail();

sleep(3000);
steal();
// 由好友明细返回到自己家的大树
back();
sleep(500);
// 再返回到支付宝
back();
home();
console.log('job done');

function rightSlide() {
    swipe(500, 950, 1000, 950, 100);
}

function upSlide() {
    swipe(950, 1100, 950, 0, 100);
}

function collect() {
    for (var x = 150; x / 100 <= 10; x += 100) {
        for (var y = 570; y / 100 <= 11; y += 100) {
            click(x, y);
        }
    }
}

function steal() {
    var lastPosPre = -9999;
    for (var i = 0; i <= 10; ++i) {
        if (descEndsWith("没有更多了").exists()) {
            var lastPosCur = descEndsWith("没有更多了").findOne().bounds().centerY();
            if (lastPosCur == lastPosPre && lastPosPre != -9999)
                break;
            lastPosPre = lastPosCur;
        }

        if (p = images.findImage(captureScreen(), img)) {
            console.log(1);
            click(p.x + 7, p.y + 7);
            sleep(1000);
            collect();
            back();
            sleep(1000);
            i = 0;
        } else {
            upSlide();
            sleep(1000);
        }
    }
}

function startGreenApp() {
    // intent方式打开鸡窝
    app.startActivity({
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=60000002"
    });
}


function clickMoreFriendsDetail() {
    // 无法基于控件就直接拉到底点
    console.log('cant found widget!use coordinate');
    for (var i = 0; i < 5; ++i) {
        upSlide();
    }
    click(1100, 1100);
}