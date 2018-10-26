auto.waitFor();
requestScreenCapture();
var img = images.read("./g.png");

// 每2分钟执行一次 45分钟后停止
function schedule() {
    console.log('start a schedule');
    job();
    var id = setInterval(function() {
        console.log('schedule job start');
        job();
    }, 2 * 60 * 1000);

    setTimeout(function() {
            console.log('finish schedule');
            clearInterval(id);
        },
        45 * 60 * 1000);
}

function job() {

    home();
    sleep(1000);
    // 打开蚂蚁森林
    startGreenApp();
    sleep(8000);
    // 先收自己的
    collect();
    sleep(2000);
    // 直接点到好友明细中
    desc('查看更多好友').findOnce().click();
    sleep(3000);
    steal();
    // 由好友明细返回到自己家的大树
    back();
    sleep(500);
    // 再返回到支付宝
    back();
    home();
    console.log('job done');
}

function steal() {
    for (var i = 0; i < 10; i++) {
        //var imgName = './' + i + '.png'
        //   captureScreen(imgName);
        //  var ccc = images.read(imgName);
        var p = images.findImage(captureScreen(), img);
        //       var p = images.findImage(ccc, img);
        if (p) {
            // 有能量好友
            console.log('[' + p.x + ',' + p.y + ']');
            click(p.x + 7, p.y + 7);
            sleep(3000);
            collect();
            // 应该是返回
            back()
            sleep(1000);
            // 如果发现有能量重置i
            // 如果连续8次没有发现有能量的基本是拉到底了
            // 除非好友过多并且连续8次下拉都没有能量
            i = 0;
        } else {
            // 下拉
            upSlide();
            sleep(500);
        }
    }
}

function rightSlide() {
    swipe(500, 950, 1000, 950, 100);
}

function upSlide() {
    swipe(950, 1100, 950, 0, 100);
}

// 无密码解锁
function unlockNoPsw() {
    device.wakeUpIfNeeded();
    sleep(500);
    rightSlide();
}
// 使用混合密码和数字密码解锁
function unlockUsePsw(password) {
    unlockNoPsw();
    sleep(500);
    inputPsw(password);
}
//输入密码
function inputPsw(password) {
    for (var i = 0; i < password.length; ++i) {
        var ch = password.charAt(i);
        switchKeyboardViaWord(ch);
        clickButtonWithStr(ch);
    }
}

// 根据需要点击的按键来判断此时是否需要切换到字母以及大小写
function switchKeyboardViaWord(ch) {
    if (new RegExp("[A-Z,a-z]").test(ch)) {
        // 字母
        if (text("ABC").find().empty()) {
            // 如果是数字状态需要切换到字母状态
            clickButtonWithStr("ABC");
        }
        if (text(ch).find().empty()) {
            // 切换caps
            className("TextView").idEndsWith("btn_caps_lock").findOnce().click();
        }
    } else if (text("123").find()) {
        clickButtonWithStr("123");
    }
}

// 延迟0.5秒点击包含字符串string的控件
function clickButtonWithStr(string, time) {
    if (time) {
        sleep(time);
    } else {
        sleep(500);
    }
    click(string);
    // text(string).find().click();
}

function startGreenApp() {
    // intent方式打开鸡窝
    app.startActivity({
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=60000002"
    });
}

// 矩阵中一阵乱点
function collect() {
    // [400,400] [1380,400]
    // [400,800] [1380,400]
    for (var y = 440; y <= 1000; y = y + 100) {
        for (x = 100; x <= 1000; x = x + 100) {
            click(x, y);
        }
    }
}

// 模拟锁屏状态下脚本运行状况 需要root
// Power();
sleep(5000);
unlockUsePsw('yourpassword');
device.keepScreenOn(45 * 60 * 1000);
schedule();
