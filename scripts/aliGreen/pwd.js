auto.waitFor();

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
    console.log("right slide");
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


// 模拟锁屏状态下脚本运行状况 需要root
// Power();
//sleep(5000);
//if (!device.isScreenOn()){
    console.log("need pwd");
    unlockUsePsw('123456');
// }