auto.waitFor();
requestScreenCapture();


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

function collect() {
    if (descEndsWith("克").exists()) {
        descEndsWith("克").find().forEach(function(object) {
            click(object.bounds().centerX(), object.bounds().centerY())
            sleep(200);
        });
    }
}

function steal() {
    while (true) {
        descEndsWith("g").find().forEach(function(collectable) {
            var b = collectable.bounds();
            if (b.centerY() < device.height && b.centerY() >= 0) {
                console.log("friend location is [" + b.centerX() + "," + b.centerY() + "]");
                click(b.centerX(), b.centerY());
                collect();
                var p = findColor(captureScreen(), "#ff1da06d", {
                    region: [b.right, b.top - 30, 30, 30],
                    threshold: 4
                });
                if (p) {
                    click(p.x + 10, p.y + 10);
                    sleep(3000);
                    collect();
                    back();
                    sleep(2000);
                }
            }
        });
        if (descEndsWith("没有更多了").exists()) {
            console.log("last one height is " + descEndsWith("没有更多了").findOne().bounds().centerY());
            break;
        }
        upSlide();
        console.log("\n\n")
        sleep(2000);
    }
}

function rightSlide() {
    swipe(500, 950, 1000, 950, 100);
}

function upSlide() {
    swipe(950, 1100, 950, 0, 100);
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